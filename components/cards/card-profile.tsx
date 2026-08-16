"use client"

import * as React from "react"
import { toast } from "sonner"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CardFrame } from "@/components/cards/card-frame"

  const source = `"use client"

import * as React from "react"
import { toast } from "sonner"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CardFrame } from "@/components/cards/card-frame"


export function ProfileCard() {
  const [following, setFollowing] = React.useState(false)

  return (
    <CardFrame title="Profile card" fileName="components/cards/card-profile.tsx" source={source}>
      <Card className="h-full">
        <CardContent className="flex flex-col items-center gap-3 pt-6 text-center">
          <Avatar className="size-16">
            <AvatarFallback className="bg-secondary text-lg text-secondary-foreground">EL</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-serif text-lg">Elena Ward</p>
            <p className="text-sm text-muted-foreground">Product designer</p>
          </div>
          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <p className="font-serif text-lg">248</p>
              <p className="text-xs text-muted-foreground">Projects</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-lg">{following ? "4.3k" : "4.2k"}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant={following ? "default" : "outline"}
            className="w-full"
            onClick={() => {
              setFollowing((value) => !value)
              toast.success(following ? "Unfollowed Elena" : "Now following Elena")
            }}
          >
            {following ? "Following" : "Follow"}
          </Button>
        </CardFooter>
      </Card>
    </CardFrame>
  )
}
`

export function ProfileCard() {
  const [following, setFollowing] = React.useState(false)

  return (
    <CardFrame title="Profile card" fileName="components/cards/card-profile.tsx" source={source}>
      <Card className="h-full">
        <CardContent className="flex flex-col items-center gap-3 pt-6 text-center">
          <Avatar className="size-16">
            <AvatarFallback className="bg-secondary text-lg text-secondary-foreground">EL</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-serif text-lg">Elena Ward</p>
            <p className="text-sm text-muted-foreground">Product designer</p>
          </div>
          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <p className="font-serif text-lg">248</p>
              <p className="text-xs text-muted-foreground">Projects</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-lg">{following ? "4.3k" : "4.2k"}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant={following ? "default" : "outline"}
            className="w-full"
            onClick={() => {
              setFollowing((value) => !value)
              toast.success(following ? "Unfollowed Elena" : "Now following Elena")
            }}
          >
            {following ? "Following" : "Follow"}
          </Button>
        </CardFooter>
      </Card>
    </CardFrame>
  )
}
