import { integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const form = pgTable("form", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  passwordHash: text("password_hash").notNull(),
  age: text("age").notNull(),
  role: text("role").notNull(),
  skills: jsonb("skills").$type<string[]>().notNull(),
  experience: text("experience").notNull(),
  updates: text("updates").notNull(),
  terms: text("terms").notNull(),
  bio: text("bio").notNull(),
  startDate: text("start_date").notNull(),
  notifications: text("notifications").notNull(),
  intensity: text("intensity").notNull(),
  imageUrl: text("image_url"),
  attachmentUrl: text("attachment_url"),
  attachmentName: text("attachment_name"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const fetchprac = pgTable("fetchprac", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

export const jwtrbacusers = pgTable("jwtrbacusers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  role: text("role", { enum: ["normal", "admin", "boss"] }).notNull().default("normal"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})
