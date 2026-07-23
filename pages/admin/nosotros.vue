<script setup>
// Editor de la página Nosotros (singletons/nosotros): hero, valores, misión/visión, procesos,
// galería y bloque de certificaciones. El grid de certificaciones se edita en su propia sección.
definePageMeta({ layout: 'admin' })
const localePath = useLocalePath()
const { load, save } = useSingleton('nosotros')
const { saving, saved, error, run } = useSaveState()

const form = ref(null)
onMounted(async () => {
  const d = await load()
  form.value = d || {}
  form.value.hero ||= { pill: '', title: '', paragraphs: [], image: '' }
  form.value.valores ||= { pill: '', title: '', intro: '', items: [] }
  form.value.misionVision ||= { pill: '', title: '', mision: '', vision: '' }
  form.value.procesos ||= { pill: '', title: '', intro: '', note: '', items: [] }
  form.value.galeria ||= { pill: '', title: '', intro: '', images: [] }
  form.value.certs ||= { pill: '', title: '', intro: '' }
})
const onSave = () => run(() => save(form.value))
</script>

<template>
  <div v-if="form" class="max-w-[820px]">
    <AdminHeader title="Nosotros" subtitle="Todos los textos e imágenes de la página Nosotros." />
    <div class="space-y-6">
      <!-- Hero -->
      <div class="card p-5 space-y-4">
        <p class="eyebrow">Hero</p>
        <div><label class="field-label">Pill</label><input v-model="form.hero.pill" class="field-input"></div>
        <div><label class="field-label">Título</label><input v-model="form.hero.title" class="field-input"></div>
        <div><label class="field-label">Párrafos</label><AdminStringList v-model="form.hero.paragraphs" multiline add-label="Agregar párrafo" /></div>
        <AdminImageUploader v-model="form.hero.image" folder="nosotros" label="Imagen del hero" />
      </div>

      <!-- Valores -->
      <div class="card p-5 space-y-4">
        <p class="eyebrow">Valores</p>
        <div class="grid sm:grid-cols-2 gap-3">
          <div><label class="field-label">Pill</label><input v-model="form.valores.pill" class="field-input"></div>
          <div><label class="field-label">Título</label><input v-model="form.valores.title" class="field-input"></div>
        </div>
        <div><label class="field-label">Intro</label><textarea v-model="form.valores.intro" rows="2" class="field-input"></textarea></div>
        <label class="field-label">Ítems</label>
        <AdminRepeatableList v-model="form.valores.items" :new-item="() => ({ img: '', name: '' })" add-label="Agregar valor">
          <template #default="{ item }">
            <input v-model="item.name" class="field-input mb-2" placeholder="Nombre del valor">
            <AdminImageUploader v-model="item.img" folder="valores" label="Ícono" />
          </template>
        </AdminRepeatableList>
      </div>

      <!-- Misión y visión -->
      <div class="card p-5 space-y-4">
        <p class="eyebrow">Misión y visión</p>
        <div class="grid sm:grid-cols-2 gap-3">
          <div><label class="field-label">Pill</label><input v-model="form.misionVision.pill" class="field-input"></div>
          <div><label class="field-label">Título</label><input v-model="form.misionVision.title" class="field-input"></div>
        </div>
        <div><label class="field-label">Misión</label><textarea v-model="form.misionVision.mision" rows="3" class="field-input"></textarea></div>
        <div><label class="field-label">Visión</label><textarea v-model="form.misionVision.vision" rows="3" class="field-input"></textarea></div>
      </div>

      <!-- Procesos -->
      <div class="card p-5 space-y-4">
        <p class="eyebrow">Procesos</p>
        <div class="grid sm:grid-cols-2 gap-3">
          <div><label class="field-label">Pill</label><input v-model="form.procesos.pill" class="field-input"></div>
          <div><label class="field-label">Título</label><input v-model="form.procesos.title" class="field-input"></div>
        </div>
        <div><label class="field-label">Intro</label><textarea v-model="form.procesos.intro" rows="2" class="field-input"></textarea></div>
        <div><label class="field-label">Nota</label><input v-model="form.procesos.note" class="field-input"></div>
        <label class="field-label">Pasos</label>
        <AdminRepeatableList v-model="form.procesos.items" :new-item="() => ({ n: '', title: '', img: '', desc: '' })" add-label="Agregar proceso">
          <template #default="{ item }">
            <div class="grid grid-cols-[80px_1fr] gap-2 mb-2">
              <input v-model="item.n" class="field-input" placeholder="01">
              <input v-model="item.title" class="field-input" placeholder="Título">
            </div>
            <textarea v-model="item.desc" rows="3" class="field-input mb-2" placeholder="Descripción"></textarea>
            <AdminImageUploader v-model="item.img" folder="procesos" label="Imagen" />
          </template>
        </AdminRepeatableList>
      </div>

      <!-- Galería -->
      <div class="card p-5 space-y-4">
        <p class="eyebrow">Galería de planta</p>
        <div class="grid sm:grid-cols-2 gap-3">
          <div><label class="field-label">Pill</label><input v-model="form.galeria.pill" class="field-input"></div>
          <div><label class="field-label">Título</label><input v-model="form.galeria.title" class="field-input"></div>
        </div>
        <div><label class="field-label">Intro</label><textarea v-model="form.galeria.intro" rows="2" class="field-input"></textarea></div>
        <label class="field-label">Imágenes</label>
        <AdminRepeatableList v-model="form.galeria.images" :new-item="() => ({ src: '', alt: '' })" add-label="Agregar imagen">
          <template #default="{ item }">
            <input v-model="item.alt" class="field-input mb-2" placeholder="Texto alternativo">
            <AdminImageUploader v-model="item.src" folder="galeria" label="Imagen" />
          </template>
        </AdminRepeatableList>
      </div>

      <!-- Bloque de certificaciones -->
      <div class="card p-5 space-y-4">
        <p class="eyebrow">Bloque de certificaciones</p>
        <div class="grid sm:grid-cols-2 gap-3">
          <div><label class="field-label">Pill</label><input v-model="form.certs.pill" class="field-input"></div>
          <div><label class="field-label">Título</label><input v-model="form.certs.title" class="field-input"></div>
        </div>
        <div><label class="field-label">Intro</label><textarea v-model="form.certs.intro" rows="2" class="field-input"></textarea></div>
        <p class="text-slate text-[.85rem]">Los ítems del grid (RCS, TÜV, FDA…) se editan en <NuxtLink class="text-green-700 underline" :to="localePath('/admin/certificaciones')">Certificaciones</NuxtLink>.</p>
      </div>
    </div>
    <AdminSaveBar :saving="saving" :saved="saved" :error="error" @save="onSave" />
  </div>
  <p v-else class="text-slate">Cargando…</p>
</template>
