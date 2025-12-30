import { NextResponse } from "next/server";

import { bookingAddOns, treatments } from "@/app/data/Treatments";
import { getSquareClient } from "@/app/lib/square";
import type { Currency } from "square";


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

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
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

    const serviceId = body.serviceId ?? "";
    const addonIds = Array.isArray(body.addonIds) ? body.addonIds : [];

    const treatment = treatments.find((t) => t.id === serviceId);
    if (!treatment) {
      return NextResponse.json({ ok: false, error: "Invalid service" }, { status: 400 });
    }

    const selectedAddons = bookingAddOns.filter((a) => addonIds.includes(a.id));

    const basePriceDollars = toInt(treatment.price) ?? 0;
    const addonsPriceDollars = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const totalDollars = basePriceDollars + addonsPriceDollars;

    if (totalDollars <= 0) {
      return NextResponse.json({ ok: false, error: "Invalid price" }, { status: 400 });
    }

    // Deposit amount in cents (smallest denomination).
    // Default: 20% deposit. Optional: force a fixed amount for testing.
    const forcedDepositCents = getForcedDepositCents();
    const depositCents = forcedDepositCents ?? Math.round(totalDollars * 20);

    const rawCurrency = (process.env.SQUARE_CURRENCY ?? "AUD").toUpperCase();
    const currency: Currency = rawCurrency === "AUD" ? "AUD" : "AUD";

    const proto = req.headers.get("x-forwarded-proto") ?? "http";
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "localhost:3000";
    const redirectUrl = `${proto}://${host}/booking/success`;

    const firstName = (body.firstName ?? "").trim();
    const lastName = (body.lastName ?? "").trim();
    const email = (body.email ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const date = (body.date ?? "").trim();
    const time = (body.time ?? "").trim();
    const notes = (body.notes ?? "").trim();

    if (!firstName || !lastName || !email || !phone || !date || !time) {
      return NextResponse.json(
        { ok: false, error: "Missing required booking details" },
        { status: 400 },
      );
    }

    const client = getSquareClient();
    const locationId = await resolveSquareLocationId(client);

    const bookingId = crypto.randomUUID();

    const bookingDetailsNote = [
      `Requested: ${date} ${time}`,
      `Customer: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      selectedAddons.length ? `Add-ons: ${selectedAddons.map((a) => a.name).join(", ")}` : null,
      notes ? `Notes: ${notes}` : null,
      `Booking ID: ${bookingId}`,
    ]
      .filter(Boolean)
      .join(" | ");

    const paymentLinkResponse = await client.checkout.paymentLinks.create({
      idempotencyKey: crypto.randomUUID(),
      description: `Booking deposit (20%) — ${treatment.name}`,
      order: {
        locationId,
        referenceId: bookingId,
        ticketName: `${firstName} — ${date} ${time}`,
        lineItems: [
          {
            name: `Deposit (20%) — ${treatment.name}`,
            quantity: "1",
            basePriceMoney: {
              amount: BigInt(depositCents),
              currency,
            },
            note: bookingDetailsNote,
          },
        ],
      },
      checkoutOptions: {
        redirectUrl,
      },
      // This shows up on the Payment record; we still include it as a fallback.
      paymentNote: bookingDetailsNote,
    });

    const url = paymentLinkResponse.paymentLink?.url;
    const paymentLinkId = paymentLinkResponse.paymentLink?.id ?? null;
    const orderId = paymentLinkResponse.paymentLink?.orderId ?? null;
    if (!url) {
      return NextResponse.json(
        { ok: false, error: "Square did not return a checkout URL" },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        url,
        paymentLinkId,
        orderId,
        depositCents,
        totalDollars,
        serviceName: treatment.name,
        bookingId,
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

