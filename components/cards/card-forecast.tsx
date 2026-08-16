"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardFrame } from "@/components/cards/card-frame"

const days = [
  { day: "Mon", value: -2 },
  { day: "Tue", value: 5 },
  { day: "Wed", value: 8 },
  { day: "Thu", value: 3 },
]

  const source = `"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardFrame } from "@/components/cards/card-frame"

const days = [
  { day: "Mon", value: -2 },
  { day: "Tue", value: 5 },
  { day: "Wed", value: 8 },
  { day: "Thu", value: 3 },
]


export function ForecastCard() {
  return (
    <CardFrame title="Forecast card" fileName="components/cards/card-forecast.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Revenue forecast</CardTitle>
          <CardDescription>Compared to last quarter</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {days.map((item) => (
            <div key={item.day} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{item.day}</span>
              <span className={\`flex items-center gap-1 \${item.value >= 0 ? "text-primary" : "text-destructive"}\`}>
                {item.value >= 0 ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                {Math.abs(item.value)}%
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </CardFrame>
  )
}
`

export function ForecastCard() {
  return (
    <CardFrame title="Forecast card" fileName="components/cards/card-forecast.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Revenue forecast</CardTitle>
          <CardDescription>Compared to last quarter</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {days.map((item) => (
            <div key={item.day} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{item.day}</span>
              <span className={`flex items-center gap-1 ${item.value >= 0 ? "text-primary" : "text-destructive"}`}>
                {item.value >= 0 ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                {Math.abs(item.value)}%
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </CardFrame>
  )
}
