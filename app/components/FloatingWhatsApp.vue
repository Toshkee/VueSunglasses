<script setup lang="ts">
const { generalLink } = useWhatsApp()
</script>

<template>
  <a
    :href="generalLink()"
    target="_blank"
    rel="noopener"
    class="fixed bottom-5 right-5 z-50 flex h-13 w-13 items-center justify-center bg-wa text-white shadow-lg shadow-ink-900/20 transition-transform hover:scale-105 hover:bg-wa-dark"
    aria-label="Piši nam na WhatsApp"
  >
    <WhatsAppIcon class="h-6 w-6" />
  </a>
</template>
