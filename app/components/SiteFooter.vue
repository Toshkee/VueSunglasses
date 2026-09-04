<script setup lang="ts">
import { site } from '~/site.config'
const { generalLink, link } = useWhatsApp()
const year = new Date().getFullYear()
const newsLink = link('Zdravo! Želim da me obavještavate o novim modelima i akcijama.')

const cols = [
  {
    title: 'Prodavnica',
    links: [
      { to: '/naocare', label: 'Sve naočare' },
      { to: '/naocare?gender=muski', label: 'Muške' },
      { to: '/naocare?gender=zenski', label: 'Ženske' },
      { to: '/naocare?polarized=1', label: 'Polarizovane' },
      { to: '/naocare?sort=price-asc', label: 'Najpovoljnije' },
    ],
  },
  {
    title: 'Kompanija',
    links: [
      { to: '/o-nama', label: 'O nama' },
      { to: '/kontakt', label: 'Kontakt' },
      { to: '/#kategorije', label: 'Kolekcije' },
    ],
  },
  {
    title: 'Pomoć',
    links: [
      { to: '/kontakt#faq', label: 'Kako naručiti' },
      { to: '/kontakt#faq', label: 'Dostava i plaćanje' },
      { to: '/kontakt#faq', label: 'Povrat' },
      { to: '/kontakt#faq', label: 'Česta pitanja' },
    ],
  },
]
</script>

<template>
  <footer class="border-t border-ink-900/10 bg-white">
    <div class="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr]">
      <div>
        <div class="flex items-center gap-2">
          <LogoMark class="h-6 w-auto" />
          <span class="heading text-lg">{{ site.name }}</span>
        </div>
        <p class="mt-4 max-w-xs text-sm text-ink-600">{{ site.description }}</p>
        <div class="mt-5 flex gap-3">
          <a v-if="site.instagram" :href="site.instagram" target="_blank" rel="noopener" class="text-ink-900 hover:text-ink-600" aria-label="Instagram">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
          </a>
          <a v-if="site.facebook" :href="site.facebook" target="_blank" rel="noopener" class="text-ink-900 hover:text-ink-600" aria-label="Facebook">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.4V14h2.8v8h3.3z" /></svg>
          </a>
          <a :href="generalLink()" target="_blank" rel="noopener" class="text-ink-900 hover:text-ink-600" aria-label="WhatsApp">
            <WhatsAppIcon class="h-5 w-5" />
          </a>
        </div>
      </div>

      <div v-for="c in cols" :key="c.title">
        <h3 class="text-[11px] font-bold uppercase tracking-[0.16em]">{{ c.title }}</h3>
        <ul class="mt-4 space-y-2.5 text-sm text-ink-600">
          <li v-for="l in c.links" :key="l.label"><NuxtLink :to="l.to" class="hover:text-ink-900">{{ l.label }}</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3 class="text-[11px] font-bold uppercase tracking-[0.16em]">Novosti</h3>
        <p class="mt-4 text-sm text-ink-600">Novi modeli i akcije prvo idu našim kupcima na WhatsApp. Bez spama, najviše dvije poruke mjesečno.</p>
        <a :href="newsLink" target="_blank" rel="noopener" class="btn-primary mt-4 w-full">
          <WhatsAppIcon class="h-3.5 w-3.5" /> Prijavi se
        </a>
        <p class="mt-4 text-xs text-ink-600">{{ site.address }} · {{ site.workingHours }}</p>
      </div>
    </div>

    <div class="border-t border-ink-900/10">
      <div class="container-x flex flex-col gap-2 py-5 text-[11px] uppercase tracking-[0.14em] text-ink-600 sm:flex-row sm:justify-between">
        <span>&copy; {{ year }} {{ site.name }}. Sva prava zadržana.</span>
        <span>UV400 zaštita na svim modelima</span>
      </div>
    </div>
  </footer>
</template>
