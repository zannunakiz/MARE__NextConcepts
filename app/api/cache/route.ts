import { db } from "@/lib/db"
import { items } from "@/lib/db/schema"
import { randomCatalogItem, randomPrice } from "@/lib/items"
import { sql } from "drizzle-orm"
import { revalidateTag, unstable_cache } from "next/cache"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

const ITEMS_CACHE_TAG = "mare-items"

type CachedItem = { id: number; name: string; description: string; price: number; createdAt: string }
const MAX_ITEMS_BEFORE_RESET = 10

const readCachedItems = unstable_cache(
  async (): Promise<CachedItem[]> => {
    const rows = await db.select().from(items).orderBy(items.createdAt)
    return rows.map((item) => ({ ...item, createdAt: item.createdAt.toISOString() }))
  },
  ["mare-items-read"],
  { tags: [ITEMS_CACHE_TAG], revalidate: 60 },
)

async function readItems() {
  const payload = await readCachedItems()
  return {
    items: payload,
    cache: "next" as const,
    count: payload.length,
  }
}

function responseMeta(statusCode: number, startedAt: number) {
  return {
    success: statusCode >= 200 && statusCode < 300,
    statusCode,
    timestamp: new Date().toISOString(),
    durationMs: Date.now() - startedAt,
  }
}

export async function GET() {
  const startedAt = Date.now()
  try {
    const payload = await readItems()
    return NextResponse.json({ ...payload, meta: responseMeta(200, startedAt) }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("[cache] read failed", error instanceof Error ? error.message : "unknown error")
    return NextResponse.json({ message: "Unable to read items.", meta: responseMeta(500, startedAt) }, { status: 500, headers: { "Cache-Control": "no-store" } })
  }
}

export async function POST() {
  const startedAt = Date.now()
  try {
    const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(items)
    const shouldReset = count >= MAX_ITEMS_BEFORE_RESET
    const template = randomCatalogItem()
    const created = await db.transaction(async (tx) => {
      if (shouldReset) await tx.delete(items)
      const [nextItem] = await tx.insert(items).values({ name: template.name, description: template.description, price: randomPrice() }).returning()
      return nextItem
    })
    revalidateTag(ITEMS_CACHE_TAG, "max")
    const message = shouldReset
      ? "Item limit reached. Resetted to avoid memory overload."
      : "1 new item was added successfully. Next.js cache invalidated."
    return NextResponse.json({ item: { ...created, createdAt: created.createdAt.toISOString() }, cleared: shouldReset, previousCount: count, currentCount: 1, invalidatedCache: true, cache: "next", message, meta: responseMeta(201, startedAt) }, { status: 201, headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("[cache] create failed", error instanceof Error ? error.message : "unknown error")
    return NextResponse.json({ message: "Unable to add item.", meta: responseMeta(500, startedAt) }, { status: 500, headers: { "Cache-Control": "no-store" } })
  }
}
