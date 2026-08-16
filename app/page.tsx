"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Bot, Database, FileText, KeyRound, Layers3, Palette, Radio, Zap } from "lucide-react";
import Link from "next/link";

const labs = [
  { href: "/cards", label: "Cards", note: "Composition", icon: Layers3, status: "20 patterns" },
  { href: "/theming", label: "Theming", note: "Visual systems", icon: Palette, status: "10 themes" },
  { href: "/cache", label: "Cache", note: "Data layer", icon: Database, status: "Next.js cache" },
  { href: "/fetchers", label: "Fetchers", note: "Request states", icon: Radio, status: "Async flow" },
  { href: "/jwt", label: "JWT-RBAC", note: "Access control", icon: KeyRound, status: "3 roles" },
  { href: "/lazy", label: "Lazy render", note: "Viewport work", icon: Zap, status: "Intersection" },
  { href: "/form", label: "Form practice", note: "Input systems", icon: FileText, status: "Validated" },
  { href: "/aichat", label: "AI chat", note: "Model boundary", icon: Bot, status: "Streaming" },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 md:px-8 md:py-12">
      <section className="relative overflow-hidden border-y border-border py-10 sm:py-14 lg:py-20 motion-safe:animate-[overview-rise_700ms_ease-out_both]">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 border-l border-border/60 lg:block" />

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="max-w-4xl">
            <div className="mb-7 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-primary motion-safe:animate-[overview-fade_600ms_100ms_ease-out_both]">
              MARE / overview
            </div>

            <h1 className="max-w-4xl text-balance font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              A calmer way to learn <span className="text-primary">Next.js.</span>
            </h1>

            <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              A focused studio for understanding the edges of modern applications: data, rendering, requests, and the decisions between them.
            </p>
          </div>

          <div className="flex flex-col justify-end gap-5 border-l border-primary/30 pl-5 motion-safe:animate-[overview-fade_700ms_240ms_ease-out_both]">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="size-2 animate-pulse rounded-full bg-primary" />
              System ready
            </div>

            <p className="font-serif text-2xl leading-tight">Choose a surface. Make a small thing. Watch it work.</p>

            <Button
              render={<Link href="/cards" />}
              nativeButton={false}
              className="w-fit"
            >
              Begin a practice <ArrowUpRight />
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(16rem,0.7fr)] motion-safe:animate-[overview-rise_800ms_180ms_ease-out_both]">
        <Card className="overflow-hidden border-primary/25 bg-secondary/25">
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b border-border/70 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>Practice map</span>
              <span>08 surfaces</span>
            </div>

            <div className="grid sm:grid-cols-2">
              {labs.map((lab, index) => {
                const Icon = lab.icon;

                return (
                  <Link
                    key={lab.href}
                    href={lab.href}
                    className="group flex min-h-32 flex-col justify-between border-b border-border/70 p-5 transition-colors duration-300 hover:bg-background sm:nth-[odd]:border-r sm:nth-[-n+2]:border-b lg:min-h-36"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        0{index + 1}
                      </span>
                      <Icon className="size-4 text-primary transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                    </div>

                    <div>
                      <h2 className="font-serif text-xl">{lab.label}</h2>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {lab.note} <span className="px-1 text-border">/</span> {lab.status}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-primary text-primary-foreground">
          <CardContent className="flex h-full flex-col justify-between gap-12 p-6 sm:p-7">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] opacity-75">
              <span>Current signal</span>
              <Zap className="size-4" />
            </div>

            <div>
              <p className="font-mono text-5xl tracking-tight">08</p>
              <h2 className="mt-3 font-serif text-2xl">
                small surfaces,<br />real instincts.
              </h2>
              <p className="mt-4 text-sm leading-6 opacity-80">
                Each lab is deliberately narrow. The goal is not to memorize APIs, but to notice what changes at the boundary.
              </p>
            </div>

            <Link
              href="/aichat"
              className="flex items-center justify-between border-t border-primary-foreground/25 pt-4 text-sm hover:underline"
            >
              Open the latest surface <ArrowUpRight className="size-4" />
            </Link>
          </CardContent>
        </Card>
      </section>

      <footer className="flex flex-col gap-3 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between motion-safe:animate-[overview-fade_900ms_400ms_ease-out_both]">
        <span>One concept at a time</span>
        <span>Built for noticing the details</span>
      </footer>
    </main>
  );
}