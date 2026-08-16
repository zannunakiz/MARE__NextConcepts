import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyButton } from "@/components/cards/copy-button"
import { CardFrame } from "@/components/cards/card-frame"

const referralLink = "mare.app/r/elena92"

  const source = `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyButton } from "@/components/cards/copy-button"
import { CardFrame } from "@/components/cards/card-frame"

const referralLink = "mare.app/r/elena92"


export function ReferralCard() {
  return (
    <CardFrame title="Referral card" fileName="components/cards/card-referral.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Invite friends</CardTitle>
          <CardDescription>Earn credit for every referral that joins.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 font-mono text-xs">
            <span className="min-w-0 truncate">{referralLink}</span>
            <CopyButton value={referralLink} label="Copy referral link" className="shrink-0" />
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">3 friends joined so far</CardFooter>
      </Card>
    </CardFrame>
  )
}
`

export function ReferralCard() {
  return (
    <CardFrame title="Referral card" fileName="components/cards/card-referral.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Invite friends</CardTitle>
          <CardDescription>Earn credit for every referral that joins.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 font-mono text-xs">
            <span className="min-w-0 truncate">{referralLink}</span>
            <CopyButton value={referralLink} label="Copy referral link" className="shrink-0" />
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">3 friends joined so far</CardFooter>
      </Card>
    </CardFrame>
  )
}
