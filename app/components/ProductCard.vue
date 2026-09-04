<script setup lang="ts">
import type { Product } from '~/data/products'
import { shapeLabels } from '~/data/products'

defineProps<{ product: Product }>()
</script>

<template>
  <NuxtLink
    :to="`/naocare/${product.slug}`"
    class="group flex flex-col overflow-hidden rounded-2xl border border-ink-900/5 bg-white transition-shadow hover:shadow-lg hover:shadow-ink-900/5"
  >
    <div class="relative aspect-square overflow-hidden bg-sand-100">
      <img
        :src="product.images[0]"
        :alt="product.name"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div class="absolute left-3 top-3 flex flex-col gap-1">
        <span v-if="product.oldPrice" class="rounded-full bg-sun-500 px-2.5 py-1 text-xs font-semibold text-ink-900">Akcija</span>
        <span v-if="product.polarized" class="rounded-full bg-ink-900 px-2.5 py-1 text-xs font-semibold text-white">Polarizovane</span>
      </div>
      <div v-if="!product.inStock" class="absolute inset-0 flex items-center justify-center bg-white/70">
        <span class="rounded-full border border-ink-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider">Rasprodato</span>
      </div>
    </div>

    <div class="flex flex-1 flex-col p-4">
      <p class="text-xs uppercase tracking-wider text-ink-400">{{ shapeLabels[product.shape] }}</p>
      <h3 class="mt-1 font-display text-lg font-semibold leading-tight">{{ product.name }}</h3>
      <p class="mt-1 text-sm text-ink-600">{{ product.frameColor }} · {{ product.lensColor }}</p>
      <div class="mt-auto flex items-baseline gap-2 pt-3">
        <span class="text-lg font-bold">{{ formatPrice(product.price) }}</span>
        <span v-if="product.oldPrice" class="text-sm text-ink-400 line-through">{{ formatPrice(product.oldPrice) }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
