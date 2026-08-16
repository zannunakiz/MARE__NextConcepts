"use client"

import * as React from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CardFrame } from "@/components/cards/card-frame"

type Row = { name: string; status: "Paid" | "Pending"; value: string }

const initialRows: Row[] = [
  { name: "Invoice #204", status: "Paid", value: "$1,240" },
  { name: "Invoice #205", status: "Pending", value: "$860" },
  { name: "Invoice #206", status: "Paid", value: "$2,150" },
]

  const source = `"use client"

import * as React from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CardFrame } from "@/components/cards/card-frame"

type Row = { name: string; status: "Paid" | "Pending"; value: string }

const initialRows: Row[] = [
  { name: "Invoice #204", status: "Paid", value: "$1,240" },
  { name: "Invoice #205", status: "Pending", value: "$860" },
  { name: "Invoice #206", status: "Paid", value: "$2,150" },
]


export function TableCard() {
  const [rows, setRows] = React.useState<Row[]>(initialRows)

  const markPaid = (index: number) => {
    setRows((current) => current.map((row, rowIndex) => (rowIndex === index ? { ...row, status: "Paid" } : row)))
    toast.success("Invoice marked as paid")
  }

  return (
    <CardFrame title="Table card" fileName="components/cards/card-table.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Recent invoices</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-0.5">
          {rows.map((row, index) => (
            <button
              key={row.name}
              type="button"
              disabled={row.status === "Paid"}
              onClick={() => markPaid(index)}
              className="flex items-center justify-between gap-2 border-b border-border/70 py-2.5 text-left text-sm last:border-0 disabled:cursor-default"
            >
              <span className="min-w-0 truncate">{row.name}</span>
              <Badge variant={row.status === "Paid" ? "secondary" : "outline"} className="mx-3 shrink-0">
                {row.status}
              </Badge>
              <span className="shrink-0 font-mono text-xs">{row.value}</span>
            </button>
          ))}
        </CardContent>
      </Card>
    </CardFrame>
  )
}
`

export function TableCard() {
  const [rows, setRows] = React.useState<Row[]>(initialRows)

  const markPaid = (index: number) => {
    setRows((current) => current.map((row, rowIndex) => (rowIndex === index ? { ...row, status: "Paid" } : row)))
    toast.success("Invoice marked as paid")
  }

  return (
    <CardFrame title="Table card" fileName="components/cards/card-table.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Recent invoices</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-0.5">
          {rows.map((row, index) => (
            <button
              key={row.name}
              type="button"
              disabled={row.status === "Paid"}
              onClick={() => markPaid(index)}
              className="flex items-center justify-between gap-2 border-b border-border/70 py-2.5 text-left text-sm last:border-0 disabled:cursor-default"
            >
              <span className="min-w-0 truncate">{row.name}</span>
              <Badge variant={row.status === "Paid" ? "secondary" : "outline"} className="mx-3 shrink-0">
                {row.status}
              </Badge>
              <span className="shrink-0 font-mono text-xs">{row.value}</span>
            </button>
          ))}
        </CardContent>
      </Card>
    </CardFrame>
  )
}
