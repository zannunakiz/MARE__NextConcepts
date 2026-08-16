import { Code2 } from "lucide-react"
import { CardGrid } from "@/components/cards/card-grid"

export function CardsPageShell() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-8 md:py-14">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">Component library</p>
        <h1 className="text-balance font-serif text-4xl tracking-tight md:text-6xl">Cards, in many shapes.</h1>
        <p className="mt-4 text-pretty text-base leading-7 text-muted-foreground">
          Twenty-two working compositions, each with real state, its own file, and a source view you can copy
          straight into your project.
        </p>
        <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Code2 className="size-3.5 text-primary" /> Hover or tap a card to reveal its source
        </p>
      </div>
      <CardGrid />
    </div>
  )
}
