"use client"

import { RouteLoadingIndicator } from "@/components/route-loading-indicator"
import { SiteFooter } from "@/components/site-footer"
import { themes, useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { ArrowRight, Bot, Check, ChevronDown, Database, FileText, Home, KeyRound, Layers3, LoaderCircle, Moon, Palette, Radio, Sparkles, Sun } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

const navItems = [
  { href: "/", label: "Overview", icon: Home },
  { href: "/cards", label: "Cards", icon: Layers3 },
  { href: "/theming", label: "Theming", icon: Palette },
  { href: "/cache", label: "Cache", icon: Database },
  { href: "/fetchers", label: "Fetchers", icon: Radio },
  { href: "/jwt", label: "JWT-RBAC Practice", icon: KeyRound },
  { href: "/lazy", label: "Lazy Render", icon: Sparkles },
  { href: "/form", label: "Form Practice", icon: FileText },
  { href: "/aichat", label: "AI Chat", icon: Bot },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [pendingHref, setPendingHref] = useState<string | null>(null)
  const { mode, setMode, theme, setTheme } = useTheme()

  useEffect(() => {
    setPendingHref(null)
  }, [pathname])
  const activeTheme = themes.find((item) => item.id === theme) ?? themes[0]

  return (
    <SidebarProvider>
      <RouteLoadingIndicator />
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2">
          <Link href="/" className="flex items-center gap-2 font-serif text-lg tracking-tight">
            <span className="size-2 shrink-0 rounded-full bg-primary" />
            <span className="group-data-[collapsible=icon]:hidden">MARE</span>
          </Link>
        </SidebarHeader>
        <div aria-hidden="true" className="mx-3 flex items-center gap-2">
          <span className="h-px w-8 bg-primary/70" />
          <span className="h-px flex-1 bg-border" />
        </div>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-[11px] sm:text-xs group-data-[collapsible=icon]:hidden">Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} />}
                      isActive={pathname === item.href}
                      tooltip={item.label}
                      disabled={isPending}
                      onClick={(event) => {
                        if (isPending || pathname === item.href) {
                          event.preventDefault()
                          return
                        }
                        event.preventDefault()
                        setPendingHref(item.href)
                        startTransition(() => router.push(item.href))
                      }}
                      className={cn(
                        "group/nav relative cursor-pointer text-[13px] sm:text-sm transition-all duration-300 hover:bg-secondary/60 hover:text-foreground",
                        isPending && "cursor-wait opacity-60",
                        pathname === item.href && "bg-primary/10 text-primary ring-1 ring-primary/20 hover:bg-primary/15",
                      )}
                    >
                      <item.icon className="transition-transform duration-300 group-hover/nav:scale-110" />
                      <span>{item.label}</span>
                      {pendingHref === item.href && isPending && <LoaderCircle aria-label={`Loading ${item.label}`} className="ml-auto animate-spin" />}
                      {pathname === item.href && !isPending && (
                        <span aria-hidden="true" className="absolute inset-y-1.5 right-1 w-0.5 rounded-full bg-primary" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="gap-3 p-3 group-data-[collapsible=icon]:p-2">
          <div className="flex cursor-pointer items-center justify-between gap-2 text-[11px] text-muted-foreground sm:text-xs transition-colors hover:text-foreground group-data-[collapsible=icon]:justify-center">
            <span className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
              {mode === "dark" ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
              {mode === "dark" ? "Dark mode" : "Light mode"}
            </span>
            <Switch
              checked={mode === "dark"}
              onCheckedChange={(checked) => setMode(checked ? "dark" : "light")}
              aria-label="Toggle color mode"
            />
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-2 border-b border-border/80 bg-background/90 px-3 backdrop-blur sm:px-4 md:px-8">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="hidden h-5 sm:block" />
            <span className="hidden truncate text-sm text-muted-foreground lg:block">
              Next.js practice environment
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden h-9 items-center gap-1.5 font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-primary sm:flex">
              <Link href="/theming" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
                <span className="themes-loop-text">Themes</span>
                <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
              </Link>
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="shrink-0 cursor-pointer"
            >
              {mode === "dark" ? <Sun /> : <Moon />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="cursor-pointer gap-2" />}>
                <Palette />
                <span className="hidden sm:inline">{activeTheme.label}</span>
                <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" style={{ backgroundColor: "var(--background)", opacity: 1 }} className="z-50 isolate w-[min(16rem,calc(100vw-1.5rem))] !bg-background !bg-opacity-100 !opacity-100 !backdrop-blur-none shadow-xl ring-1 ring-border">
                {themes.map((item) => (
                  <DropdownMenuItem key={item.id} onClick={() => setTheme(item.id)} className="cursor-pointer gap-3">
                    <span className="size-3 shrink-0 rounded-full border" style={{ backgroundColor: item.primary }} />
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate">{item.label}</span>
                      <span className="truncate text-[10px] text-muted-foreground">{item.description}</span>
                    </span>
                    {theme === item.id && <Check className="ml-auto shrink-0" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="min-h-[calc(100vh-3.5rem)] overflow-x-hidden">{children}</main>
        <SiteFooter />
      </div>
    </SidebarProvider>
  )
}
