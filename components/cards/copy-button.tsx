"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CopyButton({ value, label = "Copy code", className }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      toast.success("Copied to clipboard")
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      toast.error("Copy failed, try again")
    }
  }, [value])

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleCopy}
      aria-label={label}
      className={cn("gap-1.5", className)}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  )
}
