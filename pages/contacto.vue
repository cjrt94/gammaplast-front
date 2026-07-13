<script setup>
const { t } = useI18n()
const localePath = useLocalePath()
const site = 'https://gammaplast.com.pe'

useSeo({ title: t('seo.contact.title'), description: t('seo.contact.description') })
useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: site + localePath('/contacto'),
  name: t('seo.contact.title'),
  description: t('seo.contact.description'),
  isPartOf: { '@id': site + '/#website' },
  about: orgRef
})
useJsonLd(breadcrumbLd([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('nav.contact'), path: localePath('/contacto') }
]))

const form = reactive({ nombre: '', apellido: '', telefono: '', correo: '', empresa: '', mensaje: '' })
const errors = reactive({ nombre: '', apellido: '', correo: '', mensaje: '' })
const status = ref('idle') // 'idle' | 'loading' | 'sent' | 'error'
const submitError = ref('')
const successCard = ref(null)

function validate () {
  const fe = fieldErrors(contactSchema.safeParse(form))
  for (const k in errors) errors[k] = fe[k] || ''
  return Object.keys(fe).length === 0
}

function clearError (field) {
  if (errors[field]) errors[field] = ''
}

async function submit () {
  submitError.value = ''
  if (!validate()) {
    await nextTick()
    document.querySelector('form [aria-invalid="true"]')?.focus()
    return
  }
  const payload = contactSchema.parse(form) // datos normalizados (trim/lowercase) listos para el envío
  status.value = 'loading'
  try {
    // TODO(Dean): envío real a comercial@ y comercial2@gammaplast.com.pe con `payload`
    // (revalidar server-side con contactSchema + anti-spam).
    await new Promise(resolve => setTimeout(resolve, 600))
    status.value = 'sent'
    await nextTick()
    successCard.value?.focus()
  } catch (e) {
    status.value = 'error'
    submitError.value = 'No pudimos enviar tu mensaje. Vuelve a intentarlo en unos minutos.'
  }
}
</script>

<template>
  <PageHero eyebrow="Contacto" title="Hablemos de tu próximo empaque"
    intro="Cuéntanos sobre tu producto y un asesor te contactará para encontrar la solución de empaque flexible ideal." />

  <section class="sec">
    <div class="wrap grid lg:grid-cols-[1.15fr_.85fr] gap-12">
      <!-- Formulario -->
      <div class="reveal">
        <div v-if="status === 'sent'" ref="successCard" tabindex="-1" role="status" aria-live="polite"
          class="card p-8 flex items-start gap-4 border-green outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-green focus-visible:outline-offset-2">
          <span class="ico-tile shrink-0"><BaseIcon name="check" class="w-6 h-6" /></span>
          <div>
            <h2 class="text-[1.3rem] mb-1">¡Gracias por escribirnos!</h2>
            <p class="text-slate">Hemos recibido tu mensaje. Un asesor comercial se pondrá en contacto contigo a la brevedad.</p>
          </div>
        </div>

        <form v-else class="grid gap-5" novalidate @submit.prevent="submit">
          <p class="text-[.85rem] text-slate m-0"><span class="text-green-700" aria-hidden="true">*</span> Campo obligatorio</p>

          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="field-label" for="c-nombre">Nombre <span class="text-green-700" aria-hidden="true">*</span></label>
              <input id="c-nombre" v-model="form.nombre" class="field-input" :class="{ '!border-red-600': errors.nombre }"
                required maxlength="40" autocomplete="given-name"
                :aria-invalid="errors.nombre ? 'true' : 'false'"
                :aria-describedby="errors.nombre ? 'c-nombre-error' : undefined"
                @input="clearError('nombre')">
              <p v-if="errors.nombre" id="c-nombre-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.nombre }}</p>
            </div>
            <div>
              <label class="field-label" for="c-apellido">Apellido <span class="text-green-700" aria-hidden="true">*</span></label>
              <input id="c-apellido" v-model="form.apellido" class="field-input" :class="{ '!border-red-600': errors.apellido }"
                required maxlength="40" autocomplete="family-name"
                :aria-invalid="errors.apellido ? 'true' : 'false'"
                :aria-describedby="errors.apellido ? 'c-apellido-error' : undefined"
                @input="clearError('apellido')">
              <p v-if="errors.apellido" id="c-apellido-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.apellido }}</p>
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="field-label" for="c-telefono">Teléfono</label>
              <input id="c-telefono" v-model="form.telefono" type="tel" class="field-input" maxlength="20" autocomplete="tel">
            </div>
            <div>
              <label class="field-label" for="c-correo">Correo <span class="text-green-700" aria-hidden="true">*</span></label>
              <input id="c-correo" v-model="form.correo" type="email" class="field-input" :class="{ '!border-red-600': errors.correo }"
                required maxlength="120" autocomplete="email"
                :aria-invalid="errors.correo ? 'true' : 'false'"
                :aria-describedby="errors.correo ? 'c-correo-error' : undefined"
                @input="clearError('correo')">
              <p v-if="errors.correo" id="c-correo-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.correo }}</p>
            </div>
          </div>

          <div>
            <label class="field-label" for="c-empresa">Empresa / Compañía</label>
            <input id="c-empresa" v-model="form.empresa" class="field-input" maxlength="80" autocomplete="organization">
          </div>

          <div>
            <label class="field-label" for="c-mensaje">Mensaje <span class="text-green-700" aria-hidden="true">*</span></label>
            <textarea id="c-mensaje" v-model="form.mensaje" rows="5" class="field-input resize-y" :class="{ '!border-red-600': errors.mensaje }"
              required maxlength="1500"
              :aria-invalid="errors.mensaje ? 'true' : 'false'"
              :aria-describedby="errors.mensaje ? 'c-mensaje-error' : undefined"
              @input="clearError('mensaje')" />
            <p v-if="errors.mensaje" id="c-mensaje-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.mensaje }}</p>
          </div>

          <p v-if="status === 'error'" role="alert" class="m-0 text-[.9rem] text-red-700 font-semibold border border-red-300 bg-red-50 rounded px-4 py-3">{{ submitError }}</p>

          <button type="submit" class="btn btn-green w-full sm:w-fit justify-center min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
            :disabled="status === 'loading'" :aria-busy="status === 'loading' ? 'true' : 'false'">
            {{ status === 'loading' ? 'Enviando…' : 'Enviar mensaje' }}
          </button>
        </form>
      </div>

      <!-- Datos + mapa -->
      <aside class="reveal flex flex-col gap-6">
        <div class="card p-7 flex flex-col gap-5">
          <div class="flex gap-3">
            <BaseIcon name="pin" class="w-5 h-5 text-green shrink-0 mt-1" />
            <div><div class="font-display font-bold text-ink mb-0.5">Dirección</div>
              <p class="text-slate">Calle Luis Galvani 310, Urb. Santa Rosa, Ate — Lima, Perú</p></div>
          </div>
          <div class="flex gap-3">
            <BaseIcon name="phone" class="w-5 h-5 text-green shrink-0 mt-1" />
            <div><div class="font-display font-bold text-ink mb-0.5">Teléfonos</div>
              <p class="text-slate">+51 908 865 429<br>+51 908 858 154</p></div>
          </div>
          <div class="flex gap-3">
            <BaseIcon name="mail" class="w-5 h-5 text-green shrink-0 mt-1" />
            <div><div class="font-display font-bold text-ink mb-0.5">Correos</div>
              <p class="text-slate">comercial@gammaplast.com.pe<br>comercial2@gammaplast.com.pe</p></div>
          </div>
        </div>
        <div class="card overflow-hidden">
          <iframe title="Ubicación Gamma Plast"
            src="https://www.google.com/maps?q=Calle%20Luis%20Galvani%20310,%20Ate,%20Lima,%20Peru&output=embed"
            class="w-full h-[280px] border-0" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
        </div>
      </aside>
    </div>
  </section>
</template>
