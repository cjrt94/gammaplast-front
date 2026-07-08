<script setup>
useHead({ title: 'Trabaja con nosotros — Gamma Plast' })

const form = reactive({ nombre: '', apellido: '', telefono: '', correo: '', mensaje: '' })
const cvName = ref('')
const sent = ref(false)
// TODO(backend): enviar a recursoshumanos@gammaplast.com.pe con el CV adjunto.
function onFile (e) {
  const f = e.target.files && e.target.files[0]
  cvName.value = f ? f.name : ''
}
function submit () { sent.value = true }
</script>

<template>
  <PageHero eyebrow="Trabaja con nosotros" title="Crece junto a Gamma Plast"
    intro="¿Quieres formar parte de nuestro equipo? Déjanos tus datos y adjunta tu CV; te contactaremos si tu perfil encaja con nuestras vacantes." />

  <section class="sec">
    <div class="wrap max-w-[720px]">
      <div v-if="sent" class="reveal card p-8 flex items-start gap-4 border-green">
        <span class="ico-tile shrink-0"><BaseIcon name="check" class="w-6 h-6" /></span>
        <div>
          <h2 class="text-[1.3rem] mb-1">¡Postulación recibida!</h2>
          <p class="text-slate">Gracias por tu interés en Gamma Plast. Revisaremos tu CV y te contactaremos si avanzamos con tu perfil.</p>
        </div>
      </div>

      <form v-else class="reveal grid gap-5" @submit.prevent="submit">
        <div class="grid sm:grid-cols-2 gap-5">
          <div>
            <label class="field-label" for="t-nombre">Nombre</label>
            <input id="t-nombre" v-model="form.nombre" class="field-input" required autocomplete="given-name">
          </div>
          <div>
            <label class="field-label" for="t-apellido">Apellido</label>
            <input id="t-apellido" v-model="form.apellido" class="field-input" required autocomplete="family-name">
          </div>
        </div>
        <div class="grid sm:grid-cols-2 gap-5">
          <div>
            <label class="field-label" for="t-telefono">Teléfono</label>
            <input id="t-telefono" v-model="form.telefono" type="tel" class="field-input" autocomplete="tel">
          </div>
          <div>
            <label class="field-label" for="t-correo">Correo</label>
            <input id="t-correo" v-model="form.correo" type="email" class="field-input" required autocomplete="email">
          </div>
        </div>
        <div>
          <label class="field-label" for="t-mensaje">Mensaje</label>
          <textarea id="t-mensaje" v-model="form.mensaje" rows="4" class="field-input resize-y" />
        </div>
        <div>
          <label class="field-label">CV / documento</label>
          <label class="field-input flex items-center gap-3 cursor-pointer">
            <span class="btn btn-ghost !py-2 !px-4 text-[.85rem]">Elegir archivo</span>
            <span class="text-slate text-[.95rem]">{{ cvName || 'PDF, DOC o DOCX (máx. 5 MB)' }}</span>
            <input type="file" accept=".pdf,.doc,.docx" class="hidden" @change="onFile">
          </label>
        </div>
        <button type="submit" class="btn btn-green w-fit">Enviar postulación</button>
      </form>
    </div>
  </section>
</template>
