"use client"

import { CardFrame } from "@/components/cards/card-frame"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Heart, MessageCircle } from "lucide-react"
import * as React from "react"

const source = `"use client"

import * as React from "react"
import { Heart, MessageCircle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { CardFrame } from "@/components/cards/card-frame"


export function SocialCard() {
  const [liked, setLiked] = React.useState(false)
  const [likes, setLikes] = React.useState(128)

  const toggleLike = () => {
    setLiked((value) => !value)
    setLikes((value) => (liked ? value - 1 : value + 1))
  }

  return (
    <CardFrame title="Social card" fileName="components/cards/card-social.tsx" source={source}>
      <Card className="h-full">
        <CardHeader className="flex-row items-center gap-3">
          <Avatar className="size-9">
            <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">NT</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm leading-tight">Noah Tran</p>
            <p className="text-xs text-muted-foreground">3h ago</p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6">
            Shipped the new caching layer today. Response times dropped by 40 percent across the board.
          </p>
        </CardContent>
        <CardFooter className="gap-4 text-sm text-muted-foreground">
          <button
            type="button"
            onClick={toggleLike}
            className={cn("flex items-center gap-1.5 transition-colors", liked && "text-primary")}
            aria-pressed={liked}
          >
            <Heart className={cn("size-4", liked && "fill-current")} /> {likes}
          </button>
          <span className="flex items-center gap-1.5">
            <MessageCircle className="size-4" /> 24
          </span>
        </CardFooter>
      </Card>
    </CardFrame>
  )
}
`

export function SocialCard() {
  const [liked, setLiked] = React.useState(false)
  const [likes, setLikes] = React.useState(128)

  const toggleLike = () => {
    setLiked((value) => !value)
    setLikes((value) => (liked ? value - 1 : value + 1))
  }

  return (
    <CardFrame title="Social card" fileName="components/cards/card-social.tsx" source={source}>
      <Card className="h-full pb-0">
        <CardHeader className="flex-row items-center gap-3 pb-0">
          <Avatar className="size-9">
            <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">NT</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm leading-tight">Noah Tran</p>
            <p className="text-xs text-muted-foreground">3h ago</p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6">
            Shipped the new caching layer today. Response times dropped by 40 percent across the board.
          </p>
        </CardContent>
        <CardFooter className="gap-4 h-full text-sm text-muted-foreground ">
          <button
            type="button"
            onClick={toggleLike}
            className={cn("flex items-center gap-1.5 transition-colors", liked && "text-primary")}
            aria-pressed={liked}
          >
            <Heart className={cn("size-4", liked && "fill-current")} /> {likes}
          </button>
          <span className="flex items-center gap-1.5">
            <MessageCircle className="size-4" /> 24
          </span>
        </CardFooter>
      </Card>
    </CardFrame>
  )
}
