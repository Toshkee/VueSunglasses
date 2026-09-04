<script setup lang="ts">
/**
 * Port Sona UI "spotlight-card": kartica koja prati pokazivač mekim svjetlom.
 */
const el = ref<HTMLElement | null>(null)
const x = ref(50)
const y = ref(50)
const active = ref(false)

function move(e: PointerEvent) {
  const r = el.value?.getBoundingClientRect()
  if (!r) return
  x.value = ((e.clientX - r.left) / r.width) * 100
  y.value = ((e.clientY - r.top) / r.height) * 100
}
</script>

<template>
  <div
    ref="el"
    class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
    @pointermove="move"
    @pointerenter="active = true"
    @pointerleave="active = false"
  >
    <div
      class="pointer-events-none absolute inset-0 transition-opacity duration-300"
      :style="{
        opacity: active ? 1 : 0,
        background: `radial-gradient(240px circle at ${x}% ${y}%, rgba(245,185,66,0.18), transparent 60%)`,
      }"
    />
    <div class="relative p-6">
      <slot />
    </div>
  </div>
</template>
