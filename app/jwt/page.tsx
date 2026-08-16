"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, KeyRound, LoaderCircle, LogOut, ShieldCheck, ShieldX, UserRound } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

const tabs = ["login", "signup", "me"] as const
const accessLevels: Array<{ role: User["role"]; title: string; description: string }> = [
  { role: "normal", title: "Normal access", description: "Available to every authenticated role." },
  { role: "admin", title: "Admin access", description: "Available to admin and boss roles." },
  { role: "boss", title: "Boss access", description: "Restricted to the boss role." },
]

type Tab = (typeof tabs)[number]
type User = { id: number; email: string; role: "normal" | "admin" | "boss" }
type Envelope = { data: { user?: User; granted?: boolean; currentRole?: User["role"]; requiredRole?: string; message?: string } | null; error: { message: string; code: string } | null; meta: { status: number } }

function passwordStrength(password: string) {
  if (password.length < 8) return { label: "Weak", score: 1 }
  let score = 1
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score++
  if (password.length >= 14) score++
  return { label: ["", "Weak", "Moderate", "Strong", "Sigma"][score], score }
}

async function requestApi(path: string, options?: RequestInit) {
  const response = await fetch(path, { ...options, headers: { "Content-Type": "application/json", ...options?.headers } })
  const body = await response.json() as Envelope
  if (!response.ok && !body.data) throw new Error(body.error?.message ?? "Request failed")
  return body
}

export default function JwtRbacPage() {
  const [tab, setTab] = useState<Tab>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(false)
  const [accessResults, setAccessResults] = useState<Record<string, { granted: boolean; message: string }>>({})
  const strength = useMemo(() => passwordStrength(password), [password])

  useEffect(() => {
    if (tab !== "me") return
    setLoading(true)
    requestApi("/api/jwt-rbac").then((body) => setUser(body.data?.user ?? null)).catch(() => setUser(null)).finally(() => setLoading(false))
  }, [tab])

  async function authenticate() {
    setLoading(true); setFeedback("")
    try {
      const body = await requestApi(`/api/jwt-rbac?action=${tab === "signup" ? "signup" : "login"}`, { method: "POST", body: JSON.stringify({ email, password }) })
      setUser(body.data?.user ?? null); setFeedback(tab === "signup" ? "Account created and signed in." : "Signed in successfully."); setTab("me")
    } catch (error) { setFeedback(error instanceof Error ? error.message : "Unable to authenticate.") } finally { setLoading(false) }
  }

  async function updateRole(role: User["role"]) {
    setLoading(true)
    try { const body = await requestApi("/api/jwt-rbac", { method: "PATCH", body: JSON.stringify({ role }) }); setUser(body.data?.user ?? null); setFeedback(`Role updated to ${role}.`) }
    catch (error) { setFeedback(error instanceof Error ? error.message : "Unable to update role.") } finally { setLoading(false) }
  }

  async function checkAccess(role: User["role"]) {
    setLoading(true)
    try { const body = await requestApi("/api/jwt-rbac", { method: "PUT", body: JSON.stringify({ requiredRole: role }) }); setAccessResults((current) => ({ ...current, [role]: { granted: Boolean(body.data?.granted), message: body.data?.message ?? "Access checked." } })) }
    catch (error) { setAccessResults((current) => ({ ...current, [role]: { granted: false, message: error instanceof Error ? error.message : "Access check failed." } })) } finally { setLoading(false) }
  }

  async function logout() { await requestApi("/api/jwt-rbac", { method: "DELETE" }); setUser(null); setTab("login"); setFeedback("You have been logged out.") }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Practice lab / auth</p>
            <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">JWT-RBAC, made visible.</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">Learn how signed tokens, password hashing, and role-based access control work together in a real request flow.</p>
          </div>
          <Badge variant="outline" className="w-fit gap-2">
            <KeyRound className="size-3" />
            Learning sandbox
          </Badge>
        </header>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <Card>
          <CardHeader>
            <CardTitle>Authentication flow</CardTitle>
            <CardDescription>Create an account or sign in to inspect the token-backed session.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-3 rounded-xl border bg-muted/30 p-1">
              {tabs.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={cn(
                    "cursor-pointer rounded-lg px-2 py-2 text-sm capitalize transition-all",
                    tab === item ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {item === "signup" ? "Sign up" : item === "me" ? "Me" : "Login"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {tab === "me" ? (
                <motion.div
                  key="me"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {loading ? (
                    <LoaderCircle className="animate-spin text-primary" />
                  ) : user ? (
                    <>
                      <div className="rounded-xl border bg-secondary/30 p-4">
                        <div className="flex items-center gap-3">
                          <UserRound className="text-primary" />
                          <div>
                            <p className="font-medium">{user.email}</p>
                            <p className="text-sm text-muted-foreground">Signed token session</p>
                          </div>
                          <Badge className="ml-auto capitalize">{user.role}</Badge>
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-sm font-medium">Change learning role</p>
                        <div className="flex flex-wrap gap-2">
                          {(["normal", "admin", "boss"] as User["role"][]).map((role) => (
                            <Button
                              key={role}
                              variant={user.role === role ? "default" : "outline"}
                              size="sm"
                              onClick={() => updateRole(role)}
                              disabled={loading}
                              className="capitalize"
                            >
                              {role}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" onClick={logout} className="w-full">
                        <LogOut />
                        Log out
                      </Button>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">No valid token found. Sign in to inspect your account.</p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="auth"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    aria-label="Email"
                  />
                  <Input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                    aria-label="Password"
                  />
                  {tab === "signup" && (
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <span
                            key={level}
                            className={cn(
                              "h-1.5 flex-1 rounded-full bg-muted",
                              level <= strength.score && (
                                strength.score === 4 ? "bg-primary" :
                                  strength.score === 3 ? "bg-accent" :
                                    strength.score === 2 ? "bg-secondary" :
                                      "bg-destructive"
                              )
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password strength: <span className="font-medium text-foreground">{strength.label}</span>
                      </p>
                    </div>
                  )}
                  <Button
                    onClick={authenticate}
                    disabled={loading || !email || password.length < 8}
                    className="w-full"
                  >
                    {loading && <LoaderCircle className="animate-spin" />}
                    {tab === "signup" ? "Create account" : "Sign in"}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {feedback && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                className="rounded-lg border bg-secondary/40 p-3 text-sm text-muted-foreground"
              >
                {feedback}
              </motion.p>
            )}
          </CardContent>
        </Card>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Authorization tests</p>
            <h2 className="mt-2 font-serif text-2xl">Who can enter?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Each check sends a request with the current session cookie.</p>
          </div>

          {accessLevels.map((item, index) => {
            const result = accessResults[item.role]
            return (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="transition-colors hover:border-primary/40">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                      {result ? (
                        result.granted ? <ShieldCheck className="text-primary" /> : <ShieldX className="text-destructive" />
                      ) : (
                        <ShieldCheck className="text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{item.title}</h3>
                        <Badge variant="outline" className="capitalize">{item.role}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{result?.message ?? item.description}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => checkAccess(item.role)}
                      disabled={loading}
                      className="shrink-0"
                    >
                      {loading ? <LoaderCircle className="animate-spin" /> : <CheckCircle2 />}
                      Check access
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}