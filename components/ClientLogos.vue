<script setup>
// Carousel infinito de logos de clientes (marquee CSS, sin JS).
// NOTA: logos PLACEHOLDER de marcas reconocidas de la industria de alimentos
// (public/logos/clientes/) — reemplazar por los clientes reales de Gamma Plast.
const logos = [
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
]
// Duplicamos la lista para que el desplazamiento de -50% cierre sin salto.
const track = [...logos, ...logos]
</script>

<template>
  <section aria-label="Marcas que confían en nosotros" class="border-b border-line bg-paper py-10 md:py-12">
    <p class="eyebrow text-center mb-7">Marcas que confían en nosotros</p>
    <!-- Máscara de degradado en los bordes para que los logos aparezcan/desaparezcan suave. -->
    <div class="marquee">
      <ul class="marquee-track" aria-hidden="false">
        <li v-for="(l, i) in track" :key="i" class="shrink-0">
          <img :src="l.src" :alt="i < logos.length ? l.alt : ''" :aria-hidden="i >= logos.length ? 'true' : undefined"
            loading="lazy" class="h-8 md:h-9 w-auto object-contain" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* Máscara suave en ambos extremos (degrada a sin-máscara donde no haya soporte). */
.marquee {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
}
.marquee-track {
  display: flex;
  width: max-content;
  align-items: center;
  gap: clamp(2.5rem, 6vw, 5rem);
  /* La lista está duplicada: recorrer -50% deja el segundo juego exactamente donde
     estaba el primero → loop perfecto. */
  animation: marquee-scroll 46s linear infinite;
}
.marquee:hover .marquee-track { animation-play-state: paused; }
.marquee-track img {
  filter: grayscale(1);
  opacity: .6;
  transition: filter var(--dur-base, .3s) ease, opacity var(--dur-base, .3s) ease;
}
.marquee-track li:hover img { filter: grayscale(0); opacity: 1; }
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
/* prefers-reduced-motion ya está cubierto globalmente en main.css (frena la animación);
   fijamos además el track al inicio para que no quede a mitad de recorrido. */
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; transform: none; flex-wrap: wrap; justify-content: center; row-gap: 1.5rem; }
}
</style>
