"use client"

import { useState } from "react"
import { ArrowUp, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type ChatInputProps = { disabled?: boolean; onSend: (value: string) => void }

export function ChatInput({ disabled, onSend }: ChatInputProps) {
  const [value, setValue] = useState("")
  const submit = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue("")
  }
  return <div className="border-t bg-background/90 p-3 backdrop-blur sm:p-4"><div className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border bg-card p-2 shadow-sm"><Textarea value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); submit() } }} placeholder="Ask a question about Next.js..." disabled={disabled} className="min-h-12 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0" aria-label="Message" /><Button type="button" size="icon" onClick={submit} disabled={disabled || !value.trim()} aria-label="Send message">{disabled ? <Loader2 className="animate-spin" /> : <ArrowUp />}</Button></div><p className="mx-auto mt-2 max-w-3xl text-center text-xs text-muted-foreground">OpenRouter free model. Shift + Enter for a new line.</p></div>
}
