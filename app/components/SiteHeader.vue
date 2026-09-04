<script setup lang="ts">
import { site } from '~/site.config'

const { generalLink } = useWhatsApp()
const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))

const links = [
  { to: '/', label: 'Početna' },
  { to: '/naocare', label: 'Naočare' },
  { to: '/#kategorije', label: 'Kolekcije' },
  { to: '/o-nama', label: 'O nama' },
  { to: '/kontakt', label: 'Kontakt' },
]

const announcements = [
  `Besplatna dostava za narudžbe preko ${site.delivery.freeShippingFrom} ${site.currency}`,
  'UV400 zaštita na svim modelima',
  'Naručivanje preko WhatsApp-a, bez registracije',
  'Povrat u roku od 14 dana',
]
</script>

<template>
  <header class="sticky top-0 z-40 bg-white">
    <SonaMarquee :items="announcements" dark :duration="40" />

    <div class="border-b border-ink-900/10">
      <div class="container-x grid h-16 grid-cols-[1fr_auto_1fr] items-center">
        <NuxtLink to="/" class="flex items-center gap-2" aria-label="Početna">
          <LogoMark class="h-6 w-auto" />
          <span class="heading text-lg">{{ site.name }}</span>
        </NuxtLink>

        <nav class="hidden items-center gap-8 md:flex">
          <NuxtLink
            v-for="l in links"
            :key="l.to"
            :to="l.to"
            class="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-600 transition-colors hover:text-ink-900"
            active-class="!text-ink-900"
          >
            {{ l.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center justify-end gap-1">
          <NuxtLink to="/naocare" class="p-2 text-ink-900 hover:text-ink-600" aria-label="Pretraga">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path stroke-linecap="round" d="M20 20l-3.5-3.5" /></svg>
          </NuxtLink>
          <a :href="generalLink()" target="_blank" rel="noopener" class="p-2 text-ink-900 hover:text-ink-600" aria-label="WhatsApp">
            <WhatsAppIcon class="h-5 w-5" />
          </a>
          <button class="p-2 md:hidden" :aria-expanded="open" aria-label="Meni" @click="open = !open">
            <svg v-if="!open" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" /></svg>
            <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M6 18L18 6" /></svg>
          </button>
        </div>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <nav v-if="open" class="border-b border-ink-900/10 bg-white md:hidden">
        <div class="container-x flex flex-col py-2">
          <NuxtLink
            v-for="l in links"
            :key="l.to"
            :to="l.to"
            class="border-b border-ink-900/5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink-800 last:border-0"
          >
            {{ l.label }}
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>
