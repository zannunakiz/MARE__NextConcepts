import { SignJWT, jwtVerify, type JWTPayload } from "jose"

export const roles = ["normal", "admin", "boss"] as const
export type Role = (typeof roles)[number]

export type SessionClaims = JWTPayload & {
  userId: number
  email: string
  role: Role
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "mare-learning-jwt-secret-change-me")
export const sessionCookie = "mare-jwt"

export async function signSession(claims: Omit<SessionClaims, "iat" | "exp">) {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret)
}

export async function verifySession(token: string): Promise<SessionClaims | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    if (typeof payload.userId !== "number" || typeof payload.email !== "string" || !roles.includes(payload.role as Role)) return null
    return payload as SessionClaims
  } catch {
    return null
  }
}

export function isRoleAllowed(role: Role, required: Role) {
  if (required === "normal") return true
  if (required === "admin") return role === "admin" || role === "boss"
  return role === "boss"
}
