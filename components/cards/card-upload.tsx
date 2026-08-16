"use client"

import * as React from "react"
import { toast } from "sonner"
import { Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CardFrame } from "@/components/cards/card-frame"

  const source = `"use client"

import * as React from "react"
import { toast } from "sonner"
import { Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CardFrame } from "@/components/cards/card-frame"


export function UploadCard() {
  const [dragging, setDragging] = React.useState(false)
  const [fileName, setFileName] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <CardFrame title="Upload card" fileName="components/cards/card-upload.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Upload files</CardTitle>
          <CardDescription>Drag files here or browse from your device.</CardDescription>
        </CardHeader>
        <CardContent>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(event) => {
              event.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault()
              setDragging(false)
              const file = event.dataTransfer.files[0]
              if (file) {
                setFileName(file.name)
                toast.success(\`\${file.name} ready to upload\`)
              }
            }}
            className={cn(
              "flex w-full flex-col items-center gap-2 rounded-md border border-dashed py-8 text-center transition-colors",
              dragging ? "border-primary bg-primary/5" : "border-border",
            )}
          >
            <Upload className={cn("size-6", dragging ? "text-primary" : "text-muted-foreground")} />
            <p className="max-w-full truncate px-4 text-xs text-muted-foreground">
              {fileName ?? "SVG, PNG or JPG, up to 10MB"}
            </p>
          </button>
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) {
                setFileName(file.name)
                toast.success(\`\${file.name} ready to upload\`)
              }
            }}
          />
        </CardContent>
      </Card>
    </CardFrame>
  )
}
`

export function UploadCard() {
  const [dragging, setDragging] = React.useState(false)
  const [fileName, setFileName] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <CardFrame title="Upload card" fileName="components/cards/card-upload.tsx" source={source}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Upload files</CardTitle>
          <CardDescription>Drag files here or browse from your device.</CardDescription>
        </CardHeader>
        <CardContent>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(event) => {
              event.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault()
              setDragging(false)
              const file = event.dataTransfer.files[0]
              if (file) {
                setFileName(file.name)
                toast.success(`${file.name} ready to upload`)
              }
            }}
            className={cn(
              "flex w-full flex-col items-center gap-2 rounded-md border border-dashed py-8 text-center transition-colors",
              dragging ? "border-primary bg-primary/5" : "border-border",
            )}
          >
            <Upload className={cn("size-6", dragging ? "text-primary" : "text-muted-foreground")} />
            <p className="max-w-full truncate px-4 text-xs text-muted-foreground">
              {fileName ?? "SVG, PNG or JPG, up to 10MB"}
            </p>
          </button>
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) {
                setFileName(file.name)
                toast.success(`${file.name} ready to upload`)
              }
            }}
          />
        </CardContent>
      </Card>
    </CardFrame>
  )
}
