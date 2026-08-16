<p align="center">
  <img src="./public/MareLogo.png" alt="MARE - A calmer way to learn Next.js" width="200" />
</p>

# 🧘 MARE

### A calmer way to learn Next.js

MARE is a focused Next.js preset practice studio for learning the boundaries of modern web applications without turning every concept into a large project.

Instead of presenting isolated documentation examples, MARE gives each concept a small, inspectable surface: render cards, fetch data, validate forms, load content lazily, work with cache behavior, model access control, and explore an AI chat boundary. Each practice area is intentionally narrow so you can build a mental model, make a change, and observe what happens.

> Learn one boundary at a time. Make a small thing. Watch it work.

---

## 📚 Contents

- [What MARE includes](#-what-mare-includes)
- [Practice surfaces](#-practice-surfaces)
- [Technology stack](#-technology-stack)
- [Architecture](#-architecture)
- [Themes and design system](#-themes-and-design-system)
- [Environment variables](#-environment-variables)
- [Getting started](#-getting-started)
- [Database setup](#-database-setup)
- [Testing](#-testing)
- [Continuous integration](#-continuous-integration)
- [Project structure](#-project-structure)
- [Production checklist](#-production-checklist)
- [License](#-license)

---

## 🧩 What MARE includes

- A minimal, responsive learning workspace for desktop, tablet, and mobile.
- Small practice labs focused on real Next.js application boundaries.
- App Router pages and route handlers using the current Next.js architecture.
- Neon/Postgres persistence through Drizzle ORM.
- Next.js server caching with tagged invalidation through `unstable_cache` and `revalidateTag`.
- Password hashing with `bcryptjs` and JWT/RBAC practice using `jose`.
- AI chat with streamed responses through OpenRouter and the Vercel AI SDK.
- Cloudinary-ready media and attachment handling.
- Unit tests for deterministic application logic with Jest.
- GitHub Actions quality checks for linting, unit tests, and production builds.
- Theme switching with multiple visual presets and reduced-motion support.
- Baseline security headers configured in `next.config.mjs`.

## 🎯 Practice surfaces

| Route | Focus | What to explore |
| --- | --- | --- |
| `/` | Overview | Navigate the practice map and choose a learning surface. |
| `/cards` | Cards | Composition, variants, and reusable UI patterns. |
| `/theming` | Theming | Choose from 10 visual themes, preview light/dark palettes, copy hex values, and inspect CSS tokens. |
| `/cache` | Cache | Data persistence, cache reads, writes, and invalidation behavior. |
| `/fetchers` | Fetchers | Loading, success, empty, and failure states for async requests. |
| `/lazy` | Lazy render | Intersection Observer and viewport-aware rendering. |
| `/form` | Form practice | Validation, controlled inputs, uploads, and server persistence. |
| `/jwt` | JWT-RBAC | Authentication concepts, signed sessions, and role-based access. |
| `/aichat` | AI chat | Streaming model responses and a focused chat interaction. |

---

## 🛠️ Technology stack

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white" alt="Next.js 16" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111827" alt="React 19" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" /></a>
  <a href="https://ui.shadcn.com/"><img src="https://img.shields.io/badge/shadcn%2Fui-components-111827?logo=shadcnui&logoColor=white" alt="shadcn/ui" /></a>
</p>

<p align="center">
  <a href="https://jestjs.io/"><img src="https://img.shields.io/badge/Jest-30-C21325?logo=jest&logoColor=white" alt="Jest 30" /></a>
  <a href="https://orm.drizzle.team/"><img src="https://img.shields.io/badge/Drizzle_ORM-Postgres-C5F74F?logo=drizzle&logoColor=111827" alt="Drizzle ORM" /></a>
  <a href="https://neon.tech/"><img src="https://img.shields.io/badge/Neon-Postgres-00E599?logo=neon&logoColor=111827" alt="Neon Postgres" /></a>
  <a href="https://cloudinary.com/"><img src="https://img.shields.io/badge/Cloudinary-media-3448C5?logo=cloudinary&logoColor=white" alt="Cloudinary" /></a>
  <a href="https://openrouter.ai/"><img src="https://img.shields.io/badge/OpenRouter-AI-111827?logo=openai&logoColor=white" alt="OpenRouter" /></a>
  <a href="https://zod.dev/"><img src="https://img.shields.io/badge/Zod-validation-3E67B1?logo=zod&logoColor=white" alt="Zod" /></a>
</p>

### Core technologies

- **Next.js 16** — App Router, server-rendered pages, route handlers, metadata, and production builds.
- **React 19** — Interactive client components and modern React patterns.
- **TypeScript** — Strict application typing and safer refactoring.
- **Tailwind CSS 4** — Utility-first styling with theme tokens.
- **shadcn/ui and Base UI** — Accessible primitives composed into project-specific components.
- **Lucide React** — Consistent interface icons.
- **Framer Motion** — Purposeful animations and smooth transitions.
- **Zod** — Type-safe schema validation for forms and API inputs.

### Data, auth, and AI

- **Neon Postgres** — Primary relational database through `DATABASE_URL`.
- **Drizzle ORM** — Typed schema and SQL access in `lib/db`.
- **Next.js Cache** — Server-side caching with tagged invalidation through `unstable_cache` and `revalidateTag`.
- **`jose`** — JWT signing and verification practice.
- **`bcryptjs`** — Password hashing for persisted form and RBAC records.
- **OpenRouter** — Optional AI model gateway configured with `OPENROUTER_API_KEY`.
- **Vercel AI SDK** — Streaming AI responses and chat behavior.
- **Cloudinary** — Optional image and attachment delivery integration.

### Quality and delivery

- **Jest + ts-jest** — Logic-focused unit testing with mocks and failure cases.
- **ESLint** — Static analysis and Next.js-aware lint rules.
- **GitHub Actions** — Automated lint, unit test, and production build checks.
- **Vercel-ready** — Designed for deployment on Vercel with environment variables configured in project settings.

---

## 🏗️ Architecture

MARE uses a small App Router architecture designed to keep learning surfaces easy to inspect:

```text
app/
├── page.tsx                 # Overview and practice map
├── cards/page.tsx           # Cards practice
├── theming/page.tsx         # Theme practice and token inspector
├── cache/page.tsx           # Cache practice UI
├── fetchers/page.tsx        # Async request states
├── lazy/page.tsx            # Viewport-aware lazy rendering
├── form/page.tsx            # Form and upload practice
├── jwt/page.tsx             # JWT/RBAC practice
├── aichat/page.tsx          # Streamed AI chat
└── api/                     # Route handlers for server-side behavior

components/
├── app-shell.tsx            # Navigation, theme controls, and page shell
├── page-intro.tsx           # Reusable practice page introduction
├── site-footer.tsx          # Global footer and external links
├── chat/                    # Chat message and input components
└── ui/                      # Reusable UI primitives

lib/
├── db/                      # Drizzle client and schema
├── practice-logic.ts        # Pure functions covered by unit tests
├── jwt-rbac.ts              # JWT/RBAC utilities
├── chat-responses.ts        # Chat response helpers
├── items.ts                 # Item data access
└── lazy-items.ts            # Lazy-render data access

scripts/
├── migrate.ts               # Database migration runner
└── seed.ts                  # Development seed data

tests/
└── practice-logic.test.ts   # Jest unit tests
```

### Data flow principles

1. Pages own the learning experience and keep the UI close to the concept being demonstrated.
2. Route handlers own server-side validation, persistence, and external service access.
3. `lib/` contains shared data access and pure helpers rather than page-specific UI logic.
4. Database queries use Drizzle and parameterized operations.
5. User-facing data is kept dynamic where the practice requires it; no browser `localStorage` persistence is used as a substitute for the database.

---

## 🎨 Themes and design system

MARE uses a calm, editorial interface designed to reduce visual noise while keeping important states clear.

- Ten curated theme presets are available: Sage Studio, Quiet Ocean, Soft Clay, Lavender Paper, Golden Hour, Ink and Moss, Dusty Rose, Open Sky, Citrus Note, and Quiet Plum.
- The dedicated `/theming` practice page lets you switch themes, preview example cards, compare light and dark palettes, copy individual hex values, and copy a complete CSS token block.
- The navigation theme selector changes the active visual preset across the application, while the mode control switches the full app between light and dark presentation.
- Colors are defined through semantic CSS variables rather than scattered hard-coded values.
- Typography is intentionally restrained to a small number of font families.
- Layouts are mobile-first and use flexible containers, responsive grids, and stacked controls where necessary.
- Animations are subtle and purposeful, including Overview entrance motion, typing-style theme labeling, hover states, and lazy-render transitions.
- `prefers-reduced-motion` is respected globally.
- Interactive elements include keyboard focus states and screen-reader labels.

The shared visual primitives are in `components/ui`, while page-specific compositions remain in their respective routes.

---

## 🔐 Environment variables

Copy the example file before starting local development:

```bash
cp .env.example .env.local
```

The current example file contains:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes for database features | Neon/Postgres connection string used by Drizzle. |
| `JWT_SECRET` | Yes for JWT/RBAC production usage | Secret used for signing application JWTs. Use at least 32 random characters. |
| `OPENROUTER_API_KEY` | Only for AI chat | Authenticates requests to OpenRouter. |
| `OPENROUTER_BASE_URL` | Optional | OpenRouter-compatible API base URL. Defaults to `https://openrouter.ai/api/v1`. |
| `CLOUDINARY_CLOUD_NAME` | Only for uploads | Cloudinary cloud identifier used by the form upload flow. |
| `CLOUDINARY_API_KEY` | Only for uploads | Cloudinary API key used for server-side upload authentication. |
| `CLOUDINARY_API_SECRET` | Only for uploads | Cloudinary API secret; keep this value server-side. |

### Environment safety

- Never commit `.env.local` or real secrets.
- Use separate credentials for local, preview, and production environments.
- Generate a strong random `JWT_SECRET`; do not use a demo or repository value.
- Configure environment variables in Vercel Project Settings for deployed environments.
- Keep optional providers unset when the related practice is not being used.

Cloudinary remains optional and is only needed when enabling the upload flow.

---

## 🚀 Getting started

### Prerequisites

- Node.js 22 or newer
- npm 10+ or pnpm 10+
- A Neon/Postgres database for persisted features
- OpenRouter credentials if you want to use the AI chat practice

### Install

```bash
git clone https://github.com/<your-account>/<your-repository>.git
cd <your-repository>
npm install
```

Using pnpm:

```bash
pnpm install
```

### Configure local environment

```bash
cp .env.example .env.local
```

Fill in the required values in `.env.local`, especially `DATABASE_URL` and `JWT_SECRET`.

### Prepare the database

Run migrations and seed development data:

```bash
npm run migrate
npm run db:seed
```

Or with pnpm:

```bash
pnpm migrate
pnpm db:seed
```

### Start development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

---

## 🗄️ Database setup

MARE uses Neon Postgres with Drizzle ORM. The database schema is defined in `lib/db/schema.ts`.

### Migration workflow

1. Make changes to `lib/db/schema.ts`.
2. Generate a migration file:

```bash
npm run db:generate
```

3. Run the migration against your database:

```bash
npm run migrate
```

### Seed data

Development seed data is available through:

```bash
npm run db:seed
```

This populates the database with sample data for the practice surfaces. Do not run seed scripts against production databases unless explicitly intended.

---

## 🧪 Testing

MARE uses unit tests for deterministic application logic. These tests are intentionally not end-to-end API tests: they do not require a browser, external services, or a running database.

Run the unit suite:

```bash
npm run test:unit
```

The command runs Jest in-band with coverage enabled. The current suite covers pure logic used by the practice surfaces, including:

- Fetch response classification.
- Form validation success and failure cases.
- Lazy-render visibility decisions.
- Cache timestamp formatting.
- JWT/RBAC role authorization.
- Chat message normalization.

Coverage thresholds are configured in `jest.config.ts` for the tested logic module. Add tests for new deterministic behavior before expanding the implementation.

---

## 🔄 Continuous integration

GitHub Actions is configured at `.github/workflows/quality.yml`.

For pushes and pull requests targeting `main` or `master`, CI runs:

```text
pnpm install --frozen-lockfile
pnpm lint
pnpm test:unit
pnpm build
```

A pull request should be green across all three quality gates before it is merged.

---

## 📁 Project structure

```
mare-learning-sandbox/
├── app/                      # App Router pages and API routes
│   ├── api/                  # Route handlers
│   ├── cards/                # Cards practice page
│   ├── theming/              # Theming practice page
│   ├── cache/                # Cache practice page
│   ├── fetchers/             # Fetch practice page
│   ├── lazy/                 # Lazy render practice page
│   ├── form/                 # Form practice page
│   ├── jwt/                  # JWT/RBAC practice page
│   ├── aichat/               # AI chat practice page
│   └── layout.tsx            # Root layout
├── components/               # Reusable React components
│   ├── chat/                 # Chat-specific components
│   ├── ui/                   # UI primitives (shadcn/ui)
│   ├── app-shell.tsx         # Navigation and shell
│   ├── page-intro.tsx        # Page introduction component
│   └── site-footer.tsx       # Global footer
├── lib/                      # Utilities and shared logic
│   ├── db/                   # Drizzle client and schema
│   ├── practice-logic.ts     # Pure functions
│   ├── jwt-rbac.ts           # JWT/RBAC utilities
│   ├── chat-responses.ts     # Chat helpers
│   ├── items.ts              # Item data access
│   └── lazy-items.ts         # Lazy render data
├── scripts/                  # Database and utility scripts
│   ├── migrate.ts            # Migration runner
│   └── seed.ts               # Seed data
├── tests/                    # Unit tests
│   └── practice-logic.test.ts
├── public/                   # Static assets
│   └── MareLogo.png          # Project logo
├── .env.example              # Environment variable template
├── next.config.mjs           # Next.js configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── jest.config.ts            # Jest test configuration
└── README.md                 # Project documentation
```

---

## ✅ Production checklist

Before deploying MARE:

- [ ] Set `DATABASE_URL` in the deployment environment.
- [ ] Set a strong production `JWT_SECRET`.
- [ ] Set `OPENROUTER_API_KEY` if AI chat is enabled.
- [ ] Run database migrations against the intended database.
- [ ] Confirm seed scripts are not being run against production data unless explicitly intended.
- [ ] Run `npm run lint`.
- [ ] Run `npm run test:unit`.
- [ ] Run `npm run build`.
- [ ] Review security headers in `next.config.mjs`.
- [ ] Confirm preview and production environment variables are not mixed.
- [ ] Verify responsive layouts at mobile, tablet, and desktop widths.

---

## 📄 License

MIT License

Copyright (c) 2026 Richky Abednego

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

<p align="center">
  Built with intention for learning Next.js one boundary at a time.
</p>

<p align="center">
  Built with ❤️ by <a href="https://github.com/zannunakiz">Richky</a>
</p>
