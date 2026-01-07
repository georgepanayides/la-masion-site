import { NextResponse } from "next/server";

import { treatments } from "@/app/data/Treatments";
import { getSquareClient } from "@/app/lib/square";
import type { Currency } from "square";

type CatalogObjectUpsert = {
  id?: string;
  type?: string;
  version?: number | string;
};

type CatalogIdMapping = {
  client_object_id?: string;
  object_id?: string;
};

type CatalogBatchUpsertResponse = {
  id_mappings?: CatalogIdMapping[];
  objects?: CatalogObjectUpsert[];
};

function requireAdmin(req: Request) {
  const expected = (process.env.SQUARE_ADMIN_SECRET ?? "").trim();
  if (!expected) {
    throw new Error("Missing required environment variable: SQUARE_ADMIN_SECRET");
  }
  const provided = (req.headers.get("x-admin-secret") ?? "").trim();
  if (!provided || provided !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return null;
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

async function resolveDefaultTeamMemberId(client: ReturnType<typeof getSquareClient>, locationId: string) {
  const configured = (process.env.SQUARE_DEFAULT_TEAM_MEMBER_ID ?? "").trim();
  if (configured) return configured;

  const profilesPage = await client.bookings.teamMemberProfiles.list({
    locationId,
    bookableOnly: true,
    limit: 100,
  });

  for await (const profile of profilesPage) {
    const id = profile.teamMemberId;
    if (id) return id;
  }

  throw new Error("No bookable team members found for this location");
}

function parseMinutes(durationLabel: string): number {
  const match = durationLabel.match(/(\d+)/);
  const minutes = match ? Number(match[1]) : NaN;
  if (!Number.isFinite(minutes) || minutes <= 0) {
    throw new Error(`Unable to parse minutes from duration: ${durationLabel}`);
  }
  return minutes;
}

function dollarsToCents(dollarsText: string): bigint {
  const num = Number(dollarsText);
  if (!Number.isFinite(num) || num <= 0) {
    throw new Error(`Invalid price: ${dollarsText}`);
  }
  return BigInt(Math.round(num * 100));
}

export async function POST(req: Request) {
  try {
    const unauthorized = requireAdmin(req);
    if (unauthorized) return unauthorized;

    const client = getSquareClient();
    const locationId = await resolveSquareLocationId(client);
    const teamMemberId = await resolveDefaultTeamMemberId(client, locationId);

    const token = (process.env.SQUARE_ACCESS_TOKEN ?? "").trim();
    if (!token) {
      throw new Error("Missing required environment variable: SQUARE_ACCESS_TOKEN");
    }

    const squareBaseUrl =
      (process.env.SQUARE_ENVIRONMENT ?? "sandbox").toLowerCase() === "production"
        ? "https://connect.squareup.com"
        : "https://connect.squareupsandbox.com";

    const rawCurrency = (process.env.SQUARE_CURRENCY ?? "AUD").toUpperCase();
    const currency: Currency = rawCurrency === "AUD" ? "AUD" : "AUD";

    // NOTE: The Catalog API payload uses snake_case. The Square SDK does not reliably
    // transform nested CatalogObject data keys for batch upsert, so this endpoint uses
    // a direct REST call to the Square Catalog API.
    const objects: Record<string, unknown>[] = [];

    for (const treatment of treatments) {
      const itemTempId = `#svc_${treatment.id}`;
      const variationTempId = `#var_${treatment.id}`;

      const minutes = parseMinutes(treatment.duration);
      const durationMs = minutes * 60 * 1000;
      const priceCents = Number(dollarsToCents(treatment.price));

      objects.push({
        id: itemTempId,
        type: "ITEM",
        item_data: {
          name: treatment.name,
          description: treatment.description,
          product_type: "APPOINTMENTS_SERVICE",
        },
      });

      objects.push({
        id: variationTempId,
        type: "ITEM_VARIATION",
        item_variation_data: {
          item_id: itemTempId,
          name: "Standard",
          pricing_type: "FIXED_PRICING",
          price_money: {
            amount: priceCents,
            currency,
          },
          service_duration: durationMs,
          available_for_booking: true,
          team_member_ids: [teamMemberId],
        },
      });
    }

    const upsertResponse = await fetch(`${squareBaseUrl}/v2/catalog/batch-upsert`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        idempotency_key: "la-masion-appointments-services-v1",
        batches: [{ objects }],
      }),
    });

    const upsertJson = (await upsertResponse.json()) as unknown;
    if (!upsertResponse.ok) {
      throw new Error(`Status code: ${upsertResponse.status}\nBody: ${JSON.stringify(upsertJson, null, 2)}`);
    }

    const parsed = upsertJson as CatalogBatchUpsertResponse;

    const idMappings = (parsed.id_mappings ?? []) as CatalogIdMapping[];
    const realIdByTemp = new Map<string, string>();
    for (const m of idMappings) {
      if (m.client_object_id && m.object_id) {
        realIdByTemp.set(m.client_object_id, m.object_id);
      }
    }

    const variationVersionById = new Map<string, string>();
    for (const obj of parsed.objects ?? []) {
      if (obj?.type !== "ITEM_VARIATION") continue;
      const id = obj.id;
      const version = obj.version;
      if (!id || version === undefined || version === null) continue;
      variationVersionById.set(id, String(version));
    }

    const mapping: Record<string, { variationId: string; variationVersion: string | null; itemId: string }> = {};
    for (const treatment of treatments) {
      const itemTempId = `#svc_${treatment.id}`;
      const variationTempId = `#var_${treatment.id}`;
      const itemId = realIdByTemp.get(itemTempId);
      const variationId = realIdByTemp.get(variationTempId);

      if (!itemId || !variationId) {
        continue;
      }

      mapping[treatment.id] = {
        itemId,
        variationId,
        variationVersion: variationVersionById.get(variationId) ?? null,
      };
    }

    return NextResponse.json(
      {
        ok: true,
        locationId,
        teamMemberId,
        currency,
        mapping,
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
