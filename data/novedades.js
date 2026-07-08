// Novedades — contenido estático v1. TODO: migrar a @nuxt/content (markdown) en producción.
export const novedades = [
  {
    slug: 'gamma-plast-fortalece-su-capacidad-productiva',
    title: 'Gamma Plast fortalece su capacidad productiva para nuevos mercados',
    date: '2026-03-15',
    image: '/products/8.png',
    excerpt: 'Incorporamos nueva tecnología y optimizamos nuestros procesos para incrementar volúmenes, reducir tiempos de entrega y ampliar nuestra oferta de empaques flexibles.',
    body: [
      'Con el objetivo de responder al crecimiento de la demanda y acompañar la expansión de sus clientes, Gamma Plast ha fortalecido su capacidad productiva mediante la incorporación de nueva tecnología y la optimización de sus procesos internos. Esta mejora permite incrementar los volúmenes de fabricación, reducir tiempos de entrega y ofrecer una mayor variedad de soluciones en empaques flexibles para distintos sectores.',
      'La ampliación facilita el desarrollo de proyectos adaptados a los requerimientos de cada industria, ofreciendo una mayor variedad de empaques flexibles y manteniendo altos estándares de calidad en cada etapa de producción.',
      'Esta inversión reafirma nuestro enfoque en la mejora continua, la eficiencia y las prácticas responsables, permitiéndonos ingresar a nuevos mercados y consolidar relaciones a largo plazo con nuestros clientes.'
    ]
  },
  {
    slug: 'innovaciones-en-empaques-sostenibles',
    title: 'Innovaciones en empaques sostenibles impulsan la industria del plástico',
    date: '2026-02-02',
    image: '/products/25.png',
    excerpt: 'Materiales reciclados, compostables y estructuras optimizadas marcan el rumbo de un empaque flexible más responsable.',
    body: [
      'La industria del empaque flexible avanza hacia soluciones más responsables con el entorno. En Gamma Plast trabajamos con materiales reciclados y compostables, además de estructuras optimizadas que reducen el uso de recursos sin comprometer el desempeño.',
      'Contenido de ejemplo — a reemplazar con la nota final del cliente.'
    ]
  },
  {
    slug: 'nuevas-certificaciones-refuerzan-la-calidad',
    title: 'Nuevas certificaciones refuerzan nuestro compromiso con la calidad',
    date: '2026-01-10',
    image: '/products/2.png',
    excerpt: 'Reforzamos los estándares de calidad e inocuidad que respaldan cada empaque que sale de nuestra planta.',
    body: [
      'Las certificaciones respaldan nuestro compromiso con la calidad, la inocuidad y la sostenibilidad en cada etapa de producción.',
      'Contenido de ejemplo — a reemplazar con la nota final del cliente.'
    ]
  }
]

export const formatDate = (iso) => {
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic']
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${meses[m - 1]} ${y}`
}
