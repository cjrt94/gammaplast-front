<script setup>
// Editor de ajustes globales del sitio (singletons/settings): footer, topbar, badges y JSON-LD.
definePageMeta({ layout: 'admin' })
const { load, save } = useSingleton('settings')
const { saving, saved, error, run } = useSaveState()

const form = ref(null)
onMounted(async () => {
  const d = await load()
  form.value = d || {}
  form.value.footerAbout ??= ''
  form.value.topbarClaim ??= ''
  form.value.certBadges ||= []
  form.value.orgDescription ??= ''
})
const onSave = () => run(() => save(form.value))
</script>

<template>
  <div v-if="form" class="max-w-[720px]">
    <AdminHeader title="Ajustes del sitio" subtitle="Textos globales: footer, barra superior, badges y datos para buscadores." />
    <div class="space-y-6">
      <div class="card p-5 space-y-3">
        <label class="field-label">Descripción del footer</label>
        <textarea v-model="form.footerAbout" rows="3" class="field-input"></textarea>
      </div>
      <div class="card p-5 space-y-3">
        <label class="field-label">Claim de la barra superior</label>
        <input v-model="form.topbarClaim" class="field-input">
      </div>
      <div class="card p-5 space-y-3">
        <label class="field-label">Badges de certificación del footer (etiqueta + ícono: check/recycle/leaf)</label>
        <AdminRepeatableList v-model="form.certBadges" :new-item="() => ({ label: '', icon: 'check' })" add-label="Agregar badge">
          <template #default="{ item }">
            <div class="grid grid-cols-[1fr_120px] gap-2">
              <input v-model="item.label" class="field-input" placeholder="Etiqueta">
              <input v-model="item.icon" class="field-input" placeholder="ícono">
            </div>
          </template>
        </AdminRepeatableList>
      </div>
      <div class="card p-5 space-y-3">
        <label class="field-label">Descripción de la organización (datos estructurados / SEO)</label>
        <textarea v-model="form.orgDescription" rows="3" class="field-input"></textarea>
      </div>
    </div>
    <AdminSaveBar :saving="saving" :saved="saved" :error="error" @save="onSave" />
  </div>
  <p v-else class="text-slate">Cargando…</p>
</template>
