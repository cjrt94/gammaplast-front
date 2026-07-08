<script setup>
useHead({ title: 'Contacto — Gamma Plast' })

const form = reactive({ nombre: '', apellido: '', telefono: '', correo: '', empresa: '', mensaje: '' })
const sent = ref(false)
// TODO(backend): enviar a comercial@ y comercial2@gammaplast.com.pe vía Resend/Cloud Function.
function submit () { sent.value = true }
</script>

<template>
  <PageHero eyebrow="Contacto" title="Hablemos de tu próximo empaque"
    intro="Cuéntanos sobre tu producto y un asesor te contactará para encontrar la solución de empaque flexible ideal." />

  <section class="sec">
    <div class="wrap grid lg:grid-cols-[1.15fr_.85fr] gap-12">
      <!-- Formulario -->
      <div class="reveal">
        <div v-if="sent" class="card p-8 flex items-start gap-4 border-green">
          <span class="ico-tile shrink-0"><BaseIcon name="check" class="w-6 h-6" /></span>
          <div>
            <h2 class="text-[1.3rem] mb-1">¡Gracias por escribirnos!</h2>
            <p class="text-slate">Hemos recibido tu mensaje. Un asesor comercial se pondrá en contacto contigo a la brevedad.</p>
          </div>
        </div>

        <form v-else class="grid gap-5" @submit.prevent="submit">
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="field-label" for="c-nombre">Nombre</label>
              <input id="c-nombre" v-model="form.nombre" class="field-input" required autocomplete="given-name">
            </div>
            <div>
              <label class="field-label" for="c-apellido">Apellido</label>
              <input id="c-apellido" v-model="form.apellido" class="field-input" required autocomplete="family-name">
            </div>
          </div>
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="field-label" for="c-telefono">Teléfono</label>
              <input id="c-telefono" v-model="form.telefono" type="tel" class="field-input" autocomplete="tel">
            </div>
            <div>
              <label class="field-label" for="c-correo">Correo</label>
              <input id="c-correo" v-model="form.correo" type="email" class="field-input" required autocomplete="email">
            </div>
          </div>
          <div>
            <label class="field-label" for="c-empresa">Empresa / Compañía</label>
            <input id="c-empresa" v-model="form.empresa" class="field-input" autocomplete="organization">
          </div>
          <div>
            <label class="field-label" for="c-mensaje">Mensaje</label>
            <textarea id="c-mensaje" v-model="form.mensaje" rows="5" class="field-input resize-y" required />
          </div>
          <button type="submit" class="btn btn-green w-fit">Enviar mensaje</button>
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
