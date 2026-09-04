<script setup lang="ts">
/**
 * Port Sona UI "lightbox": pregled slike preko cijelog ekrana, sa strelicama i Escape-om.
 * Animacija je čist CSS (Vue Transition), poštuje prefers-reduced-motion.
 */
const props = defineProps<{ images: string[]; alt: string; index: number }>()
const emit = defineEmits<{ 'update:index': [number] }>()

const open = ref(false)

function show() { open.value = true }
function close() { open.value = false }
function next() { emit('update:index', (props.index + 1) % props.images.length) }
function prev() { emit('update:index', (props.index - 1 + props.images.length) % props.images.length) }

function onKey(e: KeyboardEvent) {
  if (!open.value) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
watch(open, v => { document.body.style.overflow = v ? 'hidden' : '' })

defineExpose({ show })
</script>

<template>
  <button type="button" class="block w-full cursor-zoom-in" aria-label="Uvećaj sliku" @click="show">
    <slot />
  </button>

  <Teleport to="body">
    <Transition name="lb">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/90 p-4"
        role="dialog"
        aria-modal="true"
        @click.self="close"
      >
        <Transition name="lb-img" mode="out-in">
          <img
            :key="images[index]"
            :src="images[index]"
            :alt="alt"
            class="lb-img max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
          />
        </Transition>

        <button class="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20" aria-label="Zatvori" @click="close">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M6 18L18 6" /></svg>
        </button>

        <template v-if="images.length > 1">
          <button class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20" aria-label="Prethodna" @click="prev">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20" aria-label="Sljedeća" @click="next">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6" /></svg>
          </button>
          <p class="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/70">{{ index + 1 }} / {{ images.length }}</p>
        </template>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lb-enter-active, .lb-leave-active { transition: opacity 0.2s ease; }
.lb-enter-from, .lb-leave-to { opacity: 0; }

.lb-img-enter-active { transition: opacity 0.3s var(--ease-sona), transform 0.3s var(--ease-sona); }
.lb-img-leave-active { transition: opacity 0.15s ease; }
.lb-img-enter-from { opacity: 0; transform: scale(0.92); }
.lb-img-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .lb-img-enter-from { transform: none; }
}
</style>
