"use client"

import * as React from "react"

type ThemeMode = "light" | "dark"

type ThemeDefinition = {
  id: string
  label: string
  primary: string
  description: string
}

export const themes: ThemeDefinition[] = [
  { id: "sage", label: "Sage Studio", primary: "#7c9473", description: "Manrope / Fraunces" },
  { id: "ocean", label: "Quiet Ocean", primary: "#4c7f93", description: "Space Grotesk / Instrument Serif" },
  { id: "clay", label: "Soft Clay", primary: "#b06f5c", description: "Sora / Playfair Display" },
  { id: "lavender", label: "Lavender Paper", primary: "#7d739f", description: "Plus Jakarta Sans / DM Serif Display" },
  { id: "mustard", label: "Golden Hour", primary: "#a17f36", description: "Outfit / Spectral" },
  { id: "ink", label: "Ink and Moss", primary: "#455c51", description: "Work Sans / Newsreader" },
  { id: "rose", label: "Dusty Rose", primary: "#a56b78", description: "Urbanist / Cormorant" },
  { id: "sky", label: "Open Sky", primary: "#4f7fa1", description: "Inter / Lora" },
  { id: "citrus", label: "Citrus Note", primary: "#788c3d", description: "Rubik / Bitter" },
  { id: "plum", label: "Quiet Plum", primary: "#805e79", description: "Karla / Petrona" },
]

type ThemeContextValue = {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  theme: string
  setTheme: (theme: string) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

const defaultPreferences = { mode: "dark" as ThemeMode, theme: "sage" }

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = React.useState(defaultPreferences)
  const hydrated = React.useRef(false)
  const mode = preferences.mode
  const theme = preferences.theme

  React.useEffect(() => {
    const storedMode = window.localStorage.getItem("mare-mode")
    const storedTheme = window.localStorage.getItem("mare-theme")
    setPreferences({
      mode: storedMode === "light" || storedMode === "dark" ? storedMode : defaultPreferences.mode,
      theme: themes.some((item) => item.id === storedTheme) ? storedTheme ?? defaultPreferences.theme : defaultPreferences.theme,
    })
    hydrated.current = true
  }, [])

  React.useLayoutEffect(() => {
    document.documentElement.dataset.mode = mode
    document.documentElement.dataset.theme = theme
  }, [mode, theme])

  React.useEffect(() => {
    if (!hydrated.current) return
    window.localStorage.setItem("mare-mode", mode)
    window.localStorage.setItem("mare-theme", theme)
  }, [mode, theme])

  const setMode = React.useCallback((nextMode: ThemeMode) => {
    setPreferences((current) => ({ ...current, mode: nextMode }))
  }, [])
  const setTheme = React.useCallback((nextTheme: string) => {
    setPreferences((current) => ({ ...current, theme: nextTheme }))
  }, [])

  const value = React.useMemo(() => ({ mode, setMode, theme, setTheme }), [mode, setMode, theme, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const value = React.useContext(ThemeContext)
  if (!value) throw new Error("useTheme must be used within ThemeProvider")
  return value
}
