# Design — Gamma Plast Web

> Sistema **implementado**, verificado en `tailwind.config.js` + `assets/css/main.css` (no aspiracional). Doc extendido del equipo: [`docs/DESIGN.md`](docs/DESIGN.md) · marca: [`docs/BRAND.md`](docs/BRAND.md). Referencia viva: `design/home.html`.

## Theme

Corporativo / institucional. **Tema claro único** (sin dark mode). **Sin sombras**. **Radios reducidos** (3–4px) para transmitir seriedad. Verde de marca como **acento**, no como fondo. Un solo bloque oscuro por página: el footer.

## Color

Tokens Tailwind (implementados):

| Token | Hex | Uso |
|-------|-----|-----|
| `green.DEFAULT` | `#00B140` | Primario: CTAs, íconos, bordes de acento |
| `green.600` | `#009B39` | Hover de botón verde |
| `green.700` | `#0A7E33` | Texto/labels sobre claro (contraste AA) |
| `green.tint` | `#E7F6EC` | Fondos de pill/label, tiles de ícono |
| `green.tint2` | `#F2FAF4` | Wash sutil |
| `ink` | `#13191B` | Titulares y texto fuerte |
| `body` | `#414A48` | Párrafos |
| `slate` | `#6C7377` | Texto secundario / placeholders |
| `line` | `#E6EAEA` | Bordes de tarjeta, divisores |
| `mist` | `#F4F6F6` | Fondo de sección alterna |
| `paper` | `#FFFFFF` | Fondo base |
| `footer.DEFAULT` / `footer.soft` | `#0D1416` / `#9AA6A6` | Footer |

**Regla:** nunca texto en `green` sobre blanco. Neutros con leve sesgo frío/verde (no gris puro).

## Typography

- **Display / titulares:** `Articulat CF` (marca) → stand-in `Avenir Next` → Corbel → system-ui. ⚠ Articulat CF **sin licenciar**; los archivos demo no tienen acentos → deuda conocida.
- **Cuerpo:** `CorbelGP` (@font-face desde `/fonts/corbel.ttf`, pesos 400/700) → Corbel → system-ui.
- Base **17px**, line-height 1.6. Titulares line-height 1.08, `letter-spacing -0.02em`, `text-wrap: balance`.
- **Eyebrow:** display bold uppercase, .74rem, `letter-spacing .16em`, color `green-700`.
- **Escala** (rem): eyebrow .74 · body 1.0 · lead 1.2 · h3 1.16 · h2 `clamp(1.9,3.4vw,2.6)` · h1 `clamp(2.5,5.4vw,4)`.

## Layout & Spacing

- Contenedor `.wrap`: max-width **1200px**, padding lateral 28px (20px < 560px).
- Ritmo de sección `.sec`: **88px** vertical (60px < 560px). Alternancia `paper` / `mist`.
- Radios: card 3px, pill/botón/chip 4px, ico 4px.
- **Sin sombras:** relieve por borde (`line`) + hover borde verde + `translateY(-4px)`.

## Components

- **Top utility bar** — barra oscura fina (claim + teléfono + correo).
- **Header / nav** — sticky, blanco con blur; subrayado verde en hover/activo; CTA "Contacta a un asesor".
- **Botones** — `.btn-green` (sólido, hover 600, `-translateY 1px`) · `.btn-ghost` (borde `line`, hover verde). Radio 4px, sin sombra.
- **Pills** — `.pill-outline` (verde, títulos de sección) · `.pill-tint` (labels) · `.pill-green`.
- **Chips** — borde `line`, ícono verde 16px.
- **Cards** — `.card` + `.card-hover` (`-translateY-1`, borde verde).
- **ico-tile** — 46px, fondo `green-tint`.
- **Formularios** — `.field-label` + `.field-input` (borde `line`, focus borde verde).
- **Section header** — pill outline + `h2` + intro en `slate`.
- **Footer** — oscuro, **sin banda CTA**.

## Motion

- **Reveal on scroll:** opacity + `translateY(22px)`, `.7s cubic-bezier(.2,.7,.3,1)`, IntersectionObserver (re-observa al cambiar de ruta).
- **Hover:** `transform: translateY`, transition sobre transform/all.
- **`prefers-reduced-motion`:** reveal desactivado, `scroll-behavior: auto`.
- **Foco:** outline 3px verde, offset 2px.

## Iconography

Línea, stroke ~1.8, esquinas limpias, verde. **Sin emoji.** Set en `BaseIcon.vue` (`name` → path SVG).
