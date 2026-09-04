<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string; subtitle?: string; center?: boolean }>()
</script>

<template>
  <div :class="['max-w-2xl', center && 'mx-auto text-center']">
    <p v-if="eyebrow" class="text-xs font-semibold uppercase tracking-[0.2em] text-sun-600">{{ eyebrow }}</p>
    <h2 class="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{{ title }}</h2>
    <p v-if="subtitle" class="mt-3 text-base text-ink-600">{{ subtitle }}</p>
  </div>
</template>
