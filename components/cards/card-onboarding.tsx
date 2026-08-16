"use client"

import { CardFrame } from "@/components/cards/card-frame"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"

const steps = ["Create workspace", "Invite your team", "Connect a project"]

const source = `"use client"

import * as React from "react"
import { toast } from "sonner"
import { CheckCircle2, Circle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CardFrame } from "@/components/cards/card-frame"

const steps = ["Create workspace", "Invite your team", "Connect a project"]


export function OnboardingCard() {
  const [completed, setCompleted] = React.useState(1)
  const finished = completed >= steps.length

  return (
    <CardFrame title="Onboarding card" fileName="components/cards/card-onboarding.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Getting started</CardTitle>
          <CardDescription>
            {finished ? "All set" : \`Step \${completed + 1} of \${steps.length}\`}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-3 text-sm">
              {index < completed ? (
                <CheckCircle2 className="size-4 text-primary" />
              ) : (
                <Circle className="size-4 text-muted-foreground" />
              )}
              <span className={index < completed ? "text-muted-foreground line-through" : ""}>{step}</span>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            disabled={finished}
            onClick={() => {
              const next = Math.min(steps.length, completed + 1)
              setCompleted(next)
              if (next >= steps.length) toast.success("Onboarding complete")
            }}
          >
            {finished ? "Completed" : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </CardFrame>
  )
}
`

export function OnboardingCard() {
  const [completed, setCompleted] = React.useState(1)
  const finished = completed >= steps.length

  return (
    <CardFrame title="Onboarding card" fileName="components/cards/card-onboarding.tsx" source={source}>
      <Card className="h-full pb-0">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Getting started</CardTitle>
          <CardDescription>
            {finished ? "All set" : `Step ${completed + 1} of ${steps.length}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-3 text-sm">
              {index < completed ? (
                <CheckCircle2 className="size-4 text-primary" />
              ) : (
                <Circle className="size-4 text-muted-foreground" />
              )}
              <span className={index < completed ? "text-muted-foreground line-through" : ""}>{step}</span>
            </div>
          ))}
        </CardContent>
        <CardFooter className="h-full">
          <Button
            variant="outline"
            className="w-full"
            disabled={finished}
            onClick={() => {
              const next = Math.min(steps.length, completed + 1)
              setCompleted(next)
              if (next >= steps.length) toast.success("Onboarding complete")
            }}
          >
            {finished ? "Completed" : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </CardFrame>
  )
}
