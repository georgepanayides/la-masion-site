import { NextResponse } from "next/server";
import { DateTime } from "luxon";

import { bookingAddOns, treatments } from "@/app/data/Treatments";
import { getSquareClient, resolveTeamMemberId } from "@/app/lib/square";

function formatSquareError(error: unknown): string {
  if (error instanceof Error) {
    const anyErr = error as any;
    const errors = anyErr?.errors as Array<{ category?: string; code?: string; detail?: string; field?: string }>;
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
    const variationResponse = await params.client.catalog.object.get({
      objectId: mappedId,
    });
    const obj = variationResponse.object;
    if (!obj?.id || obj.type !== "ITEM_VARIATION") {
      throw new Error("SQUARE_APPOINTMENT_VARIATION_MAP points to an invalid variation ID");
    }
    const version = obj.version;
    if (typeof version !== "bigint") {
      throw new Error("Square did not return a variation version");
    }
    return { serviceVariationId: obj.id, serviceVariationVersion: version };
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
  phone: string;
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
      phoneNumber: params.phone,
    });
  } catch (error) {
    throw new Error(`Square customers.create failed: ${formatSquareError(error)}`);
  }

  return created.customer?.id ?? null;
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
    const customerId = await resolveCustomerId({
      client,
      firstName,
      lastName,
      email,
      phone,
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
      createResponse = await client.bookings.create({
        idempotencyKey: bookingId,
        booking: {
          locationId,
          startAt,
          customerId,
          customerNote,
          sellerNote,
          appointmentSegments: [
            {
              teamMemberId,
              serviceVariationId,
              serviceVariationVersion,
            },
          ],
        },
      });
    } catch (error) {
      throw new Error(`Square bookings.create failed: ${formatSquareError(error)}`);
    }

    const squareBookingId = createResponse.booking?.id ?? null;

    return NextResponse.json(
      {
        ok: true,
        bookingId,
        squareBookingId,
        locationId,
        startAt,
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
