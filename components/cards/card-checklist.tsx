"use client"

import * as React from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { CardFrame } from "@/components/cards/card-frame"

const initialItems = [
  { label: "Wireframe approved", done: true },
  { label: "Copy finalized", done: true },
  { label: "Assets exported", done: false },
]

  const source = `"use client"

import * as React from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { CardFrame } from "@/components/cards/card-frame"

const initialItems = [
  { label: "Wireframe approved", done: true },
  { label: "Copy finalized", done: true },
  { label: "Assets exported", done: false },
]


export function ChecklistCard() {
  const [items, setItems] = React.useState(initialItems)
  const progress = (items.filter((item) => item.done).length / items.length) * 100

  const toggle = (index: number, checked: boolean) => {
    setItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, done: checked } : item)))
    if (checked) toast.success("Nice, one step closer to launch")
  }

  return (
    <CardFrame title="Checklist card" fileName="components/cards/card-checklist.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Launch checklist</CardTitle>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {items.map((item, index) => (
            <label key={item.label} className="flex items-center gap-2.5 text-sm">
              <Checkbox checked={item.done} onCheckedChange={(checked) => toggle(index, checked === true)} />
              <span className={item.done ? "text-muted-foreground line-through" : ""}>{item.label}</span>
            </label>
          ))}
        </CardContent>
      </Card>
    </CardFrame>
  )
}
`

export function ChecklistCard() {
  const [items, setItems] = React.useState(initialItems)
  const progress = (items.filter((item) => item.done).length / items.length) * 100

  const toggle = (index: number, checked: boolean) => {
    setItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, done: checked } : item)))
    if (checked) toast.success("Nice, one step closer to launch")
  }

  return (
    <CardFrame title="Checklist card" fileName="components/cards/card-checklist.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Launch checklist</CardTitle>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {items.map((item, index) => (
            <label key={item.label} className="flex items-center gap-2.5 text-sm">
              <Checkbox checked={item.done} onCheckedChange={(checked) => toggle(index, checked === true)} />
              <span className={item.done ? "text-muted-foreground line-through" : ""}>{item.label}</span>
            </label>
          ))}
        </CardContent>
      </Card>
    </CardFrame>
  )
}
