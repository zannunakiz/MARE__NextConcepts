"use client"

import { CardFrame } from "@/components/cards/card-frame"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"

const source = `"use client"

import * as React from "react"
import { toast } from "sonner"
import { MapPin } from "lucide-react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CardFrame } from "@/components/cards/card-frame"


export function EventCard() {
  const [saved, setSaved] = React.useState(false)

  return (
    <CardFrame title="Event card" fileName="components/cards/card-event.tsx" source={source}>
      <Card className="h-full overflow-hidden py-0">
        <div className="flex h-full">
          <div className="flex w-20 shrink-0 flex-col items-center justify-center gap-0.5 border-r bg-secondary py-6 text-secondary-foreground">
            <span className="font-mono text-xs uppercase tracking-widest">May</span>
            <span className="font-serif text-3xl">28</span>
          </div>
          <CardContent className="flex flex-1 flex-col justify-center gap-2 p-5">
            <CardTitle className="font-serif text-lg">Design systems workshop</CardTitle>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5" /> Studio B, 10:00 AM
            </span>
            <Button
              size="sm"
              variant={saved ? "default" : "outline"}
              className="mt-1 w-fit"
              onClick={() => {
                setSaved((value) => !value)
                toast.success(saved ? "Removed from your schedule" : "Added to your schedule")
              }}
            >
              {saved ? "Saved" : "Save spot"}
            </Button>
          </CardContent>
        </div>
      </Card>
    </CardFrame>
  )
}
`

export function EventCard() {
  const [saved, setSaved] = React.useState(false)

  return (
    <CardFrame title="Event card" fileName="components/cards/card-event.tsx" source={source}>
      <Card className="h-full overflow-hidden py-0">
        <div className="flex h-full">
          <div className="flex w-20 shrink-0 flex-col items-center justify-center gap-0.5 border-r bg-secondary py-6 text-secondary-foreground">
            <span className="font-mono text-xs uppercase tracking-widest">May</span>
            <span className="font-serif text-3xl">28</span>
          </div>
          <CardContent className="flex flex-1 flex-col justify-center gap-2 p-5">
            <CardTitle className="font-serif text-lg">Design systems workshop</CardTitle>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5" /> Studio B, 10:00 AM
            </span>
            <Button
              size="sm"
              variant={saved ? "default" : "outline"}
              className="mt-1 w-fit"
              onClick={() => {
                setSaved((value) => !value)
                toast.success(saved ? "Removed from your schedule" : "Added to your schedule")
              }}
            >
              {saved ? "Saved" : "Save spot"}
            </Button>
          </CardContent>
        </div>
      </Card>
    </CardFrame>
  )
}
