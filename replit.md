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

**Features:**
- Admin page at `/admin` — password-protected panel to edit pricing, FAQ, and contact info live

**Backend API (via api-server):**
- `POST /api/register` — register a student (saves to DB, fire-and-forget Google Sheets sync)
- `GET /api/students` — list all students
- `GET /api/export` — download students CSV (UTF-8 BOM for Arabic Excel support)
- `GET /api/healthz` — health check
- `GET /api/content` — public: returns all editable site content (FAQ, pricing, contact)
- `POST /api/admin/login` — validate admin password
- `GET /api/admin/content` — protected: returns editable content
- `PUT /api/admin/content` — protected: saves updated content to DB
- `GET /api/courses` — public: returns all courses (auto-seeded with 3 defaults)
- `GET /api/courses/:id` — public: returns single course by slug
- `POST /api/admin/courses` — protected: create a new course
- `PUT /api/admin/courses/:id` — protected: update a course
- `DELETE /api/admin/courses/:id` — protected: delete a course

**Database:**
- `students` table: id, name, phone, course, payment_method, status, created_at
- `site_settings` table: key (PK), value (JSON text), updated_at
- `course_pricing` table: course_slug (PK), price, price_note, updated_at
- `faq_items` table: id (PK), question, answer, sort_order, updated_at
- `contact_info` table: id (PK, default "main"), phone, email, address, updated_at
- `courses` table: id (slug PK), title, description, price, duration, image_url, icon, category, is_featured, sort_order, created_at, updated_at

**Admin panel (`/admin`):**
- Tab: Courses — full CRUD (add/edit/delete) with modal form; auto-seeded with bac/english/robotics defaults
- Tab: Pricing — edit price and price note per course (legacy 3-course pricing)
- Tab: FAQ — add/edit/delete FAQ items
- Tab: Contact — edit phone, email, address

**Environment variables:**
- `DATABASE_URL` — PostgreSQL connection string (auto-set by Replit DB)
- `GOOGLE_SCRIPT_URL` — optional, Google Apps Script URL for Sheets sync
- `ADMIN_PASSWORD` — secret: password for the /admin panel
