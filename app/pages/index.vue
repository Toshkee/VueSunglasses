<script setup lang="ts">
import { site } from '~/site.config'

const { featured } = useProducts()
const { generalLink } = useWhatsApp()

useSeoMeta({
  title: 'Naočare za sunce',
  ogTitle: `${site.name} | ${site.tagline}`,
  description: site.description,
})

const perks = [
  {
    title: 'Cijene od uvoznika',
    text: 'Godinama radimo veleprodaju. Sada iste naočare nudimo i na komad, bez marže posrednika.',
    icon: 'tag',
  },
  {
    title: 'UV400 zaštita',
    text: 'Svaki model blokira 100% UVA i UVB zraka. Oči su ti sigurne, ne samo stil.',
    icon: 'shield',
  },
  {
    title: 'Naručivanje porukom',
    text: 'Bez registracije i kartica. Klikneš, otvori se WhatsApp, dogovorimo se za par minuta.',
    icon: 'chat',
  },
  {
    title: 'Dostava u cijeloj CG',
    text: `${site.delivery.shipping}. Besplatno za narudžbe preko ${site.delivery.freeShippingFrom} ${site.currency}.`,
    icon: 'truck',
  },
]

const steps = [
  { n: '01', title: 'Izaberi model', text: 'Pregledaj kolekciju i nađi naočare koje ti se sviđaju.' },
  { n: '02', title: 'Klikni „Naruči“', text: 'Otvori se WhatsApp sa gotovom porukom. Samo pošalji.' },
  { n: '03', title: 'Dogovorimo dostavu', text: 'Preuzmi lično ili ti pošaljemo poštom. Plaćaš kad stigne.' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-sand-100 to-sand-50" />
      <div class="absolute -right-32 -top-32 -z-10 h-[520px] w-[520px] rounded-full bg-sun-400/25 blur-3xl" />
      <div class="container-x grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sun-600">Porodična radnja · Crna Gora</p>
          <h1 class="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            <SonaStaggerText text="Sunce je tvoje." as="span" class="block" />
            <SonaStaggerText text="Naočare su naše." as="span" class="block text-ink-600" :delay="0.25" />
          </h1>
          <p class="mt-6 max-w-lg text-lg text-ink-600">{{ site.tagline }}. Provjereni modeli, UV400 zaštita i cijena koja ne boli.</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink to="/naocare" class="btn-primary">Pogledaj kolekciju</NuxtLink>
            <a :href="generalLink()" target="_blank" rel="noopener" class="btn-wa">
              <WhatsAppIcon class="h-5 w-5" /> Pitaj nas
            </a>
          </div>
          <dl class="mt-10 grid grid-cols-3 gap-6 border-t border-ink-900/10 pt-6 text-sm">
            <div><dt class="font-display text-2xl font-semibold">UV400</dt><dd class="text-ink-600">na svakom modelu</dd></div>
            <div><dt class="font-display text-2xl font-semibold">od 19 {{ site.currency }}</dt><dd class="text-ink-600">cijene bez posrednika</dd></div>
            <div><dt class="font-display text-2xl font-semibold">24h</dt><dd class="text-ink-600">odgovor na poruku</dd></div>
          </dl>
        </div>

        <div class="relative">
          <div class="aspect-[4/5] overflow-hidden rounded-3xl bg-sand-200 shadow-2xl shadow-ink-900/10">
            <!-- Zamijeni sa pravom fotografijom: /public/images/hero.jpg -->
            <img src="/images/hero.svg" alt="Naočare za sunce" class="h-full w-full object-cover" />
          </div>
          <div class="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-4 shadow-lg sm:block">
            <p class="text-xs uppercase tracking-wider text-ink-400">Najprodavanije</p>
            <p class="font-display text-lg font-semibold">Aviator Gold Classic</p>
            <p class="text-sm text-ink-600">Polarizovane · 24 {{ site.currency }}</p>
          </div>
        </div>
      </div>
    </section>

    <SonaMarquee :items="['UV400 zaštita', 'Polarizovana stakla', 'Cijene od uvoznika', 'Dostava u cijeloj Crnoj Gori', 'Naručivanje preko WhatsApp-a', 'Povrat u roku od 14 dana']" />

    <!-- Featured -->
    <section class="container-x py-20">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Izdvajamo" title="Modeli koje najviše traže" subtitle="Mali izbor iz kolekcije. Sve na stanju, spremno za slanje." />
        <NuxtLink to="/naocare" class="btn-secondary">Sve naočare</NuxtLink>
      </div>
      <div class="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        <ProductCard v-for="p in featured" :key="p.slug" :product="p" />
      </div>
    </section>

    <!-- Perks -->
    <section class="bg-ink-900 py-20 text-sand-50">
      <div class="container-x">
        <SectionHeading eyebrow="Zašto mi" title="Naočare bez komplikacija" class="[&_h2]:text-white [&_p]:text-sand-300" />
        <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <SonaSpotlightCard v-for="perk in perks" :key="perk.title">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-sun-400 text-ink-900">
              <PerkIcon :name="perk.icon" class="h-5 w-5" />
            </div>
            <h3 class="mt-5 font-display text-lg font-semibold">{{ perk.title }}</h3>
            <p class="mt-2 text-sm text-sand-300">{{ perk.text }}</p>
          </SonaSpotlightCard>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="container-x py-20">
      <SectionHeading center eyebrow="Kako naručiti" title="Tri koraka do naočara" />
      <ol class="mt-12 grid gap-8 md:grid-cols-3">
        <li v-for="s in steps" :key="s.n" class="relative rounded-2xl bg-white p-6 shadow-sm">
          <span class="font-display text-4xl font-semibold text-sun-500">{{ s.n }}</span>
          <h3 class="mt-3 font-display text-xl font-semibold">{{ s.title }}</h3>
          <p class="mt-2 text-sm text-ink-600">{{ s.text }}</p>
        </li>
      </ol>
    </section>

    <!-- CTA -->
    <section class="container-x">
      <div class="relative overflow-hidden rounded-3xl bg-sun-400 px-6 py-14 text-center sm:px-12">
        <div class="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/30 blur-2xl" />
        <h2 class="relative font-display text-3xl font-semibold tracking-tight sm:text-4xl">Nisi siguran koji model ti stoji?</h2>
        <p class="relative mx-auto mt-3 max-w-xl text-ink-800">Pošalji nam sliku i reci gdje ćeš ih nositi. Preporučićemo ti dva-tri modela bez obaveze.</p>
        <a :href="generalLink()" target="_blank" rel="noopener" class="btn-primary relative mt-8">
          <WhatsAppIcon class="h-5 w-5" /> Piši nam na WhatsApp
        </a>
      </div>
    </section>
  </div>
</template>
