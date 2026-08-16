"use client"

import { CardFrame } from "@/components/cards/card-frame"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"

const source = `"use client"

import * as React from "react"
import { toast } from "sonner"
import { Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CardFrame } from "@/components/cards/card-frame"


export function ProductCard() {
  const [added, setAdded] = React.useState(false)

  return (
    <CardFrame title="Product card" fileName="components/cards/card-product.tsx" source={source}>
      <Card className="h-full overflow-hidden">
        <div className="flex h-32 items-center justify-center bg-secondary">
          <Sparkles className="size-8 text-secondary-foreground" />
        </div>
        <CardContent className="flex items-start justify-between gap-3 pt-4">
          <div>
            <CardTitle className="font-serif text-lg">Ceramic pour-over set</CardTitle>
            <CardDescription>Handmade, matte finish</CardDescription>
          </div>
          <span className="font-serif text-lg">$68</span>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            variant={added ? "secondary" : "default"}
            onClick={() => {
              setAdded(true)
              toast.success("Added to cart")
            }}
          >
            {added ? "Added to cart" : "Add to cart"}
          </Button>
        </CardFooter>
      </Card>
    </CardFrame>
  )
}
`

export function ProductCard() {
  const [added, setAdded] = React.useState(false)

  return (
    <CardFrame title="Product card" fileName="components/cards/card-product.tsx" source={source}>
      <Card className="h-full overflow-hidden pt-0">
        <div className="flex h-32 items-center justify-center bg-secondary">
          <Sparkles className="size-8 text-secondary-foreground" />
        </div>
        <CardContent className="flex items-start justify-between gap-3 pt-4">
          <div>
            <CardTitle className="font-serif text-lg">Ceramic pour-over set</CardTitle>
            <CardDescription>Handmade, matte finish</CardDescription>
          </div>
          <span className="font-serif text-lg">$68</span>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            variant={added ? "secondary" : "default"}
            onClick={() => {
              setAdded(true)
              toast.success("Added to cart")
            }}
          >
            {added ? "Added to cart" : "Add to cart"}
          </Button>
        </CardFooter>
      </Card>
    </CardFrame>
  )
}
