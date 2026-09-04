<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string; subtitle?: string; center?: boolean; light?: boolean }>()
</script>

<template>
  <div :class="['max-w-2xl', center && 'mx-auto text-center']">
    <p v-if="eyebrow" :class="['eyebrow', light && '!text-white/60']">{{ eyebrow }}</p>
    <h2 :class="['heading mt-2 text-2xl sm:text-3xl', light && 'text-white']">{{ title }}</h2>
    <p v-if="subtitle" :class="['mt-3 text-sm', light ? 'text-white/70' : 'text-ink-600']">{{ subtitle }}</p>
  </div>
</template>
