<script setup lang="ts">
import { site } from '~/site.config'
const { generalLink, link } = useWhatsApp()

useSeoMeta({
  title: 'Kontakt',
  description: `Piši nam na WhatsApp, pozovi ili svrati. ${site.address}. ${site.workingHours}.`,
})

// Mini forma: ne šalje email, nego sastavi WhatsApp poruku iz unesenog.
const name = ref('')
const message = ref('')
const formLink = computed(() =>
  link(`Zdravo, ja sam ${name.value || '...'}.\n\n${message.value || 'Imam pitanje u vezi naočara.'}`),
)

const faq = [
  { q: 'Kako naručujem?', a: 'Klikneš „Naruči“ na modelu koji ti se sviđa, otvori se WhatsApp sa gotovom porukom. Pošalješ, mi potvrdimo i dogovorimo dostavu.' },
  { q: 'Kako plaćam?', a: 'Gotovinom pri ličnom preuzimanju ili pouzećem poštaru kad ti paket stigne. Online plaćanje za sada nemamo.' },
  { q: 'Koliko traje dostava?', a: 'Poštom obično 1 do 3 radna dana bilo gdje u Crnoj Gori.' },
  { q: 'Mogu li vratiti naočare?', a: 'Da, u roku od 14 dana ako su neoštećene i sa originalnom ambalažom. Javi se na WhatsApp i dogovorimo.' },
  { q: 'Da li su naočare originalne / imaju UV zaštitu?', a: 'Svi modeli imaju UV400 zaštitu (100% UVA i UVB). Radimo sa istim dobavljačima kao i za veleprodaju.' },
]
</script>

<template>
  <div class="container-x py-16">
    <SectionHeading eyebrow="Kontakt" title="Tu smo, piši kad hoćeš" subtitle="Najbrže odgovaramo na WhatsApp. Obično u roku od par sati, najkasnije za 24h." />

    <div class="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
      <div class="space-y-6">
        <a :href="generalLink()" target="_blank" rel="noopener" class="flex items-center gap-4 rounded-2xl bg-wa p-5 text-white transition hover:bg-wa-dark">
          <WhatsAppIcon class="h-8 w-8 shrink-0" />
          <div>
            <p class="font-semibold">WhatsApp</p>
            <p class="text-sm text-white/90">{{ site.phoneDisplay }}</p>
          </div>
        </a>

        <div class="rounded-2xl bg-white p-5 shadow-sm">
          <dl class="space-y-4 text-sm">
            <div><dt class="text-ink-400">Telefon</dt><dd class="font-medium"><a :href="`tel:${site.phoneDisplay.replace(/\s/g, '')}`">{{ site.phoneDisplay }}</a></dd></div>
            <div><dt class="text-ink-400">Email</dt><dd class="font-medium"><a :href="`mailto:${site.email}`">{{ site.email }}</a></dd></div>
            <div><dt class="text-ink-400">Adresa</dt><dd class="font-medium">{{ site.address }}</dd></div>
            <div><dt class="text-ink-400">Radno vrijeme</dt><dd class="font-medium">{{ site.workingHours }}</dd></div>
            <div v-if="site.instagram"><dt class="text-ink-400">Instagram</dt><dd class="font-medium"><a :href="site.instagram" target="_blank" rel="noopener">{{ site.instagram.replace('https://', '') }}</a></dd></div>
          </dl>
        </div>
      </div>

      <div class="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h2 class="font-display text-xl font-semibold">Pošalji poruku</h2>
        <p class="mt-1 text-sm text-ink-600">Napiši ovdje, a poruka ode na naš WhatsApp.</p>
        <div class="mt-6 space-y-4">
          <div>
            <label for="name" class="text-sm font-medium">Ime</label>
            <input id="name" v-model="name" type="text" class="mt-1 w-full rounded-xl border border-ink-900/10 px-4 py-2.5 text-sm focus:border-ink-900 focus:outline-none" placeholder="Kako se zoveš?" />
          </div>
          <div>
            <label for="msg" class="text-sm font-medium">Poruka</label>
            <textarea id="msg" v-model="message" rows="5" class="mt-1 w-full rounded-xl border border-ink-900/10 px-4 py-2.5 text-sm focus:border-ink-900 focus:outline-none" placeholder="Koji model te zanima, ili šta te muči?" />
          </div>
          <a :href="formLink" target="_blank" rel="noopener" class="btn-wa w-full">
            <WhatsAppIcon class="h-5 w-5" /> Pošalji na WhatsApp
          </a>
        </div>
      </div>
    </div>

    <section class="mt-20">
      <SectionHeading eyebrow="Česta pitanja" title="Ono što nas svi pitaju" />
      <div class="mt-8 divide-y divide-ink-900/10 rounded-2xl bg-white shadow-sm">
        <details v-for="f in faq" :key="f.q" class="group p-5">
          <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
            {{ f.q }}
            <span class="ml-4 text-ink-400 transition-transform group-open:rotate-45">+</span>
          </summary>
          <p class="mt-3 text-sm text-ink-600">{{ f.a }}</p>
        </details>
      </div>
    </section>
  </div>
</template>
