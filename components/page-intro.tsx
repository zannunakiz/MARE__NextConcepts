"use client"

type PageIntroProps = {
  eyebrow: string
  title: string
  description: string
  action?: React.ReactNode
}

export function PageIntro({ eyebrow, title, description, action }: PageIntroProps) {
  return (
    <header className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0 text-left">
        <div className="flex flex-col items-start gap-2">
          <p className="font-mono text-[11px] uppercase leading-4 tracking-[0.18em] text-primary">
            {eyebrow}
          </p>
          <h1 className="text-balance font-serif text-3xl leading-tight tracking-tight sm:text-4xl">{title}</h1>
          <p className="max-w-2xl text-pretty text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
        </div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  )
}
