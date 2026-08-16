"use client"

import * as React from "react"
import { toast } from "sonner"
import { Cloud, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CardFrame } from "@/components/cards/card-frame"

  const source = `"use client"

import * as React from "react"
import { toast } from "sonner"
import { Cloud, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CardFrame } from "@/components/cards/card-frame"


export function EmptyStateCard() {
  const [connecting, setConnecting] = React.useState(false)

  const connect = () => {
    setConnecting(true)
    window.setTimeout(() => {
      setConnecting(false)
      toast.success("Repository connected")
    }, 1200)
  }

  return (
    <CardFrame title="Empty state card" fileName="components/cards/card-empty-state.tsx" source={source}>
      <Card className="h-full items-center">
        <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
          <Cloud className="size-8 text-muted-foreground" />
          <div>
            <p className="font-serif text-lg">No deployments yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Connect a repository to see activity here.</p>
          </div>
          <Button variant="outline" size="sm" onClick={connect} disabled={connecting} className="gap-2">
            {connecting && <Loader2 className="size-3.5 animate-spin" />}
            {connecting ? "Connecting" : "Connect repository"}
          </Button>
        </CardContent>
      </Card>
    </CardFrame>
  )
}
`

export function EmptyStateCard() {
  const [connecting, setConnecting] = React.useState(false)

  const connect = () => {
    setConnecting(true)
    window.setTimeout(() => {
      setConnecting(false)
      toast.success("Repository connected")
    }, 1200)
  }

  return (
    <CardFrame title="Empty state card" fileName="components/cards/card-empty-state.tsx" source={source}>
      <Card className="h-full items-center">
        <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
          <Cloud className="size-8 text-muted-foreground" />
          <div>
            <p className="font-serif text-lg">No deployments yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Connect a repository to see activity here.</p>
          </div>
          <Button variant="outline" size="sm" onClick={connect} disabled={connecting} className="gap-2">
            {connecting && <Loader2 className="size-3.5 animate-spin" />}
            {connecting ? "Connecting" : "Connect repository"}
          </Button>
        </CardContent>
      </Card>
    </CardFrame>
  )
}
