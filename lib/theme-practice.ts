import { themes } from "@/components/theme-provider"

export type PaletteMode = "light" | "dark"

export type ThemePalette = {
  background: string
  foreground: string
  card: string
  muted: string
  border: string
  primary: string
}

const paletteOverrides: Record<string, Record<PaletteMode, ThemePalette>> = {
  sage: { light: { background: "#f4f6f1", foreground: "#1b211d", card: "#ffffff", muted: "#657064", border: "#d8dfd4", primary: "#637d5b" }, dark: { background: "#101412", foreground: "#edf2eb", card: "#171d19", muted: "#aab6aa", border: "#2a342d", primary: "#8aa47c" } },
  ocean: { light: { background: "#f2f7f8", foreground: "#142126", card: "#ffffff", muted: "#60777f", border: "#d4e2e5", primary: "#3f7389" }, dark: { background: "#10171a", foreground: "#eaf3f5", card: "#172126", muted: "#a6bcc3", border: "#2a3a40", primary: "#6e9fb0" } },
  clay: { light: { background: "#faf4f0", foreground: "#281c18", card: "#ffffff", muted: "#806960", border: "#eadbd4", primary: "#a96350" }, dark: { background: "#1b1412", foreground: "#f6ebe6", card: "#241a17", muted: "#c6aaa0", border: "#46302a", primary: "#c58470" } },
  lavender: { light: { background: "#f7f5fb", foreground: "#201d29", card: "#ffffff", muted: "#746d82", border: "#e1dcec", primary: "#776b9c" }, dark: { background: "#15131b", foreground: "#f1edf8", card: "#1f1b27", muted: "#b7aec8", border: "#373043", primary: "#a99bcf" } },
  mustard: { light: { background: "#faf8ee", foreground: "#292418", card: "#ffffff", muted: "#7b7054", border: "#e6dfc8", primary: "#9c7931" }, dark: { background: "#1a1810", foreground: "#f7f0d9", card: "#242116", muted: "#c0b58c", border: "#463d25", primary: "#c6a453" } },
  ink: { light: { background: "#f3f6f4", foreground: "#17201c", card: "#ffffff", muted: "#627069", border: "#d7e0db", primary: "#466054" }, dark: { background: "#101513", foreground: "#edf3ef", card: "#18201c", muted: "#aab9af", border: "#2d3a32", primary: "#789886" } },
  rose: { light: { background: "#fbf5f6", foreground: "#281b20", card: "#ffffff", muted: "#806870", border: "#ead9de", primary: "#9e6270" }, dark: { background: "#1b1417", foreground: "#f7ebef", card: "#251a1f", muted: "#c6aab3", border: "#47303a", primary: "#c48796" } },
  sky: { light: { background: "#f2f7fb", foreground: "#17212b", card: "#ffffff", muted: "#637686", border: "#d8e4ec", primary: "#4d789a" }, dark: { background: "#10171d", foreground: "#edf4f9", card: "#18222a", muted: "#a9bdc9", border: "#2d3d48", primary: "#78a6c4" } },
  citrus: { light: { background: "#f7f8ed", foreground: "#202417", card: "#ffffff", muted: "#6e7758", border: "#dde4c9", primary: "#718739" }, dark: { background: "#15180f", foreground: "#f1f5df", card: "#202517", muted: "#b3be8b", border: "#394225", primary: "#a7bd58" } },
  plum: { light: { background: "#f8f3f8", foreground: "#251c25", card: "#ffffff", muted: "#786879", border: "#e4d8e5", primary: "#7d5c77" }, dark: { background: "#181218", foreground: "#f5eaf5", card: "#241a24", muted: "#beaabd", border: "#423044", primary: "#ad82a6" } },
}

export function getThemePalette(themeId: string, mode: PaletteMode): ThemePalette {
  return paletteOverrides[themeId]?.[mode] ?? paletteOverrides.sage[mode]
}

export function getThemeDefinition(themeId: string) {
  return themes.find((theme) => theme.id === themeId) ?? themes[0]
}

export function toCssVariables(palette: ThemePalette) {
  return `:root {\n  --background: ${palette.background};\n  --foreground: ${palette.foreground};\n  --card: ${palette.card};\n  --muted-foreground: ${palette.muted};\n  --border: ${palette.border};\n  --primary: ${palette.primary};\n}`
}

export function getThemeCss(themeId: string, mode: PaletteMode) {
  return toCssVariables(getThemePalette(themeId, mode))
}
