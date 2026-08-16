import { compare, hash } from "bcryptjs"
import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"
import { jwtrbacusers } from "@/lib/db/schema"
import { isRoleAllowed, roles, sessionCookie, signSession, verifySession, type Role } from "@/lib/jwt-rbac"

const credentialsSchema = z.object({ email: z.string().trim().email().max(254), password: z.string().min(8).max(128) })
const roleSchema = z.object({ role: z.enum(roles) })
const accessSchema = z.object({ requiredRole: z.enum(roles) })

function envelope<T>(data: T, status = 200, error?: { code: string; message: string }) {
  return NextResponse.json({ data: error ? null : data, error: error ?? null, meta: { status, timestamp: new Date().toISOString() } }, { status, headers: { "Cache-Control": "no-store" } })
}

async function currentSession(request: Request) {
  const token = request.headers.get("cookie")?.match(new RegExp(`${sessionCookie}=([^;]+)`))?.[1]
  return token ? verifySession(token) : null
}

export async function POST(request: Request) {
  const action = new URL(request.url).searchParams.get("action") ?? "login"
  try {
    const input = credentialsSchema.parse(await request.json())
    if (action === "signup") {
      const existing = await db.select({ id: jwtrbacusers.id }).from(jwtrbacusers).where(eq(jwtrbacusers.email, input.email)).limit(1)
      if (existing.length) return envelope(null, 409, { code: "EMAIL_EXISTS", message: "An account with this email already exists." })
      const [user] = await db.insert(jwtrbacusers).values({ email: input.email, hashedPassword: await hash(input.password, 12), role: "normal" }).returning({ id: jwtrbacusers.id, email: jwtrbacusers.email, role: jwtrbacusers.role })
      const token = await signSession({ userId: user.id, email: user.email, role: user.role as Role })
      const response = envelope({ user })
      response.cookies.set(sessionCookie, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 7200, path: "/" })
      return response
    }
    const [user] = await db.select().from(jwtrbacusers).where(eq(jwtrbacusers.email, input.email)).limit(1)
    if (!user || !(await compare(input.password, user.hashedPassword))) return envelope(null, 401, { code: "INVALID_CREDENTIALS", message: "Email or password is incorrect." })
    const token = await signSession({ userId: user.id, email: user.email, role: user.role as Role })
    const response = envelope({ user: { id: user.id, email: user.email, role: user.role } })
    response.cookies.set(sessionCookie, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 7200, path: "/" })
    return response
  } catch (error) {
    return envelope(null, 400, { code: "INVALID_REQUEST", message: error instanceof z.ZodError ? "Please provide a valid email and password." : "Unable to complete authentication." })
  }
}

export async function GET(request: Request) {
  const session = await currentSession(request)
  return session ? envelope({ user: session }) : envelope(null, 401, { code: "UNAUTHENTICATED", message: "Sign in to continue." })
}

export async function PATCH(request: Request) {
  const session = await currentSession(request)
  if (!session) return envelope(null, 401, { code: "UNAUTHENTICATED", message: "Sign in to change your role." })
  try {
    const { role } = roleSchema.parse(await request.json())
    const [user] = await db.update(jwtrbacusers).set({ role }).where(and(eq(jwtrbacusers.id, session.userId), eq(jwtrbacusers.email, session.email))).returning({ id: jwtrbacusers.id, email: jwtrbacusers.email, role: jwtrbacusers.role })
    const token = await signSession({ userId: user.id, email: user.email, role: user.role as Role })
    const response = envelope({ user })
    response.cookies.set(sessionCookie, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 7200, path: "/" })
    return response
  } catch { return envelope(null, 400, { code: "INVALID_ROLE", message: "Choose a valid role." }) }
}

export async function DELETE() {
  const response = envelope({ loggedOut: true })
  response.cookies.set(sessionCookie, "", { httpOnly: true, expires: new Date(0), path: "/" })
  return response
}

export async function PUT(request: Request) {
  const session = await currentSession(request)
  if (!session) return envelope(null, 401, { code: "UNAUTHENTICATED", message: "Sign in to check access." })
  try {
    const { requiredRole } = accessSchema.parse(await request.json())
    const granted = isRoleAllowed(session.role, requiredRole)
    return envelope({ granted, requiredRole, currentRole: session.role, message: granted ? "Access granted." : "Access forbidden." }, granted ? 200 : 403, granted ? undefined : { code: "FORBIDDEN", message: "Your role does not meet this access requirement." })
  } catch { return envelope(null, 400, { code: "INVALID_ACCESS_REQUEST", message: "Choose a valid access level." }) }
}
