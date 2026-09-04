<script setup lang="ts">
import { site } from '~/site.config'

const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))

const links = [
  { to: '/', label: 'Početna' },
  { to: '/naocare', label: 'Naočare' },
  { to: '/o-nama', label: 'O nama' },
  { to: '/kontakt', label: 'Kontakt' },
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-ink-900/5 bg-sand-50/90 backdrop-blur">
    <div class="container-x flex h-16 items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2">
        <LogoMark class="h-7 w-auto" />
        <span class="font-display text-xl font-semibold tracking-tight">{{ site.name }}</span>
      </NuxtLink>

      <nav class="hidden items-center gap-8 md:flex">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="text-sm font-medium text-ink-600 transition-colors hover:text-ink-900"
          active-class="!text-ink-900"
        >
          {{ l.label }}
        </NuxtLink>
        <NuxtLink to="/naocare" class="btn-primary !py-2">Pogledaj kolekciju</NuxtLink>
      </nav>

      <button
        class="rounded-md p-2 md:hidden"
        :aria-expanded="open"
        aria-label="Meni"
        @click="open = !open"
      >
        <svg v-if="!open" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" /></svg>
        <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M6 18L18 6" /></svg>
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <nav v-if="open" class="border-t border-ink-900/5 bg-sand-50 md:hidden">
        <div class="container-x flex flex-col py-3">
          <NuxtLink
            v-for="l in links"
            :key="l.to"
            :to="l.to"
            class="py-3 text-base font-medium text-ink-800"
            active-class="!text-ink-900 font-semibold"
          >
            {{ l.label }}
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>
