"use client"

import { PageIntro } from "@/components/page-intro"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, CheckCircle2, Clock3, Loader2, Radio, RefreshCw, ServerCrash, WifiOff } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"

type FetchKind = "error" | "timeout" | "success"
type FetchStatus = "idle" | "loading" | FetchKind
type ApiResponse = {
  data: { resource: { id: number; title: string; description: string; createdAt: string; updatedAt: string } } | null
  meta: { requestId: string; timestamp: string; status?: number; source?: string }
  error: { code: string; message: string; details?: { id?: number } } | null
}
type TimeoutResponse = { data: null; meta: { requestId: string; timestamp: string; durationMs: number }; error: { code: "TIMEOUT"; message: string } }
type ResponsePayload = ApiResponse | TimeoutResponse

const scenarios: Array<{ id: FetchKind; title: string; description: string; icon: typeof AlertCircle; tone: string; label: string }> = [
  { id: "error", title: "Error state", description: "Fetches an intentionally invalid id so the API returns a safe 404 envelope.", icon: AlertCircle, tone: "text-destructive", label: "404 Not found" },
  { id: "timeout", title: "Timeout state", description: "A local dummy delay demonstrates pending and timeout UI without a real request.", icon: Clock3, tone: "text-muted-foreground", label: "408 Request timeout" },
  { id: "success", title: "Success state", description: "Fetches the seeded learning record from Neon and renders its usable data.", icon: CheckCircle2, tone: "text-primary", label: "200 OK" },
]

function requestMeta(requestId: string, durationMs = 2000) {
  return { requestId, timestamp: new Date().toISOString(), durationMs }
}

function RenderedResult({ status, response }: { status: FetchStatus; response: ResponsePayload | null }) {
  if (status === "idle" || status === "loading") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed bg-muted/30 p-6 text-center"
      >
        {status === "loading" ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="size-8 text-primary" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Radio className="size-8 text-muted-foreground" />
          </motion.div>
        )}
        <div className="flex flex-col gap-1">
          <p className="font-medium">
            {status === "loading" ? "Waiting for the server..." : "Your rendered result appears here"}
          </p>
          <p className="text-sm text-muted-foreground">
            {status === "loading"
              ? "The UI is in a pending state while the request resolves."
              : "Run a scenario to see how response contracts become UI states."}
          </p>
        </div>
        {status === "loading" && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "linear" }}
            className="max-w-xs w-full"
          >
            <Progress value={66} />
          </motion.div>
        )}
      </motion.div>
    )
  }

  if (status === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Alert variant="destructive" className="min-h-64 flex-col items-start justify-center gap-4 p-6">
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
            <ServerCrash />
          </div>
          <div>
            <AlertTitle className="text-lg">We couldn&apos;t load this resource</AlertTitle>
            <AlertDescription className="mt-1">
              {response?.error?.message ?? "The resource was not found."} The UI keeps the failure safe and actionable.
            </AlertDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <RefreshCw /> Try again
          </Button>
        </Alert>
      </motion.div>
    )
  }

  if (status === "timeout") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Alert className="min-h-64 flex-col items-start justify-center gap-4 border-muted-foreground/30 bg-muted/30 p-6">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <WifiOff />
          </div>
          <div>
            <AlertTitle className="text-lg">The request took too long</AlertTitle>
            <AlertDescription className="mt-1">
              The client stopped waiting after two seconds. Keep the page usable and offer a retry.
            </AlertDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <RefreshCw /> Retry request
          </Button>
        </Alert>
      </motion.div>
    )
  }

  const resource = response && "data" in response ? response.data?.resource : null
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex min-h-64 flex-col justify-between gap-6 rounded-2xl border border-primary/25 bg-primary/5 p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary"
        >
          <CheckCircle2 />
        </motion.div>
        <Badge>Ready to render</Badge>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xl font-semibold">{resource?.title ?? "Your resource is ready"}</p>
        <p className="text-sm text-muted-foreground">
          {resource?.description ?? "Data arrived from the API and can now be rendered as UI."}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="grid grid-cols-3 gap-2 text-center"
      >
        <div className="rounded-lg bg-background p-3">
          <p className="font-mono text-lg">{resource?.id ?? "—"}</p>
          <p className="text-[10px] text-muted-foreground">id</p>
        </div>
        <div className="rounded-lg bg-background p-3">
          <p className="font-mono text-lg">
            {response && "meta" in response && "status" in response.meta ? response.meta.status ?? 200 : 200}
          </p>
          <p className="text-[10px] text-muted-foreground">status</p>
        </div>
        <div className="rounded-lg bg-background p-3">
          <p className="font-mono text-lg">Neon</p>
          <p className="text-[10px] text-muted-foreground">source</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function FetchersPage() {
  const [active, setActive] = useState<FetchKind | null>(null)
  const [status, setStatus] = useState<FetchStatus>("idle")
  const [response, setResponse] = useState<ResponsePayload | null>(null)
  const controllerRef = useRef<AbortController | null>(null)

  const runScenario = async (kind: FetchKind) => {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    setActive(kind)
    setStatus("loading")
    setResponse(null)

    try {
      if (kind === "timeout") {
        await new Promise((resolve) => window.setTimeout(resolve, 2000))
        if (controller.signal.aborted) return
        const result: TimeoutResponse = {
          data: null,
          meta: requestMeta(crypto.randomUUID()),
          error: { code: "TIMEOUT", message: "The request exceeded the client timeout budget." },
        }
        setResponse(result)
        setStatus("timeout")
        toast.warning("Request timed out after 2000ms")
        return
      }

      const result = await fetch(`/api/fetchprac?id=${kind === "success" ? 1 : 9999}`, {
        signal: controller.signal,
        cache: "no-store",
      })
      const data = (await result.json()) as ApiResponse
      if (controller.signal.aborted) return

      setResponse(data)
      setStatus(kind)
      setActive(null)

      if (kind === "error") {
        toast.error(`${data.error?.code ?? "REQUEST_FAILED"}: ${data.error?.message ?? "Request failed"}`)
      } else {
        toast.success("Data fetched successfully from Neon")
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return
      const fallback: ApiResponse = {
        data: null,
        meta: requestMeta(crypto.randomUUID()),
        error: { code: "NETWORK_ERROR", message: "The request could not reach the server." },
      }
      setResponse(fallback)
      setStatus("error")
      setActive(null)
      toast.error("Network request failed")
    }
  }

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
          eyebrow="Async request lab"
          title="Fetch handler states"
          description="Practice resilient request handling by connecting a server response to a visible frontend state."
        />
      </motion.div>

      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid gap-4 md:grid-cols-3"
        aria-label="Fetch scenarios"
      >
        {scenarios.map((scenario, index) => {
          const Icon = scenario.icon
          const isLoading = active === scenario.id

          return (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="flex min-h-64 flex-col">
                <CardHeader className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <Icon className={scenario.tone} />
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {scenario.label}
                    </Badge>
                  </div>
                  <CardTitle className="mt-5">{scenario.title}</CardTitle>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    variant={scenario.id === "success" ? "default" : "outline"}
                    disabled={active !== null}
                    onClick={() => void runScenario(scenario.id)}
                  >
                    {isLoading && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="animate-spin" />
                      </motion.div>
                    )}
                    {isLoading ? "Waiting..." : `Run ${scenario.id}`}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.section>

      <motion.section
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>What the student sees</CardTitle>
            <CardDescription>This is the frontend state your component should render.</CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <RenderedResult key={status} status={status} response={response} />
            </AnimatePresence>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col gap-1">
                <CardTitle>Response inspector</CardTitle>
                <CardDescription>Industry-style envelope: data, meta, and error.</CardDescription>
              </div>
              <Badge variant="secondary" className="shrink-0 font-mono text-[10px]">
                JSON
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="min-h-64 overflow-auto"
            >
              <pre className="rounded-xl border bg-muted/50 p-4 font-mono text-xs leading-6 sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.code
                    key={status}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {JSON.stringify(
                      response ?? { data: null, meta: { status: "idle" }, error: null },
                      null,
                      2
                    )}
                  </motion.code>
                </AnimatePresence>
              </pre>
            </motion.div>
          </CardContent>
        </Card>
      </motion.section>
    </motion.div>
  )
}

export { }
