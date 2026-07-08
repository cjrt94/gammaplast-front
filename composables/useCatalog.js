// Catálogo — 4 categorías con productos de referencia (fuente: Info.docx + mockup).
// Las imágenes son dummies de referencia (public/products/N.png); a afinar con el cliente.
export const useCatalog = () => {
  const categories = [
    {
      slug: 'alimentos-y-bebidas',
      icon: 'food',
      name: 'Alimentos y bebidas',
      tagline: 'Calidad, frescura y seguridad con grado alimentario FDA.',
      desc: 'Ofrecemos empaques flexibles diseñados para preservar la calidad, frescura y seguridad de productos alimenticios y bebidas. Nuestras soluciones combinan materiales de alto desempeño y acabados de impresión que permiten proteger el contenido y resaltar tu marca en el punto de venta.',
      products: [
        { name: 'Doypack', img: '/products/1.png' },
        { name: 'Doypack con válvula', img: '/products/2.png' },
        { name: 'Sello U', img: '/products/3.png' },
        { name: 'Sello T', img: '/products/15.png' },
        { name: 'Twist', img: '/products/5.png' },
        { name: 'Easy peel', img: '/products/7.png' },
        { name: 'Empaque al vacío', img: '/products/14.png' },
        { name: 'Flowpack', img: '/products/16.png' },
        { name: 'Termoencogible', img: '/products/6.png' },
        { name: 'Etiquetas', img: '/products/10.png' }
      ]
    },
    {
      slug: 'industria-en-general',
      icon: 'industry',
      name: 'Industria en general',
      tagline: 'Soluciones resistentes y versátiles para cada aplicación.',
      desc: 'Desarrollamos empaques flexibles versátiles para distintos sectores industriales, ofreciendo soluciones resistentes, funcionales y adaptadas a cada aplicación. Nuestros materiales y procesos garantizan protección, eficiencia en el manejo y una presentación profesional del producto.',
      products: [
        { name: 'Rollos / bobinas', img: '/products/8.png' },
        { name: 'Sello lateral', img: '/products/20.png' },
        { name: 'Sello fondo', img: '/products/12.png' },
        { name: 'Polybag con solapa', img: '/products/4.png' },
        { name: 'Mascotas', img: '/products/13.png' },
        { name: 'Limpieza y cuidado del hogar', img: '/products/17.png' },
        { name: 'Microperforado', img: '/products/33.png' },
        { name: 'Sobreempaque', img: '/products/11.png' },
        { name: 'Resmas', img: '/products/18.png' }
      ]
    },
    {
      slug: 'retail-y-e-commerce',
      icon: 'retail',
      name: 'Retail y e-commerce',
      tagline: 'Practicidad, resistencia y presentación en cada entrega.',
      desc: 'Diseñamos empaques flexibles pensados para el sector retail y e-commerce, que combinan practicidad, resistencia y una presentación atractiva. Nuestras soluciones facilitan el transporte, protegen el contenido durante la entrega y refuerzan la identidad de tu marca en cada punto de contacto con el cliente.',
      products: [
        { name: 'T-shirt', img: '/products/21.png' },
        { name: 'Asa parche', img: '/products/23.png' },
        { name: 'Asa brida', img: '/products/22.png' },
        { name: 'Asa troquel', img: '/products/24.png' },
        { name: 'E-commerce y courier', img: '/products/24.png' },
        { name: 'Polipasacalles', img: '/products/9.png' }
      ]
    },
    {
      slug: 'pesca-y-agroindustria',
      icon: 'agro',
      name: 'Pesca y agroindustria',
      tagline: 'Resistencia y eficiencia desde el origen hasta su destino.',
      desc: 'Ofrecemos empaques flexibles diseñados para las exigencias de los sectores pesquero y agroindustrial, proporcionando resistencia, protección y eficiencia en el almacenamiento y transporte. Nuestras soluciones ayudan a conservar la calidad de los productos y a optimizar los procesos logísticos desde el origen hasta su destino.',
      products: [
        { name: 'Congelados', img: '/products/26.png' },
        { name: 'Frescos', img: '/products/27.png' },
        { name: 'Mulch', img: '/products/28.png' },
        { name: 'Almácigos', img: '/products/29.png' },
        { name: 'Fertilizante', img: '/products/30.png' },
        { name: 'Fundas protectoras', img: '/products/31.png' },
        { name: 'Fundas de colores', img: '/products/30.png' },
        { name: 'Fundas microperforadas', img: '/products/33.png' }
      ]
    }
  ]
  const findCategory = (slug) => categories.find((c) => c.slug === slug)
  return { categories, findCategory }
}
