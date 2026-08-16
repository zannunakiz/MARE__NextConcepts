import type { ChatResponse } from "@/types/chat"

const responses: ChatResponse[] = [
  { content: "That is a great question. Start by separating the data flow from the UI, then make each boundary explicit.", delayMs: 900 },
  { content: "A useful mental model is: render the current state, handle one event, then let the next state drive the interface.", delayMs: 1100 },
  { content: "Try inspecting the network tab and React state together. The fastest path to clarity is usually observing what changed.", delayMs: 800 },
]

export function getDummyResponse(index: number): ChatResponse {
  return responses[index % responses.length]
}
