# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### نور أكاديمي (Nour Academy) — `artifacts/nour-academy`

Full Arabic RTL educational academy landing page website.

**Features:**
- Full RTL Arabic layout with Cairo font
- Deep red (#c0001a) + golden amber color theme
- Navbar with mobile hamburger menu
- Hero section with framer-motion animations
- About section with stats cards and teacher team
- 3 course cards (Bac, English, Robotics)
- Testimonials section with star ratings
- FAQ accordion
- Registration form with real API integration
- Contact section
- Red footer
- WhatsApp floating button

**Backend API (via api-server):**
- `POST /api/register` — register a student (saves to DB, fire-and-forget Google Sheets sync)
- `GET /api/students` — list all students
- `GET /api/export` — download students CSV (UTF-8 BOM for Arabic Excel support)
- `GET /api/healthz` — health check

**Database:**
- `students` table: id, name, phone, course, payment_method, status, created_at

**Environment variables:**
- `DATABASE_URL` — PostgreSQL connection string (auto-set by Replit DB)
- `GOOGLE_SCRIPT_URL` — optional, Google Apps Script URL for Sheets sync
