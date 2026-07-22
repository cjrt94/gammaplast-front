<script setup>
// Editor de los datos de contacto (singletons/contact) — única fuente de verdad del sitio.
definePageMeta({ layout: 'admin' })
const { load, save } = useSingleton('contact')
const { saving, saved, error, run } = useSaveState()

const form = ref(null)
onMounted(async () => {
  const d = await load()
  form.value = d || { address: {}, phones: [], phonesRaw: [], emails: [], mapEmbedUrl: '', social: [] }
  if (!form.value.address) form.value.address = {}
})

const onSave = () => run(async () => {
  // phonesRaw se deriva de phones (formato tel:), para no editarlo a mano.
  form.value.phonesRaw = (form.value.phones || []).map((p) => p.replace(/[^\d+]/g, ''))
  await save(form.value)
})
</script>

<template>
  <div v-if="form" class="max-w-[720px]">
    <AdminHeader title="Contacto y datos" subtitle="Dirección, teléfonos y correos. Es la única fuente de verdad: alimenta el footer, la barra superior, el JSON-LD y las páginas de contacto." />

    <div class="space-y-6">
      <div class="card p-5 space-y-4">
        <p class="eyebrow">Dirección</p>
        <div>
          <label class="field-label">Calle</label>
          <input v-model="form.address.street" class="field-input" type="text">
        </div>
        <div class="grid sm:grid-cols-3 gap-3">
          <div><label class="field-label">Distrito</label><input v-model="form.address.locality" class="field-input" type="text"></div>
          <div><label class="field-label">Región</label><input v-model="form.address.region" class="field-input" type="text"></div>
          <div><label class="field-label">País</label><input v-model="form.address.country" class="field-input" type="text"></div>
        </div>
        <div>
          <label class="field-label">Dirección completa (como se muestra)</label>
          <input v-model="form.address.full" class="field-input" type="text">
        </div>
        <div>
          <label class="field-label">URL del mapa embebido (Google Maps)</label>
          <input v-model="form.mapEmbedUrl" class="field-input" type="text" placeholder="https://www.google.com/maps?q=…&output=embed">
        </div>
      </div>

      <div class="card p-5 space-y-3">
        <label class="field-label">Teléfonos (como se muestran; el formato de llamada se genera solo)</label>
        <AdminStringList v-model="form.phones" placeholder="+51 908 865 429" add-label="Agregar teléfono" />
      </div>

      <div class="card p-5 space-y-3">
        <label class="field-label">Correos</label>
        <AdminStringList v-model="form.emails" placeholder="comercial@gammaplast.com.pe" add-label="Agregar correo" />
      </div>
    </div>

    <AdminSaveBar :saving="saving" :saved="saved" :error="error" @save="onSave" />
  </div>
  <p v-else class="text-slate">Cargando…</p>
</template>
