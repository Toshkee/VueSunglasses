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
  { q: 'Da li naočare imaju UV zaštitu?', a: 'Svi modeli imaju UV400 zaštitu (100% UVA i UVB). Radimo sa istim dobavljačima kao i za veleprodaju.' },
]

const input = 'mt-1 w-full border border-ink-900/15 bg-white px-3 py-2.5 text-sm focus:border-ink-900 focus:outline-none'
</script>

<template>
  <div>
    <div class="border-b border-ink-900/10 bg-sand-50">
      <div class="container-x py-10">
        <p class="eyebrow">Kontakt</p>
        <h1 class="heading mt-3 text-3xl sm:text-4xl">Tu smo, piši kad hoćeš</h1>
        <p class="mt-2 text-sm text-ink-600">Najbrže odgovaramo na WhatsApp. Obično u roku od par sati, najkasnije za 24h.</p>
      </div>
    </div>

    <div class="container-x grid gap-8 py-12 lg:grid-cols-[1fr_1.3fr]">
      <div class="space-y-3">
        <a :href="generalLink()" target="_blank" rel="noopener" class="flex items-center gap-4 bg-ink-900 p-5 text-white transition hover:bg-ink-800">
          <WhatsAppIcon class="h-7 w-7 shrink-0" />
          <div>
            <p class="text-[11px] font-bold uppercase tracking-[0.14em]">WhatsApp</p>
            <p class="text-sm text-white/80">{{ site.phoneDisplay }}</p>
          </div>
        </a>

        <dl class="divide-y divide-ink-900/10 border border-ink-900/10 text-sm">
          <div class="flex justify-between gap-4 p-4"><dt class="text-ink-600">Telefon</dt><dd class="font-semibold"><a :href="`tel:${site.phoneDisplay.replace(/\s/g, '')}`">{{ site.phoneDisplay }}</a></dd></div>
          <div class="flex justify-between gap-4 p-4"><dt class="text-ink-600">Email</dt><dd class="font-semibold"><a :href="`mailto:${site.email}`">{{ site.email }}</a></dd></div>
          <div class="flex justify-between gap-4 p-4"><dt class="text-ink-600">Adresa</dt><dd class="font-semibold">{{ site.address }}</dd></div>
          <div class="flex justify-between gap-4 p-4"><dt class="text-ink-600">Radno vrijeme</dt><dd class="font-semibold">{{ site.workingHours }}</dd></div>
          <div v-if="site.instagram" class="flex justify-between gap-4 p-4"><dt class="text-ink-600">Instagram</dt><dd class="font-semibold"><a :href="site.instagram" target="_blank" rel="noopener">@{{ site.instagram.split('/').filter(Boolean).pop() }}</a></dd></div>
        </dl>
      </div>

      <div class="border border-ink-900/10 p-6 sm:p-8">
        <h2 class="heading text-lg">Pošalji poruku</h2>
        <p class="mt-1 text-sm text-ink-600">Napiši ovdje, a poruka ode na naš WhatsApp.</p>
        <div class="mt-6 space-y-4">
          <div>
            <label for="name" class="eyebrow">Ime</label>
            <input id="name" v-model="name" type="text" :class="input" placeholder="Kako se zoveš?" />
          </div>
          <div>
            <label for="msg" class="eyebrow">Poruka</label>
            <textarea id="msg" v-model="message" rows="5" :class="input" placeholder="Koji model te zanima, ili šta te muči?" />
          </div>
          <a :href="formLink" target="_blank" rel="noopener" class="btn-wa w-full">
            <WhatsAppIcon class="h-3.5 w-3.5" /> Pošalji na WhatsApp
          </a>
        </div>
      </div>
    </div>

    <section id="faq" class="container-x scroll-mt-28 pb-20 pt-8">
      <SectionHeading center title="Česta pitanja" />
      <div class="mx-auto mt-8 max-w-3xl divide-y divide-ink-900/10 border-y border-ink-900/10">
        <details v-for="f in faq" :key="f.q" class="group py-4">
          <summary class="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
            {{ f.q }}
            <span class="ml-4 text-ink-400 transition-transform group-open:rotate-45">+</span>
          </summary>
          <p class="mt-3 text-sm text-ink-600">{{ f.a }}</p>
        </details>
      </div>
    </section>
  </div>
</template>
