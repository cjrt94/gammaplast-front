# Gamma Plast — Overview

## What this is

Gamma Plast is the corporate website (and self-service content back office) for **Gamma Plast**, a Peruvian B2B manufacturer of functional, sustainable **flexible packaging** (doypacks, pouches, laminated and mono-layer film, PE/PP structures) based in Lima.

The project is a single **Nuxt 3 SSR** application that serves two audiences from one codebase:

1. **Public marketing site** — institutional landing, product catalog by industry sector, company/about, news, and lead-capture forms (general contact, advisor request, careers).
2. **Admin back office (`/admin`)** — a CMS + lead inbox that lets staff edit **all editable site content** and read every form submission, backed by Firebase.

## Business context

- **Audience:** industrial B2B buyers across sectors — food & beverage, fishing/agro-industry, textile, secure shipping, cleaning & personal care, retail/marketing, and general industry.
- **Goal:** present the catalog and brand, and convert visitors into qualified leads (general contact + "talk to an advisor" + careers), all delivered by email (Resend) and persisted for the back office.
- **Language:** ES/EN with i18n; Spanish is the primary locale, English currently falls back where content is not translated.
- **Domain:** `gammaplast.com.pe`.

## Scope

- **In scope:** public site, SEO (per-page titles/descriptions, JSON-LD, sitemap, `llms.txt`), lead capture + email delivery, and a full CMS where essentially **100% of editable content** (copy, images, catalog, news, certifications, client logos, contact info, per-page SEO, site settings) lives in Firestore and is editable from `/admin`. Only "chrome" remains hardcoded (form labels, navigation, brand assets).
- **Out of scope (current):** e-commerce/checkout, multi-tenant, native apps.

## Current status

- All back-office phases (0–6) are **complete and deployed to `main`** (`github.com/cjrt94/gammaplast-front`). The public site reads all content from Firestore; the admin panel provides CRUD for every content type plus a lead inbox.
- The careers ("Trabaja con nosotros") form is **email-only** — the applications module and CV storage were intentionally removed; the public form stays intact.

### Known pending items (production hardening)

- Configure the Firebase environment variables in Vercel (Production + Preview) so SSR can read Firestore in the hosted environment.
- Rotate the temporary staff password.
- Replace the **placeholder** client logos with real client brands from `/admin/logos-clientes`.

## Team

Primary agent: **Charlie** (Nuxt/Vue frontend). Supporting: **Dean** (Node/API/server routes), **Bobby** (DevOps/Firebase/Vercel), **Rowena** (UX/design).

See `docs/STRUCTURE.md` for how the code is laid out and `docs/INFRASTRUCTURE.md` for hosting, services, and environment.
