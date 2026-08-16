"use client"

import * as React from "react"
import { toast } from "sonner"
import { CheckCircle2, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CardFrame } from "@/components/cards/card-frame"

  const source = `"use client"

import * as React from "react"
import { toast } from "sonner"
import { CheckCircle2, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CardFrame } from "@/components/cards/card-frame"


export function StatusCard() {
  const [checking, setChecking] = React.useState(false)
  const [lastChecked, setLastChecked] = React.useState("3 minutes ago")

  const recheck = () => {
    setChecking(true)
    window.setTimeout(() => {
      setChecking(false)
      setLastChecked("just now")
      toast.success("All systems operational")
    }, 900)
  }

  return (
    <CardFrame title="Status card" fileName="components/cards/card-status.tsx" source={source}>
      <Card className="h-full border-primary/30">
        <CardContent className="flex items-start justify-between gap-3 pt-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="size-5 shrink-0 text-primary" />
            <div>
              <p className="font-serif text-lg leading-tight">All systems operational</p>
              <p className="mt-1 text-sm text-muted-foreground">Last checked {lastChecked}.</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={recheck} aria-label="Recheck status" disabled={checking}>
            <RefreshCw className={cn("size-4", checking && "animate-spin")} />
          </Button>
        </CardContent>
      </Card>
    </CardFrame>
  )
}
`

export function StatusCard() {
  const [checking, setChecking] = React.useState(false)
  const [lastChecked, setLastChecked] = React.useState("3 minutes ago")

  const recheck = () => {
    setChecking(true)
    window.setTimeout(() => {
      setChecking(false)
      setLastChecked("just now")
      toast.success("All systems operational")
    }, 900)
  }

  return (
    <CardFrame title="Status card" fileName="components/cards/card-status.tsx" source={source}>
      <Card className="h-full border-primary/30">
        <CardContent className="flex items-start justify-between gap-3 pt-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="size-5 shrink-0 text-primary" />
            <div>
              <p className="font-serif text-lg leading-tight">All systems operational</p>
              <p className="mt-1 text-sm text-muted-foreground">Last checked {lastChecked}.</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={recheck} aria-label="Recheck status" disabled={checking}>
            <RefreshCw className={cn("size-4", checking && "animate-spin")} />
          </Button>
        </CardContent>
      </Card>
    </CardFrame>
  )
}
