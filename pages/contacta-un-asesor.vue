<script setup>
const { t } = useI18n()
const localePath = useLocalePath()
const site = 'https://gammaplast.com.pe'
const { data: contact } = await useContact()
const { data: pages } = await usePages()
const hero = computed(() => pages.value.advisor?.hero || {})

const { title: seoTitle, description: seoDesc } = await usePageSeo('advisor')
useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: site + localePath('/contacta-un-asesor'),
  name: seoTitle,
  description: seoDesc,
  isPartOf: { '@id': site + '/#website' },
  about: orgRef
})
useJsonLd(breadcrumbLd([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('cta.advisor'), path: localePath('/contacta-un-asesor') }
]))

// Lead calificado: TODOS los campos obligatorios (+ RUC/Identificación y Ubicación).
const form = reactive({
  nombre: '', apellido: '', empresa: '', ruc: '', correo: '', telefono: '',
  departamento: '', provincia: '', distrito: '', mensaje: ''
})
const errors = reactive({
  nombre: '', apellido: '', empresa: '', ruc: '', correo: '', telefono: '',
  departamento: '', provincia: '', distrito: '', mensaje: ''
})
const status = ref('idle') // 'idle' | 'loading' | 'sent' | 'error'
const submitError = ref('')
const successCard = ref(null)
const hp = ref('') // honeypot anti-spam: humanos lo dejan vacío

function validate () {
  const fe = fieldErrors(advisorSchema.safeParse(form))
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
  const payload = advisorSchema.parse(form) // datos normalizados (trim/lowercase)
  status.value = 'loading'
  try {
    await $fetch('/api/asesor', { method: 'POST', body: { ...payload, website: hp.value } })
    status.value = 'sent'
    await nextTick()
    successCard.value?.focus()
  } catch (e) {
    status.value = 'error'
    submitError.value = e?.data?.statusMessage || 'No pudimos enviar tu mensaje. Vuelve a intentarlo en unos minutos.'
  }
}
</script>

<template>
  <div>
    <PageHero :eyebrow="hero.eyebrow" :title="hero.title" :intro="hero.intro" />

    <section class="sec">
      <div class="wrap grid lg:grid-cols-[1.15fr_.85fr] gap-12">
        <!-- Formulario -->
        <div class="reveal">
          <Transition name="rise" mode="out-in">
          <div v-if="status === 'sent'" key="sent" ref="successCard" tabindex="-1" role="status" aria-live="polite"
            class="card p-8 flex items-start gap-4 border-green outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-green focus-visible:outline-offset-2">
            <span class="ico-tile shrink-0"><BaseIcon name="check" class="w-6 h-6" /></span>
            <div>
              <h2 class="text-[1.3rem] mb-1">¡Gracias por escribirnos!</h2>
              <p class="text-slate">Hemos recibido tu solicitud. Un asesor comercial se pondrá en contacto contigo a la brevedad.</p>
            </div>
          </div>

          <form v-else key="form" class="grid gap-5" novalidate @submit.prevent="submit">
            <p class="text-[.85rem] text-slate m-0"><span class="text-green-700" aria-hidden="true">*</span> Todos los campos son obligatorios</p>

            <!-- Honeypot anti-spam: oculto y fuera del flujo de foco; los humanos no lo ven ni lo llenan. -->
            <div class="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
              <label for="a-website">No completar</label>
              <input id="a-website" v-model="hp" type="text" name="website" tabindex="-1" autocomplete="off">
            </div>

            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label class="field-label" for="a-nombre">Nombre <span class="text-green-700" aria-hidden="true">*</span></label>
                <input id="a-nombre" v-model="form.nombre" class="field-input" :class="{ '!border-red-600': errors.nombre }"
                  required maxlength="40" autocomplete="given-name"
                  :aria-invalid="errors.nombre ? 'true' : 'false'" :aria-describedby="errors.nombre ? 'a-nombre-error' : undefined"
                  @input="clearError('nombre')">
                <p v-if="errors.nombre" id="a-nombre-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.nombre }}</p>
              </div>
              <div>
                <label class="field-label" for="a-apellido">Apellido <span class="text-green-700" aria-hidden="true">*</span></label>
                <input id="a-apellido" v-model="form.apellido" class="field-input" :class="{ '!border-red-600': errors.apellido }"
                  required maxlength="40" autocomplete="family-name"
                  :aria-invalid="errors.apellido ? 'true' : 'false'" :aria-describedby="errors.apellido ? 'a-apellido-error' : undefined"
                  @input="clearError('apellido')">
                <p v-if="errors.apellido" id="a-apellido-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.apellido }}</p>
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label class="field-label" for="a-empresa">Empresa / Compañía <span class="text-green-700" aria-hidden="true">*</span></label>
                <input id="a-empresa" v-model="form.empresa" class="field-input" :class="{ '!border-red-600': errors.empresa }"
                  required maxlength="80" autocomplete="organization"
                  :aria-invalid="errors.empresa ? 'true' : 'false'" :aria-describedby="errors.empresa ? 'a-empresa-error' : undefined"
                  @input="clearError('empresa')">
                <p v-if="errors.empresa" id="a-empresa-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.empresa }}</p>
              </div>
              <div>
                <label class="field-label" for="a-ruc">RUC / Identificación <span class="text-green-700" aria-hidden="true">*</span></label>
                <input id="a-ruc" v-model="form.ruc" class="field-input" :class="{ '!border-red-600': errors.ruc }"
                  required maxlength="20" inputmode="numeric" autocomplete="off"
                  :aria-invalid="errors.ruc ? 'true' : 'false'" :aria-describedby="errors.ruc ? 'a-ruc-error' : undefined"
                  @input="clearError('ruc')">
                <p v-if="errors.ruc" id="a-ruc-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.ruc }}</p>
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label class="field-label" for="a-correo">Correo <span class="text-green-700" aria-hidden="true">*</span></label>
                <input id="a-correo" v-model="form.correo" type="email" class="field-input" :class="{ '!border-red-600': errors.correo }"
                  required maxlength="120" autocomplete="email"
                  :aria-invalid="errors.correo ? 'true' : 'false'" :aria-describedby="errors.correo ? 'a-correo-error' : undefined"
                  @input="clearError('correo')">
                <p v-if="errors.correo" id="a-correo-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.correo }}</p>
              </div>
              <div>
                <label class="field-label" for="a-telefono">Teléfono <span class="text-green-700" aria-hidden="true">*</span></label>
                <input id="a-telefono" v-model="form.telefono" type="tel" class="field-input" :class="{ '!border-red-600': errors.telefono }"
                  required maxlength="20" autocomplete="tel"
                  :aria-invalid="errors.telefono ? 'true' : 'false'" :aria-describedby="errors.telefono ? 'a-telefono-error' : undefined"
                  @input="clearError('telefono')">
                <p v-if="errors.telefono" id="a-telefono-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.telefono }}</p>
              </div>
            </div>

            <fieldset class="grid grid-cols-3 gap-3 border-0 p-0 m-0">
              <legend class="field-label mb-0 p-0 col-span-3">Ubicación <span class="text-green-700" aria-hidden="true">*</span></legend>
              <div>
                <label class="sr-only" for="a-departamento">Departamento</label>
                <input id="a-departamento" v-model="form.departamento" class="field-input" :class="{ '!border-red-600': errors.departamento }"
                  placeholder="Departamento" required maxlength="56" autocomplete="address-level1"
                  :aria-invalid="errors.departamento ? 'true' : 'false'" :aria-describedby="errors.departamento ? 'a-departamento-error' : undefined"
                  @input="clearError('departamento')">
                <p v-if="errors.departamento" id="a-departamento-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.departamento }}</p>
              </div>
              <div>
                <label class="sr-only" for="a-provincia">Provincia</label>
                <input id="a-provincia" v-model="form.provincia" class="field-input" :class="{ '!border-red-600': errors.provincia }"
                  placeholder="Provincia" required maxlength="56" autocomplete="address-level2"
                  :aria-invalid="errors.provincia ? 'true' : 'false'" :aria-describedby="errors.provincia ? 'a-provincia-error' : undefined"
                  @input="clearError('provincia')">
                <p v-if="errors.provincia" id="a-provincia-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.provincia }}</p>
              </div>
              <div>
                <label class="sr-only" for="a-distrito">Distrito</label>
                <input id="a-distrito" v-model="form.distrito" class="field-input" :class="{ '!border-red-600': errors.distrito }"
                  placeholder="Distrito" required maxlength="56" autocomplete="address-level3"
                  :aria-invalid="errors.distrito ? 'true' : 'false'" :aria-describedby="errors.distrito ? 'a-distrito-error' : undefined"
                  @input="clearError('distrito')">
                <p v-if="errors.distrito" id="a-distrito-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.distrito }}</p>
              </div>
            </fieldset>

            <div>
              <label class="field-label" for="a-mensaje">Mensaje <span class="text-green-700" aria-hidden="true">*</span></label>
              <textarea id="a-mensaje" v-model="form.mensaje" rows="5" class="field-input resize-y" :class="{ '!border-red-600': errors.mensaje }"
                required maxlength="1500"
                :aria-invalid="errors.mensaje ? 'true' : 'false'" :aria-describedby="errors.mensaje ? 'a-mensaje-error' : undefined"
                @input="clearError('mensaje')" />
              <p v-if="errors.mensaje" id="a-mensaje-error" role="alert" class="mt-1.5 mb-0 text-[.85rem] text-red-700 font-semibold">{{ errors.mensaje }}</p>
            </div>

            <p v-if="status === 'error'" role="alert" class="m-0 text-[.9rem] text-red-700 font-semibold border border-red-300 bg-red-50 rounded px-4 py-3">{{ submitError }}</p>

            <button type="submit" class="btn btn-green w-full sm:w-fit justify-center min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
              :disabled="status === 'loading'" :aria-busy="status === 'loading' ? 'true' : 'false'">
              {{ status === 'loading' ? 'Enviando…' : 'Solicitar asesoría' }}
            </button>
          </form>
          </Transition>
        </div>

        <!-- Datos + mapa -->
        <aside class="reveal flex flex-col gap-6">
          <div class="card p-7 flex flex-col gap-5">
            <div class="flex gap-3">
              <BaseIcon name="pin" class="w-5 h-5 text-green shrink-0 mt-1" />
              <div><div class="font-display font-bold text-ink mb-0.5">Dirección</div>
                <p class="text-slate">{{ contact.address?.full }}</p></div>
            </div>
            <div class="flex gap-3">
              <BaseIcon name="phone" class="w-5 h-5 text-green shrink-0 mt-1" />
              <div><div class="font-display font-bold text-ink mb-0.5">Teléfonos</div>
                <p class="text-slate"><template v-for="(p, i) in contact.phones" :key="i">{{ p }}<br v-if="i < contact.phones.length - 1"></template></p></div>
            </div>
            <div class="flex gap-3">
              <BaseIcon name="mail" class="w-5 h-5 text-green shrink-0 mt-1" />
              <div><div class="font-display font-bold text-ink mb-0.5">Correos</div>
                <p class="text-slate"><template v-for="(e, i) in contact.emails" :key="i">{{ e }}<br v-if="i < contact.emails.length - 1"></template></p></div>
            </div>
          </div>
          <div v-if="contact.mapEmbedUrl" class="card overflow-hidden">
            <iframe title="Ubicación Gamma Plast" :src="contact.mapEmbedUrl"
              class="w-full h-[280px] border-0" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
