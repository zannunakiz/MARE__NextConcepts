import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CardFrame } from "@/components/cards/card-frame"

  const source = `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CardFrame } from "@/components/cards/card-frame"


const items = [
  { label: "Maya merged a pull request", time: "2m ago" },
  { label: "New comment on Roadmap", time: "18m ago" },
  { label: "Release v2.4 shipped", time: "1h ago" },
]

export function ActivityCard() {
  return (
    <CardFrame title="Activity card" fileName="components/cards/card-activity.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Recent activity</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <div className="flex min-w-0 flex-col">
                <p className="truncate text-sm leading-5">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </CardFrame>
  )
}
`

const items = [
  { label: "Maya merged a pull request", time: "2m ago" },
  { label: "New comment on Roadmap", time: "18m ago" },
  { label: "Release v2.4 shipped", time: "1h ago" },
]

export function ActivityCard() {
  return (
    <CardFrame title="Activity card" fileName="components/cards/card-activity.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Recent activity</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <div className="flex min-w-0 flex-col">
                <p className="truncate text-sm leading-5">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </CardFrame>
  )
}
