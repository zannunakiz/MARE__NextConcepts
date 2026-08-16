import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyButton } from "@/components/cards/copy-button"
import { CardFrame } from "@/components/cards/card-frame"

const snippet = `export function greet(name: string) {
  return \`Hello, \${name}\`
}`

  const source = `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyButton } from "@/components/cards/copy-button"
import { CardFrame } from "@/components/cards/card-frame"

const snippet = \`export function greet(name: string) {
  return \\\`Hello, \\\${name}\\\`
}\`


export function CodeCard() {
  return (
    <CardFrame title="Code card" fileName="components/cards/card-code.tsx" source={source}>
      <Card className="h-full">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-mono text-sm">greet.ts</CardTitle>
          <CopyButton value={snippet} label="Copy greet.ts" />
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs leading-6">
            <code>{snippet}</code>
          </pre>
        </CardContent>
      </Card>
    </CardFrame>
  )
}
`

export function CodeCard() {
  return (
    <CardFrame title="Code card" fileName="components/cards/card-code.tsx" source={source}>
      <Card className="h-full">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-mono text-sm">greet.ts</CardTitle>
          <CopyButton value={snippet} label="Copy greet.ts" />
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs leading-6">
            <code>{snippet}</code>
          </pre>
        </CardContent>
      </Card>
    </CardFrame>
  )
}
