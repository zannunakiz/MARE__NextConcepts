import "dotenv/config"
import { Pool } from "pg"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS form (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      age TEXT NOT NULL,
      role TEXT NOT NULL,
      skills JSONB NOT NULL,
      experience TEXT NOT NULL,
      updates TEXT NOT NULL,
      terms TEXT NOT NULL,
      bio TEXT NOT NULL,
      start_date TEXT NOT NULL,
      notifications TEXT NOT NULL,
      intensity TEXT NOT NULL,
      image_url TEXT,
      attachment_url TEXT,
      attachment_name TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price INTEGER NOT NULL CHECK (price > 0 AND price <= 9999999),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS fetchprac (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS jwtrbacusers (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      hashed_password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'normal' CHECK (role IN ('normal', 'admin', 'boss')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  console.log("FORM, ITEMS, FETCHPRAC, and JWTRBACUSERS tables are ready")
}

migrate().catch((error) => {
  console.error(error)
  process.exitCode = 1
}).finally(() => pool.end())
