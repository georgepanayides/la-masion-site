import nodemailer from "nodemailer";
import { DateTime } from "luxon";

function env(name: string): string | null {
  const value = process.env[name];
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function envBool(name: string, defaultValue: boolean): boolean {
  const raw = env(name);
  if (!raw) return defaultValue;
  return ["1", "true", "yes", "on"].includes(raw.toLowerCase());
}

export type BookingAlertPayload = {
  bookingId: string;
  squareBookingId: string | null;
  locationId: string;
  timezone: string;
  startAtIsoUtc: string;
  createdAtIsoUtc: string;
  serviceName: string;
  addonNames: string[];
  totalDollars: number;
  depositDollars: number;
  currency: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  notes: string | null;
};

export async function sendBookingAlertEmail(payload: BookingAlertPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  const enabled = envBool("BOOKING_ALERTS_ENABLED", true);
  if (!enabled) return { ok: false, error: "Alerts disabled (BOOKING_ALERTS_ENABLED=false)" };

  const host = env("SMTP_HOST");
  const portRaw = env("SMTP_PORT");
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");
  const to = env("BOOKING_ALERT_EMAIL_TO");
  const from = env("BOOKING_ALERT_EMAIL_FROM") ?? to;

  if (!host || !portRaw || !user || !pass || !to || !from) {
    return {
      ok: false,
      error:
        "Missing SMTP/alert env vars. Need SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, BOOKING_ALERT_EMAIL_TO (and optionally BOOKING_ALERT_EMAIL_FROM).",
    };
  }

  const port = Number(portRaw);
  if (!Number.isFinite(port) || port <= 0) {
    return { ok: false, error: `Invalid SMTP_PORT: ${portRaw}` };
  }

  const secure = port === 465;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const startLocal = DateTime.fromISO(payload.startAtIsoUtc, { zone: "utc" }).setZone(payload.timezone);
  const createdLocal = DateTime.fromISO(payload.createdAtIsoUtc, { zone: "utc" }).setZone(payload.timezone);

  const whenLine = startLocal.isValid
    ? `${startLocal.toFormat("cccc d LLL yyyy")} at ${startLocal.toFormat("h:mm a")}`
    : payload.startAtIsoUtc;

  const appointmentDateLine = startLocal.isValid
    ? startLocal.toFormat("cccc d LLL yyyy")
    : payload.startAtIsoUtc;

  const appointmentTimeLine = startLocal.isValid
    ? startLocal.toFormat("h:mm a")
    : payload.startAtIsoUtc;

  const bookedAtLine = createdLocal.isValid
    ? `${createdLocal.toFormat("cccc d LLL yyyy")} at ${createdLocal.toFormat("h:mm a")}`
    : payload.createdAtIsoUtc;

  const addonLine = payload.addonNames.length ? payload.addonNames.join(", ") : "None";
  const money = (value: number) => `${payload.currency} $${value.toFixed(2)}`;

  const subject = `New booking confirmed — ${payload.customer.firstName} ${payload.customer.lastName} — ${whenLine}`;

  const text = [
    "NEW BOOKING CONFIRMED",
    "",
    `Appointment date: ${appointmentDateLine}`,
    `Appointment time: ${appointmentTimeLine}`,
    "",
    `Service: ${payload.serviceName}`,
    `Add-ons: ${addonLine}`,
    `Total: ${money(payload.totalDollars)}`,
    `Deposit paid: ${money(payload.depositDollars)}`,
    "",
    `Customer: ${payload.customer.firstName} ${payload.customer.lastName}`,
    `Phone: ${payload.customer.phone}`,
    `Email: ${payload.customer.email}`,
    payload.notes ? `Notes: ${payload.notes}` : null,
    "",
    `Booked at: ${bookedAtLine}`,
    `Booking ID: ${payload.bookingId}`,
    payload.squareBookingId ? `Square booking ID: ${payload.squareBookingId}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      text,
    });
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send booking alert email";
    return { ok: false, error: message };
  }
}
