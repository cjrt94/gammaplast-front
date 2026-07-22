// Catálogo — productos etiquetados por SECTOR (los 7 sectores del catálogo corporativo).
// Feedback del cliente (web.docx): agrupar Productos por sector y mantener las tarjetas por
// producto ("estilo ok"). Los sectores y la lista de productos siguen el .docx; las imágenes
// vienen del banco/catálogo (public/products/p-*.jpg) o de los PNG de referencia previos.
// Pendiente (pasada de diseño / Rowena): recortes limpios de Sello T y Easy Peel.
export const useCatalog = () => {
  // Sectores en el orden del catálogo. banner = escena del sector (public/photos/sector-*.jpg).
  const sectors = [
    { slug: 'alimentos-y-bebidas', label: 'Alimentos y bebidas', short: 'Alimentos', icon: 'food',
      banner: '/photos/sector-alimentos.jpg',
      desc: 'Empaques con grado alimentario FDA que preservan calidad, frescura y presentación.' },
    { slug: 'pesca-y-agroindustria', label: 'Pesca y agroindustria', short: 'Pesca', icon: 'agro',
      banner: '/photos/sector-pesca.jpg',
      desc: 'Soluciones resistentes para congelados, agro y cultivo, desde el origen.' },
    { slug: 'textil', label: 'Textil', short: 'Textil', icon: 'shirt',
      banner: '/photos/sector-textil.jpg',
      desc: 'Protección y presentación para prendas, telas y rollos de la industria textil.' },
    { slug: 'envios-seguros-y-valores', label: 'Envíos seguros y valores', short: 'Envíos', icon: 'package',
      banner: '/photos/sector-envios.jpg',
      desc: 'Empaques de seguridad con precinto para e-commerce, courier y manejo de valores.' },
    { slug: 'limpieza-y-cuidado-personal', label: 'Limpieza y cuidado personal', short: 'Limpieza y cuidado personal', icon: 'spray',
      banner: '/photos/sector-limpieza.jpg',
      desc: 'Bolsas y empaques para higiene, limpieza y cuidado personal.' },
    { slug: 'retail-y-marketing', label: 'Retail y marketing', short: 'Retail', icon: 'retail',
      banner: '/photos/sector-retail.jpg',
      desc: 'Bolsas de retail y material publicitario para el punto de venta y la marca.' },
    { slug: 'industria-en-general', label: 'Industria en general', short: 'Industria', icon: 'industry',
      banner: '/photos/sector-industria.jpg',
      desc: 'Bobinas, sobreempaques y soluciones a medida para todo tipo de industria.' }
  ]

  // Productos por sector (lista del cliente). img: foto real del banco o PNG de referencia.
  const products = [
    // Alimentos y bebidas
    { name: 'Etiquetas', img: '/products/10.png', sector: 'alimentos-y-bebidas' },
    { name: 'Fundas', img: '/products/25.png', sector: 'alimentos-y-bebidas' },
    { name: 'Termoencogible', img: '/products/6.png', sector: 'alimentos-y-bebidas' },
    { name: 'Doypack', img: '/products/1.png', sector: 'alimentos-y-bebidas' },
    { name: 'Doypack con válvula', img: '/products/2.png', sector: 'alimentos-y-bebidas' },
    { name: 'Sello U', img: '/products/3.png', sector: 'alimentos-y-bebidas' },
    { name: 'Sello T', img: '/products/15.png', sector: 'alimentos-y-bebidas' },
    { name: 'Twist', img: '/products/5.png', sector: 'alimentos-y-bebidas' },
    { name: 'Easy peel', img: '/products/7.png', sector: 'alimentos-y-bebidas' },
    { name: 'Flowpack', img: '/products/p-bobinas.jpg', sector: 'alimentos-y-bebidas' },
    { name: 'Shrink bag / empaque al vacío', img: '/products/14.png', sector: 'alimentos-y-bebidas' },
    { name: 'Stand-up pouch', img: '/products/p-stand-up-pouch.jpg', sector: 'alimentos-y-bebidas' },
    // Pesca y agroindustria
    { name: 'Resmas', img: '/products/18.png', sector: 'pesca-y-agroindustria' },
    { name: 'Funda congelados', img: '/products/26.png', sector: 'pesca-y-agroindustria' },
    { name: 'Funda microperforada', img: '/products/19.png', sector: 'pesca-y-agroindustria' },
    { name: 'Saco', img: '/products/p-saco.jpg', sector: 'pesca-y-agroindustria' },
    { name: 'Mulch y cobertores', img: '/products/28.png', sector: 'pesca-y-agroindustria' },
    { name: 'Almácigo', img: '/products/29.png', sector: 'pesca-y-agroindustria' },
    { name: 'Geomembrana', img: '/products/p-geomembrana.jpg', sector: 'pesca-y-agroindustria' },
    // Textil
    { name: 'Polybag', img: '/products/4.png', sector: 'textil' },
    { name: 'Láminas y mangas', img: '/products/p-laminas-mangas.jpg', sector: 'textil' },
    // Envíos seguros y valores
    { name: 'E-commerce y courier', img: '/products/24.png', sector: 'envios-seguros-y-valores' },
    { name: 'Dinero y valores', img: '/products/p-dinero-valores.jpg', sector: 'envios-seguros-y-valores' },
    // Limpieza y cuidado personal
    { name: 'Bolsa para residuos', img: '/products/p-bolsa-residuos.jpg', sector: 'limpieza-y-cuidado-personal' },
    { name: 'Limpieza', img: '/products/17.png', sector: 'limpieza-y-cuidado-personal' },
    { name: 'Cuidado personal', img: '/products/p-cuidado-personal.jpg', sector: 'limpieza-y-cuidado-personal' },
    // Retail y marketing
    { name: 'T-shirt', img: '/products/21.png', sector: 'retail-y-marketing' },
    { name: 'Asa parche', img: '/products/p-asa-parche.jpg', sector: 'retail-y-marketing' },
    { name: 'Asa brida', img: '/products/22.png', sector: 'retail-y-marketing' },
    { name: 'Asa troquel', img: '/products/p-asa-troquel.jpg', sector: 'retail-y-marketing' },
    { name: 'Polipasacalles', img: '/products/p-polipasacalles.jpg', sector: 'retail-y-marketing' },
    // Industria en general
    { name: 'Bobinas film', img: '/products/p-bobinas.jpg', sector: 'industria-en-general' },
    { name: 'Bolsa sello lateral', img: '/products/20.png', sector: 'industria-en-general' },
    { name: 'Bolsa sello fondo', img: '/products/12.png', sector: 'industria-en-general' },
    { name: 'Sobre empaque', img: '/products/p-sobreempaque.jpg', sector: 'industria-en-general' },
    { name: 'Minería', img: '/products/p-mineria.jpg', sector: 'industria-en-general' },
    { name: 'Alimento para mascotas', img: '/products/p-alimento-mascotas.jpg', sector: 'industria-en-general' },
    { name: 'Construcción', img: '/products/p-construccion.jpg', sector: 'industria-en-general' }
  ]

  // Estructuras y materiales (catálogo p8) — para el bloque de cierre de Productos.
  const materials = {
    colores: ['#22c55e', '#ffffff', '#111827', '#ef4444', '#ec4899', '#3b82f6', '#f59e0b', '#9ca3af'],
    monocapa: ['PE Baja densidad virgen', 'PE Alta densidad virgen', 'PE reciclado', 'PLA Compostable', 'PE Termoencogible', 'Polipropileno'],
    laminado: ['BOPP', 'BOPA', 'BOPET', 'EVOH', 'MDO-PE', 'CAST', 'COATED PAPER', 'PET SHRINK', 'Metalizados', 'Coextrusión multicapa']
  }

  const sectorBySlug = (slug) => sectors.find((s) => s.slug === slug)

  return { sectors, products, materials, sectorBySlug }
}
