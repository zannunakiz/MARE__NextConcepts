"use client"

import * as React from "react"
import { toast } from "sonner"
import { Calendar, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CardFrame } from "@/components/cards/card-frame"

  const source = `"use client"

import * as React from "react"
import { toast } from "sonner"
import { Calendar, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CardFrame } from "@/components/cards/card-frame"


export function TaskCard() {
  const [status, setStatus] = React.useState("In progress")

  return (
    <CardFrame title="Task card" fileName="components/cards/card-task.tsx" source={source}>
      <Card className="h-full">
        <CardHeader className="flex-row items-start justify-between gap-2">
          <div>
            <Badge variant="outline" className="mb-2 text-xs">
              {status}
            </Badge>
            <CardTitle className="font-serif text-lg leading-snug">Redesign onboarding flow</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Task options" />}>
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setStatus("Done")
                  toast.success("Task marked as done")
                }}
              >
                Mark done
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setStatus("Blocked")
                  toast.warning("Task marked as blocked")
                }}
              >
                Mark blocked
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" /> Due Fri
          </span>
          <Avatar className="size-7">
            <AvatarFallback className="bg-secondary text-[10px] text-secondary-foreground">RS</AvatarFallback>
          </Avatar>
        </CardContent>
      </Card>
    </CardFrame>
  )
}
`

export function TaskCard() {
  const [status, setStatus] = React.useState("In progress")

  return (
    <CardFrame title="Task card" fileName="components/cards/card-task.tsx" source={source}>
      <Card className="h-full">
        <CardHeader className="flex-row items-start justify-between gap-2">
          <div>
            <Badge variant="outline" className="mb-2 text-xs">
              {status}
            </Badge>
            <CardTitle className="font-serif text-lg leading-snug">Redesign onboarding flow</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Task options" />}>
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setStatus("Done")
                  toast.success("Task marked as done")
                }}
              >
                Mark done
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setStatus("Blocked")
                  toast.warning("Task marked as blocked")
                }}
              >
                Mark blocked
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" /> Due Fri
          </span>
          <Avatar className="size-7">
            <AvatarFallback className="bg-secondary text-[10px] text-secondary-foreground">RS</AvatarFallback>
          </Avatar>
        </CardContent>
      </Card>
    </CardFrame>
  )
}
