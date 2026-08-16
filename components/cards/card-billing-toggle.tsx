"use client"

import { CardFrame } from "@/components/cards/card-frame"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import * as React from "react"

const source = `"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { CardFrame } from "@/components/cards/card-frame"


export function BillingToggleCard() {
  const [yearly, setYearly] = React.useState(true)

  return (
    <CardFrame title="Billing toggle card" fileName="components/cards/card-billing-toggle.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Billing cycle</CardTitle>
          <CardDescription>Switch between monthly and yearly pricing.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <span className="text-sm">{yearly ? "Billed yearly (save 20%)" : "Billed monthly"}</span>
          <Switch checked={yearly} onCheckedChange={setYearly} aria-label="Toggle billing cycle" />
        </CardContent>
        <CardFooter className="h-full mt-20">
          <span className="font-serif text-2xl transition-all">{yearly ? "$288/yr" : "$32/mo"}</span>
        </CardFooter>
      </Card>
    </CardFrame>
  )
}
`

export function BillingToggleCard() {
  const [yearly, setYearly] = React.useState(true)

  return (
    <CardFrame title="Billing toggle card" fileName="components/cards/card-billing-toggle.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Billing cycle</CardTitle>
          <CardDescription>Switch between monthly and yearly pricing.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <span className="text-sm">{yearly ? "Billed yearly (save 20%)" : "Billed monthly"}</span>
          <Switch checked={yearly} onCheckedChange={setYearly} aria-label="Toggle billing cycle" />
        </CardContent>
        <CardFooter className="h-full mt-20">
          <span className="font-serif text-2xl transition-all">{yearly ? "$288/yr" : "$32/mo"}</span>
        </CardFooter>
      </Card>
    </CardFrame>
  )
}
