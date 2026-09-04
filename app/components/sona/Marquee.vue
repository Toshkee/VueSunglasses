<script setup lang="ts">
/**
 * Port Sona UI "marquee": beskonačna traka sadržaja. Čist CSS, pauza na hover.
 */
withDefaults(defineProps<{ items: string[]; duration?: number; dark?: boolean }>(), { duration: 30, dark: false })
</script>

<template>
  <div
    :class="['group relative overflow-hidden', dark ? 'bg-ink-900 text-white' : 'border-y border-ink-900/10 bg-sand-100 text-ink-600']"
    role="marquee"
  >
    <div class="marquee-track flex w-max group-hover:[animation-play-state:paused]" :style="{ animationDuration: `${duration}s` }">
      <template v-for="n in 2" :key="n">
        <span
          v-for="(item, i) in items"
          :key="`${n}-${i}`"
          class="flex items-center gap-8 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em]"
          :aria-hidden="n === 2"
        >
          {{ item }}
          <span :class="['h-1 w-1', dark ? 'bg-white/60' : 'bg-ink-900/40']" />
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
