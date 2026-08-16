export type ChatRole = "user" | "assistant"

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  createdAt: string
}

export type ChatStatus = "idle" | "typing"

export type ChatResponse = {
  content: string
  delayMs: number
}
