import { NextResponse } from "next/server";

import { getSquareClient } from "@/app/lib/square";

export async function GET() {
  try {
    const client = getSquareClient();
    const response = await client.locations.list();

    return NextResponse.json(
      {
        ok: true,
        environment: (process.env.SQUARE_ENVIRONMENT ?? "sandbox").toLowerCase(),
        locations: response.locations ?? [],
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 },
    );
  }
}
