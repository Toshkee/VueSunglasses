<script setup lang="ts">
const { generalLink } = useWhatsApp()
</script>

<template>
  <a
    :href="generalLink()"
    target="_blank"
    rel="noopener"
    class="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-lg shadow-wa/40 transition-transform hover:scale-105 hover:bg-wa-dark"
    aria-label="Piši nam na WhatsApp"
  >
    <WhatsAppIcon class="h-7 w-7" />
  </a>
</template>
