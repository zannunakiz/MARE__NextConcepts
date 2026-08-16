"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardFrame } from "@/components/cards/card-frame"

const ranges = {
  "7d": { total: "12,480", delta: "8.2%", bars: [40, 65, 50, 80, 60, 90, 72] },
  "30d": { total: "48,910", delta: "14.6%", bars: [55, 60, 45, 70, 85, 65, 95] },
} as const

  const source = `"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardFrame } from "@/components/cards/card-frame"

const ranges = {
  "7d": { total: "12,480", delta: "8.2%", bars: [40, 65, 50, 80, 60, 90, 72] },
  "30d": { total: "48,910", delta: "14.6%", bars: [55, 60, 45, 70, 85, 65, 95] },
} as const


export function StatCard() {
  const [range, setRange] = React.useState<"7d" | "30d">("7d")
  const data = ranges[range]

  return (
    <CardFrame title="Stat card" fileName="components/cards/card-stat.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center justify-between gap-2 pr-9">
            <CardDescription>Weekly active sessions</CardDescription>
            <div className="flex gap-1 rounded-full bg-muted p-0.5 text-xs">
              {(["7d", "30d"] as const).map((value) => (
                <button
                  key={value}
                  onClick={() => setRange(value)}
                  className={\`rounded-full px-2 py-0.5 transition-colors \${
                    range === value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                  }\`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <CardTitle className="font-serif text-4xl">{data.total}</CardTitle>
            <span className="flex items-center gap-1 text-sm text-primary">
              <ArrowUpRight className="size-4" /> {data.delta}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex h-16 items-end gap-1.5">
            {data.bars.map((value, index) => (
              <span
                key={index}
                className="flex-1 rounded-t-sm bg-primary/70 transition-all duration-500"
                style={{ height: \`\${value}%\` }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </CardFrame>
  )
}
`

export function StatCard() {
  const [range, setRange] = React.useState<"7d" | "30d">("7d")
  const data = ranges[range]

  return (
    <CardFrame title="Stat card" fileName="components/cards/card-stat.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center justify-between gap-2 pr-9">
            <CardDescription>Weekly active sessions</CardDescription>
            <div className="flex gap-1 rounded-full bg-muted p-0.5 text-xs">
              {(["7d", "30d"] as const).map((value) => (
                <button
                  key={value}
                  onClick={() => setRange(value)}
                  className={`rounded-full px-2 py-0.5 transition-colors ${
                    range === value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <CardTitle className="font-serif text-4xl">{data.total}</CardTitle>
            <span className="flex items-center gap-1 text-sm text-primary">
              <ArrowUpRight className="size-4" /> {data.delta}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex h-16 items-end gap-1.5">
            {data.bars.map((value, index) => (
              <span
                key={index}
                className="flex-1 rounded-t-sm bg-primary/70 transition-all duration-500"
                style={{ height: `${value}%` }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </CardFrame>
  )
}
