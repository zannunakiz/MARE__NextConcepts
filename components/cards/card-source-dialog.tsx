"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { CopyButton } from "@/components/cards/copy-button"

export function CardSourceDialog({
  open,
  onOpenChange,
  title,
  fileName,
  source,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  fileName: string
  source: string
}) {
  const fullSource = source

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[min(90dvh,56rem)] max-h-[calc(100dvh-1rem)] !w-[calc(100vw-1rem)] !max-w-5xl flex-col gap-3 overflow-hidden bg-background p-4 shadow-2xl sm:!w-[calc(100vw-2rem)] sm:p-6">
        <DialogHeader className="shrink-0 pr-10">
          <DialogTitle className="font-serif text-xl">{title}</DialogTitle>
          <DialogDescription className="truncate font-mono text-xs">{fileName} · ready-to-use component source</DialogDescription>
        </DialogHeader>
        <div className="relative min-h-0 min-w-0 flex-1">
          <ScrollArea className="h-full w-full rounded-md border border-border bg-muted text-foreground shadow-inner">
            <pre className="w-max min-w-full whitespace-pre p-3 pr-16 font-mono text-[10px] leading-5 sm:p-4 sm:pr-20 sm:text-xs sm:leading-6">
              <code>{fullSource}</code>
            </pre>
            <ScrollBar orientation="horizontal" />
            <ScrollBar orientation="vertical" />
          </ScrollArea>
          <CopyButton value={fullSource} className="absolute right-2 top-2" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
