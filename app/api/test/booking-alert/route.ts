import { sendBookingAlertEmail, type BookingAlertPayload } from "@/app/lib/bookingAlerts";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

function getHeader(req: Request, name: string): string | null {
  return req.headers.get(name) ?? req.headers.get(name.toLowerCase()) ?? null;
}

export async function POST(req: Request) {
  const adminSecret = (process.env.SQUARE_ADMIN_SECRET ?? "").trim();
  const providedSecret = (getHeader(req, "x-admin-secret") ?? "").trim();

  if (!adminSecret || providedSecret !== adminSecret) return unauthorized();

  const body = (await req.json().catch(() => ({}))) as { to?: string; from?: string };

  const previousTo = process.env.BOOKING_ALERT_EMAIL_TO;
  const previousFrom = process.env.BOOKING_ALERT_EMAIL_FROM;

  try {
    if (body.to?.trim()) process.env.BOOKING_ALERT_EMAIL_TO = body.to.trim();
    if (body.from?.trim()) process.env.BOOKING_ALERT_EMAIL_FROM = body.from.trim();

    const nowIsoUtc = new Date().toISOString();

    const payload: BookingAlertPayload = {
      bookingId: `test-${globalThis.crypto?.randomUUID?.() ?? Math.random().toString(16).slice(2)}`,
      squareBookingId: null,
      squareBookingStatus: "ACCEPTED",
      locationId: process.env.SQUARE_LOCATION_ID?.trim() || "TEST_LOCATION",
      timezone: "Australia/Sydney",
      startAtIsoUtc: nowIsoUtc,
      createdAtIsoUtc: nowIsoUtc,
      serviceName: "TEST: Tranquility Ritual",
      addonNames: [],
      totalDollars: 260,
      depositDollars: 0,
      currency: "AUD",
      customer: {
        firstName: "Test",
        lastName: "Customer",
        email: "test@example.com",
        phone: "+61400000000",
      },
      notes: "This is a test email from /api/test/booking-alert",
    };

    const result = await sendBookingAlertEmail(payload);
    return NextResponse.json(result);
  } finally {
    if (previousTo === undefined) delete process.env.BOOKING_ALERT_EMAIL_TO;
    else process.env.BOOKING_ALERT_EMAIL_TO = previousTo;

    if (previousFrom === undefined) delete process.env.BOOKING_ALERT_EMAIL_FROM;
    else process.env.BOOKING_ALERT_EMAIL_FROM = previousFrom;
  }
}
