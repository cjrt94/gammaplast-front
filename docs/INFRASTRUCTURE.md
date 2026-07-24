# Gamma Plast — Infrastructure

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Nuxt 3 (SSR), JS-native (no TypeScript) |
| Styling | Tailwind CSS (`@nuxtjs/tailwindcss`) |
| i18n | `@nuxtjs/i18n` (ES primary, EN fallback) |
| SEO | `@nuxtjs/sitemap` + per-page SEO/JSON-LD composables + `public/llms.txt` |
| Animation | GSAP |
| Validation | Zod (form schemas) |
| Email | Resend |
| Backend data | Firebase — Firestore (content + leads), Auth (staff), Storage |
| Hosting | Vercel |
| Domain | `gammaplast.com.pe` |

## Hosting & deploy

- **Vercel**, framework preset `nuxtjs` (`vercel.json`). `.vercelignore` excludes `brand/`, `design/`, `docs/`.
- Repo: `github.com/cjrt94/gammaplast-front`, branch `main` (push triggers Vercel deploy).
- Build: `nuxt build`. Local dev: `npm run dev`.
  - Note: running the standalone `.output` locally can throw a 500 Nuxt schema error in some environments; it is environment-specific, not a code defect. Use `npm run dev` for local verification.

## Firebase

- **Project:** `gammaplast-3a0cd`.
- **Firestore** — all editable site content + leads. Public reads happen **server-side** through the Admin SDK inside cached Nitro routes (`server/api/content/*`), so the Web SDK never ships in the public bundle and public reads bypass security rules by design.
- **Auth** — Email/Password, for staff access to `/admin` only.
- **Storage** — bucket `gammaplast-3a0cd.firebasestorage.app`, for content images/video uploaded from the admin panel (`content/<folder>/`).
- **Security rules** — `firestore.rules` + `storage.rules`, deployed via
  `npx firebase-tools deploy --only firestore:rules,storage` with
  `GOOGLE_APPLICATION_CREDENTIALS` pointing at the service-account JSON.
  Model: content is public-read / staff-write; leads are server-write / staff-read. No composite indexes required.

### Caching / content freshness

- `server/api/content/*` use `defineCachedEventHandler` with a **60s SWR TTL**.
- Every admin save/delete calls the authenticated `POST /api/admin/revalidate` (wired through `useFirestoreCrud`) to clear the content cache so edits appear immediately. On Vercel, functions are ephemeral/multi-instance, so invalidation is best-effort per instance; the 60s TTL bounds staleness.

## Environment variables

All use the `NUXT_` prefix so Nuxt injects them into `runtimeConfig` at runtime (same names in `.env` and in Vercel). See `.env.example` for the authoritative list.

**Email (Resend, server-only)**
- `NUXT_RESEND_API_KEY` — Resend API key
- `NUXT_MAIL_FROM` — verified sender (falls back to `onboarding@resend.dev` in dev)
- `NUXT_CONTACT_TO` — comma-separated recipients for contact/advisor leads
- `NUXT_CAREERS_TO` — recipient(s) for careers submissions

**Firebase Web SDK (public — safe in client bundle)**
- `NUXT_PUBLIC_FIREBASE_API_KEY`
- `NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NUXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NUXT_PUBLIC_FIREBASE_APP_ID`

**Firebase Admin SDK (server-only — SECRET)**
- `NUXT_FIREBASE_SERVICE_ACCOUNT` — full service-account JSON encoded as **base64** (single-line; avoids the multiline PEM breaking on Vercel). Generate with `base64 -i serviceAccount.json`.
- `NUXT_FIREBASE_STORAGE_BUCKET` — same value as the public storage bucket.

`.env` is gitignored; `serviceAccount*.json` is gitignored.

### Running node scripts against Firebase locally

Use `node --env-file=.env scripts/<script>.mjs`. In sandboxed environments the network access needs `dangerouslyDisableSandbox`.

## Production checklist (pending)

- [ ] Set all Firebase env vars in Vercel (Production + Preview) — without them, hosted SSR cannot read Firestore.
- [ ] Rotate the temporary staff password.
- [ ] Replace placeholder client logos with real ones (`/admin/logos-clientes`).
