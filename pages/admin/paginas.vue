<script setup>
// Editor de copys por página (singletons/pages): héroes de las páginas internas + bloques de
// marketing (CTAs, tarjetas, encabezados, chips).
definePageMeta({ layout: 'admin' })
const { load, save } = useSingleton('pages')
const { saving, saved, error, run } = useSaveState()

const emptyHero = () => ({ eyebrow: '', title: '', intro: '' })
const form = ref(null)
onMounted(async () => {
  const d = await load()
  form.value = d || {}
  form.value.productos ||= {}
  form.value.productos.hero ||= emptyHero()
  form.value.productos.materials ||= emptyHero()
  form.value.productos.chips ||= []
  form.value.novedades ||= {}
  form.value.novedades.hero ||= emptyHero()
  form.value.novedades.articleCta ??= ''
  form.value.contacto ||= {}
  form.value.contacto.hero ||= emptyHero()
  form.value.contacto.card ||= { title: '', text: '' }
  form.value.advisor ||= { hero: emptyHero() }
  form.value.advisor.hero ||= emptyHero()
  form.value.careers ||= { hero: emptyHero() }
  form.value.careers.hero ||= emptyHero()
  form.value.nosotrosCta ||= { title: '', text: '' }
})
const onSave = () => run(() => save(form.value))
</script>

<template>
  <div v-if="form" class="max-w-[760px]">
    <AdminHeader title="Páginas" subtitle="Titulares y textos de marketing de las páginas internas." />
    <div class="space-y-6">
      <!-- Productos -->
      <div class="card p-5 space-y-4">
        <p class="eyebrow">Productos</p>
        <p class="field-label !mb-1">Encabezado (hero)</p>
        <input v-model="form.productos.hero.eyebrow" class="field-input" placeholder="Eyebrow">
        <input v-model="form.productos.hero.title" class="field-input" placeholder="Título">
        <textarea v-model="form.productos.hero.intro" rows="2" class="field-input" placeholder="Intro"></textarea>
        <p class="field-label !mb-1 pt-2">Sección "Estructuras y materiales"</p>
        <input v-model="form.productos.materials.eyebrow" class="field-input" placeholder="Eyebrow">
        <input v-model="form.productos.materials.title" class="field-input" placeholder="Título">
        <textarea v-model="form.productos.materials.intro" rows="2" class="field-input" placeholder="Intro"></textarea>
        <p class="field-label !mb-1 pt-2">Chips (etiqueta + ícono: check/recycle/leaf/seal)</p>
        <AdminRepeatableList v-model="form.productos.chips" :new-item="() => ({ label: '', icon: 'check' })" add-label="Agregar chip">
          <template #default="{ item }">
            <div class="grid grid-cols-[1fr_120px] gap-2">
              <input v-model="item.label" class="field-input" placeholder="Etiqueta">
              <input v-model="item.icon" class="field-input" placeholder="ícono">
            </div>
          </template>
        </AdminRepeatableList>
      </div>

      <!-- Novedades -->
      <div class="card p-5 space-y-3">
        <p class="eyebrow">Novedades</p>
        <input v-model="form.novedades.hero.eyebrow" class="field-input" placeholder="Eyebrow">
        <input v-model="form.novedades.hero.title" class="field-input" placeholder="Título">
        <textarea v-model="form.novedades.hero.intro" rows="2" class="field-input" placeholder="Intro"></textarea>
        <div><label class="field-label">CTA al pie de cada artículo</label><input v-model="form.novedades.articleCta" class="field-input"></div>
      </div>

      <!-- Contacto -->
      <div class="card p-5 space-y-3">
        <p class="eyebrow">Contacto</p>
        <input v-model="form.contacto.hero.eyebrow" class="field-input" placeholder="Eyebrow">
        <input v-model="form.contacto.hero.title" class="field-input" placeholder="Título">
        <textarea v-model="form.contacto.hero.intro" rows="2" class="field-input" placeholder="Intro"></textarea>
        <p class="field-label !mb-1 pt-2">Tarjeta "¿Buscas cotizar?"</p>
        <input v-model="form.contacto.card.title" class="field-input" placeholder="Título de la tarjeta">
        <textarea v-model="form.contacto.card.text" rows="2" class="field-input" placeholder="Texto"></textarea>
      </div>

      <!-- Asesor -->
      <div class="card p-5 space-y-3">
        <p class="eyebrow">Contacta a un asesor</p>
        <input v-model="form.advisor.hero.eyebrow" class="field-input" placeholder="Eyebrow">
        <input v-model="form.advisor.hero.title" class="field-input" placeholder="Título">
        <textarea v-model="form.advisor.hero.intro" rows="2" class="field-input" placeholder="Intro"></textarea>
      </div>

      <!-- Trabaja con nosotros -->
      <div class="card p-5 space-y-3">
        <p class="eyebrow">Trabaja con nosotros</p>
        <input v-model="form.careers.hero.eyebrow" class="field-input" placeholder="Eyebrow">
        <input v-model="form.careers.hero.title" class="field-input" placeholder="Título">
        <textarea v-model="form.careers.hero.intro" rows="2" class="field-input" placeholder="Intro"></textarea>
      </div>

      <!-- CTA de Nosotros -->
      <div class="card p-5 space-y-3">
        <p class="eyebrow">CTA de Nosotros (pie de página)</p>
        <input v-model="form.nosotrosCta.title" class="field-input" placeholder="Título">
        <textarea v-model="form.nosotrosCta.text" rows="2" class="field-input" placeholder="Texto"></textarea>
      </div>
    </div>
    <AdminSaveBar :saving="saving" :saved="saved" :error="error" @save="onSave" />
  </div>
  <p v-else class="text-slate">Cargando…</p>
</template>
