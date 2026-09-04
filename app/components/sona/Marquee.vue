<script setup lang="ts">
/**
 * Port Sona UI "marquee": beskonačna traka sadržaja. Čist CSS, pauza na hover.
 */
withDefaults(defineProps<{ items: string[]; duration?: number }>(), { duration: 30 })
</script>

<template>
  <div class="group relative overflow-hidden border-y border-ink-900/10 bg-sand-100 py-3" role="marquee">
    <div class="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-sand-100 to-transparent" />
    <div class="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-sand-100 to-transparent" />
    <div class="marquee-track flex w-max gap-10 group-hover:[animation-play-state:paused]" :style="{ animationDuration: `${duration}s` }">
      <template v-for="n in 2" :key="n">
        <span
          v-for="(item, i) in items"
          :key="`${n}-${i}`"
          class="flex items-center gap-10 text-xs font-semibold uppercase tracking-[0.2em] text-ink-600"
          :aria-hidden="n === 2"
        >
          {{ item }}
          <span class="h-1.5 w-1.5 rounded-full bg-sun-500" />
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.marquee-track {
  animation: marquee linear infinite;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}
</style>
