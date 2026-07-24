# Gamma Plast — Structure

A single **Nuxt 3** application (CommonJS project conventions, JS-native — no TypeScript). The public site, the Nitro server API, and the `/admin` back office all live in the same app. There are no separate subprojects.

## Top-level layout

```
gammaplast/
├── assets/            # CSS and static design assets processed by the bundler
├── brand/             # Brand source material (kit, palette, references)
├── components/        # Vue components
│   ├── *.vue          # Public-site components (hero, catalog cards, gallery, footer…)
│   └── admin/         # Back-office components (AdminList, ImageUploader,
│                      #   RepeatableList, StringList, ConfirmDialog, SaveBar,
│                      #   LeadInbox, LogoManager…)
├── composables/       # Shared reactive logic (see below)
├── data/              # Residual static data (now mostly helpers, e.g. formatDate)
├── design/            # Design docs / references
├── docs/              # Project documentation (OVERVIEW / STRUCTURE / INFRASTRUCTURE + plans)
├── i18n/locales/      # es.json / en.json — chrome only (topbar, nav, cta, footer)
├── layouts/           # default.vue (public) · admin.vue (back-office shell)
├── middleware/        # admin.global.js — client-side gate for /admin/**
├── pages/             # File-based routing (public + admin)
├── plugins/           # firebase.client.js — Web SDK init, client-only
├── public/            # Static files served as-is (images, videos, logos, llms.txt)
├── scripts/           # seed.mjs — migrates hardcoded content into Firestore
├── server/            # Nitro server (API routes + utils)
├── firebase.json      # Firebase deploy config (rules only)
├── firestore.rules    # Firestore security rules
├── storage.rules      # Storage security rules
├── nuxt.config.js     # Nuxt config + runtimeConfig
└── vercel.json        # Vercel deploy config (framework: nuxtjs)
```

## Pages (`pages/`)

**Public routes**
- `index.vue` — home (video hero, certifications band, plant gallery, processes, sector cards)
- `nosotros.vue` — about (hero, values, mission/vision, processes, gallery, certifications)
- `productos/index.vue` — catalog by sector + materials + FAQ
- `novedades/index.vue`, `novedades/[slug].vue` — news list + article
- `contacto.vue` — general contact form
- `contacta-un-asesor.vue` — qualified "talk to an advisor" lead form
- `trabaja-con-nosotros.vue` — careers form (email-only)

**Admin routes (`pages/admin/`)** — protected by `middleware/admin.global.js`
- `login.vue`, `index.vue` (dashboard)
- Singleton editors: `home.vue`, `nosotros.vue`, `materiales.vue`, `contacto.vue`, `seo.vue`, `paginas.vue`, `ajustes.vue`
- Collections (list + `[id]` editor): `sectores/`, `productos/`, `novedades/`, `certificaciones/`
- Logo managers: `logos-clientes/`, `logos-certificacion/`
- Lead inboxes: `leads/mensajes.vue`, `leads/asesores.vue`

## Server (`server/`)

- `api/content/*.get.js` — cached read endpoints (`defineCachedEventHandler`, SWR) that read content from Firestore via the Admin SDK: `catalog`, `home`, `nosotros`, `contact`, `seo`, `pages`, `settings`, `clientLogos`, `novedades/` (list) + `novedades/[slug]`. Reading server-side keeps the Web SDK out of the public bundle and bypasses security rules for public reads.
- `api/contacto.post.js`, `api/asesor.post.js`, `api/postular.post.js` — form submission endpoints (validate with Zod, send email via Resend). Contact/advisor also persist the lead to Firestore; careers is email-only.
- `api/admin/revalidate.post.js` — authenticated cache invalidation, called after any admin save/delete so edits appear immediately.
- `api/__sitemap__/urls.js` — dynamic sitemap URLs (reads news from Firestore).
- `utils/` — `firebaseAdmin.js` (Admin SDK singleton: `adminDb()`, `adminBucket()`), `content.js` (order + Timestamp cleanup helpers), `leads.js` (`saveLead`), `mail.js` (Resend).

## Composables (`composables/`)

- Content: `useContact` (single source of truth for contact info, kills x4 duplication), `usePages`, `useSettings`, `usePageSeo`, `useSeo`, `useJsonLd`
- Admin: `useAdminAuth` (Firebase Auth session), `useFirestoreCrud` + cache invalidation, `useLeads`, `useConfirm`, `useSaveState`
- Forms: `leadForm`

## Content model (Firestore)

- **Singletons:** `home`, `nosotros`, `materials`, `contact`, `seo`, `pages`, `settings`
- **Collections:** `sectores`, `productos` (`id = slugify(name)`), `novedades`, `certificaciones`, client logos, certification logos
- **Leads:** `contactMessages`, `advisorRequests` (server-written, staff-read)

`scripts/seed.mjs` (`npm run seed`) migrates all originally-hardcoded content into these documents (idempotent, supports `--dry-run`).
