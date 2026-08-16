"use client"

import * as React from "react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CardFrame } from "@/components/cards/card-frame"

  const source = `"use client"

import * as React from "react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CardFrame } from "@/components/cards/card-frame"


export function GoalCard() {
  const [read, setRead] = React.useState(18)
  const goal = 24
  const percent = Math.min(100, Math.round((read / goal) * 100))

  return (
    <CardFrame title="Goal card" fileName="components/cards/card-goal.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Reading goal</CardTitle>
          <CardDescription>
            {read} of {goal} books this year
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3 py-4">
          <div
            className="relative flex size-28 items-center justify-center rounded-full transition-[background] duration-500"
            style={{ background: \`conic-gradient(var(--primary) \${percent * 3.6}deg, var(--muted) 0deg)\` }}
          >
            <div className="flex size-20 items-center justify-center rounded-full bg-card font-serif text-2xl">
              {percent}%
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            disabled={read >= goal}
            onClick={() => {
              setRead((value) => Math.min(goal, value + 1))
              if (read + 1 >= goal) toast.success("Reading goal complete")
              else toast("Book logged")
            }}
          >
            {read >= goal ? "Goal complete" : "Log a book"}
          </Button>
        </CardContent>
      </Card>
    </CardFrame>
  )
}
`

export function GoalCard() {
  const [read, setRead] = React.useState(18)
  const goal = 24
  const percent = Math.min(100, Math.round((read / goal) * 100))

  return (
    <CardFrame title="Goal card" fileName="components/cards/card-goal.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Reading goal</CardTitle>
          <CardDescription>
            {read} of {goal} books this year
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3 py-4">
          <div
            className="relative flex size-28 items-center justify-center rounded-full transition-[background] duration-500"
            style={{ background: `conic-gradient(var(--primary) ${percent * 3.6}deg, var(--muted) 0deg)` }}
          >
            <div className="flex size-20 items-center justify-center rounded-full bg-card font-serif text-2xl">
              {percent}%
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            disabled={read >= goal}
            onClick={() => {
              setRead((value) => Math.min(goal, value + 1))
              if (read + 1 >= goal) toast.success("Reading goal complete")
              else toast("Book logged")
            }}
          >
            {read >= goal ? "Goal complete" : "Log a book"}
          </Button>
        </CardContent>
      </Card>
    </CardFrame>
  )
}
