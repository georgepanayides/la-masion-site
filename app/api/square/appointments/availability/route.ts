import { NextResponse } from "next/server";
import { DateTime } from "luxon";

import { treatments } from "@/app/data/Treatments";
import { getSquareClient, resolveTeamMemberId } from "@/app/lib/square";

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

// resolveTeamMemberId moved to app/lib/square.ts

function parseMinutes(durationLabel: string): number {
  const match = durationLabel.match(/(\d+)/);
  const minutes = match ? Number(match[1]) : NaN;
  if (!Number.isFinite(minutes) || minutes <= 0) {
    throw new Error(`Unable to parse minutes from duration: ${durationLabel}`);
  }
  return minutes;
}

function parseTimeLabelToMinutes(label: string): number | null {
  const match = label.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  const hourRaw = Number(match[1]);
  const minute = Number(match[2]);
  const meridiem = match[3].toUpperCase();
  if (!Number.isFinite(hourRaw) || !Number.isFinite(minute)) return null;
  if (hourRaw < 1 || hourRaw > 12) return null;
  if (minute < 0 || minute > 59) return null;

  const hour = (hourRaw % 12) + (meridiem === "PM" ? 12 : 0);
  return hour * 60 + minute;
}

function timeSlotsForUi(): string[] {
  return [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = (searchParams.get("date") ?? "").trim();
    const serviceId = (searchParams.get("serviceId") ?? "").trim();

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ ok: false, error: "Missing or invalid date" }, { status: 400 });
    }
    if (!serviceId) {
      return NextResponse.json({ ok: false, error: "Missing serviceId" }, { status: 400 });
    }

    const treatment = treatments.find((t) => t.id === serviceId);
    if (!treatment) {
      return NextResponse.json({ ok: false, error: "Invalid serviceId" }, { status: 400 });
    }

    const client = getSquareClient();
    const locationId = await resolveSquareLocationId(client);
    const location = (await client.locations.list()).locations?.find((l) => l.id === locationId);
    const timezone = location?.timezone ?? "UTC";

    const teamMemberId = await resolveTeamMemberId(client, locationId);

    const dayStart = DateTime.fromFormat(date, "yyyy-MM-dd", { zone: timezone }).startOf("day");
    if (!dayStart.isValid) {
      return NextResponse.json({ ok: false, error: "Invalid date" }, { status: 400 });
    }

    const dayEnd = dayStart.plus({ days: 1 });

    const startAtMin = dayStart.toUTC().toISO({ suppressMilliseconds: true }) ?? "";
    const startAtMax = dayEnd.toUTC().toISO({ suppressMilliseconds: true }) ?? "";

    const page = await client.bookings.list({
      locationId,
      teamMemberId,
      startAtMin,
      startAtMax,
      limit: 200,
    });

    type Interval = { startMs: number; endMs: number; squareBookingId: string | null };
    const intervals: Interval[] = [];

    for await (const booking of page) {
      const startAt = booking.startAt;
      if (!startAt) continue;
      const start = DateTime.fromISO(startAt);
      if (!start.isValid) continue;

      const segments = booking.appointmentSegments ?? [];
      const relevantSegments = segments.filter((s) => s.teamMemberId === teamMemberId);
      const totalMinutes = relevantSegments.reduce((sum, s) => {
        const duration = s.durationMinutes ?? 0;
        const intermission = s.intermissionMinutes ?? 0;
        return sum + duration + intermission;
      }, 0);

      const transition = booking.transitionTimeMinutes ?? 0;
      const durationMinutes = totalMinutes + transition;
      if (durationMinutes <= 0) continue;

      const startMs = start.toMillis();
      const endMs = start.plus({ minutes: durationMinutes }).toMillis();

      intervals.push({ startMs, endMs, squareBookingId: booking.id ?? null });
    }

    const selectedDurationMinutes = parseMinutes(treatment.duration);

    const blockedTimes: string[] = [];
    for (const timeLabel of timeSlotsForUi()) {
      const slotMinutes = parseTimeLabelToMinutes(timeLabel);
      if (slotMinutes === null) continue;

      const slotStartLocal = dayStart.plus({ minutes: slotMinutes });
      const slotStartMs = slotStartLocal.toUTC().toMillis();
      const slotEndMs = slotStartLocal.plus({ minutes: selectedDurationMinutes }).toUTC().toMillis();

      const overlaps = intervals.some((b) => slotStartMs < b.endMs && slotEndMs > b.startMs);
      if (overlaps) blockedTimes.push(timeLabel);
    }

    return NextResponse.json(
      {
        ok: true,
        date,
        timezone,
        locationId,
        teamMemberId,
        blockedTimes,
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
