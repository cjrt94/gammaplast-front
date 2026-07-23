// scripts/seed.mjs — migración one-time del contenido hardcodeado → Firestore.
// Idempotente (upserts por id) y seguro de re-correr. Uso:
//   node scripts/seed.mjs --dry-run     # imprime lo que escribiría, sin tocar Firestore
//   node scripts/seed.mjs               # escribe de verdad
//
// Credenciales (una de las dos):
//   a) env NUXT_FIREBASE_SERVICE_ACCOUNT = base64 del JSON de la service account, o
//   b) un archivo ./serviceAccount.json en la raíz del proyecto (gitignored).
//
// Las imágenes se siembran como las rutas públicas actuales (/photos/*, /products/*): válidas
// desde el minuto uno. Re-subir por /admin es una acción posterior por ítem.
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { useCatalog } from '../composables/useCatalog.js'
import { novedades } from '../data/novedades.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DRY = process.argv.includes('--dry-run')

// ── slug helper (acentos fuera, no-alfanumérico → guion) ──────────────────────
const slugify = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// ── credenciales ──────────────────────────────────────────────────────────────
function loadServiceAccount () {
  if (process.env.NUXT_FIREBASE_SERVICE_ACCOUNT) {
    return JSON.parse(Buffer.from(process.env.NUXT_FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf8'))
  }
  const p = resolve(ROOT, 'serviceAccount.json')
  if (existsSync(p)) return JSON.parse(readFileSync(p, 'utf8'))
  console.error('✗ Falta la service account: define NUXT_FIREBASE_SERVICE_ACCOUNT (base64) o coloca ./serviceAccount.json')
  process.exit(1)
}

// ── contenido ───────────────────────────────────────────────────────────────
const { sectors, products, materials } = useCatalog()

// Productos: asignar id estable = slugify(name), con guardia de colisión (-2, -3…).
const seenIds = new Map()
const productDocs = products.map((p, i) => {
  let id = slugify(p.name)
  const n = (seenIds.get(id) || 0) + 1
  seenIds.set(id, n)
  if (n > 1) id = `${id}-${n}`
  const perSectorOrder = products.filter((q) => q.sector === p.sector).indexOf(p)
  return { id, data: { id, name: p.name, img: p.img, sector: p.sector, order: perSectorOrder } }
})

// Nosotros (transcrito de pages/nosotros.vue).
const nosotros = {
  hero: {
    pill: 'Nosotros',
    title: 'Comprometidos con la calidad y la innovación',
    image: '/photos/nosotros-hero.jpg',
    paragraphs: [
      'Más que empaques, en Gamma Plast creamos soluciones flexibles de alto rendimiento que impulsan el valor de tu producto. Nos inspira la excelencia, y por ello hemos convertido la innovación tecnológica, la máxima calidad y la atención a la medida en el ADN de nuestra compañía.',
      'Somos una empresa especializada en el diseño, desarrollo y fabricación de empaques flexibles de alta calidad. En Gamma Plast nos dedicamos a crear soluciones integrales de envasado que protegen, conservan y realzan el valor de los productos de nuestros clientes, combinando tecnología y experiencia.'
    ]
  },
  valores: {
    pill: 'Nuestros valores',
    title: 'Los principios que guían cada decisión',
    intro: 'Seis compromisos que dan sentido a cada empaque que fabricamos y a cada relación que construimos.',
    items: [
      { img: '/photos/valores/innovacion.png', name: 'Innovación y Desarrollo' },
      { img: '/photos/valores/compromiso.png', name: 'Compromiso con el Cliente' },
      { img: '/photos/valores/ambiental.png', name: 'Responsabilidad Ambiental' },
      { img: '/photos/valores/sostenibilidad.png', name: 'Sostenibilidad' },
      { img: '/photos/valores/calidad.png', name: 'Altos Estándares de Calidad' },
      { img: '/photos/valores/eficiencia.png', name: 'Eficiencia en Empaques' }
    ]
  },
  misionVision: {
    pill: 'Misión y visión',
    title: 'Nuestros principios guían cada decisión y proceso',
    mision: 'Fabricar empaques flexibles brindando respaldo a las marcas mediante calidad, innovación y servicio personalizado, cumpliendo las necesidades del cliente con honestidad y confianza.',
    vision: 'Crecer junto a nuestros clientes de forma sostenible, integrando prácticas responsables con el entorno y convirtiendo el éxito del cliente en nuestra principal carta de presentación.'
  },
  procesos: {
    pill: 'Nuestros Procesos Productivos',
    title: 'Control total, de la resina al empaque terminado',
    intro: 'Usamos tecnología especializada y procesos integrales para producir empaques flexibles de alta calidad con precisión y eficiencia.',
    note: 'Adaptamos cada etapa al formato, material y acabado que tu producto necesita.',
    items: [
      { n: '01', title: 'Extrusión por soplado', img: '/photos/proceso-extrusion.jpg', desc: 'Proceso de fabricación que permite producir películas plásticas flexibles a partir de resinas como PEBD, PEAD, PLA y materiales reciclados. Genera materiales resistentes que sirven como base para distintos tipos de empaques flexibles.' },
      { n: '02', title: 'Impresión: Flexografía Full Color', img: '/photos/proceso-impresion.jpg', desc: 'Proceso de impresión que permite aplicar gráficos y diseños directamente sobre las películas plásticas, utilizando tintas especializadas y placas flexográficas. Esta tecnología garantiza colores nítidos y consistentes, permitiendo destacar la identidad de la marca en cada empaque.' },
      { n: '03', title: 'Corte: Corte y doblado a medida', img: '/photos/proceso-corte.jpg', desc: 'Proceso que permite adaptar las películas plásticas a las dimensiones y formatos requeridos para cada tipo de empaque. A través de cortes precisos y doblados controlados, se preparan los materiales para su posterior sellado y conversión en productos terminados.' },
      { n: '04', title: 'Sellado: Sello plano, fondo y lateral', img: '/photos/proceso-sellado.jpg', desc: 'Proceso que permite unir y cerrar las películas plásticas para formar distintos tipos de empaques. Mediante sellos planos, de fondo o laterales, se garantiza resistencia, seguridad y un acabado adecuado para cada aplicación.' }
    ]
  },
  galeria: {
    pill: 'Nuestra planta',
    title: 'Detrás de cada empaque',
    intro: 'Extrusión, impresión flexográfica, corte y sellado: el proceso completo, en imágenes.',
    images: [
      { src: '/photos/galeria-impresion.jpg', alt: 'Prensa flexográfica imprimiendo empaque a color', span: 'big' },
      { src: '/photos/galeria-rollos.jpg', alt: 'Nave de producción con rollos de material' },
      { src: '/photos/galeria-shrinkfilm.jpg', alt: 'Máquina de shrink film con rollo de película' },
      { src: '/photos/galeria-film.jpg', alt: 'Detalle de film plástico transparente' },
      { src: '/photos/galeria-rodillos.jpg', alt: 'Detalle de rodillos de impresión' },
      { src: '/photos/galeria-linea.jpg', alt: 'Línea de producción en planta' }
    ]
  },
  certs: {
    pill: 'Certificaciones',
    title: 'Certificaciones que garantizan calidad, seguridad y confianza.',
    intro: 'Nuestros empaques de PE y PP son biodegradables, compostables, reciclados y laminados, y cumplen la normativa FDA para contacto con alimentos.'
  }
}

// Certificaciones (grid Nosotros) — colección.
const certifications = [
  { code: 'RCS', desc: 'Recycled Claim Standard', icon: 'recycle' },
  { code: 'TÜV', desc: 'OK compost — TÜV Austria', icon: 'leaf' },
  { code: 'D2W', desc: 'Tecnología oxo-biodegradable', icon: 'sprout' },
  { code: 'D2P', desc: 'Protección antimicrobiana', icon: 'shield' },
  { code: 'ISO', desc: 'Gestión de calidad', icon: 'award' },
  { code: 'FDA', desc: 'Contacto con alimentos', icon: 'food' }
].map((c, i) => ({ id: slugify(c.code), data: { id: slugify(c.code), ...c, order: i } }))

// Tira de logos de certificación del home (index.vue certLogos).
const certLogos = [
  { src: '/photos/certs/recycle.png', alt: 'Reciclable' },
  { src: '/photos/certs/d2w.png', alt: 'd2w — tecnología oxo-biodegradable' },
  { src: '/photos/certs/d2p.png', alt: 'd2p — protección antimicrobiana' },
  { src: '/photos/certs/recyclass.png', alt: 'RecyClass' },
  { src: '/photos/certs/rcsblended.png', alt: 'Recycled Blended Claim Standard' },
  { src: '/photos/certs/rcs100.png', alt: 'Recycled 100 Claim Standard' },
  { src: '/photos/certs/tuv.png', alt: 'OK compost — TÜV Austria Industrial' }
].map((l, i) => ({ id: `cert-logo-${i + 1}`, data: { id: `cert-logo-${i + 1}`, ...l, order: i } }))

// Marquee de logos de clientes (ClientLogos.vue) — PLACEHOLDERS.
const clientLogos = [
  { src: '/logos/clientes/nestle.svg', alt: 'Nestlé' },
  { src: '/logos/clientes/pepsico.svg', alt: 'PepsiCo' },
  { src: '/logos/clientes/cocacola.svg', alt: 'Coca-Cola' },
  { src: '/logos/clientes/danone.png', alt: 'Danone' },
  { src: '/logos/clientes/mondelez.svg', alt: 'Mondelēz International' },
  { src: '/logos/clientes/kraftheinz.svg', alt: 'Kraft Heinz' },
  { src: '/logos/clientes/unilever.svg', alt: 'Unilever' },
  { src: '/logos/clientes/generalmills.svg', alt: 'General Mills' },
  { src: '/logos/clientes/mars.svg', alt: 'Mars' },
  { src: '/logos/clientes/kelloggs.svg', alt: "Kellogg's" },
  { src: '/logos/clientes/bimbo.svg', alt: 'Grupo Bimbo' },
  { src: '/logos/clientes/alicorp.svg', alt: 'Alicorp' },
  { src: '/logos/clientes/gloria.png', alt: 'Gloria' }
].map((l, i) => ({ id: `client-logo-${i + 1}`, data: { id: `client-logo-${i + 1}`, ...l, order: i } }))

// Home (i18n home.* + copy de la banda "Nuestra planta" de index.vue).
const home = {
  hero: {
    eyebrow: 'Fabricante de empaques flexibles · Perú',
    title: 'Transformando ideas,',
    titleAccent: 'cuidamos tu marca',
    lead: 'Diseñamos, desarrollamos y fabricamos empaques flexibles de PE y PP que protegen, conservan y realzan el valor de tu producto.',
    chips: ['Grado alimentario FDA', 'Reciclable y compostable', 'Impresión full color'],
    video: '/videos/hero.mp4',
    poster: '/videos/hero-poster.jpg'
  },
  certStrip: { note: 'Nuestros empaques cuentan con certificaciones y cumplen la normativa FDA para contacto con alimentos.' },
  plant: {
    eyebrow: 'Nuestra planta',
    title: 'Producción integrada en nuestra planta',
    intro: 'Extrusión, impresión, corte y sellado en nuestra planta en Lima, con control de calidad en cada etapa.',
    images: [
      { src: '/photos/home-planta-band.jpg', alt: 'Interior de la planta de producción de empaques flexibles', span: 'big' },
      { src: '/photos/galeria-impresion.jpg', alt: 'Prensa flexográfica imprimiendo empaque a color', span: '' },
      { src: '/photos/galeria-rollos.jpg', alt: 'Nave de producción con rollos de material', span: '' },
      { src: '/photos/galeria-shrinkfilm.jpg', alt: 'Máquina de shrink film con rollo de película', span: '' },
      { src: '/photos/galeria-linea.jpg', alt: 'Línea de producción en planta', span: '' }
    ]
  },
  process: {
    eyebrow: 'Nuestros procesos productivos',
    title: 'Control total, de la resina al empaque terminado',
    intro: 'Integramos toda la cadena productiva bajo un mismo techo para garantizar calidad, trazabilidad y cumplimiento en cada entrega.',
    steps: [
      { label: 'Extrusión blown film', title: 'Película a medida', desc: 'Convertimos la resina en película con el calibre y las propiedades mecánicas que cada producto necesita.', img: '/photos/proceso-extrusion.jpg' },
      { label: 'Impresión flexográfica', title: 'Full color de alta definición', desc: 'Damos vida a tu marca sobre el empaque con impresión flexográfica precisa y colores fieles.', img: '/photos/proceso-impresion.jpg' },
      { label: 'Corte y rebobinado', title: 'Formato exacto', desc: 'Ajustamos ancho, largo y presentación en bobinas o láminas según tu línea de envasado.', img: '/photos/proceso-corte.jpg' },
      { label: 'Sellado y acabado final', title: 'Empaque terminado', desc: 'Sellado, troquelado y acabados que definen el formato final, listo para tu producto.', img: '/photos/proceso-sellado.jpg' }
    ]
  },
  products: {
    eyebrow: 'Nuestros productos',
    title: 'Una solución de empaque para cada industria',
    intro: 'Desarrollamos empaques flexibles a la medida de las exigencias de cada industria.'
  },
  clientLogosTitle: 'Marcas que confían en nosotros'
}

// Copys por página (héroes internos + bloques de marketing) — singletons/pages.
const pages = {
  productos: {
    hero: { eyebrow: 'Nuestros productos', title: 'Una solución de empaque para cada sector', intro: 'Explora nuestra línea de empaques flexibles agrupada por sector. Filtra para ver las soluciones pensadas para tu industria.' },
    materials: { eyebrow: 'Estructuras y materiales', title: 'Materiales a la medida de tu producto', intro: 'Trabajamos estructuras monocapa, laminados y coextrusiones, en distintos colores y acabados.' },
    chips: [{ label: 'Grado alimentario FDA', icon: 'check' }, { label: 'Reciclables y compostables', icon: 'recycle' }]
  },
  novedades: {
    hero: { eyebrow: 'Novedades', title: 'Noticias e información del sector', intro: 'Novedades de Gamma Plast y del mundo de los empaques flexibles y la industria del plástico.' },
    articleCta: '¿Tienes un proyecto de empaque en mente?'
  },
  contacto: {
    hero: { eyebrow: 'Contacto', title: 'Estamos para ayudarte', intro: '¿Tienes una consulta general? Escríbenos y te responderemos a la brevedad.' },
    card: { title: '¿Buscas cotizar un empaque?', text: 'Déjanos los datos de tu proyecto y un asesor te contactará con una propuesta.' }
  },
  advisor: {
    hero: { eyebrow: 'Contacta a un asesor', title: 'Hablemos de tu próximo empaque', intro: 'Cuéntanos sobre tu producto y un asesor te contactará para encontrar la solución de empaque flexible ideal.' }
  },
  careers: {
    hero: { eyebrow: 'Trabaja con nosotros', title: 'Crece junto a Gamma Plast', intro: '¿Quieres formar parte de nuestro equipo? Déjanos tus datos y adjunta tu CV; te contactaremos si tu perfil encaja con nuestras vacantes.' }
  },
  nosotrosCta: { title: 'Trabajemos juntos en tu próximo empaque', text: 'Somos tu aliado estratégico, desde la selección de materiales hasta la entrega final.' }
}

// Ajustes globales del sitio — singletons/settings.
const settings = {
  footerAbout: 'Empresa peruana especializada en el diseño, desarrollo y fabricación de empaques flexibles de alta calidad, reciclables y compostables.',
  topbarClaim: 'Empaques flexibles con propósito · Lima, Perú',
  certBadges: [{ label: 'Normativa FDA', icon: 'check' }, { label: 'Reciclable', icon: 'recycle' }, { label: 'Compostable', icon: 'leaf' }],
  orgDescription: 'Fabricante peruano de empaques flexibles de PE y PP, reciclables y compostables, con certificación FDA.'
}

// Contacto (única fuente de verdad — hoy duplicado en app.vue / footer / topbar / páginas).
const contact = {
  address: {
    street: 'Calle Luis Galvani 310, Urb. Santa Rosa',
    locality: 'Ate',
    region: 'Lima',
    country: 'Perú',
    full: 'Calle Luis Galvani 310, Urb. Santa Rosa, Ate — Lima, Perú'
  },
  phones: ['+51 908 865 429', '+51 908 858 154'],
  phonesRaw: ['+51908865429', '+51908858154'],
  emails: ['comercial@gammaplast.com.pe', 'comercial2@gammaplast.com.pe'],
  mapEmbedUrl: 'https://www.google.com/maps?q=Calle+Luis+Galvani+310+Ate+Lima+Peru&output=embed',
  social: []
}

// SEO + FAQ (es.json seo.* + faq.*).
const es = JSON.parse(readFileSync(resolve(ROOT, 'i18n/locales/es.json'), 'utf8'))
const seo = { pages: es.seo, faq: es.faq }

// Novedades → docs con order + published.
const novedadesDocs = novedades.map((n, i) => ({ id: n.slug, data: { ...n, order: i, published: true } }))

// Sectores → docs con order.
const sectorDocs = sectors.map((s, i) => ({ id: s.slug, data: { ...s, order: i } }))

// ── plan de escritura ─────────────────────────────────────────────────────────
const collections = {
  sectors: sectorDocs,
  products: productDocs,
  novedades: novedadesDocs,
  certifications,
  certLogos,
  clientLogos
}
const singletons = { materials, home, nosotros, contact, seo, pages, settings }

// ── ejecución ───────────────────────────────────────────────────────────────
async function main () {
  console.log(DRY ? '── DRY RUN (no se escribe nada) ──\n' : '── SEED (escribiendo en Firestore) ──\n')

  if (DRY) {
    for (const [name, docs] of Object.entries(collections)) console.log(`colección ${name}: ${docs.length} docs → ${docs.map((d) => d.id).join(', ')}`)
    for (const name of Object.keys(singletons)) console.log(`singleton singletons/${name}`)
    console.log('\n✓ dry-run OK (nada escrito).')
    return
  }

  const sa = loadServiceAccount()
  initializeApp({ credential: cert(sa) })
  const db = getFirestore()
  const stamp = () => ({ updatedAt: FieldValue.serverTimestamp(), createdAt: FieldValue.serverTimestamp() })

  for (const [name, docs] of Object.entries(collections)) {
    const batch = db.batch()
    for (const { id, data } of docs) batch.set(db.collection(name).doc(id), { ...data, ...stamp() }, { merge: true })
    await batch.commit()
    console.log(`✓ ${name}: ${docs.length} docs`)
  }
  for (const [id, data] of Object.entries(singletons)) {
    await db.collection('singletons').doc(id).set({ ...data, ...stamp() }, { merge: true })
    console.log(`✓ singletons/${id}`)
  }
  console.log('\n✓ Seed completo.')
}

main().catch((e) => { console.error(e); process.exit(1) })
