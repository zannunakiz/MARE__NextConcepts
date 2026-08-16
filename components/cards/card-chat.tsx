"use client"

import * as React from "react"
import { Paperclip, Send } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardFrame } from "@/components/cards/card-frame"

type Message = { from: "them" | "me"; text: string }

  const source = `"use client"

import * as React from "react"
import { Paperclip, Send } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardFrame } from "@/components/cards/card-frame"

type Message = { from: "them" | "me"; text: string }


const initialMessages: Message[] = [
  { from: "them", text: "Can we push the review to tomorrow?" },
  { from: "me", text: "Sure, morning works for me." },
]

export function ChatCard() {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages)
  const [draft, setDraft] = React.useState("")

  const send = () => {
    if (!draft.trim()) return
    setMessages((current) => [...current, { from: "me", text: draft }])
    setDraft("")
  }

  return (
    <CardFrame title="Chat card" fileName="components/cards/card-chat.tsx" source={source}>
      <Card className="flex h-full flex-col">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Direct message</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-2 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.from === "me"
                  ? "ml-auto max-w-[80%] rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
                  : "max-w-[80%] rounded-lg bg-muted px-3 py-2 text-sm"
              }
            >
              {message.text}
            </div>
          ))}
        </CardContent>
        <CardFooter className="gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-md border pl-3">
            <Paperclip className="size-4 shrink-0 text-muted-foreground" />
            <Input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.nativeEvent.isComposing) send()
              }}
              placeholder="Write a reply"
              className="h-9 border-0 px-0 shadow-none focus-visible:ring-0"
            />
          </div>
          <Button size="icon" aria-label="Send message" onClick={send}>
            <Send />
          </Button>
        </CardFooter>
      </Card>
    </CardFrame>
  )
}
`

const initialMessages: Message[] = [
  { from: "them", text: "Can we push the review to tomorrow?" },
  { from: "me", text: "Sure, morning works for me." },
]

export function ChatCard() {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages)
  const [draft, setDraft] = React.useState("")

  const send = () => {
    if (!draft.trim()) return
    setMessages((current) => [...current, { from: "me", text: draft }])
    setDraft("")
  }

  return (
    <CardFrame title="Chat card" fileName="components/cards/card-chat.tsx" source={source}>
      <Card className="flex h-full flex-col">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Direct message</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-2 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.from === "me"
                  ? "ml-auto max-w-[80%] rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
                  : "max-w-[80%] rounded-lg bg-muted px-3 py-2 text-sm"
              }
            >
              {message.text}
            </div>
          ))}
        </CardContent>
        <CardFooter className="gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-md border pl-3">
            <Paperclip className="size-4 shrink-0 text-muted-foreground" />
            <Input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.nativeEvent.isComposing) send()
              }}
              placeholder="Write a reply"
              className="h-9 border-0 px-0 shadow-none focus-visible:ring-0"
            />
          </div>
          <Button size="icon" aria-label="Send message" onClick={send}>
            <Send />
          </Button>
        </CardFooter>
      </Card>
    </CardFrame>
  )
}
