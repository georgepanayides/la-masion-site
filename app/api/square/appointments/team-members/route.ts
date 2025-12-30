import { NextResponse } from "next/server";

import { getSquareClient } from "@/app/lib/square";

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

export async function GET() {
  try {
    const client = getSquareClient();
    const locationId = await resolveSquareLocationId(client);

    const profilesPage = await client.bookings.teamMemberProfiles.list({
      locationId,
      bookableOnly: true,
      limit: 100,
    });

    const teamMembers: Array<{ teamMemberId: string; displayName: string; isBookable: boolean }> = [];
    for await (const profile of profilesPage) {
      if (!profile.teamMemberId) continue;
      teamMembers.push({
        teamMemberId: profile.teamMemberId,
        displayName: profile.displayName ?? "",
        isBookable: Boolean(profile.isBookable),
      });
    }

    return NextResponse.json(
      {
        ok: true,
        locationId,
        teamMembers,
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
