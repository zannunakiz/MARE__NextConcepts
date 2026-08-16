"use client"

import * as React from "react"
import { toast } from "sonner"
import { Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardFrame } from "@/components/cards/card-frame"

  const source = `"use client"

import * as React from "react"
import { toast } from "sonner"
import { Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardFrame } from "@/components/cards/card-frame"


const features = ["Unlimited projects", "Priority support", "Team collaboration"]

export function PricingCard() {
  const [selected, setSelected] = React.useState(false)

  return (
    <CardFrame title="Pricing card" fileName="components/cards/card-pricing.tsx" source={source}>
      <Card className="h-full border-primary/30 bg-primary text-primary-foreground">
        <CardHeader>
          <Badge variant="outline" className="w-fit border-primary-foreground/40 text-primary-foreground">
            Most popular
          </Badge>
          <CardTitle className="mt-3 font-serif text-2xl">Studio plan</CardTitle>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-4xl">$32</span>
            <span className="text-sm opacity-80">/month</span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm">
          {features.map((feature) => (
            <span key={feature} className="flex items-center gap-2">
              <Check className="size-4" /> {feature}
            </span>
          ))}
        </CardContent>
        <CardFooter>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setSelected(true)
              toast.success("Studio plan selected")
            }}
          >
            {selected ? "Selected" : "Choose plan"}
          </Button>
        </CardFooter>
      </Card>
    </CardFrame>
  )
}
`

const features = ["Unlimited projects", "Priority support", "Team collaboration"]

export function PricingCard() {
  const [selected, setSelected] = React.useState(false)

  return (
    <CardFrame title="Pricing card" fileName="components/cards/card-pricing.tsx" source={source}>
      <Card className="h-full border-primary/30 bg-primary text-primary-foreground">
        <CardHeader>
          <Badge variant="outline" className="w-fit border-primary-foreground/40 text-primary-foreground">
            Most popular
          </Badge>
          <CardTitle className="mt-3 font-serif text-2xl">Studio plan</CardTitle>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-4xl">$32</span>
            <span className="text-sm opacity-80">/month</span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm">
          {features.map((feature) => (
            <span key={feature} className="flex items-center gap-2">
              <Check className="size-4" /> {feature}
            </span>
          ))}
        </CardContent>
        <CardFooter>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setSelected(true)
              toast.success("Studio plan selected")
            }}
          >
            {selected ? "Selected" : "Choose plan"}
          </Button>
        </CardFooter>
      </Card>
    </CardFrame>
  )
}
