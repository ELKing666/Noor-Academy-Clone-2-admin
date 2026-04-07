# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### نور أكاديمي (Nour Academy) — `artifacts/nour-academy`

Full Arabic RTL educational academy landing page website. **Fully frontend-only — no Express backend.** All data operations go directly through `@supabase/supabase-js` from the React frontend.

**Features:**
- Full RTL Arabic layout with Cairo font
- Deep red (#c0001a) + golden amber color theme
- Navbar with mobile hamburger menu
- Hero section with framer-motion animations
- About section with stats cards and teacher team
- 3 course cards (Bac, English, Robotics) — loaded from Supabase `courses` table
- Testimonials section with star ratings
- FAQ accordion — loaded from Supabase `faq_items` table
- Registration form — inserts directly into Supabase `students` table
- Contact section — loaded from Supabase `contact_info` table
- Red footer
- WhatsApp floating button
- Individual course detail pages at `/courses/:slug`

**Admin panel (`/admin`):**
- Password-protected via `VITE_ADMIN_PASSWORD` env var (client-side check)
- Tab: Courses — full CRUD (add/edit/delete) via Supabase `courses` table
- Tab: Pricing — edit price/note per course via Supabase `course_pricing` table
- Tab: FAQ — add/edit/delete FAQ items via Supabase `faq_items` table
- Tab: Contact — edit phone, email, address via Supabase `contact_info` table

**Supabase tables:**
- `courses` — id (slug PK), title, description, price, duration, image_url, icon, category, is_featured, sort_order, created_at, updated_at
- `students` — id (serial PK), name, phone, course, payment_method, status, created_at
- `course_pricing` — course_slug (PK), price, price_note, updated_at
- `faq_items` — id (PK), question, answer, sort_order, updated_at
- `contact_info` — id (PK, default "main"), phone, email, address, updated_at

**Environment variables (VITE_ prefix required for Vite frontend):**
- `VITE_SUPABASE_URL` — Supabase project URL (e.g. https://xxxx.supabase.co)
- `VITE_SUPABASE_ANON_KEY` — Supabase publishable/anon key
- `VITE_ADMIN_PASSWORD` — password for the /admin panel

**SQL setup:** `artifacts/nour-academy/supabase-setup.sql` — run once in Supabase SQL Editor to create tables, disable RLS, and seed default data.

**Note:** The `artifacts/api-server` and `lib/db` packages are legacy and no longer used by the frontend. The Express backend and Drizzle ORM setup can be ignored.
