import { createOpenAI } from "@ai-sdk/openai"
import { generateText } from "ai"
import { NextResponse } from "next/server"

const OPENROUTER_MODEL = "openrouter/free"
const openRouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: { "HTTP-Referer": "http://localhost:3000", "X-Title": "MARE Practice Studio" },
})
const openRouterModel = openRouter.chat(OPENROUTER_MODEL)
const MAX_MESSAGES = 24
const MAX_CHARS = 6000

const SYSTEM_PROMPT = `You are MARE's open-ended practice AI. Answer the user's request helpfully and directly. You may discuss any lawful topic, but do not claim to have taken actions you cannot take. Always return exactly one valid JSON object and nothing else. The JSON object must have exactly one property named "response" whose value is a plain string. Never use Markdown bold or italic syntax, never add code fences, never add extra keys, and never return arrays, numbers, booleans, or nested objects.`

type ChatInput = { role: "user" | "assistant"; content: string }

function isChatInput(value: unknown): value is ChatInput {
  if (!value || typeof value !== "object") return false
  const item = value as Record<string, unknown>
  return (item.role === "user" || item.role === "assistant") && typeof item.content === "string" && item.content.trim().length > 0 && item.content.length <= MAX_CHARS
}

function parseResponse(text: string) {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "")
  const parsed: unknown = JSON.parse(cleaned)
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid assistant response")
  const response = (parsed as Record<string, unknown>).response
  if (typeof response !== "string") throw new Error("Invalid assistant response")
  return response
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENROUTER_API_KEY) return NextResponse.json({ error: "OpenRouter is not configured." }, { status: 503 })
    const body = await request.json() as { messages?: unknown }
    if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > MAX_MESSAGES || !body.messages.every(isChatInput)) {
      return NextResponse.json({ error: "Please send a valid conversation." }, { status: 400 })
    }

    const { text } = await generateText({
      model: openRouterModel,
      system: SYSTEM_PROMPT,
      messages: body.messages,
      temperature: 0.7,
    })

    return NextResponse.json({ response: parseResponse(text) })
  } catch (error) {
    console.error("[v0] OpenRouter chat error:", error)
    return NextResponse.json({ error: "The AI could not complete that request. Please try again." }, { status: 502 })
  }
}
