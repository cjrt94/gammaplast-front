<script setup>
// Editor del contenido del Home (singletons/home): hero, banda de certificaciones, planta,
// procesos (4 pasos) y encabezado de productos.
definePageMeta({ layout: 'admin' })
const { load, save } = useSingleton('home')
const { saving, saved, error, run } = useSaveState()

const form = ref(null)
onMounted(async () => {
  const d = await load()
  form.value = d || {}
  form.value.hero ||= { title: '', titleAccent: '', lead: '', eyebrow: '', chips: [] }
  form.value.certStrip ||= { note: '' }
  form.value.plant ||= { eyebrow: '', title: '', intro: '' }
  form.value.process ||= { eyebrow: '', title: '', intro: '', steps: [] }
  form.value.products ||= { eyebrow: '', title: '', intro: '' }
})
const onSave = () => run(() => save(form.value))
</script>

<template>
  <div v-if="form" class="max-w-[760px]">
    <AdminHeader title="Home" subtitle="Textos de la portada." />
    <div class="space-y-6">
      <div class="card p-5 space-y-4">
        <p class="eyebrow">Hero</p>
        <div><label class="field-label">Eyebrow</label><input v-model="form.hero.eyebrow" class="field-input"></div>
        <div class="grid sm:grid-cols-2 gap-3">
          <div><label class="field-label">Título</label><input v-model="form.hero.title" class="field-input"></div>
          <div><label class="field-label">Título (acento verde)</label><input v-model="form.hero.titleAccent" class="field-input"></div>
        </div>
        <div><label class="field-label">Bajada</label><textarea v-model="form.hero.lead" rows="2" class="field-input"></textarea></div>
        <div><label class="field-label">Chips</label><AdminStringList v-model="form.hero.chips" placeholder="Grado alimentario FDA" add-label="Agregar chip" /></div>
      </div>

      <div class="card p-5 space-y-3">
        <p class="eyebrow">Banda de certificaciones</p>
        <div><label class="field-label">Nota</label><textarea v-model="form.certStrip.note" rows="2" class="field-input"></textarea></div>
      </div>

      <div class="card p-5 space-y-4">
        <p class="eyebrow">Nuestra planta</p>
        <div><label class="field-label">Eyebrow</label><input v-model="form.plant.eyebrow" class="field-input"></div>
        <div><label class="field-label">Título</label><input v-model="form.plant.title" class="field-input"></div>
        <div><label class="field-label">Intro</label><textarea v-model="form.plant.intro" rows="2" class="field-input"></textarea></div>
      </div>

      <div class="card p-5 space-y-4">
        <p class="eyebrow">Procesos</p>
        <div><label class="field-label">Eyebrow</label><input v-model="form.process.eyebrow" class="field-input"></div>
        <div><label class="field-label">Título</label><input v-model="form.process.title" class="field-input"></div>
        <div><label class="field-label">Intro</label><textarea v-model="form.process.intro" rows="2" class="field-input"></textarea></div>
        <label class="field-label">Pasos</label>
        <AdminRepeatableList v-model="form.process.steps" :new-item="() => ({ label: '', title: '', desc: '', img: '' })" add-label="Agregar paso">
          <template #default="{ item }">
            <input v-model="item.label" class="field-input mb-2" placeholder="Etiqueta">
            <input v-model="item.title" class="field-input mb-2" placeholder="Título">
            <textarea v-model="item.desc" rows="2" class="field-input mb-2" placeholder="Descripción"></textarea>
            <AdminImageUploader v-model="item.img" folder="procesos" label="Foto del proceso" />
          </template>
        </AdminRepeatableList>
      </div>

      <div class="card p-5 space-y-4">
        <p class="eyebrow">Productos (encabezado)</p>
        <div><label class="field-label">Eyebrow</label><input v-model="form.products.eyebrow" class="field-input"></div>
        <div><label class="field-label">Título</label><input v-model="form.products.title" class="field-input"></div>
        <div><label class="field-label">Intro</label><textarea v-model="form.products.intro" rows="2" class="field-input"></textarea></div>
      </div>
    </div>
    <AdminSaveBar :saving="saving" :saved="saved" :error="error" @save="onSave" />
  </div>
  <p v-else class="text-slate">Cargando…</p>
</template>
