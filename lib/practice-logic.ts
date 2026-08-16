export type FetchStatus = "idle" | "loading" | "success" | "error"

export function nextFetchStatus(status: FetchStatus, ok: boolean): FetchStatus {
  if (status === "loading") return ok ? "success" : "error"
  return "loading"
}

export function validatePracticeForm(input: { name: string; email: string; message: string }) {
  const errors: Partial<Record<keyof typeof input, string>> = {}
  if (!input.name.trim()) errors.name = "Name is required"
  if (!/^\S+@\S+\.\S+$/.test(input.email.trim())) errors.email = "Enter a valid email"
  if (input.message.trim().length < 10) errors.message = "Message must be at least 10 characters"
  return errors
}

export function shouldLazyRender(isIntersecting: boolean, hasRendered: boolean) {
  return !hasRendered && isIntersecting
}

export function formatCacheTimestamp(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? "Invalid date" : date.toISOString()
}

export function canAccessRole(role: string, allowedRoles: readonly string[]) {
  return allowedRoles.includes(role)
}

export function buildChatReply(message: string) {
  const normalized = message.trim()
  if (!normalized) return "Ask a question to start the conversation."
  return `You asked: ${normalized}`
}
