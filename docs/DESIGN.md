# Design System — Gamma Plast Web

Sistema de diseño **bloqueado** a partir del key visual del Home (aprobado). Es la fuente de verdad para maquetar todas las páginas. Complementa a [`BRAND.md`](BRAND.md) (marca) y aplica sus tokens al contexto web.

> **Dirección:** corporativa / institucional. Tema **claro único**, **sin sombras**, **radios reducidos** (seriedad), acentos en verde de marca. Se abandona la "piel plana 50/50 verde" de los mockups iniciales.

Referencia viva: `design/home.html` (key visual navegable).

---

## 1. Principios

1. **Serio antes que amigable** — esquinas casi rectas, sin sombras, retículas ordenadas, mucho aire.
2. **El verde es acento, no relleno** — fondos blanco/gris; el verde aparece en pills, íconos, bordes de hover, CTAs y detalles.
3. **Tema claro único** — sin dark mode (decisión de marca institucional).
4. **Fotografía y producto reales** — el hero y las secciones muestran empaques/planta reales; el isotipo actúa como marca de agua sutil.
5. **Accesibilidad AA** — el texto nunca va en verde sobre blanco (contraste insuficiente); el verde se reserva a fondos, bordes y elementos gráficos.

---

## 2. Tokens de color

| Token | Hex | Uso |
|-------|-----|-----|
| `--green` | `#00B140` | Primario: CTAs, íconos, bordes de acento |
| `--green-600` | `#009B39` | Hover de botón verde |
| `--green-700` | `#0A7E33` | Texto/labels sobre claro (contraste AA) |
| `--green-tint` | `#E7F6EC` | Fondos de pill/label, tiles de ícono |
| `--green-tint2` | `#F2FAF4` | Wash sutil (radiales de fondo) |
| `--ink` | `#13191B` | Titulares y texto fuerte |
| `--body` | `#414A48` | Texto de párrafo |
| `--slate` | `#6C7377` | Texto secundario / subtítulos |
| `--line` | `#E6EAEA` | Bordes de tarjeta, divisores |
| `--mist` | `#F4F6F6` | Fondo de sección alterna |
| `--paper` | `#FFFFFF` | Fondo base |
| `--footer` | `#0D1416` | Fondo del footer (único bloque oscuro) |
| `--footer-soft` | `#9AA6A6` | Texto del footer |

Neutros con leve sesgo frío/verde (elegidos, no gris puro).

---

## 3. Tipografía

| Rol | Familia | Notas |
|-----|---------|-------|
| Titulares/display | **Articulat CF** | Fuente de marca. En producción **hay que licenciarla** (los archivos actuales son *Fontspring DEMO* sin acentos → inservibles para español). En el prototipo se usa **Avenir Next** como stand-in. |
| Cuerpo | **Corbel** | Fuente de marca, cobertura completa de acentos. Confirmar licencia web o sustituto embebible. |
| Labels/eyebrows | Articulat CF (uppercase) | `letter-spacing:.14–.16em` |

**Escala** (rem, base 17px): eyebrow `.74` · body `1.0` (17px) · lead `1.2` · h3 `1.16` · h2 `clamp(1.9,3.4vw,2.6)` · display/h1 `clamp(2.5,5.4vw,4)`. Titulares con `text-wrap:balance`, `letter-spacing:-.02em`.

---

## 4. Forma y espacio

- **Radios:** tarjetas `3px`, pills/botones/chips `4px`, íconos `4px`. (Antes 16px/999px — reducidos por seriedad.)
- **Sombras:** ninguna. El relieve se logra con borde (`--line`) y, en hover, borde verde + `translateY(-4px)`.
- **Contenedor:** `max-width 1200px`, padding lateral `28px` (`20px` en móvil).
- **Ritmo de sección:** `88px` vertical (`60px` móvil). Alternancia `--paper` / `--mist`.

---

## 5. Componentes reutilizables

| Componente | Descripción |
|-----------|-------------|
| **Top utility bar** | Barra oscura fina: claim + teléfono + correo. |
| **Header / nav** | Sticky, blanco con blur; logo, nav (subrayado verde en hover/activo), CTA "Contacta a un asesor". |
| **Botones** | `btn-green` (sólido, hover 600) · `btn-ghost` (borde `--line`, hover verde). Radio 4px, sin sombra. |
| **Pills** | `pill-slate` → **outline verde** (borde+texto verde) para títulos de sección · `pill-tint` (fondo `--green-tint`, texto `--green-700`) para labels · `pill-green` (sólido). |
| **Section header** | Pill outline + `h2` + intro en `--slate`. Variante centrada. |
| **Card de proceso** | Ícono (tile `--green-tint`) + número `01–04` (secuencia real) + pill-tint + título + descripción. Sin fotos en Home. |
| **Card de sector** | Ícono + título + una línea + enlace "Ver productos →". Variante `feat` (fondo verde) para el sector destacado. |
| **Card de producto** | Imagen (dummy transparente) + nombre. Para páginas de sector. |
| **Card de material / certificado** | Chip/tile con nombre de estructura o sello. |
| **Footer** | Oscuro, **sin banda CTA**: logo, descriptor, navegación, contacto real, barra inferior con © + sellos. |

Íconos: línea, stroke ~1.8, esquinas limpias, en verde. Sin emoji.

---

## 6. Reglas de uso

- **Nunca** texto en `--green` sobre blanco (usar `--green-700` solo para labels cortos; párrafos en `--ink`/`--body`).
- **Nunca** sombras ni radios grandes.
- El **isotipo** se usa como marca de agua a baja opacidad (~10%), nunca compitiendo con el contenido.
- Un solo bloque oscuro por página: el footer.
