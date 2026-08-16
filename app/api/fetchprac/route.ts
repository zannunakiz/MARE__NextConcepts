import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { randomUUID } from "node:crypto"
import { db } from "@/lib/db"
import { fetchprac } from "@/lib/db/schema"

type ApiError = { code: string; message: string; details?: { id?: number } }

function envelope<T>(requestId: string, data: T, meta: Record<string, unknown> = {}) {
  return { data, meta: { requestId, timestamp: new Date().toISOString(), ...meta }, error: null }
}

export async function GET(request: Request) {
  const requestId = randomUUID()
  const url = new URL(request.url)
  const rawId = url.searchParams.get("id")
  const id = Number(rawId)

  if (!rawId || !Number.isInteger(id) || id < 1) {
    const error: ApiError = { code: "INVALID_ID", message: "The id query parameter must be a positive integer." }
    return NextResponse.json({ data: null, meta: { requestId, timestamp: new Date().toISOString() }, error }, { status: 400 })
  }

  try {
    const [record] = await db.select().from(fetchprac).where(eq(fetchprac.id, id)).limit(1)
    if (!record) {
      const error: ApiError = { code: "RESOURCE_NOT_FOUND", message: "No fetch practice resource exists for this id.", details: { id } }
      return NextResponse.json({ data: null, meta: { requestId, timestamp: new Date().toISOString() }, error }, { status: 404 })
    }
    return NextResponse.json(envelope(requestId, { resource: record }, { status: 200, source: "neon" }))
  } catch {
    const error: ApiError = { code: "DATABASE_UNAVAILABLE", message: "The resource could not be loaded right now." }
    return NextResponse.json({ data: null, meta: { requestId, timestamp: new Date().toISOString() }, error }, { status: 503 })
  }
}
