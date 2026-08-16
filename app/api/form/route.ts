import { db } from "@/lib/db"
import { form } from "@/lib/db/schema"
import { hash } from "bcryptjs"
import { v2 as cloudinary } from "cloudinary"
import { NextResponse } from "next/server"
import { z } from "zod"

const formSchema = z.object({
  fullName: z.string().min(2), email: z.string().email(), password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/),
  age: z.coerce.number().int().min(13).max(100), role: z.string().min(1), skills: z.array(z.string()).min(1),
  experience: z.enum(["beginner", "intermediate", "advanced"]), updates: z.coerce.boolean(), terms: z.literal("true"), bio: z.string().min(20).max(300),
  startDate: z.string().min(1), notifications: z.coerce.boolean(), intensity: z.coerce.number().min(1).max(10),
})

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET, secure: true })

async function uploadFile(file: File | null, resourceType: "image" | "raw") {
  if (!file || file.size === 0) return null
  const bytes = Buffer.from(await file.arrayBuffer())
  return new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: "mare/form", resource_type: resourceType }, (error, result) => {
      if (error || !result) reject(error ?? new Error("Cloudinary upload failed"))
      else resolve({ secure_url: result.secure_url })
    })
    stream.end(bytes)
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.formData()
    const parsed = formSchema.safeParse({
      fullName: body.get("fullName"), email: body.get("email"), password: body.get("password"), age: body.get("age"), role: body.get("role"),
      skills: JSON.parse(String(body.get("skills") ?? "[]")), experience: body.get("experience"), updates: body.get("updates"), terms: body.get("terms"),
      bio: body.get("bio"), startDate: body.get("startDate"), notifications: body.get("notifications"), intensity: body.get("intensity"),
    })
    if (!parsed.success) return NextResponse.json({ message: "Please check the form fields.", issues: parsed.error.flatten().fieldErrors }, { status: 400 })
    const image = body.get("avatar") instanceof File ? body.get("avatar") as File : null
    const attachment = body.get("attachment") instanceof File ? body.get("attachment") as File : null
    const [uploadedImage, uploadedAttachment] = await Promise.all([uploadFile(image, "image"), uploadFile(attachment, "raw")])
    const values = parsed.data
    const [created] = await db.insert(form).values({ ...values, age: String(values.age), intensity: String(values.intensity), updates: String(values.updates), terms: String(values.terms), notifications: String(values.notifications), passwordHash: await hash(values.password, 12), imageUrl: uploadedImage?.secure_url ?? null, attachmentUrl: uploadedAttachment?.secure_url ?? null, attachmentName: attachment?.name ?? null }).returning({ id: form.id, createdAt: form.createdAt, imageUrl: form.imageUrl, attachmentUrl: form.attachmentUrl })
    return NextResponse.json({ status: "success", message: "Submit Success! Image successfully saved to Cloudinary, Data stored in database.", data: created }, { status: 201 })
  } catch (error) {
    console.error("[v0] Form submission failed", error)
    return NextResponse.json({ message: "Unable to save the form right now." }, { status: 500 })
  }
}
