import { AppShell } from "@/components/app-shell"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import {
  Bitter,
  Cormorant,
  DM_Serif_Display,
  Fraunces,
  Instrument_Serif,
  Inter,
  Karla,
  Lora,
  Manrope,
  Newsreader,
  Outfit,
  Petrona,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Rubik,
  Sora,
  Space_Grotesk,
  Spectral,
  Urbanist,
  Work_Sans,
} from "next/font/google"
import "./globals.css"

const sageSans = Manrope({ subsets: ["latin"], variable: "--font-sage-sans" })
const sageSerif = Fraunces({ subsets: ["latin"], variable: "--font-sage-serif" })
const oceanSans = Space_Grotesk({ subsets: ["latin"], variable: "--font-ocean-sans" })
const oceanSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-ocean-serif" })
const claySans = Sora({ subsets: ["latin"], variable: "--font-clay-sans" })
const claySerif = Playfair_Display({ subsets: ["latin"], variable: "--font-clay-serif" })
const lavenderSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-lavender-sans" })
const lavenderSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-lavender-serif" })
const mustardSans = Outfit({ subsets: ["latin"], variable: "--font-mustard-sans" })
const mustardSerif = Spectral({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mustard-serif" })
const inkSans = Work_Sans({ subsets: ["latin"], variable: "--font-ink-sans" })
const inkSerif = Newsreader({ subsets: ["latin"], variable: "--font-ink-serif" })
const roseSans = Urbanist({ subsets: ["latin"], variable: "--font-rose-sans" })
const roseSerif = Cormorant({ subsets: ["latin"], variable: "--font-rose-serif" })
const skySans = Inter({ subsets: ["latin"], variable: "--font-sky-sans" })
const skySerif = Lora({ subsets: ["latin"], variable: "--font-sky-serif" })
const citrusSans = Rubik({ subsets: ["latin"], variable: "--font-citrus-sans" })
const citrusSerif = Bitter({ subsets: ["latin"], variable: "--font-citrus-serif" })
const plumSans = Karla({ subsets: ["latin"], variable: "--font-plum-sans" })
const plumSerif = Petrona({ subsets: ["latin"], variable: "--font-plum-serif" })

const fontVariables = [
  sageSans,
  sageSerif,
  oceanSans,
  oceanSerif,
  claySans,
  claySerif,
  lavenderSans,
  lavenderSerif,
  mustardSans,
  mustardSerif,
  inkSans,
  inkSerif,
  roseSans,
  roseSerif,
  skySans,
  skySerif,
  citrusSans,
  citrusSerif,
  plumSans,
  plumSerif,
]
  .map((font) => font.variable)
  .join(" ")

export const metadata: Metadata = {
  title: {
    default: "MARE — Next.js Practice Studio",
    template: "%s | MARE",
  },
  description: "A focused Next.js practice studio for data, rendering, requests, forms, auth, and AI boundaries.",
}

export const viewport: Viewport = { colorScheme: "dark light", themeColor: "#101412" }

const themeBootstrap = `(() => {
  try {
    const mode = localStorage.getItem("mare-mode") === "light" ? "light" : "dark";
    const themes = ["sage", "ocean", "clay", "lavender", "mustard", "ink", "rose", "sky", "citrus", "plum"];
    const savedTheme = localStorage.getItem("mare-theme");
    document.documentElement.dataset.mode = mode;
    document.documentElement.dataset.theme = themes.includes(savedTheme || "") ? savedTheme : "sage";
  } catch {}
})();`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
          <Toaster position="bottom-right" />
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
