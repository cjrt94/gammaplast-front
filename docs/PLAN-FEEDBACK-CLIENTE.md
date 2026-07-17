# Plan de cambios — Feedback de cliente (web.docx)

> Fuente: `web.docx` (comentarios del cliente sobre la web actual, 16 capturas anotadas).
> Fecha de recepción: 2026-07-17. Decisiones cerradas con el cliente/PM el mismo día.
> Owners: **Charlie** (front) · **Dean** (form/backend) · **Rowena** (UX/diseño + audit Impeccable).

## Decisiones cerradas
1. **Catálogo:** reorganizar Productos por los **7 sectores** (no por tipo de empaque).
2. **Contacto:** ~~una sola página~~ → **DOS páginas** (revisado 2026-07-17, como pide el doc): `/contacto` = contacto general (form corto) · `/contacta-un-asesor` = lead calificado ("Hablemos de tu próximo empaque" + RUC/Ubicación, todo obligatorio). Router: botón verde del header + CTAs de Home/Nosotros/Productos → asesor; enlace "Contacto" del menú → general; footer lista ambas. Endpoints: `/api/contacto` (general) y `/api/asesor` (calificado); schemas `contactSchema` y `advisorSchema`.
3. **Nosotros:** **mantener ambas galerías** ("Detrás de cada empaque" + añadir "Nuestra planta").
4. **Assets del cliente:** entregó **catálogo (PDF)** + **banco de imágenes hi-res** (carpeta `Imagenes`, ~38 PNG Gemini que son las fuentes de las fotos del catálogo).
5. **Estructura de Productos:** **tarjetas por producto individual** (el estilo actual, que el cliente marcó "ok"), re-agrupadas en los 7 sectores, con la lista y los cambios de imagen del `.docx`. **No** se usan las subcategorías del catálogo impreso. Razón: el cliente dio instrucciones de imagen producto por producto (Sello T, Easy Peel, Asa parche, Asa brida↔troquel, Polipasacalles, Minería, Construcción…), lo que exige una imagen por producto; el catálogo/banco son la **fuente de imágenes/textos/materiales**, no la estructura.

## Assets — estado
Resueltos con el catálogo (PDF) + banco Gemini:
- ✅ Fotos de los 4 procesos (catálogo p4 / banco).
- ✅ Logos de certificación: reciclaje, d2w, d2p, RecyClass, RCS Blended/100, OK compost/TÜV (catálogo p5).
- ✅ 6 iconos de valores: foco, bolsa, planeta, reciclaje, rollo, empaque (catálogo p2/p20).
- ✅ 7 iconos de sector (portadas de sector del catálogo).
- ✅ Fotos de producto hi-res (banco Gemini — mapear cada archivo a su producto en Fase C).
- ✅ Estructura de materiales — Monocapa / Laminado (catálogo p8).
- ✅ Texto de Nosotros + valores (catálogo p3).

Pendientes de recibir:
- 🎬 Video del banner del Home (o autorización para stock).
- 🏢 Logos de clientes (Gloria, ISM, Viru, Arcor, San Jorge, Coca-Cola/Andina…) — no están en el catálogo ni en el banco.

---

## Fase A — Cambios sin assets (texto/estructura) · Charlie + Dean — ✅ HECHO (2026-07-17)
Verificado (build OK + render en preview + validación del endpoint 422/200/500):
footer sin "Trabaja con nosotros" · Nosotros (texto del catálogo, 6 valores con iconos, sin botones "Contáctanos"/"Cotiza tu empaque", fotos por proceso, sección "Producción integrada") · Contacto (form ampliado con RUC + Ubicación país/ciudad/distrito, todos obligatorios; schema Zod + endpoint) · fotos de proceso también en Home. Detalle original abajo.

### Detalle

### Footer (`components/AppFooter.vue`)
- [ ] Navegación debe coincidir con el header: Inicio · Nosotros · Productos · Novedades · Contacto. Quitar "Trabaja con nosotros". *(Abierto menor: el cliente listó "Contacta un asesor"; con una sola página equivale a Contacto — se mirroréa el header.)*
- [ ] Abierto: ¿mantener la página `/trabaja-con-nosotros` accesible aunque salga del footer, o retirarla?

### Nosotros (`pages/nosotros.vue`)
- [ ] Hero: **quitar botón "Contáctanos"** (líneas 57-59).
- [ ] Intro: reemplazar los 2 párrafos por el **texto del catálogo** (img9):
  > Más que empaques, en Gamma Plast creamos soluciones flexibles de alto rendimiento que impulsan el valor de tu producto. Nos inspira la excelencia, y por ello hemos convertido la innovación tecnológica, la máxima calidad y la atención a la medida en el ADN de nuestra compañía.
  >
  > Somos una empresa especializada en el diseño, desarrollo y fabricación de empaques flexibles de alta calidad. En Gamma Plast nos dedicamos a crear soluciones integrales de envasado que protegen, conservan y realzan el valor de los productos de nuestros clientes, combinando tecnología y experiencia.
- [ ] Valores: reescribir a **6** con nombres e íconos del catálogo (íconos def. en Fase C):
  1. Innovación y Desarrollo (foco)
  2. Compromiso con el Cliente (bolsa)
  3. Responsabilidad Ambiental (planeta)
  4. Sostenibilidad (reciclaje)
  5. Altos Estándares de Calidad (rollo)
  6. Eficiencia en Empaques (empaque)
  - Ajustar copy "Cinco compromisos…" → "Seis…".
- [ ] Procesos: **quitar botón "Cotiza tu empaque"** (línea 122).
- [ ] Galerías: mantener "Detrás de cada empaque" **y** añadir sección "Nuestra planta" (la del Home).
- [ ] Certificaciones: sin cambios ("Certificados ok").

### Contacto (`pages/contacto.vue` + `composables/leadForm.js` + `server/api/contacto.post.js`)
- [ ] Conservar hero "Hablemos de tu próximo empaque" (una sola página).
- [ ] Ampliar formulario, **todos los campos obligatorios**:
  - Ubicación: **País, Ciudad, Distrito** (nuevos).
  - **RUC / Identificación** (nuevo).
  - Campos existentes (Nombre, Apellido, Correo, Teléfono, Empresa, Mensaje) → pasar todos a requeridos.
- [ ] `leadForm.js`: actualizar `contactSchema` (nuevos campos `.min(1)` + `.max(N)`; teléfono/empresa dejan de ser opcionales).
- [ ] `server/api/contacto.post.js` (Dean): revalidar con el schema y añadir los campos nuevos al correo a comercial@.
- ⚠️ La lista de campos del cliente parece cortada tras "RUC o Identificación" — **confirmar set final**.

---

## Fase B — Reestructura del catálogo (7 sectores) · Charlie — ✅ HECHO (2026-07-17)
Implementado y verificado (`npm run build` OK + render en preview, 4 rutas 200):
- `useCatalog.js` reescrito a 7 sectores + 37 productos + `materials`.
- `productos/index.vue`: chips = 7 sectores (2 filas), grupos por sector con **banner de escena**, bloque **Estructuras y materiales** (Monocapa/Laminado + colores) junto al CTA, JSON-LD por sector. Tarjeta: foto `.jpg` a sangre / cutout `.png` contenido.
- `index.vue` (Home): tarjetas de categoría = 7 sectores (deep-link `?sec=`).
- `BaseIcon.vue`: iconos `shirt`, `package`, `spray`.
- Imágenes procesadas a `public/` (14 fotos + 15 recortes de producto, optimizadas con sips).
- Pendiente pasada Rowena: recortes limpios de **Sello T** y **Easy peel** (sin fuente dedicada) y revisión de encuadres de los recortes cuadrados.

---

### Referencia — spec original de Fase B

`composables/useCatalog.js` pasa de "familias por tipo + filtro de industria" a **producto individual etiquetado por sector**. Se conservan las tarjetas por producto (estilo "ok"); cambia la clave de agrupación (`type` → `sector`) y la lista de productos. Chips del filtro = 7 sectores en **2 filas** (`pages/productos/index.vue`). Tarjetas de categoría del Home (`pages/index.vue`) = los 7 sectores.

**Productos nuevos a crear** (no existen hoy en `useCatalog`): Stand-up pouch · Saco · Geomembrana · Láminas y mangas · Dinero y valores · Bolsa para residuos · Cuidado personal · Minería · Construcción. El resto ya existe y solo se re-etiqueta por sector (+ cambios de imagen). ⚠️ Asa brida / Asa troquel: **intercambiar** sus imágenes.

| Sector | Productos (nota de imagen del cliente) |
|---|---|
| **Alimentos y bebidas** | Etiquetas · Fundas (termoencogible botella) · Termoencogible (sixpack) · Doypack · Doypack con válvula · Sello U · Sello T *(cambiar img)* · Twist · Easy Peel *(cambiar img: pote con tapa abierta)* · Flowpack *(cambiar img por bobina, ref. catálogo)* · Shrink bag (empaque al vacío) · Stand-up pouch (bolsas para uvas) |
| **Pesca y agroindustria** | Resmas (tipo hojas de papel) · Funda congelados (bolsa con solapa) · Funda microperforada · Saco · Mulch y cobertores · Almácigo · Geomembrana |
| **Textil** | Polybag · Láminas y mangas |
| **Envíos seguros y valores** | E-commerce y Courier · Dinero y valores |
| **Limpieza y cuidado personal** | Bolsa para residuos · Limpieza · Cuidado personal |
| **Retail y marketing** | T-shirt · Asa parche *(imagen nueva)* · Asa brida *(⚠ intercambiar img con troquel)* · Asa troquel *(⚠ intercambiar img con brida)* · Polipasacalles *(cambiar img)* |
| **Industria en general** | Bobinas film *(img bobinas)* · Bolsa sello lateral · Bolsa sello fondo · Sobre empaque *(img sobreempaque)* · Minería *(img referencial nueva)* · Alimento mascotas *(saco alimento perros)* · Construcción *(img nueva)* |

**Estructuras y materiales** (img15) — añadir al final de Productos, en el recuadro del CTA "contacta a un asesor":
- Colores (paleta): verde · blanco · negro · rojo · rosa · azul · amarillo · gris.
- Monocapa: PE Baja densidad virgen · PE Alta densidad virgen · PE reciclado · PLA Compostable · PE Termoencogible · Polipropileno.
- Laminado y coextrusión: BOPP · BOPA · BOPET · EVOH · MDO-PE · CAST · COATED PAPER · PET SHRINK · Metalizados · Coextrusión multicapa.

> Actualizar también el JSON-LD (`ItemList`/`category`) y el sitemap si cambian slugs de producto.

---

## Fase C — Assets · Charlie + Rowena
Preparación: mapear los ~38 PNG del banco Gemini → producto/proceso/sector (nombres tipo hash) y extraer del PDF los gráficos vectoriales (iconos de valores, iconos de sector, logos de certificación). Optimizar a web (redimensionar/comprimir; hoy pesan 5–12 MB c/u).
- [x] Productos: imágenes de producto integradas (banco Gemini) + swaps del `.docx`. *(Sello T y Easy peel sin fuente dedicada → recorte pendiente de Rowena.)*
- [x] Home + Nosotros: **fotos por proceso** en las 4 etapas.
- [x] Home: **tira de logos de certificaciones** (`certificados.jpg`, recortada del catálogo p5 con pdftoppm — el PNG del banco Gemini traía un damero horneado + marca de agua, descartado). *(Ideal a futuro: SVG oficiales individuales.)*
- [x] Nosotros: **íconos de valores** (recreados como SVG en BaseIcon: bulb/bag/globe/recycle/roll/package). *(Aproximación; fidelidad fina = Rowena.)*
- [x] Productos: iconos de sector para chips/tarjetas (shirt/package/spray añadidos).
- [ ] Home hero: soportar **video** de fondo (póster = composición actual como fallback). ⏳ *pendiente video*
- [ ] Home: **banda de logos de clientes** — estructura + placeholder. ⏳ *pendiente logos*

---

## Fase D — Cierre · Rowena + Charlie
- [ ] Audit Impeccable (contraste AA, foco, touch targets, CLS de imágenes nuevas).
- [ ] Verificación en navegador (multi-salto por el fix de nav) + `npm run build`.
- [ ] Changelog (repo Sam + repo gammaplast) por cada tanda.
- [ ] Deploy Vercel (ya hay `vercel.json` + `.vercelignore` sin commitear).

---

## Notas
- "No cargan los enlaces" (Home) ≈ el bug de navegación multi-root **ya arreglado** en `01108a0`. Verificar en el deploy.
- Convención: JS nativo (CommonJS), sin TS; sin diálogos nativos; patrón de validación Zod del equipo.
