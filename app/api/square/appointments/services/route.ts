import { NextResponse } from "next/server";

import { getSquareClient } from "@/app/lib/square";
import type { CatalogObject } from "square";

function toKeywords(input: string): string[] {
  const tokens = input
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);
  // Square only allows up to 3 keywords.
  return tokens.slice(0, 3);
}

type AppointmentServiceVariation = {
  itemId: string;
  itemName: string;
  itemProductType: string | null;
  variationId: string;
  variationName: string;
  variationVersion: string | null;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") ?? "").trim();
    const includeAll = (searchParams.get("all") ?? "").trim() === "1";

    const client = getSquareClient();

    const variations: AppointmentServiceVariation[] = [];
    let cursor: string | undefined;

    // Protect against runaway pagination in huge catalogs.
    for (let page = 0; page < 10; page++) {
      const response = await client.catalog.search({
        cursor,
        objectTypes: ["ITEM_VARIATION"],
        includeRelatedObjects: true,
        query: q
          ? {
              textQuery: {
                keywords: toKeywords(q),
              },
            }
          : undefined,
        limit: 200,
      });

      const objects = response.objects ?? [];
      const related = response.relatedObjects ?? [];

      const objectById = new Map<string, CatalogObject>();
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

        const itemProductType = (parentItem.itemData?.productType as string | undefined) ?? null;
        if (!includeAll && itemProductType !== "APPOINTMENTS_SERVICE") continue;

        const itemName = parentItem.itemData?.name ?? "";
        const variationName = obj.itemVariationData?.name ?? "";
        const variationVersion = typeof obj.version === "bigint" ? obj.version.toString() : null;

        variations.push({
          itemId,
          itemName,
          itemProductType,
          variationId: obj.id,
          variationName,
          variationVersion,
        });
      }

      cursor = response.cursor ?? undefined;
      if (!cursor) break;
    }

    return NextResponse.json(
      {
        ok: true,
        q: q || null,
        includeAll,
        count: variations.length,
        variations,
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
