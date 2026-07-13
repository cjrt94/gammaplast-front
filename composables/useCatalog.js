// Catálogo — productos agrupados por TIPO de empaque; la industria es una etiqueta/filtro.
// Imágenes dummy de referencia (public/products/*.png), a reemplazar por foto/render real.
// La familia de empaque y las industrias de cada producto son un primer pase a validar con el cliente.
export const useCatalog = () => {
  // Industrias — usadas como filtro y como etiqueta en cada producto.
  const industries = [
    { slug: 'alimentos-y-bebidas', label: 'Alimentos y bebidas', short: 'Alimentos', icon: 'food',
      desc: 'Empaques que preservan calidad, frescura y seguridad, con grado alimentario FDA.' },
    { slug: 'industria-en-general', label: 'Industria en general', short: 'Industria', icon: 'industry',
      desc: 'Soluciones resistentes y versátiles para distintas aplicaciones industriales.' },
    { slug: 'retail-y-e-commerce', label: 'Retail y e-commerce', short: 'Retail', icon: 'retail',
      desc: 'Practicidad, resistencia y buena presentación para el punto de venta y la entrega.' },
    { slug: 'pesca-y-agroindustria', label: 'Pesca y agroindustria', short: 'Pesca', icon: 'agro',
      desc: 'Resistencia y eficiencia en almacenamiento y transporte, desde el origen.' }
  ]

  // Familias por tipo de empaque, en orden de presentación.
  const types = [
    { slug: 'pouches', label: 'Pouches', icon: 'seal',
      intro: 'Bolsas premoldeadas que se sostienen de pie, ideales para exhibición.' },
    { slug: 'sellado', label: 'Bolsas de sello', icon: 'layers',
      intro: 'Sellado lateral, de fondo o con solapa para todo tipo de contenido.' },
    { slug: 'asas', label: 'Con asas', icon: 'retail',
      intro: 'Bolsas de transporte y retail con distintos tipos de asa.' },
    { slug: 'bobinas', label: 'Bobinas, láminas y etiquetas', icon: 'film',
      intro: 'Película en bobina, láminas y etiquetas para líneas de envasado.' },
    { slug: 'aplicacion', label: 'Soluciones por aplicación', icon: 'target',
      intro: 'Empaques desarrollados para usos y sectores específicos.' }
  ]

  // Productos — imagen + nombre + familia de empaque + industrias (etiqueta).
  const products = [
    // Pouches
    { name: 'Doypack', img: '/products/1.png', type: 'pouches', industries: ['alimentos-y-bebidas'] },
    { name: 'Doypack con válvula', img: '/products/2.png', type: 'pouches', industries: ['alimentos-y-bebidas'] },
    { name: 'Sello U', img: '/products/3.png', type: 'pouches', industries: ['alimentos-y-bebidas'] },
    { name: 'Sello T', img: '/products/15.png', type: 'pouches', industries: ['alimentos-y-bebidas'] },
    { name: 'Twist', img: '/products/5.png', type: 'pouches', industries: ['alimentos-y-bebidas'] },
    { name: 'Easy peel', img: '/products/7.png', type: 'pouches', industries: ['alimentos-y-bebidas'] },
    { name: 'Flowpack', img: '/products/16.png', type: 'pouches', industries: ['alimentos-y-bebidas'] },
    // Bolsas de sello
    { name: 'Sello lateral', img: '/products/20.png', type: 'sellado', industries: ['industria-en-general'] },
    { name: 'Sello fondo', img: '/products/12.png', type: 'sellado', industries: ['industria-en-general'] },
    { name: 'Polybag con solapa', img: '/products/4.png', type: 'sellado', industries: ['industria-en-general'] },
    { name: 'Sobreempaque', img: '/products/11.png', type: 'sellado', industries: ['industria-en-general'] },
    { name: 'Microperforado', img: '/products/32.png', type: 'sellado', industries: ['industria-en-general'] },
    { name: 'Empaque al vacío', img: '/products/14.png', type: 'sellado', industries: ['alimentos-y-bebidas'] },
    // Con asas
    { name: 'T-shirt', img: '/products/21.png', type: 'asas', industries: ['retail-y-e-commerce'] },
    { name: 'Asa parche', img: '/products/23.png', type: 'asas', industries: ['retail-y-e-commerce'] },
    { name: 'Asa brida', img: '/products/22.png', type: 'asas', industries: ['retail-y-e-commerce'] },
    { name: 'Asa troquel', img: '/products/tote.png', type: 'asas', industries: ['retail-y-e-commerce'] },
    { name: 'Polipasacalles', img: '/products/9.png', type: 'asas', industries: ['retail-y-e-commerce'] },
    { name: 'E-commerce y courier', img: '/products/24.png', type: 'asas', industries: ['retail-y-e-commerce'] },
    // Bobinas, láminas y etiquetas
    { name: 'Rollos / bobinas', img: '/products/8.png', type: 'bobinas', industries: ['industria-en-general'] },
    { name: 'Resmas', img: '/products/18.png', type: 'bobinas', industries: ['industria-en-general'] },
    { name: 'Termoencogible', img: '/products/6.png', type: 'bobinas', industries: ['alimentos-y-bebidas'] },
    { name: 'Etiquetas', img: '/products/10.png', type: 'bobinas', industries: ['alimentos-y-bebidas'] },
    // Soluciones por aplicación
    { name: 'Mascotas', img: '/products/13.png', type: 'aplicacion', industries: ['industria-en-general'] },
    { name: 'Limpieza y cuidado del hogar', img: '/products/17.png', type: 'aplicacion', industries: ['industria-en-general'] },
    { name: 'Congelados', img: '/products/26.png', type: 'aplicacion', industries: ['pesca-y-agroindustria'] },
    { name: 'Frescos', img: '/products/27.png', type: 'aplicacion', industries: ['pesca-y-agroindustria'] },
    { name: 'Mulch', img: '/products/28.png', type: 'aplicacion', industries: ['pesca-y-agroindustria'] },
    { name: 'Almácigos', img: '/products/29.png', type: 'aplicacion', industries: ['pesca-y-agroindustria'] },
    { name: 'Fertilizante', img: '/products/30.png', type: 'aplicacion', industries: ['pesca-y-agroindustria'] },
    { name: 'Fundas protectoras', img: '/products/doypack.png', type: 'aplicacion', industries: ['pesca-y-agroindustria'] },
    { name: 'Fundas de colores', img: '/products/25.png', type: 'aplicacion', industries: ['pesca-y-agroindustria'] },
    { name: 'Fundas microperforadas', img: '/products/19.png', type: 'aplicacion', industries: ['pesca-y-agroindustria'] }
  ]

  const industryBySlug = (slug) => industries.find((i) => i.slug === slug)

  return { industries, types, products, industryBySlug }
}
