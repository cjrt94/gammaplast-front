# Brand — Gamma Plast

> Fuente: `brand/Manual-de-Marca-Gammaplast.pdf` (Manual de Marca oficial). Este documento es el resumen técnico para desarrollo/diseño; ante cualquier duda, el manual manda.

## La marca

Gamma Plast es una empresa **peruana** que impulsa el desarrollo de **empaques flexibles** funcionales y sostenibles, adaptándose a la necesidad de cada cliente.

- **Tagline:** *De Lima al mundo, soluciones que envuelven confianza*
- **Descriptor:** Empaques flexibles · Calidad & Innovación
- **Frases de campaña:** *"Más que bolsas, diseñamos experiencias que trascienden"* · *"Transformando ideas, cuidamos tu marca"*
- **Aspiración:** ser referente en soluciones de empaques flexibles con propósito, diseñados para el futuro — calidad, solidez operativa y una propuesta técnica eficiente y sostenible.

### Personalidad

Confiable · Profesional · Moderna · Innovadora · Sostenible

---

## Paleta de color

### Primarios

| Nombre | HEX | RGB | CMYK | Pantone | Rol |
|--------|-----|-----|------|---------|-----|
| Verde Gamma | `#00B140` | 0, 177, 64 | 76, 0, 93, 0 | Solid Coated 354 C | Fondo primario / color de marca |
| Negro Gamma | `#000000` | 0, 0, 0 | 0, 0, 0, 100 | — | Texto / acento |
| Blanco Gamma | `#FFFFFF` | 255, 255, 255 | 0, 0, 0, 0 | — | Fondo primario / texto |
| Gris Claro | `#A0A8AA` | 160, 168, 170 | 40, 27, 27, 7 | Solid Coated Cool Gray 6C | Soporte / neutralidad técnica |

### Secundarios (acentos)

| Nombre | HEX | RGB | CMYK | Rol |
|--------|-----|-----|------|-----|
| Lavanda Suave | `#D2D4FF` | 210, 212, 255 | 20, 17, 0, 0 | Acento suave / modernidad |
| Azul Gamma | `#5056D3` | 80, 86, 211 | 85, 60, 0, 0 | Acento / profesionalismo e innovación |

**Uso digital & físico:** Verde = fondo primario · Blanco = fondo primario y texto · Negro = texto y acento · Azul Gamma = acento. Cualquier combinación no especificada en el manual no forma parte de la identidad.

### Tokens sugeridos (CSS / Tailwind)

```css
:root {
  --gamma-verde:   #00B140;
  --gamma-negro:   #000000;
  --gamma-blanco:  #FFFFFF;
  --gamma-gris:    #A0A8AA;
  --gamma-lavanda: #D2D4FF;
  --gamma-azul:    #5056D3;
}
```

---

## Tipografía

| Uso | Familia | Pesos |
|-----|---------|-------|
| Títulos y subtítulos | **Articulat CF** | Bold, Semibold (Demibold) |
| Texto general | **Articulat CF** | Regular, Light |
| Párrafos / frases y acento | **Corbel** | Regular, Light |

- **Articulat CF** — minimalismo, modernidad y solidez; base del logotipo dinámico. Archivos en `brand/tipografias/Articulat FC/` (versiones *Fontspring DEMO* — para producción hay que licenciar la familia comercial).
- **Corbel** — toque minimal, tec y con estilo para cuerpo de texto. Archivos en `brand/tipografias/Corbel/`.

---

## Logotipo

- **Isotipo:** gota/pin concéntrico (ver `brand/isotipo/`).
- **Logo principal:** isotipo + "GAMMA PLAST" (ver `brand/logos/`).
- **Área segura:** margen `X` de extremo a extremo del isotipo; no invadir con otros elementos.
- **Escala:** mínimo 200 px de ancho en pantalla (exportar a 2× para Retina/UHD). Bajo 200 px / 1.5", usar la versión apilada.
- El logo puede ir sobre otros colores de marca mientras el contraste lo permita.

---

## Iconografía

Estilo lineal, limpio y moderno — alineado a innovación, sostenibilidad y precisión técnica (rubro industrial B2B).

---

## Activos (`brand/`)

| Carpeta | Contenido |
|---------|-----------|
| `logos/` | 5 variantes PNG del logo + fuente `.ai` |
| `isotipo/` | 4 variantes PNG del isotipo |
| `tipografias/Articulat FC/` | OTF (Fontspring DEMO) |
| `tipografias/Corbel/` | TTF |
| `graficas-linkedin/` | Covers y gráficas LinkedIn (PNG + `.ai` + `.psd`) |
| `Manual-de-Marca-Gammaplast.pdf` | Manual de marca oficial (referencia) |
| `Manual-de-Marca-Gammaplast.ai` | Fuente editable del manual (~120 MB, no versionado en git) |

> Los archivos fuente pesados (`.ai`, `.psd`) están en disco pero **excluidos de git** (ver `.gitignore`) para no inflar el repo. Se versionan PNG, fuentes, el PDF del manual y el código.
