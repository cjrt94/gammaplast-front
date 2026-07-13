# Revisión QA + UX + UX Writing — Gamma Plast

> Revisión de solo lectura (no se modificó código de la app). Fecha: 2026-07-12.
> Método: revisión estática de código + pasada en navegador real (Chrome headless, 13 rutas ES/EN, desktop 1440px). Ver **Nota de método** al final sobre la limitación en móvil.
> Objetivo de negocio del sitio: convertir a lead comercial (formulario de contacto) y captar CV (`PRODUCT.md`); la revisión pondera esos flujos.

## Resumen ejecutivo

El sitio está **sólido de base**: sin enlaces rotos, 404 dinámico correcto, formularios con validación/ARIA/foco bien implementados, y un diseño desktop limpio y profesional. Los problemas se concentran en tres frentes:

1. **La versión EN está mixta/incompleta** — en `/en` conviven inglés (nav, hero) y español (procesos, categorías, footer, y **todas las páginas interiores**). Es el defecto más visible para un comprador internacional.
2. **Los formularios no envían nada** (simulación con `setTimeout`) — la conversión principal del sitio hoy se pierde en silencio.
3. **Detalles que erosionan confianza B2B**: acento del H1 en verde que viola la propia norma de marca, un placeholder "pendiente" visible en Certificaciones, y contenido delgado en Novedades/productos.

| Severidad | QA funcional | UX | UX Writing |
|-----------|:---:|:---:|:---:|
| Alto / P0–P1 | 4 | 4 | 1 |
| Medio / P2 | 6 | 5 | 5 |
| Bajo | — | 2 | 5 |

---

## 1. QA Funcional

### P0 — Bloqueante
Ninguno estricto. El 404 de rutas dinámicas funciona (`createError` fatal), no hay build-breakers ni enlaces internos rotos.

### P1 — Alta prioridad

**QA-1 · Formularios no envían (conversión simulada).** `contacto.vue:35-37` y `trabaja-con-nosotros.vue:59-61`: `submit()` es un `setTimeout(600ms)` que **siempre** marca `status='sent'`. No hay envío real a `comercial@` / `recursoshumanos@` (marcado `TODO(Dean)`). Si llega a producción, cada lead se pierde mostrando "¡Gracias por escribirnos!". Además el estado `error` es inalcanzable, así que ese microcopy nunca se ejercita. → Levantar backend (Resend/Cloud Function) con validación server-side, anti-spam y subida de CV.

**QA-2 · Paridad i18n EN rota — `/en` mezcla idiomas.** `en.json` (38 líneas) está incompleto frente a `es.json` (56). Con `fallbackLocale:'es'` (`i18n.config.js:6`), las claves faltantes **no muestran keys crudas: caen a español**. Confirmado en navegador (`/en`):
- Faltan `home.process.steps`, `categories.*`, `footer.about/address/phones/certFda/certRecycle/certCompost`.
- Resultado real en `/en`: hero y nav en inglés, pero **tarjetas de proceso, tarjetas de categoría y footer en español**.
- Corrección al reporte de código: la sección "Procesos productivos" **no queda vacía** en EN (el fallback la llena con el contenido ES), pero se muestra en español.

**QA-3 · Texto hardcodeado en español en páginas interiores.** Fuera del sistema i18n, por lo que `/en/*` sale íntegramente en español. Confirmado que `/en/nosotros` es 100% español. Afecta: `nosotros.vue` (todo el archivo, arrays `valores`/`procesos`/`certs` + template), `productos/index.vue:9-11,19-23,32-36`, `productos/[categoria].vue:17,23,27,44-46`, `contacto.vue:48-60,69-147`, `trabaja-con-nosotros.vue:72-155`, `novedades/*`, `composables/useCatalog.js:9-72`, `data/novedades.js` (incl. meses de `formatDate` en español). → Externalizar a `i18n/locales/*.json` y usar `t()`.

**QA-4 · SEO: `<html lang>` fijo en `es`.** `nuxt.config.js:10` `htmlAttrs:{ lang:'es' }` estático; las rutas `/en` sirven con `lang="es"` (impacto en a11y y SEO). → Derivar del locale (`useLocaleHead`). Relacionado: falta `og:image` (`app.vue:4-9` define OG básico pero sin imagen) y no hay `hreflang` alternates (sin `baseUrl` en la config i18n).

### P2 — Media / menor

**QA-5 · Sin favicon.** No existe `public/favicon.*` ni `link rel="icon"` → `/favicon.ico` da 404 en todas las páginas.

**QA-6 · `sitemap.xml` referenciado pero inexistente.** `public/robots.txt` apunta a `.../sitemap.xml`, pero no hay módulo de sitemap (`nuxt.config.js:5` solo tailwind + i18n) → 404. → Instalar `@nuxtjs/sitemap` con `hreflang`.

**QA-7 · Sin `error.vue`.** Los 404 (`productos/[categoria].vue:8`, `novedades/[slug].vue:7`) caen en la pantalla de error por defecto de Nuxt — genérica, sin header/footer ni marca.

**QA-8 · Imágenes de Novedades sin `width`/`height` (CLS).** `novedades/index.vue:18` y `novedades/[slug].vue:29` — `<img>` sin dimensiones → reflow al cargar. (El resto del sitio sí declara dimensiones — buena práctica ya presente.)

**QA-9 · `.reveal` deja contenido `opacity:0` si falla el JS.** `main.css:93` parte de `opacity:0`; la visibilidad depende del `IntersectionObserver` de `layouts/default.vue`. Ante un error de hidratación, el contenido queda invisible (solo se salva con `prefers-reduced-motion`, `main.css:95-97`). → Considerar `opacity:1` por defecto con la animación como progressive enhancement.

**QA-10 · `v-for :key="i"` por índice.** `index.vue:58` (steps) y `novedades/[slug].vue:32` (párrafos). Funciona con listas estáticas pero es antipatrón; el resto del sitio usa keys estables.

### Verificado OK (sin hallazgos)
- Enlaces internos: todos los `NuxtLink`/`localePath` apuntan a páginas existentes; skip-link `#main` correcto.
- 404 dinámico correcto en ambas rutas dinámicas.
- SSR guards: `document.*` solo en handlers cliente y `import.meta.client`.
- El **mapa de Contacto sí renderiza** (Google Maps embed con pin, no cae a fallback).
- Imágenes decorativas con `alt=""`+`aria-hidden`; imágenes de contenido con `alt` significativo.
- Orden de headings correcto (h1→h2→h3) en todas las páginas.
- **Menú móvil sí implementado** (`AppHeader.vue:42-45` hamburguesa `lg:hidden` + panel desplegable con foco/targets ≥44px).
- El carácter `@` NO aparece en los JSON de locale hoy (emails viven en templates), así que el parser de vue-i18n está a salvo — mantener esa regla.

---

## 2. UX

### Alto impacto

**UX-1 · Experiencia EN mixta.** (Ver QA-2/QA-3.) Para un comprador internacional, ver hero en inglés y procesos/categorías/footer en español lee como sitio a medio hacer. Nota positiva: **el EN que sí existe es natural, no literal** ("Talk to an advisor", "from resin to finished packaging"); el problema es cobertura, no calidad. → Completar i18n; **mientras tanto, valorar ocultar el switch EN** para no exponer una experiencia incompleta.

**UX-2 · Conversión principal simulada.** (Ver QA-1.) El objetivo #1 del sitio no funciona de extremo a extremo.

**UX-3 · Acento del H1 en verde puro sobre blanco.** `index.vue:25` — "cuidamos tu marca" en `text-green` (#00B140) sobre blanco. **Viola la propia norma de marca**: `DESIGN.md:17` y `:85` ("Nunca texto en `--green` sobre blanco"), `PRODUCT.md:28` ("se ve amateur"). Confirmado visualmente: el acento se ve lavado/bajo contraste. → Usar `text-green-700` (token AA para texto) o `text-ink`.

**UX-4 · Placeholder "pendiente" visible en Certificaciones.** `nosotros.vue:152` — texto visible "\* Isotipos oficiales pendientes de integrar." justo en el bloque que debe generar confianza técnica. Un comprador B2B lo lee como falta de rigor. → Quitar la nota del render; mostrar solo sellos oficiales cuando existan.

### Impacto medio

**UX-5 · Tres patrones de hero distintos.** Home usa `span.eyebrow` (`index.vue:23`); Nosotros usa `pill pill-outline` sin `PageHero` (`nosotros.vue:35`); Productos/Contacto/Trabaja/Novedades usan `PageHero`. El estilo del eyebrow/kicker varía entre secciones. → Unificar Home y Nosotros bajo `PageHero` o el mismo estilo de eyebrow.

**UX-6 · Alineación de eyebrows inconsistente dentro de la Home.** Confirmado visualmente: el bloque "Procesos" está alineado a la **izquierda** y "Productos" **centrado** (`SectionHeader center`, `index.vue:74`). Rompe el ritmo vertical de la página. → Elegir un criterio de alineación para los section-headers.

**UX-7 · Grid de productos con cards de altura despareja.** En `/productos/[categoria]` las imágenes tienen aspect ratios distintos y el texto queda a distinta altura entre cards (confirmado visual: "Sello U", "Empaque al vacío", "Etiquetas" con mucho espacio vacío). Se ve irregular. → Contenedor de imagen con alto fijo (`aspect-square`/`object-contain` uniforme) y alinear el nombre al fondo.

**UX-8 · Orientación inconsistente entre plantillas de detalle.** Categoría de producto tiene **breadcrumb** (`productos/[categoria].vue:16-20`); el artículo de Novedades usa **back-link** "Volver a Novedades" (`novedades/[slug].vue:18-20`). Dos patrones para dos detalles equivalentes. → Unificar.

**UX-9 · Novedades: contenido delgado y sin estado vacío.** `data/novedades.js:23,35` con `// TODO: contenido real`; artículos 2 y 3 de 2 párrafos. `novedades/index.vue` no tiene estado vacío (array vacío → grilla en blanco). → Contenido real + fallback de lista vacía; evaluar `@nuxt/content`.

### Impacto bajo

**UX-10 · "Ver catálogo completo de productos" puede prometer un PDF.** `cta.seeCatalog` (banner Home, `index.vue:93`). No hay catálogo descargable; lleva a `/productos`. → "Ver todos los productos".

**UX-11 · Formularios sin ejemplo de formato en teléfono.** Opcional; los labels son correctos para a11y. Menor.

---

## 3. UX Writing

### Alto impacto

**W-1 · Cobertura de traducción EN incompleta.** (Ver QA-2/QA-3/UX-1.) El principal problema de contenido.

### Impacto medio

**W-2 · Microcopy de CTA inconsistente al mismo destino (`/contacto`).** Conviven cuatro etiquetas para la misma acción: "Contacta a un asesor" (`cta.advisor`, dominante), "Contáctanos" (`nosotros.vue:42`), "Cotiza tu empaque" (`nosotros.vue:107`), "Enviar mensaje" (botón del form). "Cotiza/cotización" aparece **una sola vez** en todo el sitio. → Fijar un verbo primario (recomendado "Cotiza tu empaque" / "Solicita una cotización": más concreto y transaccional para B2B que "Contacta a un asesor", que es vago) y dejar "asesor" para texto de apoyo.

**W-3 · Headings casi duplicados en Nosotros.** `nosotros.vue:61` "Los principios que guían cada decisión" y `:80` "Nuestros principios guían cada decisión y proceso" — casi el mismo título en dos secciones contiguas (Valores y Misión/Visión). Además `:141` "Certificaciones que garantizan calidad, seguridad y confianza." termina en punto, a diferencia de los demás H2. → Diferenciar (p. ej. Misión/Visión → "Hacia dónde vamos") y quitar el punto.

**W-4 · "Productos de referencia" suena a placeholder.** `productos/[categoria].vue:27`, combinado con imágenes dummy, puede leerse como "esto no es lo que realmente hacen". → "Formatos disponibles" o simplemente "Productos". Además el eyebrow "Productos" (`:23`) es redundante con el breadcrumb inmediatamente encima.

**W-5 · Error de correo con microcopy poco natural.** `contacto.vue:17` y `trabaja-con-nosotros.vue:45`: "…por ejemplo nombre + arroba + empresa.com." La construcción "+ arroba +" es rara. → "…por ejemplo nombre@empresa.com." (el `@` literal en template se lee sin problema; solo rompería dentro de los JSON de i18n).

**W-6 · La tagline oficial de marca no aparece en el sitio.** `BRAND.md:9` define "De Lima al mundo, soluciones que envuelven confianza"; el topbar usa otro claim ("Empaques flexibles con propósito · Lima, Perú", `es.json:2`). → Incorporar la tagline oficial (footer o hero) para coherencia de marca.

### Impacto bajo

**W-7 · Textos sueltos fuera de i18n** que romperán en EN: "Destacado" (`index.vue:82`), "Ver productos"/"Productos"/CTAs en `productos/*`. (Subconjunto de QA-3, inventariado aparte.)

**W-8 · Capitalización de eyebrows inconsistente.** `home.process.eyebrow` = "Nuestros procesos productivos" (sentence case) vs `nosotros.vue:102` "Nuestros Procesos Productivos" (Title Case). Confirmado visual. → Sentence case en español.

**W-9 · H1 de Home es eslogan, no descripción funcional.** `es.json:15-16` "Transformando ideas, cuidamos tu marca" (emocional/vago). Lo rescatan el eyebrow "Fabricante de empaques flexibles · Perú" y el lead concreto, por eso es bajo. → Evaluar A/B con un H1 más descriptivo, moviendo el eslogan a subtítulo.

**W-10 · Registro formal puntual rompe el tuteo.** `contacto.vue:60` "…a la brevedad" es más formal que el resto ("Cuéntanos"). → "…muy pronto".

**W-11 · Descriptor de marca no usado.** `BRAND.md:10` "Empaques flexibles · Calidad & Innovación" no aparece; menor.

---

## Fortalezas (mantener)
- **Formularios**: validación, `aria-invalid`/`aria-describedby`, `role="alert"`, foco al primer error, éxito con `role="status"`/`aria-live` y foco gestionado; buen microcopy de error de CV. Implementación de referencia (solo falta backend).
- **Terminología consistente**: "empaque(s) flexible(s)" sin mezcla "envase/empaque"; tuteo consistente.
- **Accesibilidad de base**: skip-link, orden de headings, touch targets ≥44px, dimensiones de imagen (salvo Novedades), `prefers-reduced-motion` respetado.
- **Navegación**: funnel a `/contacto` presente en cada página; jerarquía Home (hero→procesos→productos→CTA) comunica la propuesta en pocos segundos.
- **Diseño desktop**: limpio, institucional, buen uso del sistema de tokens.

---

## Nota de método (limitación en móvil)
Las capturas móviles con Chrome headless resultaron **no fiables**: en esta versión de Chrome, `--window-size=390` no fuerza el viewport CSS del layout, así que renderiza a ancho de escritorio y recorta a 390px (el titular del hero salía en 2 líneas —imposible en un viewport real de 390px— lo que delata el artefacto). Por eso **el responsive móvil se evaluó por código**, y es correcto: `.wrap` fluido con `px-5` en ≤560px, grids que colapsan en `md` (hero, procesos, productos), grid de producto `grid-cols-2` intencional en móvil, chips con `flex-wrap`, y menú hamburguesa funcional. **Pendiente**: una pasada en dispositivo/emulación real de DevTools para validación pixel-perfect; vigilar el `clamp(2.5rem,…)` del H1 del hero, cuyo piso de 40px puede quedar grande en pantallas ≤360px.

## Apéndice — Rutas verificadas (HTTP 200; categoría inexistente → 404)
`/` · `/nosotros` · `/productos` · `/productos/{alimentos-y-bebidas|industria-en-general|retail-y-e-commerce|pesca-y-agroindustria}` · `/contacto` · `/trabaja-con-nosotros` · `/novedades` · `/novedades/[slug]` · variantes `/en/*`.
