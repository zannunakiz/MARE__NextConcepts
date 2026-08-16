import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CardFrame } from "@/components/cards/card-frame"

  const source = `import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CardFrame } from "@/components/cards/card-frame"


export function TestimonialCard() {
  return (
    <CardFrame title="Testimonial card" fileName="components/cards/card-testimonial.tsx" source={source}>
      <Card className="h-full bg-secondary text-secondary-foreground">
        <CardContent className="flex flex-col gap-4 pt-6">
          <div className="flex gap-0.5 text-primary">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="size-4 fill-current" />
            ))}
          </div>
          <p className="font-serif text-lg leading-7">
            &ldquo;The clearest practice environment we have used for onboarding new engineers.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarFallback className="bg-card text-xs">JP</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm">Jamie Park</p>
              <p className="text-xs opacity-70">Engineering lead</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </CardFrame>
  )
}
`

export function TestimonialCard() {
  return (
    <CardFrame title="Testimonial card" fileName="components/cards/card-testimonial.tsx" source={source}>
      <Card className="h-full bg-secondary text-secondary-foreground">
        <CardContent className="flex flex-col gap-4 pt-6">
          <div className="flex gap-0.5 text-primary">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="size-4 fill-current" />
            ))}
          </div>
          <p className="font-serif text-lg leading-7">
            &ldquo;The clearest practice environment we have used for onboarding new engineers.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarFallback className="bg-card text-xs">JP</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm">Jamie Park</p>
              <p className="text-xs opacity-70">Engineering lead</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </CardFrame>
  )
}
