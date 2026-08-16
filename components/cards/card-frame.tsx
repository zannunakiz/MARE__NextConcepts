"use client"

import { CardSourceDialog } from "@/components/cards/card-source-dialog"
import { Button } from "@/components/ui/button"
import { Code2 } from "lucide-react"
import * as React from "react"

export function CardFrame({
  title,
  fileName,
  source,
  children,
}: {
  title: string
  fileName: string
  source: string
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="group relative h-full overflow-hidden rounded-xl ">
      {children}
      <Button
        variant="secondary"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label={`View source for ${title}`}
        className="absolute right-3 top-3 z-1 size-8 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
      >
        <Code2 className="size-4" />
      </Button>
      <CardSourceDialog open={open} onOpenChange={setOpen} title={title} fileName={fileName} source={source} />
    </div>
  )
}
