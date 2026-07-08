# Changelog — Gamma Plast

Formato: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) + [Semantic Versioning](https://semver.org/)

---

## [Unreleased]

- feat: scaffold del proyecto **Nuxt 3** (JS nativo) + Tailwind + i18n ES/EN — sistema de diseño en `tailwind.config.js`/`assets/css/main.css` (tokens, Corbel embebida, pills/botones/cards), layout con top bar + header (nav, selector de idioma, CTA) + footer sin CTA, componentes base (`BaseIcon`, `SectionHeader`) y mensajes i18n
- feat: página **Home** portada del key visual aprobado — hero, procesos productivos (sin fotos, 01–04), productos por 4 categorías (Alimentos y bebidas destacado, sin detalle) y stubs de las demás rutas. Verificada corriendo en Nuxt dev (HTTP 200)
- feat: **Nosotros** — intro oficial, valores (Excelencia/Trabajo en equipo/Innovación/Respeto/Integridad), misión y visión, capacidades productivas (01–04 con detalle de materiales/procesos) y certificaciones (RCS/TÜV/D2W/D2P/ISO/FDA)
- feat: **Productos** — índice de 4 categorías + plantilla dinámica `/productos/[categoria]` (breadcrumb, descripción oficial y productos de referencia con imágenes dummy); catálogo en `composables/useCatalog.js`; 33 dummies en `public/products/`
- feat: **Contacto** — formulario (Nombre/Apellido/Teléfono/Correo/Empresa/Mensaje) con estado de éxito inline, datos reales (comercial@/comercial2@) y mapa embebido de Ate, Lima. **Trabaja con nosotros** — formulario con carga de CV → recursoshumanos@. *(Envío por correo pendiente de backend.)*
- feat: **Novedades** — listado + plantilla de artículo `/novedades/[slug]` con data estática (`data/novedades.js`, incluye la nota real del mockup). *(Migración a @nuxt/content pendiente.)*
- feat: componentes `PageHero`, `SectionHeader`, `BaseIcon` (set ampliado); SEO base (JSON-LD `LocalBusiness`, OG, `robots.txt`). Las 13 rutas verificadas (200; categoría inexistente → 404). Sitio bilingüe ES/EN (EN cae a ES hasta traducir)
- docs: plan de rediseño completo (`docs/PLAN-REDISENO.md`) basado en el brief oficial `Info.docx` (+ catálogo como referencia visual) — arquitectura de páginas (Home, Nosotros, Productos + 4 categorías, Novedades, Contacto, Trabaja con nosotros), sitio bilingüe ES/EN, contenido por página, stack, roadmap por fases y decisiones abiertas; + sistema de diseño bloqueado (`docs/DESIGN.md`) con tokens, tipografía, radios/sombras y componentes derivados del key visual
- design: key visual del Home aprobado (`design/home.html`) — dirección corporativa institucional (tema claro, sin sombras, radios reducidos, pills outline verde); hero + procesos productivos (sin fotos) + productos por sector (sin detalle) + footer sin CTA
- chore: inicialización del proyecto — brand kit importado (`brand/`), guía de marca en `docs/BRAND.md` (paleta, tipografía, logotipo) y registro en el sistema de Sam como web corporativa (Nuxt 3 + Tailwind + Vercel)
