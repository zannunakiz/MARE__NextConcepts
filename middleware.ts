import { NextResponse, type NextRequest } from "next/server"
import { sessionCookie, verifySession } from "@/lib/jwt-rbac"

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api/jwt-rbac")) return NextResponse.next()
  if (request.method === "POST" && ["login", "signup"].includes(request.nextUrl.searchParams.get("action") ?? "login")) return NextResponse.next()
  const token = request.cookies.get(sessionCookie)?.value
  if (!token || !(await verifySession(token))) return NextResponse.json({ data: null, error: { code: "UNAUTHENTICATED", message: "Sign in to continue." }, meta: { status: 401 } }, { status: 401 })
  return NextResponse.next()
}

export const config = { matcher: ["/api/jwt-rbac/:path*"] }
