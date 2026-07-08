/** Tailwind — tokens del sistema de diseño (ver docs/DESIGN.md) */
export default {
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#00B140',
          600: '#009B39',
          700: '#0A7E33',
          tint: '#E7F6EC',
          tint2: '#F2FAF4'
        },
        ink: '#13191B',
        body: '#414A48',
        slate: '#6C7377',
        line: '#E6EAEA',
        mist: '#F4F6F6',
        paper: '#FFFFFF',
        footer: { DEFAULT: '#0D1416', soft: '#9AA6A6' }
      },
      fontFamily: {
        display: ['"Articulat CF"', '"Avenir Next"', 'Corbel', 'system-ui', 'sans-serif'],
        body: ['"CorbelGP"', 'Corbel', 'system-ui', 'sans-serif']
      },
      borderRadius: { DEFAULT: '3px', card: '3px', pill: '4px' },
      maxWidth: { site: '1200px' },
      letterSpacing: { tight2: '-.02em', label: '.14em' }
    }
  }
}
