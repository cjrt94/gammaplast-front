<script setup>
// Editor de SEO por página + FAQ (singletons/seo).
definePageMeta({ layout: 'admin' })
const { load, save } = useSingleton('seo')
const { saving, saved, error, run } = useSaveState()

const PAGES = [
  ['home', 'Home'], ['about', 'Nosotros'], ['products', 'Productos'], ['news', 'Novedades'],
  ['contact', 'Contacto'], ['advisor', 'Contacta un asesor'], ['careers', 'Trabaja con nosotros']
]

const form = ref(null)
onMounted(async () => {
  const d = await load()
  form.value = d || {}
  form.value.pages ||= {}
  for (const [k] of PAGES) form.value.pages[k] ||= { title: '', description: '' }
  form.value.faq ||= { title: '', intro: '', items: [] }
})
const onSave = () => run(() => save(form.value))
</script>

<template>
  <div v-if="form" class="max-w-[760px]">
    <AdminHeader title="SEO y FAQ" subtitle="Títulos y descripciones para buscadores, y las preguntas frecuentes." />
    <div class="space-y-6">
      <div class="card p-5 space-y-4">
        <p class="eyebrow">SEO por página</p>
        <div v-for="[key, label] in PAGES" :key="key" class="border-b border-line pb-4 last:border-0 last:pb-0">
          <p class="font-display font-semibold text-[.95rem] mb-2">{{ label }}</p>
          <div><label class="field-label">Título</label><input v-model="form.pages[key].title" class="field-input mb-2"></div>
          <div><label class="field-label">Descripción</label><textarea v-model="form.pages[key].description" rows="2" class="field-input"></textarea></div>
        </div>
      </div>

      <div class="card p-5 space-y-4">
        <p class="eyebrow">Preguntas frecuentes</p>
        <div><label class="field-label">Título</label><input v-model="form.faq.title" class="field-input"></div>
        <div><label class="field-label">Intro</label><textarea v-model="form.faq.intro" rows="2" class="field-input"></textarea></div>
        <label class="field-label">Preguntas</label>
        <AdminRepeatableList v-model="form.faq.items" :new-item="() => ({ q: '', a: '' })" add-label="Agregar pregunta">
          <template #default="{ item }">
            <input v-model="item.q" class="field-input mb-2" placeholder="Pregunta">
            <textarea v-model="item.a" rows="3" class="field-input" placeholder="Respuesta"></textarea>
          </template>
        </AdminRepeatableList>
      </div>
    </div>
    <AdminSaveBar :saving="saving" :saved="saved" :error="error" @save="onSave" />
  </div>
  <p v-else class="text-slate">Cargando…</p>
</template>
