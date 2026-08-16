"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function RouteLoadingIndicator() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timer = window.setTimeout(() => setLoading(false), 320)
    return () => window.clearTimeout(timer)
  }, [pathname])

  return <div aria-hidden="true" className={`pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5 origin-left bg-primary transition-transform duration-300 motion-reduce:transition-none ${loading ? "scale-x-100" : "scale-x-0"}`} />
}
