"use client"

import { PageIntro } from "@/components/page-intro"
import { themes, useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getThemeCss, getThemeDefinition, getThemePalette } from "@/lib/theme-practice"
import { motion } from "framer-motion"
import { Clipboard, Copy, Eye, FileCode2, Moon, Sun } from "lucide-react"
import { useMemo, useState } from "react"
import { toast } from "sonner"

function PaletteSwatch({ name, value, onCopy }: { name: string; value: string; onCopy: () => void }) {
  return (
    <button
      type="button"
      onClick={onCopy}
      className="group flex min-w-0 flex-1 flex-col gap-2 text-left"
      aria-label={`Copy ${name} ${value}`}
    >
      <span className="h-16 rounded-lg border shadow-sm transition-transform group-hover:-translate-y-0.5" style={{ backgroundColor: value, borderColor: value }} />
      <span className="flex min-w-0 items-center justify-between gap-2 text-xs">
        <span className="truncate text-muted-foreground">{name}</span>
        <span className="flex items-center gap-1 font-mono text-[10px] text-primary">
          <Copy className="size-3" />
          {value}
        </span>
      </span>
    </button>
  )
}

export default function ThemingPage() {
  const { theme, setTheme, mode, setMode } = useTheme()
  const [codeOpen, setCodeOpen] = useState(false)
  const selected = getThemeDefinition(theme)
  const palette = getThemePalette(theme, mode)
  const css = useMemo(() => getThemeCss(theme, mode), [theme, mode])

  function copy(value: string, label: string) {
    void navigator.clipboard.writeText(value)
    toast.success(`${label} copied to clipboard`)
  }

  // Get palette entries as array with consistent sizing
  const paletteEntries = Object.entries(palette)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <PageIntro
          eyebrow="Practice lab / theming"
          title="Make the system feel intentional."
          description="Explore MARE's themes, inspect their tokens, and practice turning a palette into a usable interface."
        />
      </motion.div>

      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)]"
      >
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Theme gallery</p>
              <CardTitle className="mt-1 text-xl">Choose a direction</CardTitle>
            </div>
            <span className="font-mono text-xs text-muted-foreground">{themes.length} available</span>
          </CardHeader>
          <CardContent className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
            {themes.map((item, index) => {
              const active = item.id === theme
              return (
                <motion.button
                  type="button"
                  key={item.id}
                  onClick={() => setTheme(item.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`rounded-xl border p-4 text-left transition-colors ${active ? "border-primary bg-primary/10" : "hover:border-primary/40 hover:bg-accent/20"
                    }`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="size-7 rounded-full border-2 border-background shadow-sm" style={{ backgroundColor: item.primary }} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {active ? "Selected" : "Preview"}
                    </span>
                  </div>
                  <p className="font-medium">{item.label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.description}</p>
                </motion.button>
              )
            })}
          </CardContent>
        </Card>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="border-b">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Live specimen</p>
              <CardTitle className="mt-1 text-xl">{selected.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: palette.card,
                  borderColor: palette.border,
                  color: palette.foreground,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: palette.primary }}>
                    Interface note
                  </span>
                  <Eye className="size-4" style={{ color: palette.primary }} />
                </div>
                <p className="mt-4 text-lg font-medium">Quiet decisions make better products.</p>
                <p className="mt-2 text-sm leading-6" style={{ color: palette.muted }}>
                  A small card is enough to test hierarchy, contrast, and rhythm.
                </p>
                <button
                  type="button"
                  onClick={() => copy(palette.primary, "Primary color")}
                  className="mt-4 rounded-md px-3 py-2 text-xs font-medium transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: palette.primary,
                    color: palette.background,
                  }}
                >
                  Copy primary
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between gap-3"
              >
                <span className="text-sm text-muted-foreground">Preview mode</span>
                <div className="flex rounded-lg border p-1">
                  <Button
                    variant={mode === "light" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setMode("light")}
                  >
                    <Sun />
                    Light
                  </Button>
                  <Button
                    variant={mode === "dark" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setMode("dark")}
                  >
                    <Moon />
                    Dark
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-4"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Token inspector</p>
            <h2 className="mt-1 font-serif text-2xl">Palette, in plain language.</h2>
          </div>
          <Button variant="outline" onClick={() => setCodeOpen(true)}>
            <FileCode2 />
            Copy CSS theme
          </Button>
        </div>

        <Card>
          <CardContent className="grid gap-4 p-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {paletteEntries.map(([name, value], index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="flex"
              >
                <PaletteSwatch
                  name={name}
                  value={value}
                  onCopy={() => copy(value, name)}
                />
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.section>

      <Dialog open={codeOpen} onOpenChange={setCodeOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selected.label} CSS tokens</DialogTitle>
            <DialogDescription>
              Copy this small token layer into a stylesheet or design-system experiment.
            </DialogDescription>
          </DialogHeader>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <pre className="max-h-[55vh] overflow-auto rounded-xl border bg-muted/30 p-4 font-mono text-xs leading-6 text-foreground">
              {css}
            </pre>
            <Button
              className="absolute right-3 top-3"
              size="sm"
              onClick={() => copy(css, "CSS theme")}
            >
              <Clipboard />
              Copy code
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}