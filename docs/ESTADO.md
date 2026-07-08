# Estado del proyecto — Web Gamma Plast

> Documento de **handoff** para retomar el desarrollo. Última actualización: incremento inicial (todas las páginas maquetadas en Nuxt 3).
> Ver también: [`PLAN-REDISENO.md`](PLAN-REDISENO.md) (arquitectura y contenido) · [`DESIGN.md`](DESIGN.md) (sistema de diseño) · [`BRAND.md`](BRAND.md) (marca).

Repo: **https://github.com/cjrt94/gammaplast-front** (rama `main`).

---

## 1. Resumen

Web corporativa institucional de **Gamma Plast** (fabricante peruano de empaques flexibles), en **Nuxt 3 + Tailwind + i18n ES/EN**. El key visual del Home fue aprobado y se portó a código; el resto de páginas están **maquetadas con contenido real** (fuente: `Info.docx` + catálogo + mockup) y **verificadas corriendo en dev**. Falta pulido, backend de formularios y contenido/traducciones finales.

**Estado global:** ✅ estructura y maqueta completas · 🟡 pendiente backend, contenido final, i18n EN y QA.

---

## 2. Cómo correr

```bash
npm install          # dependencias
npm run dev          # http://localhost:3000
npm run build        # build de producción
npm run generate     # SSG (para Vercel/estático)
npm run preview      # previsualizar el build
```

- **Node:** 24 (probado). **Stack:** Nuxt 3.21, Tailwind (módulo v6), @nuxtjs/i18n v10.
- Si el dev quedó corriendo en background: detener con `pkill -f "nuxt dev"`.

---

## 3. Estructura

```
gammaplast/
├─ nuxt.config.js          # módulos, i18n (ES default, EN prefijo /en)
├─ tailwind.config.js      # tokens de diseño (colores, fuentes, radios)
├─ assets/css/main.css     # base + @font-face Corbel + clases .btn/.pill/.card/.field
├─ app.vue                 # head global + JSON-LD LocalBusiness
├─ layouts/default.vue     # TopBar + Header + <slot> + Footer + reveal on scroll
├─ components/
│  ├─ AppTopBar / AppHeader / AppFooter   # chrome (header con selector idioma; footer SIN CTA)
│  ├─ BaseIcon.vue          # set de íconos SVG (name → path)
│  ├─ PageHero.vue          # hero de páginas internas
│  └─ SectionHeader.vue     # pill outline + h2 + intro
├─ pages/
│  ├─ index.vue             # HOME (key visual)
│  ├─ nosotros.vue
│  ├─ productos/index.vue           # índice 4 categorías
│  ├─ productos/[categoria].vue     # detalle por categoría (slug)
│  ├─ contacto.vue                  # form + datos + mapa
│  ├─ trabaja-con-nosotros.vue      # form + carga CV
│  └─ novedades/index.vue + [slug].vue
├─ composables/useCatalog.js   # 4 categorías + productos de referencia + imágenes
├─ data/novedades.js           # artículos (estático) + formatDate
├─ i18n/
│  ├─ i18n.config.js        # importa los JSON como messages; fallback EN→ES
│  └─ locales/es.json,en.json  # chrome + Home (páginas internas aún en ES inline)
├─ public/                  # logo, isotipo, fonts, robots, products/1..33.png
├─ brand/                   # brand kit (logos, isotipo, fuentes, manual PDF)
├─ design/home.html         # key visual aprobado (referencia estática)
└─ docs/                    # PLAN-REDISENO, DESIGN, BRAND, ESTADO (este)
```

**Rutas (13, verificadas 200; categoría inexistente → 404):** `/`, `/nosotros`, `/productos`, `/productos/{alimentos-y-bebidas|industria-en-general|retail-y-e-commerce|pesca-y-agroindustria}`, `/contacto`, `/trabaja-con-nosotros`, `/novedades`, `/novedades/[slug]`, + variantes `/en/...`.

---

## 4. Estado por página

| Página | Estado | Notas |
|--------|--------|-------|
| Home | ✅ Maqueta = key visual | Elementos del brief **diferidos**: video en hero, banner de logos de clientes |
| Nosotros | ✅ Maqueta | Misión/Visión usan copy del mockup (confirmar oficial). Certificados sin isotipos oficiales |
| Productos (índice) | ✅ Maqueta | 4 categorías |
| Productos/[categoría] | ✅ Maqueta | Imágenes dummy — **mapeo a afinar**; sin ficha técnica (solo referencia) |
| Contacto | 🟡 Maqueta, form sin envío | Form solo muestra éxito inline; **falta backend** |
| Trabaja con nosotros | 🟡 Maqueta, form sin envío | Carga de CV en UI; **falta backend + subida real** |
| Novedades + artículo | 🟡 Maqueta, data estática | 1 nota real (mockup) + 2 de ejemplo; migrar a `@nuxt/content` |

---

## 5. Pendientes y mejoras (backlog)

### 🔴 Bloqueantes para producción
- [ ] **Backend de formularios** — Contacto → `comercial@` / `comercial2@gammaplast.com.pe`; CV → `recursoshumanos@gammaplast.com.pe`. Vía Resend o Cloud Function, con validación server-side, anti-spam (honeypot/rate-limit) y subida de archivo. (Dean)
- [ ] **Licenciar tipografías** — titulares en **Articulat CF** (hoy stand-in Avenir Next; los archivos demo no tienen acentos). Resolver fuente de cuerpo web (Corbel con licencia o sustituto embebible con acentos).
- [ ] **Dominio + deploy** — Vercel + DNS de `gammaplast.com.pe`. (Bobby)

### 🟠 Contenido
- [ ] **Traducciones EN** — hoy solo la chrome y el Home están en claves i18n; los cuerpos de las páginas internas están en **ES inline**. Al llegar el EN: mover textos a `i18n/locales/*.json` y usar `t()`.
- [ ] **Imágenes de producto** — el mapeo dummy↔producto en `useCatalog.js` es un primer pase. Reemplazar **dummy #33** (tiene texto placeholder) y decidir el **#31** (azul banano, fuera de paleta). Idealmente fotos/renders propios.
- [ ] **Isotipos de certificados** (RCS, TÜV, D2W, D2P) — integrar logos oficiales + enlaces.
- [ ] **Fotografía real** — planta, procesos, valores (hoy stock/íconos).
- [ ] **Misión y Visión** — confirmar copy oficial (se usó el del mockup).
- [ ] **Novedades** — reemplazar las 2 notas de ejemplo por contenido real.

### 🟡 Funcionalidad / mejoras
- [ ] Migrar Novedades a **`@nuxt/content`** (markdown) si se publicará seguido.
- [ ] **Sitemap** (`@nuxtjs/sitemap`) + `hreflang` ES/EN; hoy solo hay `robots.txt` y JSON-LD.
- [ ] Reincorporar (si se aprueba) **video en hero** y **banner de logos de clientes** del brief.
- [ ] Evaluar **WhatsApp flotante** (los teléfonos son móviles) y **descarga del catálogo PDF**.
- [ ] **Favicon** (falta) y og:image.
- [ ] Revisar tamaño/legibilidad del **logo** en navbar/footer (se ve pequeño).
- [ ] **QA responsive** en todas las páginas y **auditoría de accesibilidad** AA completa (el verde solo se usa como fondo/borde, ok; validar foco, contraste de grises, labels).
- [ ] El **mapa** de Contacto embebe Google Maps por query; validar en navegador real (en headless muestra fallback).

---

## 6. Decisiones abiertas (confirmar con cliente)
1. ✅ ~~Taxonomía de productos~~ → **4 categorías** (resuelto, ver PLAN §4.4).
2. Home: ¿reincorporar video + logos de clientes?
3. Misión/Visión: ¿copy oficial?
4. Certificaciones: ¿qué ISO aplica? Links oficiales.
5. Correo de contacto: el brief dice `comercial@`; el catálogo dice `comercial1@`. **¿Cuál es?** (hoy se usa `comercial@`).
6. Producto: ¿solo referencia visual o fichas técnicas (calibres/medidas)?
7. Presupuesto para licenciar fuentes.
8. Acceso a DNS de `gammaplast.com.pe`.
9. Dummies: reemplazo #33 y criterio #31.
10. ¿Quién provee las traducciones EN?

---

## 7. Notas de implementación (deuda técnica)
- **i18n:** se usa `i18n.config.js` con `import` de los JSON (no el modo lazy/endpoint de v10, que daba problemas). **Cuidado con `@`** en mensajes: vue-i18n lo interpreta como *linked message* y rompe el build — los correos van directo en el template, no en i18n.
- **Fuentes:** `main.css` referencia `public/fonts/corbel.ttf` (Corbel de marca) para el cuerpo; titulares caen a Avenir Next → Corbel → system.
- **Reveal on scroll:** IntersectionObserver en `layouts/default.vue`, re-observa al cambiar de ruta; respeta `prefers-reduced-motion`.
- **JS nativo** (sin TypeScript), por convención del equipo (Sam).

---

## 8. Próximo paso sugerido
Aplicar las **correcciones de diseño/contenido** del cliente página por página, y en paralelo levantar el **backend de formularios** (Dean) y resolver **fuentes + deploy** (Bobby) para poder publicar un preview en Vercel.
