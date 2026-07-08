<script setup>
const localePath = useLocalePath()
useHead({ title: 'Nosotros — Gamma Plast' })

const valores = [
  { icon: 'award', name: 'Excelencia' },
  { icon: 'users', name: 'Trabajo en equipo' },
  { icon: 'bulb', name: 'Innovación' },
  { icon: 'heart', name: 'Respeto' },
  { icon: 'shield', name: 'Integridad' }
]
const capacidades = [
  { icon: 'film', title: 'Extrusión por soplado', desc: 'Películas de PEBD, PEAD, PLA y reciclados.' },
  { icon: 'print', title: 'Impresión', desc: 'Flexografía full color de alta definición.' },
  { icon: 'scissors', title: 'Corte', desc: 'Corte y doblado a medida.' },
  { icon: 'seal', title: 'Sellado', desc: 'Sello plano, fondo, lateral y acabados especiales.' }
]
const certs = [
  { code: 'RCS', desc: 'Recycled Claim Standard' },
  { code: 'TÜV', desc: 'OK compost — TÜV Austria' },
  { code: 'D2W', desc: 'Tecnología oxo-biodegradable' },
  { code: 'D2P', desc: 'Protección antimicrobiana' },
  { code: 'ISO', desc: 'Gestión de calidad' },
  { code: 'FDA', desc: 'Contacto con alimentos' }
]
</script>

<template>
  <PageHero eyebrow="Nosotros" title="Construimos el respaldo que tu marca merece">
    <div class="mt-6 space-y-4 text-[1.08rem] text-body max-w-[70ch] reveal">
      <p>En Gamma Plast, no solo fabricamos empaques flexibles; construimos el respaldo que tu marca merece. Nacimos con la convicción de que la calidad, la innovación y el servicio personalizado son nuestros pilares. Por eso, cada solución que sale de nuestra planta es el resultado de un compromiso genuino con tus necesidades.</p>
      <p>Nos mueven valores como la honestidad y la confianza, asegurando que cada entrega sea sinónimo de tranquilidad para ti. Miramos al futuro con responsabilidad, integrando prácticas sostenibles que nos permitan crecer juntos, cuidando el entorno que compartimos. En Gamma Plast, tu éxito es nuestra mejor carta de presentación.</p>
    </div>
  </PageHero>

  <!-- Valores -->
  <section class="sec">
    <div class="wrap">
      <SectionHeader eyebrow="Nuestros valores" title="Los principios que guían cada proyecto" />
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[18px]">
        <div v-for="v in valores" :key="v.name" class="reveal card card-hover p-6 flex flex-col items-center text-center gap-3">
          <span class="ico-tile w-12 h-12"><BaseIcon :name="v.icon" class="w-6 h-6" /></span>
          <h3 class="text-[1.05rem]">{{ v.name }}</h3>
        </div>
      </div>
    </div>
  </section>

  <!-- Misión y Visión -->
  <section class="sec sec-mist">
    <div class="wrap grid md:grid-cols-2 gap-[18px]">
      <div class="reveal card p-9">
        <span class="ico-tile w-12 h-12 mb-4"><BaseIcon name="target" class="w-6 h-6" /></span>
        <h2 class="text-[1.5rem] mb-3">Misión</h2>
        <p class="text-slate text-[1.05rem]">Fabricar empaques flexibles brindando respaldo a las marcas mediante calidad, innovación y servicio personalizado, cumpliendo las necesidades del cliente con honestidad y confianza.</p>
      </div>
      <div class="reveal card p-9">
        <span class="ico-tile w-12 h-12 mb-4"><BaseIcon name="eye" class="w-6 h-6" /></span>
        <h2 class="text-[1.5rem] mb-3">Visión</h2>
        <p class="text-slate text-[1.05rem]">Crecer junto a nuestros clientes de forma sostenible, integrando prácticas responsables con el entorno y convirtiendo el éxito del cliente en nuestra principal carta de presentación.</p>
      </div>
    </div>
  </section>

  <!-- Capacidades / procesos -->
  <section class="sec">
    <div class="wrap">
      <SectionHeader eyebrow="Nuestras capacidades" title="Control total, de la resina al empaque terminado"
        intro="Integramos toda la cadena productiva bajo un mismo techo, con tecnología especializada en cada etapa." />
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-[18px]">
        <article v-for="(c, i) in capacidades" :key="c.title" class="reveal card card-hover p-6 flex flex-col gap-3.5">
          <div class="flex items-center justify-between">
            <span class="ico-tile"><BaseIcon :name="c.icon" class="w-6 h-6" /></span>
            <span class="font-display font-bold text-[1.6rem] text-line tabular-nums">0{{ i + 1 }}</span>
          </div>
          <h3 class="text-[1.16rem]">{{ c.title }}</h3>
          <p class="text-[.98rem] text-slate">{{ c.desc }}</p>
        </article>
      </div>
    </div>
  </section>

  <!-- Certificaciones -->
  <section class="sec sec-mist">
    <div class="wrap">
      <SectionHeader eyebrow="Certificaciones y sostenibilidad"
        title="Empaques certificados y responsables"
        intro="Nuestros empaques de PE y PP son biodegradables, compostables, reciclados y laminados, y cumplen la normativa FDA para contacto con alimentos." />
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[18px]">
        <div v-for="c in certs" :key="c.code" class="reveal card p-5 flex flex-col items-center text-center gap-2">
          <span class="ico-tile w-12 h-12"><BaseIcon name="leaf" class="w-6 h-6" /></span>
          <div class="font-display font-bold text-ink text-[1.1rem]">{{ c.code }}</div>
          <p class="text-[.82rem] text-slate leading-snug">{{ c.desc }}</p>
        </div>
      </div>
      <p class="text-[.85rem] text-slate mt-5 reveal">* Isotipos oficiales de los certificados pendientes de integrar.</p>
    </div>
  </section>

  <!-- CTA -->
  <section class="sec">
    <div class="wrap text-center max-w-[620px] mx-auto">
      <h2 class="text-[1.7rem] mb-3 reveal">Trabajemos juntos en tu próximo empaque</h2>
      <p class="text-slate mb-6 reveal">Somos tu aliado estratégico, desde la selección de materiales hasta la entrega final.</p>
      <NuxtLink :to="localePath('/contacto')" class="btn btn-green reveal">Contacta a un asesor</NuxtLink>
    </div>
  </section>
</template>
