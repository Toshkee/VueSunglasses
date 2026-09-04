<script setup lang="ts">
/**
 * Port Sona UI "fluid-tabs": tabovi sa indikatorom koji klizi ispod aktivnog.
 */
const props = defineProps<{ tabs: { value: string; label: string }[]; modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()

const wrap = ref<HTMLElement | null>(null)
const indicator = ref({ left: 0, width: 0, ready: false })

function measure() {
  const root = wrap.value
  if (!root) return
  const btn = root.querySelector<HTMLElement>(`[data-value="${CSS.escape(props.modelValue)}"]`)
  if (!btn) return
  indicator.value = { left: btn.offsetLeft, width: btn.offsetWidth, ready: true }
}

onMounted(() => {
  measure()
  const ro = new ResizeObserver(measure)
  if (wrap.value) ro.observe(wrap.value)
  onUnmounted(() => ro.disconnect())
})
watch(() => props.modelValue, () => nextTick(measure))
</script>

<template>
  <div ref="wrap" class="relative inline-flex bg-sand-100 p-1" role="tablist">
    <span
      class="absolute top-1 bottom-1 bg-ink-900 transition-[left,width] duration-300"
      :style="{ left: `${indicator.left}px`, width: `${indicator.width}px`, opacity: indicator.ready ? 1 : 0, transitionTimingFunction: 'var(--ease-sona)' }"
      aria-hidden="true"
    />
    <button
      v-for="t in tabs"
      :key="t.value"
      type="button"
      role="tab"
      :data-value="t.value"
      :aria-selected="t.value === modelValue"
      :class="['relative z-10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300', t.value === modelValue ? 'text-white' : 'text-ink-600 hover:text-ink-900']"
      @click="emit('update:modelValue', t.value)"
    >
      {{ t.label }}
    </button>
  </div>
</template>
