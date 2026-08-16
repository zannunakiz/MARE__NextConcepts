import { getThemeCss, getThemePalette } from "@/lib/theme-practice"
import {
  buildChatReply,
  canAccessRole,
  formatCacheTimestamp,
  nextFetchStatus,
  shouldLazyRender,
  validatePracticeForm,
} from "@/lib/practice-logic"

describe("fetch practice logic", () => {
  it("starts loading from idle and resolves success", () => {
    expect(nextFetchStatus("idle", true)).toBe("loading")
    expect(nextFetchStatus("loading", true)).toBe("success")
  })

  it("resolves a failed request as error", () => {
    expect(nextFetchStatus("loading", false)).toBe("error")
  })
})

describe("form practice validation", () => {
  it("accepts valid values", () => {
    expect(validatePracticeForm({ name: "Ada", email: "ada@example.com", message: "A useful message" })).toEqual({})
  })

  it("reports each invalid field", () => {
    expect(validatePracticeForm({ name: "", email: "nope", message: "short" })).toEqual({
      name: "Name is required",
      email: "Enter a valid email",
      message: "Message must be at least 10 characters",
    })
  })
})

describe("lazy render logic", () => {
  it("renders only when a new card intersects", () => {
    expect(shouldLazyRender(true, false)).toBe(true)
    expect(shouldLazyRender(false, false)).toBe(false)
    expect(shouldLazyRender(true, true)).toBe(false)
  })
})

describe("cache and RBAC logic", () => {
  it("normalizes valid dates and rejects invalid dates", () => {
    expect(formatCacheTimestamp("2026-01-01T00:00:00.000Z")).toBe("2026-01-01T00:00:00.000Z")
    expect(formatCacheTimestamp(new Date("2026-01-01T00:00:00.000Z"))).toBe("2026-01-01T00:00:00.000Z")
    expect(formatCacheTimestamp("not-a-date")).toBe("Invalid date")
  })

  it("checks allowed roles exactly", () => {
    expect(canAccessRole("admin", ["admin", "editor"])).toBe(true)
    expect(canAccessRole("viewer", ["admin", "editor"])).toBe(false)
  })
})

describe("theming practice logic", () => {
  it("returns distinct light and dark palettes", () => {
    expect(getThemePalette("sage", "light").background).not.toBe(getThemePalette("sage", "dark").background)
  })

  it("generates copyable CSS variables for the selected theme", () => {
    const css = getThemeCss("ocean", "dark")
    expect(css).toContain("--background: #10171a;")
    expect(css).toContain("--primary: #6e9fb0;")
  })

  it("falls back safely for unknown theme ids", () => {
    expect(getThemePalette("unknown", "light").primary).toBe("#637d5b")
  })
})

describe("AI chat logic", () => {
  it("returns a safe empty-state prompt", () => {
    expect(buildChatReply("   ")).toBe("Ask a question to start the conversation.")
  })

  it("echoes a normalized question", () => {
    expect(buildChatReply("  How does caching work? ")).toBe("You asked: How does caching work?")
  })
})
