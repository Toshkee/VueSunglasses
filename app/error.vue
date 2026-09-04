<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-sand-50 px-6 text-center">
    <p class="font-display text-7xl font-semibold text-sun-500">{{ error.statusCode }}</p>
    <h1 class="mt-4 font-display text-2xl font-semibold">
      {{ error.statusCode === 404 ? 'Ova stranica ne postoji' : 'Nešto je pošlo naopako' }}
    </h1>
    <p class="mt-2 max-w-md text-ink-600">Možda je model rasprodat ili je link pogrešan. Vrati se na kolekciju.</p>
    <button class="btn-primary mt-8" @click="clearError({ redirect: '/naocare' })">Sve naočare</button>
  </div>
</template>
