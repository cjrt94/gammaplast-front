# Plan de rediseño — Web Gamma Plast

**Proyecto:** web corporativa institucional de Gamma Plast (fabricante peruano de empaques flexibles).
**Por qué "rediseño":** el diseño de los mockups iniciales (`.fig`, piel plana 50/50 verde) fue la primera idea; se reorienta a una dirección **corporativa/institucional** más cercana al brochure y a referentes tipo Resinplast.
**Estado:** key visual del Home **aprobado** (`design/home.html`).

## Fuentes de contenido (autoritativas)
1. **`Info.docx`** — brief oficial del sitio (estructura y contenido definidos por el cliente). **Manda sobre todo lo demás.**
2. **Catálogo corporativo** (`Catalogo corporativo final (1).pdf`) — referencia visual, materiales, certificaciones y fotografía de producto.
3. **Mockup `.fig`** (`GammaPlast.fig`) — estructura de presentación de productos (4 categorías) y **copy real reutilizable**: descripciones por categoría (§4.4), intro de productos, un **artículo de Novedades** ("Gamma Plast fortalece su capacidad productiva…") y un texto de **aliado estratégico** (útil para Nosotros). *Se descartan sus placeholders (contacto ficticio, "50%/Information solutions", etc.).*
4. `BRAND.md` / manual de marca — identidad. `DESIGN.md` — sistema de diseño.

> Nota: los datos ficticios del mockup quedan descartados; este plan refleja `Info.docx` como fuente principal, con el mockup y el catálogo como apoyo de contenido/visual.

---

## 1. Objetivos
- Transmitir **seriedad, escala industrial y confianza** B2B.
- Comunicar el diferencial: **cadena productiva integral** (extrusión → impresión → corte → sellado), **certificaciones** y **sostenibilidad**.
- Enrutar por **categoría de producto** hasta el contacto comercial.
- Base mantenible, **bilingüe ES/EN**, con novedades y bolsa de trabajo.

## 2. Público y acción principal
- **Público:** jefes de compras / marca en alimentos, industria, retail/e-commerce y agro.
- **Job:** solicitar asesoría/cotización. CTA global: *Contacta a un asesor*.

---

## 3. Arquitectura de información (sitemap)

```
/                        Home
/nosotros                Nosotros
/productos               Productos (índice de 4 categorías)
/productos/[categoria]   Detalle de categoría  (×4)
/novedades               Novedades (blog)
/novedades/[slug]        Artículo
/contacto                Contacto (datos + formulario + mapa; footer SIN CTA)
/trabaja-con-nosotros    Trabaja con nosotros (bolsa de trabajo + carga de CV)
```

- **Idioma:** bilingüe **ES / EN** con selector (bandera). ES por defecto.
- **Nav principal:** Inicio · Nosotros · Productos · Novedades · Contacto + selector de idioma + botón *Contacta a un asesor*. "Trabaja con nosotros" en el footer (y/o nav secundario).

---

## 4. Contenido por página (según `Info.docx`)

### 4.1 Home — ✓ diseñado (versión simplificada aprobada)
Por decisión del cliente el Home quedó reducido a **Hero + Procesos productivos (sin fotos) + Productos por categoría (sin detalle) + Footer**.
- Hero: "Transformando ideas, cuidamos tu marca" / apoyo *"Especialistas en empaques flexibles"*.
- **Elementos del brief diferidos** (a decidir si se reincorporan): **video con clips** en el hero, **banner rotativo con logos de clientes**, bloque de **valores**. Hoy no están para mantener el Home ligero; el bloque de valores se trasladó a Nosotros.

### 4.2 Nosotros
- **Introducción** (copy oficial, con imágenes al costado):
  > *"En Gamma Plast, no solo fabricamos empaques flexibles; construimos el respaldo que tu marca merece. Nacimos con la convicción de que la calidad, innovación y el servicio personalizado son nuestros pilares. Por eso, cada solución que sale de nuestra planta es el resultado de un compromiso genuino con tus necesidades.*
  > *Nos mueven valores como la honestidad y la confianza, asegurando que cada entrega sea sinónimo de tranquilidad para ti. Miramos al futuro con responsabilidad, integrando prácticas sostenibles que nos permitan crecer juntos, cuidando el entorno que compartimos. En Gamma Plast, tu éxito es nuestra mejor carta de presentación."*
- **Valores:** Excelencia · Trabajo en equipo · Innovación · Respeto · Integridad (con imagen de referencia).
- **Misión y Visión** — *copy pendiente del cliente* (o reutilizar el del catálogo, a confirmar).
- **Certificaciones** (con isotipos + enlace a info del certificado): **RCS · TÜV · D2W · D2P** (+ **ISO**, confirmar cuál). Imágenes de certificaciones con referencia.
- **Capacidades / procesos** (con fotos, referencia *Emusa*):
  1. **Extrusión por soplado** — películas de PEBD, PEAD, PLA y reciclados.
  2. **Impresión** — flexografía full color.
  3. **Corte** — corte y doblado a medida.
  4. **Sellado** — sello plano, fondo, lateral y acabados especiales.
- **CTA** asesor.

### 4.3 Productos (índice)
Grid de las **4 categorías** con acceso a cada detalle + bloque de materiales/certificación + CTA.

### 4.4 Detalle de categoría (plantilla × 4) — *productos de referencia*
| Categoría | Productos de referencia |
|-----------|--------------------------|
| **Alimentos y bebidas** | Doypack · Doypack con válvula · Sello U · Sello T · Twist · Easy peel · Empaque al vacío · Flowpack · Termoencogible · Etiquetas |
| **Industria en general** | Rollos/bobinas · Sello lateral · Sello fondo · Polybag con solapa · Mascotas · Limpieza y cuidado del hogar · Microperforado · Sobreempaque · Resmas |
| **Retail y e-commerce** | T-shirt · Asa parche · Asa brida · Asa troquel · E-commerce y courier · Polipasacalles |
| **Pesca y agroindustria** | Congelados · Frescos · Mulch · Almácigos · Fertilizante · Fundas protectoras · Fundas de colores · Fundas microperforadas |

**Formato de presentación** (tomado del mockup `.fig`): por categoría → **título + párrafo descriptivo + tarjetas de producto** (imagen dummy + nombre; referencia, sin ficha técnica en v1).

Descripciones oficiales por categoría (del mockup, listas para usar):
- **Alimentos y bebidas:** *"Ofrecemos empaques flexibles diseñados para preservar la calidad, frescura y seguridad de productos alimenticios y bebidas. Nuestras soluciones combinan materiales de alto desempeño y acabados de impresión que permiten proteger el contenido y resaltar tu marca en el punto de venta."*
- **Industria en general:** *"Desarrollamos empaques flexibles versátiles para distintos sectores industriales, ofreciendo soluciones resistentes, funcionales y adaptadas a cada aplicación. Nuestros materiales y procesos garantizan protección, eficiencia en el manejo y una presentación profesional del producto."*
- **Retail y e-commerce:** *"Diseñamos empaques flexibles pensados para el sector retail y e-commerce, que combinan practicidad, resistencia y una presentación atractiva. Nuestras soluciones facilitan el transporte, protegen el contenido durante la entrega y refuerzan la identidad de tu marca en cada punto de contacto con el cliente."*
- **Pesca y agroindustria:** *"Ofrecemos empaques flexibles diseñados para las exigencias de los sectores pesquero y agroindustrial, proporcionando resistencia, protección y eficiencia en el almacenamiento y transporte. Nuestras soluciones ayudan a conservar la calidad de los productos y a optimizar los procesos logísticos desde el origen hasta su destino."*

> ✅ **Decisión #1 resuelta:** son **4 categorías**. Tanto `Info.docx` como el **mockup `.fig`** presentan los productos en estas mismas 4 (Alimentos y bebidas · Industria en general · Retail y e-commerce · Pesca y agroindustria). Los "7 sectores" solo aparecen en el catálogo PDF; no se usan para la web.

### 4.5 Novedades (blog)
Noticias e información relevante de la empresa y de la industria del plástico. Listado (card: imagen, fecha, título, extracto) + destacado + artículo.

### 4.6 Contacto — *(footer sin CTA, punto acordado)*
- **Formulario** → correo a **comercial@gammaplast.com.pe** y **comercial2@gammaplast.com.pe**. Campos: **Nombre · Apellido · Teléfono · Correo · Empresa/Compañía · Mensaje**. Sin diálogos nativos.
- **Datos de contacto** con enlace a Maps: **Dirección · teléfono fijo/celular de administración · correo de administración**.
- Mapa (Ate, Lima).

### 4.7 Trabaja con nosotros — *(página nueva, referencia Bioelements)*
- **Formulario** → **recursoshumanos@gammaplast.com.pe**. Campos: **Nombre · Apellido · Teléfono · Correo · Mensaje · Carga de CV/documento**.

---

## 5. Componentes reutilizables
Definidos en [`DESIGN.md`](DESIGN.md): top bar, header/nav (con **selector de idioma**), footer (sin CTA), botones, pills (outline/tint/sólido), section header, cards (proceso/capacidad, categoría, producto, material, certificado, artículo), chips, formularios (contacto y CV), mapa.

---

## 6. Stack y consideraciones técnicas
- **Nuxt 3** (SSG/prerender), **JS nativo** (sin TS), **Tailwind** con tokens de `DESIGN.md`. **Vercel**. (Charlie/Bobby)
- **i18n ES/EN** con `@nuxtjs/i18n` (rutas `/es//en/`, contenido bilingüe). **Confirmado por el brief.**
- **Fuentes:** licenciar **Articulat CF** (titulares) + resolver fuente de cuerpo web (Corbel con licencia o sustituto embebible con acentos). Bloqueante para producción.
- **Novedades:** `@nuxt/content` (markdown en repo) para v1.
- **Formularios (2):** contacto → comercial@/comercial2@; CV → recursoshumanos@ (con **subida de archivo**, validación de tipo/tamaño). Envío por Resend/Cloud Function + anti-spam. (Dean/Bobby)
- **SEO:** meta + OG, **JSON-LD** `Organization`+`LocalBusiness` (dirección/geo Ate-Lima), hreflang ES/EN, sitemap, robots.
- **Accesibilidad AA:** verde solo como fondo/borde/gráfico, nunca texto sobre blanco.
- **Extras del brief:** video en hero, banner de logos de clientes (diferidos en Home). WhatsApp flotante a evaluar.
- **Changelog** obligatorio por commit (protocolo de Sam).

---

## 7. Assets
- **Brand kit:** `brand/` (listo). **Producto:** los **33 dummies** mapean a los productos de referencia — reemplazar #33 (texto placeholder) y decidir #31 (azul banano).
- **Fotografía:** procesos/planta/valores/certificaciones — hoy stock; ideal fotos propias (+ **logos de clientes** para el banner).
- **Certificados:** isotipos RCS/TÜV/D2W/D2P + enlaces oficiales.

---

## 8. Roadmap de ejecución
| Fase | Entregable | Responsable |
|------|-----------|-------------|
| **0** | Key visual Home ✓ + plan ✓ | Rowena / Sam |
| **1** | Diseño de páginas restantes (Nosotros, Productos + 4 categorías, Contacto, Trabaja con nosotros, Novedades) | Rowena / Charlie |
| **2** | Scaffold Nuxt 3 + Tailwind + i18n + design system | Charlie / Bobby |
| **3** | Maquetación de páginas estáticas | Charlie |
| **4** | Formularios (contacto + CV) + Novedades (`@nuxt/content`) | Dean / Charlie |
| **5** | SEO, hreflang, performance, deploy Vercel + dominio | Bobby |
| **6** | Contenido real (fotos, misión/visión, logos clientes) + QA + launch | Todos |

---

## 9. Decisiones abiertas (a confirmar con el cliente)
1. ~~**Taxonomía de productos:** 4 vs 7~~ → **RESUELTO: 4 categorías** (confirmado por `Info.docx` y el mockup `.fig`). Ver §4.4.
2. **Home:** ¿reincorporar **video** en hero y **banner de logos de clientes**? (hoy diferidos).
3. **Misión y Visión:** falta el copy — ¿lo provee el cliente o reutilizamos el del catálogo?
4. **Certificaciones:** confirmar cuáles ISO aplican y links oficiales de RCS/TÜV/D2W/D2P.
5. **Correos del formulario de contacto:** el brief dice `comercial@`; el catálogo dice `comercial1@`. ¿Cuál es el correcto?
6. **Detalle de producto:** ¿solo referencia visual (v1) o fichas técnicas (calibres/medidas)?
7. **Fuentes:** presupuesto para licenciar Articulat CF + fuente de cuerpo web.
8. **Dominio/hosting:** acceso a DNS de `gammaplast.com.pe`.
9. **Dummies:** reemplazo del #33 y criterio del #31.
10. **Contenido EN:** ¿quién provee las traducciones?

---

## 10. Próximo paso sugerido
Resolver la **decisión #1 (4 vs 7 categorías)** y luego ejecutar **Fase 1** diseñando **Nosotros** (la página con más contenido) sobre el sistema del Home.
