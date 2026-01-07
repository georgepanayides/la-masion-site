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
  squareBookingStatus?: string | null;
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

  const mailerSendToken = env("MAILERSEND_API_TOKEN");

  const toRaw = env("BOOKING_ALERT_EMAIL_TO");
  const from = env("BOOKING_ALERT_EMAIL_FROM") ?? toRaw;

  if (!mailerSendToken) {
    return { ok: false, error: "Missing MAILERSEND_API_TOKEN" };
  }

  if (!toRaw || !from) {
    return { ok: false, error: "Missing BOOKING_ALERT_EMAIL_TO and/or BOOKING_ALERT_EMAIL_FROM" };
  }

  const toList = toRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (!toList.length) {
    return { ok: false, error: "BOOKING_ALERT_EMAIL_TO is empty" };
  }

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

  const squareStatus = (payload.squareBookingStatus ?? "").toString().toUpperCase();
  const isPending = squareStatus === "PENDING";
  const subjectPrefix = isPending ? "New booking request (pending confirmation)" : "New booking confirmed";

  const subject = `${subjectPrefix} — ${payload.customer.firstName} ${payload.customer.lastName} — ${whenLine}`;

  const text = [
    isPending ? "NEW BOOKING REQUEST (PENDING CONFIRMATION)" : "NEW BOOKING CONFIRMED",
    "",
    `Appointment date: ${appointmentDateLine}`,
    `Appointment time: ${appointmentTimeLine}`,
    squareStatus ? `Square status: ${squareStatus}` : null,
    isPending ? "Action: Accept/confirm this booking in Square Appointments to finalize." : null,
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
    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${mailerSendToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: { email: from },
        to: toList.map((email) => ({ email })),
        subject,
        text,
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");

      if (response.status === 401) {
        return {
          ok: false,
          error:
            `MailerSend API error (401 Unauthenticated). ` +
            `MAILERSEND_API_TOKEN is invalid/expired or not set in this environment. ` +
            `${body || response.statusText}`,
        };
      }

      if (response.status === 403) {
        return {
          ok: false,
          error:
            `MailerSend API error (403 Forbidden). ` +
            `The token may lack Email send permissions, or the sender domain isn't allowed. ` +
            `${body || response.statusText}`,
        };
      }

      return {
        ok: false,
        error: `MailerSend API error (${response.status}): ${body || response.statusText}`,
      };
    }

    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "MailerSend API request failed";
    return { ok: false, error: message };
  }
}
