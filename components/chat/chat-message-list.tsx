"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import type { ChatMessage } from "@/types/chat"
import { Bot, User } from "lucide-react"
import { useEffect, useRef } from "react"

type ChatMessageListProps = {
  messages: ChatMessage[]
  isTyping: boolean
}

export function ChatMessageList({ messages, isTyping }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollViewport = bottomRef.current?.closest('[data-slot="scroll-area-viewport"]')
    if (scrollViewport) {
      scrollViewport.scrollTo({ top: scrollViewport.scrollHeight, behavior: "smooth" })
    }
  }, [messages, isTyping])

  return (
    <ScrollArea className="min-h-0 flex-1 px-4 sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-5 py-4 sm:py-5">
        {messages.map((message) => {
          const isUser = message.role === "user"
          return (
            <div key={message.id} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
              {!isUser && <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Bot /></div>}
              <div className={`max-w-[min(85%,42rem)] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${isUser ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm border bg-card"}`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              {isUser && <div className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-muted"><User /></div>}
            </div>
          )
        })}
        {isTyping && <div className="flex items-center gap-3"><div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"><Bot /></div><div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border bg-card px-4 py-3"><Skeleton className="size-2 rounded-full" /><Skeleton className="size-2 rounded-full" /><Skeleton className="size-2 rounded-full" /></div></div>}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}
