import { NextResponse } from "next/server";
import { DateTime } from "luxon";

import { bookingAddOns, treatments } from "@/app/data/Treatments";
import { getSquareClient, resolveTeamMemberId } from "@/app/lib/square";
import { sendBookingAlertEmail } from "@/app/lib/bookingAlerts";

export const runtime = "nodejs";

type SquareErrorDetail = {
  category?: string;
  code?: string;
  detail?: string;
  field?: string;
};

type SquareMaybeError = {
  errors?: SquareErrorDetail[];
};

function formatSquareError(error: unknown): string {
  if (error instanceof Error) {
    const maybe = error as SquareMaybeError;
    const errors = maybe.errors;
    if (Array.isArray(errors) && errors.length) {
      return errors
        .map((e) => {
          const parts = [e.category, e.code].filter(Boolean).join("/");
          const suffix = [e.field ? `field=${e.field}` : null, e.detail].filter(Boolean).join(" ");
          return parts ? `${parts}: ${suffix}` : suffix;
        })
        .filter(Boolean)
        .join(" | ");
    }
    return error.message;
  }
  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}

async function resolveSquareLocationId(client: ReturnType<typeof getSquareClient>): Promise<string> {
  const configured = process.env.SQUARE_LOCATION_ID;
  if (configured && configured.trim()) return configured.trim();

  const response = await client.locations.list();
  const active = (response.locations ?? []).find((l) => l.status === "ACTIVE");
  const first = (response.locations ?? [])[0];
  const resolved = active?.id ?? first?.id;
  if (!resolved) {
    throw new Error("No Square locations found for this account");
  }
  return resolved;
}

function parseAppointmentStartAt(params: {
  date: string;
  timeLabel: string;
  timezone: string;
}): string {
  const parsed = DateTime.fromFormat(`${params.date} ${params.timeLabel}`, "yyyy-MM-dd h:mm a", {
    zone: params.timezone,
  });
  if (!parsed.isValid) {
    throw new Error("Invalid date/time");
  }
  return parsed.toUTC().toISO({ suppressMilliseconds: true }) ?? "";
}

function safeJsonParse<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function toInt(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return Math.trunc(value);
  if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) {
    return Math.trunc(Number(value));
  }
  return null;
}

function getForcedDepositCents(): number | null {
  const raw = process.env.SQUARE_FORCE_DEPOSIT_CENTS;
  if (!raw) return null;
  const parsed = toInt(raw);
  if (parsed === null) return null;
  if (parsed <= 0) return null;
  return parsed;
}

type VariationMap = Record<string, string>;

async function resolveServiceVariation(params: {
  client: ReturnType<typeof getSquareClient>;
  serviceId: string;
  serviceName: string;
}): Promise<{ serviceVariationId: string; serviceVariationVersion: bigint }> {
  const mapRaw = process.env.SQUARE_APPOINTMENT_VARIATION_MAP;
  const map = mapRaw ? safeJsonParse<VariationMap>(mapRaw) : null;
  const mappedId = map?.[params.serviceId];
  if (mappedId) {
    try {
      const variationResponse = await params.client.catalog.object.get({
        objectId: mappedId,
      });
      const obj = variationResponse.object;
      if (obj?.id && obj.type === "ITEM_VARIATION" && typeof obj.version === "bigint") {
        return { serviceVariationId: obj.id, serviceVariationVersion: obj.version };
      }
      console.warn(
        `[Square] Mapped ID ${mappedId} retrieved but invalid (type or version). Falling back to search.`
      );
    } catch (e) {
      console.warn(
        `[Square] Could not fetch catalog object for mapped ID ${mappedId} (likely 404/deleted). Falling back to search.`,
        e
      );
    }
  }

  // Fallback: search catalog by service name and pick the first APPOINTMENTS_SERVICE variation.
  const searchResponse = await params.client.catalog.search({
    objectTypes: ["ITEM_VARIATION"],
    includeRelatedObjects: true,
    query: {
      textQuery: {
        keywords: params.serviceName
          .split(/\s+/)
          .map((t) => t.trim())
          .filter(Boolean)
          .slice(0, 3),
      },
    },
    limit: 50,
  });

  const objects = searchResponse.objects ?? [];
  const related = searchResponse.relatedObjects ?? [];

  const objectById = new Map<string, (typeof related)[number]>();
  for (const obj of [...objects, ...related]) {
    if (obj?.id) objectById.set(obj.id, obj);
  }

  for (const obj of objects) {
    if (!obj?.id) continue;
    if (obj.type !== "ITEM_VARIATION") continue;
    const itemId = obj.itemVariationData?.itemId;
    if (!itemId) continue;

    const parentItem = objectById.get(itemId);
    if (!parentItem || parentItem.type !== "ITEM") continue;
    if (parentItem.itemData?.productType !== "APPOINTMENTS_SERVICE") continue;

    const version = obj.version;
    if (typeof version !== "bigint") continue;

    return { serviceVariationId: obj.id, serviceVariationVersion: version };
  }

  throw new Error(
    "Could not find a matching Square appointment service variation. Configure SQUARE_APPOINTMENT_VARIATION_MAP.",
  );
}

// resolveTeamMemberId moved to app/lib/square.ts

async function resolveCustomerId(params: {
  client: ReturnType<typeof getSquareClient>;
  firstName: string;
  lastName: string;
  email: string;
  phoneForSquare?: string | null;
}): Promise<string | null> {
  let searchResponse;
  try {
    searchResponse = await params.client.customers.search({
      limit: BigInt(1),
      query: {
        filter: {
          emailAddress: { exact: params.email },
        },
      },
    });
  } catch (error) {
    throw new Error(`Square customers.search failed: ${formatSquareError(error)}`);
  }

  const existing = searchResponse.customers?.[0]?.id;
  if (existing) return existing;

  let created;
  try {
    created = await params.client.customers.create({
      givenName: params.firstName,
      familyName: params.lastName,
      emailAddress: params.email,
      ...(params.phoneForSquare ? { phoneNumber: params.phoneForSquare } : {}),
    });
  } catch (error) {
    throw new Error(`Square customers.create failed: ${formatSquareError(error)}`);
  }

  return created.customer?.id ?? null;
}

function normalizePhoneForSquare(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  // Keep E.164 as-is if it looks valid enough.
  if (/^\+\d{8,15}$/.test(trimmed)) return trimmed;

  // Best-effort AU normalization.
  const digitsOnly = trimmed.replace(/[^0-9]/g, "");
  if (!digitsOnly) return null;

  // If already includes country code 61
  if (digitsOnly.startsWith("61") && digitsOnly.length >= 10) {
    return `+${digitsOnly}`;
  }

  // Common AU mobile/landline starting with 0
  if (digitsOnly.startsWith("0") && digitsOnly.length >= 9) {
    return `+61${digitsOnly.slice(1)}`;
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      bookingId?: string;
      serviceId?: string;
      addonIds?: string[];
      date?: string;
      time?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      notes?: string;
    };

    const bookingId = (body.bookingId ?? "").trim() || crypto.randomUUID();
    const serviceId = (body.serviceId ?? "").trim();
    const date = (body.date ?? "").trim();
    const time = (body.time ?? "").trim();
    const firstName = (body.firstName ?? "").trim();
    const lastName = (body.lastName ?? "").trim();
    const email = (body.email ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const notes = (body.notes ?? "").trim();
    const addonIds = Array.isArray(body.addonIds) ? body.addonIds : [];

    if (!serviceId || !date || !time || !firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { ok: false, error: "Missing required booking details" },
        { status: 400 },
      );
    }

    const treatment = treatments.find((t) => t.id === serviceId);
    if (!treatment) {
      return NextResponse.json({ ok: false, error: "Invalid service" }, { status: 400 });
    }

    const selectedAddons = bookingAddOns.filter((a) => addonIds.includes(a.id));

    const basePriceDollars = toInt(treatment.price) ?? 0;
    const addonsPriceDollars = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const totalDollars = basePriceDollars + addonsPriceDollars;

    const forcedDepositCents = getForcedDepositCents();
    const depositCents = forcedDepositCents ?? Math.round(totalDollars * 20);
    const depositDollars = depositCents / 100;

    const currency = (process.env.SQUARE_CURRENCY ?? "AUD").toUpperCase();

    const client = getSquareClient();
    const locationId = await resolveSquareLocationId(client);
    const location = (await client.locations.list()).locations?.find((l) => l.id === locationId);
    const timezone = location?.timezone ?? "UTC";

    const startAt = parseAppointmentStartAt({ date, timeLabel: time, timezone });

    const { serviceVariationId, serviceVariationVersion } = await resolveServiceVariation({
      client,
      serviceId,
      serviceName: treatment.name,
    });

    const teamMemberId = await resolveTeamMemberId(client, locationId);
    const phoneForSquare = normalizePhoneForSquare(phone);
    const customerId = await resolveCustomerId({
      client,
      firstName,
      lastName,
      email,
      phoneForSquare,
    });

    const sellerNote = [
      `Booking ID: ${bookingId}`,
      selectedAddons.length ? `Add-ons: ${selectedAddons.map((a) => a.name).join(", ")}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    const customerNote = notes || null;

    let createResponse;
    try {
      const bookingPayload: Record<string, unknown> = {
        locationId,
        startAt,
        customerNote,
        sellerNote,
        appointmentSegments: [
          {
            teamMemberId,
            serviceVariationId,
            serviceVariationVersion,
          },
        ],
      };

      if (customerId) {
        bookingPayload.customerId = customerId;
      }

      createResponse = await client.bookings.create({
        idempotencyKey: bookingId,
        booking: {
          ...(bookingPayload as unknown as Record<string, never>),
        },
      });
    } catch (error) {
      console.error("[Square] bookings.create failed", {
        bookingId,
        locationId,
        serviceId,
        startAt,
        hasCustomerId: Boolean(customerId),
        error: formatSquareError(error),
      });
      throw new Error(`Square bookings.create failed: ${formatSquareError(error)}`);
    }

    const squareBookingId = createResponse.booking?.id ?? null;
    const squareBookingStatus = createResponse.booking?.status ?? null;

    const alertResult = await sendBookingAlertEmail({
      bookingId,
      squareBookingId,
      squareBookingStatus,
      locationId,
      timezone,
      startAtIsoUtc: startAt,
      createdAtIsoUtc: new Date().toISOString(),
      serviceName: treatment.name,
      addonNames: selectedAddons.map((a) => a.name),
      totalDollars,
      depositDollars,
      currency,
      customer: {
        firstName,
        lastName,
        email,
        phone,
      },
      notes: customerNote,
    });

    if (!alertResult.ok) {
      console.warn("[Booking alert] Not sent:", alertResult.error);
    }

    return NextResponse.json(
      {
        ok: true,
        bookingId,
        squareBookingId,
        locationId,
        startAt,
        alertSent: alertResult.ok,
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
