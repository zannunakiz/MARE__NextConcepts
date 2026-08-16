import "dotenv/config"
import { hash } from "bcryptjs"
import { Pool } from "pg"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function seed() {
  await pool.query(
    `INSERT INTO fetchprac (id, title, description)
     VALUES ($1, $2, $3)
     ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, updated_at = NOW()`,
    [1, "Data fetching with intent", "A seeded record for practicing success, error, and timeout response states."],
  )
  const accounts = [
    { email: "normal@mare.local", password: "NormalPass123!", role: "normal" },
    { email: "admin@mare.local", password: "AdminPass123!", role: "admin" },
    { email: "boss@mare.local", password: "BossPass123!", role: "boss" },
  ] as const

  for (const account of accounts) {
    const hashedPassword = await hash(account.password, 12)
    await pool.query(
      `INSERT INTO jwtrbacusers (email, hashed_password, role)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET hashed_password = EXCLUDED.hashed_password, role = EXCLUDED.role`,
      [account.email, hashedPassword, account.role],
    )
  }
  console.log("Seeded fetchprac row 1 and JWT-RBAC learning accounts")
}

seed()
  .catch((error) => {
    console.error("Database seed failed", error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
  .finally(() => pool.end())
