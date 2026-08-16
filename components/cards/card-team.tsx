"use client"

import { CardFrame } from "@/components/cards/card-frame"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

const source = `"use client"

import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CardFrame } from "@/components/cards/card-frame"


const initials = ["AK", "RS", "MT", "JD"]

export function TeamCard() {
  return (
    <CardFrame title="Team card" fileName="components/cards/card-team.tsx" source={source}>
      <Card className="h-full pb-0">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Design guild</CardTitle>
          <CardDescription>6 members collaborating this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex -space-x-3">
            {initials.map((initial) => (
              <Avatar key={initial} className="size-10 border-2 border-card">
                <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">{initial}</AvatarFallback>
              </Avatar>
            ))}
            <div className="flex size-10 items-center justify-center rounded-full border-2 border-card bg-muted text-xs text-muted-foreground">
              +2
            </div>
          </div>
        </CardContent>
        <CardFooter className="h-full">
          <Button variant="ghost" className="w-full" onClick={() => toast("Opening design guild workspace")}>
            View team
          </Button>
        </CardFooter>
      </Card>
    </CardFrame>
  )
}
`

const initials = ["AK", "RS", "MT", "JD"]

export function TeamCard() {
  return (
    <CardFrame title="Team card" fileName="components/cards/card-team.tsx" source={source}>
      <Card className="h-full pb-0">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Design guild</CardTitle>
          <CardDescription>6 members collaborating this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex -space-x-3">
            {initials.map((initial) => (
              <Avatar key={initial} className="size-10 border-2 border-card">
                <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">{initial}</AvatarFallback>
              </Avatar>
            ))}
            <div className="flex size-10 items-center justify-center rounded-full border-2 border-card bg-muted text-xs text-muted-foreground">
              +2
            </div>
          </div>
        </CardContent>
        <CardFooter className="h-full">
          <Button variant="ghost" className="w-full" onClick={() => toast("Opening design guild workspace")}>
            View team
          </Button>
        </CardFooter>
      </Card>
    </CardFrame>
  )
}
