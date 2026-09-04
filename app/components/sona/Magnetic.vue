<script setup lang="ts">
/**
 * Port Sona UI "magnetic-button": element se blago privlači ka pokazivaču.
 * Isključeno pri prefers-reduced-motion i na touch uređajima (nema hover-a).
 */
const props = withDefaults(defineProps<{ strength?: number }>(), { strength: 0.25 })

const el = ref<HTMLElement | null>(null)
const x = ref(0)
const y = ref(0)
const active = ref(false)
const enabled = ref(false)

onMounted(() => {
  enabled.value = matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches
})

function move(e: PointerEvent) {
  if (!enabled.value || !el.value) return
  const r = el.value.getBoundingClientRect()
  x.value = (e.clientX - (r.left + r.width / 2)) * props.strength
  y.value = (e.clientY - (r.top + r.height / 2)) * props.strength
  active.value = true
}
function leave() {
  x.value = 0
  y.value = 0
  active.value = false
}
</script>

<template>
  <div
    ref="el"
    class="inline-block"
    :style="{
      transform: `translate(${x}px, ${y}px)`,
      transition: active ? 'transform 120ms var(--ease-sona)' : 'transform 400ms var(--ease-sona)',
    }"
    @pointermove="move"
    @pointerleave="leave"
  >
    <slot />
  </div>
</template>
