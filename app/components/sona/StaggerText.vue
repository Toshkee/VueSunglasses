<script setup lang="ts">
/**
 * Port Sona UI "stagger-text" na Vue (motion-v).
 * Riječi ulaze jedna po jedna. Poštuje prefers-reduced-motion.
 */
import { motion, useReducedMotion } from 'motion-v'

const props = withDefaults(defineProps<{ text: string; as?: string; delay?: number; stagger?: number }>(), {
  as: 'span',
  delay: 0,
  stagger: 0.05,
})

const reduced = useReducedMotion()
const words = computed(() => props.text.split(' '))
</script>

<template>
  <component :is="as" :aria-label="text">
    <template v-for="(w, i) in words" :key="i">
      <motion.span
        class="inline-block"
        aria-hidden="true"
        :initial="reduced ? false : { opacity: 0, y: 14, filter: 'blur(4px)' }"
        :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.55, delay: delay + i * stagger, ease: [0.32, 0.72, 0, 1] }"
      >{{ w }}</motion.span>{{ i < words.length - 1 ? ' ' : '' }}
    </template>
  </component>
</template>
