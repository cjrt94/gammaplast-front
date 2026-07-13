<script setup>
const { t } = useI18n()
const localePath = useLocalePath()
const site = 'https://gammaplast.com.pe'

useSeo({ title: t('seo.careers.title'), description: t('seo.careers.description') })
useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: site + localePath('/trabaja-con-nosotros'),
  name: t('seo.careers.title'),
  description: t('seo.careers.description'),
  isPartOf: { '@id': site + '/#website' },
  about: orgRef
})
useJsonLd(breadcrumbLd([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('nav.careers'), path: localePath('/trabaja-con-nosotros') }
]))

const form = reactive({ nombre: '', apellido: '', telefono: '', correo: '', mensaje: '' })
const errors = reactive({ nombre: '', apellido: '', correo: '', cv: '' })
const cvName = ref('')
const cvFile = ref(null)
const status = ref('idle') // 'idle' | 'loading' | 'sent' | 'error'
const submitError = ref('')
const successCard = ref(null)

const MAX_CV_BYTES = 5 * 1024 * 1024
const CV_EXTS = ['pdf', 'doc', 'docx']
const cvDescribedby = computed(() => (errors.cv ? 't-cv-error' : 't-cv-hint'))

function onFile (e) {
  errors.cv = ''
  const f = e.target.files && e.target.files[0]
  if (!f) { cvName.value = ''; cvFile.value = null; return }
  const ext = (f.name.split('.').pop() || '').toLowerCase()
  if (!CV_EXTS.includes(ext)) {
    errors.cv = 'Formato no válido. Adjunta un archivo PDF, DOC o DOCX.'
    cvName.value = ''; cvFile.value = null; e.target.value = ''
    return
  }
  if (f.size > MAX_CV_BYTES) {
    errors.cv = 'El archivo supera los 5 MB. Adjunta una versión más ligera.'
    cvName.value = ''; cvFile.value = null; e.target.value = ''
    return
  }
  cvFile.value = f
  cvName.value = f.name
}

function clearError (field) {
  if (errors[field]) errors[field] = ''
}

function validate () {
  const fe = fieldErrors(careersSchema.safeParse(form))
  errors.nombre = fe.nombre || ''
  errors.apellido = fe.apellido || ''
  errors.correo = fe.correo || ''
  if (!errors.cv) errors.cv = cvFile.value ? '' : 'Adjunta tu CV (PDF, DOC o DOCX, máx. 5 MB).'
  return !errors.nombre && !errors.apellido && !errors.correo && !errors.cv
}

async function submit () {
  submitError.value = ''
  if (!validate()) {
    await nextTick()
    document.querySelector('form [aria-invalid="true"]')?.focus()
    return
  }
  const payload = careersSchema.parse(form) // datos normalizados (trim/lowercase) listos para el envío
  status.value = 'loading'
  try {
    // TODO(Dean): envío real a recursoshumanos@gammaplast.com.pe con `payload` + el CV adjunto
    // (revalidar server-side con careersSchema, anti-spam y storage del archivo).
    await new Promise(resolve => setTimeout(resolve, 600))
    status.value = 'sent'
    await nextTick()
    successCard.value?.focus()
  } catch (e) {
    status.value = 'error'
    submitError.value = 'No pudimos enviar tu postulación. Vuelve a intentarlo en unos minutos.'
  }
}
</script>

<template>
  <PageHero eyebrow="Trabaja con nosotros" title="Crece junto a Gamma Plast"
    intro="¿Quieres formar parte de nuestro equipo? Déjanos tus datos y adjunta tu CV; te contactaremos si tu perfil encaja con nuestras vacantes." />

  <section class="sec">
    <div class="wrap max-w-[720px]">
      <div v-if="status === 'sent'" ref="successCard" tabindex="-1" role="status" aria-live="polite"
        class="reveal card p-8 flex items-start gap-4 border-green outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-green focus-visible:outline-offset-2">
        <span class="ico-tile shrink-0"><BaseIcon name="check" class="w-6 h-6" /></span>
        <div>
          <h2 class="text-[1.3rem] mb-1">¡Postulación recibida!</h2>
          <p class="text-slate">Gracias por tu interés en Gamma Plast. Revisaremos tu CV y te contactaremos si avanzamos con tu perfil.</p>
        </div>
      </div>

      <form v-else class="reveal grid gap-5" novalidate @submit.prevent="submit">
        <p class="text-[.85rem] text-slate m-0"><span class="text-green-700" aria-hidden="true">*</span> Campo obligatorio</p>

        <div class="grid sm:grid-cols-2 gap-5">
          <div>
            <label class="field-label" for="t-nombre">Nombre <span class="text-green-700" aria-hidden="true">*</span></label>
            <input id="t-nombre" v-model="form.nombre" class="field-input" :class="{ '!border-red-600': errors.nombre }"
              required maxlength="40" autocomplete="given-name"
              :aria-invalid="errors.nombre ? 'true' : 'false'"
              :aria-describedby="errors.nombre ? 't-nombre-error' : undefined"
              @input="clearError('nombre')">
            <p v-if="errors.nombre" id="t-nombre-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.nombre }}</p>
          </div>
          <div>
            <label class="field-label" for="t-apellido">Apellido <span class="text-green-700" aria-hidden="true">*</span></label>
            <input id="t-apellido" v-model="form.apellido" class="field-input" :class="{ '!border-red-600': errors.apellido }"
              required maxlength="40" autocomplete="family-name"
              :aria-invalid="errors.apellido ? 'true' : 'false'"
              :aria-describedby="errors.apellido ? 't-apellido-error' : undefined"
              @input="clearError('apellido')">
            <p v-if="errors.apellido" id="t-apellido-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.apellido }}</p>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-5">
          <div>
            <label class="field-label" for="t-telefono">Teléfono</label>
            <input id="t-telefono" v-model="form.telefono" type="tel" class="field-input" maxlength="20" autocomplete="tel">
          </div>
          <div>
            <label class="field-label" for="t-correo">Correo <span class="text-green-700" aria-hidden="true">*</span></label>
            <input id="t-correo" v-model="form.correo" type="email" class="field-input" :class="{ '!border-red-600': errors.correo }"
              required maxlength="120" autocomplete="email"
              :aria-invalid="errors.correo ? 'true' : 'false'"
              :aria-describedby="errors.correo ? 't-correo-error' : undefined"
              @input="clearError('correo')">
            <p v-if="errors.correo" id="t-correo-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.correo }}</p>
          </div>
        </div>

        <div>
          <label class="field-label" for="t-mensaje">Mensaje</label>
          <textarea id="t-mensaje" v-model="form.mensaje" rows="4" class="field-input resize-y" maxlength="1500" />
        </div>

        <!-- CV: input real oculto visualmente pero enfocable (sr-only + peer); el label es la superficie clicable y muestra el foco -->
        <div>
          <span id="t-cv-title" class="field-label">CV / documento <span class="text-green-700" aria-hidden="true">*</span></span>
          <input id="t-cv" type="file" accept=".pdf,.doc,.docx" class="peer sr-only"
            required
            aria-labelledby="t-cv-title"
            :aria-invalid="errors.cv ? 'true' : 'false'"
            :aria-describedby="cvDescribedby"
            @change="onFile">
          <label for="t-cv"
            class="field-input flex items-center gap-3 flex-wrap cursor-pointer transition-colors peer-focus-visible:border-green peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-green peer-focus-visible:outline-offset-2"
            :class="{ '!border-red-600': errors.cv }">
            <span class="btn btn-ghost !py-2 !px-4 text-[.85rem] pointer-events-none">Elegir archivo</span>
            <span aria-live="polite" class="text-[.95rem]" :class="cvName ? 'text-ink font-semibold' : 'text-slate'">{{ cvName || 'Ningún archivo seleccionado' }}</span>
          </label>
          <p v-if="errors.cv" id="t-cv-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.cv }}</p>
          <p v-else id="t-cv-hint" class="mt-1.5 mb-0 text-[.85rem] text-slate">Formatos aceptados: PDF, DOC o DOCX · Tamaño máximo 5 MB.</p>
        </div>

        <p v-if="status === 'error'" role="alert" class="m-0 text-[.9rem] text-red-700 font-semibold border border-red-300 bg-red-50 rounded px-4 py-3">{{ submitError }}</p>

        <button type="submit" class="btn btn-green w-full sm:w-fit justify-center min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="status === 'loading'" :aria-busy="status === 'loading' ? 'true' : 'false'">
          {{ status === 'loading' ? 'Enviando…' : 'Enviar postulación' }}
        </button>
      </form>
    </div>
  </section>
</template>
