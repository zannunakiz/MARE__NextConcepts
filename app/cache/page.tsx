"use client"

import { PageIntro } from "@/components/page-intro"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatePresence, motion } from "framer-motion"
import { Plus, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"

type ResponsePayload = {
  items?: Array<{ id: number; name: string; description: string; price: number; createdAt: string }>
  item?: { id: number; name: string; description: string; price: number; createdAt: string }
  cache?: "next"
  message?: string
  invalidatedCache?: boolean
  cleared?: boolean
  previousCount?: number
  currentCount?: number
  count?: number
  meta?: { success: boolean; statusCode: number; timestamp: string; durationMs: number }
}

export default function CachePage() {
  const [items, setItems] = useState<NonNullable<ResponsePayload["items"]>>([])
  const [isCached, setIsCached] = useState(true)
  const [response, setResponse] = useState<ResponsePayload | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getItems = async () => {
    setIsLoading(true)
    try {
      const result = await fetch("/api/cache", { cache: "no-store" })
      const data = await result.json() as ResponsePayload
      if (!result.ok) throw new Error(data.message ?? "Unable to read items")
      setItems(data.items ?? [])
      setIsCached(data.cache === "next")
      setResponse(data)
    } catch (error) {
      setResponse({ message: error instanceof Error ? error.message : "Unable to read items", meta: { success: false, statusCode: 500, timestamp: new Date().toISOString(), durationMs: 0 } })
    } finally {
      setIsLoading(false)
    }
  }

  const addItem = async () => {
    setIsLoading(true)
    try {
      const result = await fetch("/api/cache", { method: "POST" })
      const data = await result.json() as ResponsePayload
      if (!result.ok) throw new Error(data.message ?? "Unable to add item")
      setItems((current) => data.cleared ? (data.item ? [data.item] : []) : [...current, ...(data.item ? [data.item] : [])])
      setIsCached(false)
      setResponse(data)
    } catch (error) {
      setResponse({ message: error instanceof Error ? error.message : "Unable to add item", meta: { success: false, statusCode: 500, timestamp: new Date().toISOString(), durationMs: 0 } })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { void getItems() }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-10 lg:py-12"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <PageIntro
          eyebrow="App Router lab"
          title="Caching mechanics"
          description="See how a cached read differs from a fresh read, then invalidate the cache by mutating the data source."
        />
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <Card>
          <CardHeader>
            <CardTitle>Cache controls</CardTitle>
            <CardDescription>Run the same read twice to observe a cache hit.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex items-center justify-between rounded-xl border bg-muted/40 p-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Current cache</span>
                <span className="text-xs text-muted-foreground">
                  {isCached ? `${items.length} item${items.length === 1 ? "" : "s"} ready to reuse` : "No response is cached"}
                </span>
              </div>
              <Badge variant={isCached ? "default" : "outline"}>
                {isCached ? "Warm" : "Cold"}
              </Badge>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button onClick={getItems} disabled={isLoading} className="flex-1">
                <motion.div
                  animate={{ rotate: isLoading ? 360 : 0 }}
                  transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
                >
                  <RefreshCw />
                </motion.div>
                {isLoading ? "Reading..." : "Get items"}
              </Button>
              <Button onClick={addItem} variant="outline" className="flex-1" disabled={isLoading}>
                <Plus /> Add item
              </Button>
            </div>

            <div className="rounded-xl border p-4 text-sm leading-6 text-muted-foreground">
              {items.length >= 10
                ? "Safety reset armed: the next add clears the table and inserts one fresh item to protect memory."
                : isCached
                  ? "This response is served through Next.js server caching. Adding an item invalidates the tagged entry."
                  : "Run Get items to read the tagged Next.js cache entry."}
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col gap-1">
                <CardTitle>Response inspector</CardTitle>
                <CardDescription>Structured API response with cache, mutation, and safety metadata.</CardDescription>
              </div>
              <Badge variant="secondary" className="shrink-0 font-mono text-[10px]">JSON</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="min-h-64 overflow-auto">
              <pre className="rounded-xl border bg-muted/50 p-4 font-mono text-xs leading-6 text-foreground sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.code
                    key={JSON.stringify(response)}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {JSON.stringify(
                      response ?? { status: "idle", message: "Run an action to inspect the response." },
                      null,
                      2
                    )}
                  </motion.code>
                </AnimatePresence>
              </pre>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <span>Total items:</span>
          <motion.span
            key={items.length}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="font-mono font-bold text-primary"
          >
            {items.length}
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  )
}