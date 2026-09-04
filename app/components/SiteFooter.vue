<script setup lang="ts">
import { site } from '~/site.config'
const { generalLink } = useWhatsApp()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-24 border-t border-ink-900/5 bg-ink-900 text-sand-100">
    <div class="container-x grid gap-10 py-14 md:grid-cols-4">
      <div class="md:col-span-2">
        <div class="flex items-center gap-2">
          <LogoMark class="h-7 w-auto text-sun-400" />
          <span class="font-display text-xl font-semibold">{{ site.name }}</span>
        </div>
        <p class="mt-4 max-w-md text-sm text-sand-300">{{ site.description }}</p>
      </div>

      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-sand-300">Navigacija</h3>
        <ul class="mt-4 space-y-2 text-sm">
          <li><NuxtLink to="/naocare" class="hover:text-white">Sve naočare</NuxtLink></li>
          <li><NuxtLink to="/naocare?gender=muski" class="hover:text-white">Muške</NuxtLink></li>
          <li><NuxtLink to="/naocare?gender=zenski" class="hover:text-white">Ženske</NuxtLink></li>
          <li><NuxtLink to="/o-nama" class="hover:text-white">O nama</NuxtLink></li>
          <li><NuxtLink to="/kontakt" class="hover:text-white">Kontakt</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-sand-300">Kontakt</h3>
        <ul class="mt-4 space-y-2 text-sm">
          <li><a :href="generalLink()" target="_blank" rel="noopener" class="hover:text-white">WhatsApp: {{ site.phoneDisplay }}</a></li>
          <li><a :href="`mailto:${site.email}`" class="hover:text-white">{{ site.email }}</a></li>
          <li>{{ site.address }}</li>
          <li>{{ site.workingHours }}</li>
          <li v-if="site.instagram"><a :href="site.instagram" target="_blank" rel="noopener" class="hover:text-white">Instagram</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/10">
      <div class="container-x flex flex-col gap-2 py-5 text-xs text-sand-300 sm:flex-row sm:justify-between">
        <span>&copy; {{ year }} {{ site.name }}. Sva prava zadržana.</span>
        <span>Sve naočare imaju UV400 zaštitu.</span>
      </div>
    </div>
  </footer>
</template>
