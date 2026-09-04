<script setup lang="ts">
import type { Product } from '~/data/labels'
import { shapeLabels } from '~/data/labels'

const props = defineProps<{ product: Product }>()
const { orderLink } = useWhatsApp()
const origin = useRequestURL().origin
const wa = computed(() => orderLink(props.product, { origin }))
</script>

<template>
  <div class="group flex flex-col">
    <NuxtLink :to="`/naocare/${product.slug}`" class="relative block aspect-square overflow-hidden bg-sand-100">
      <img
        :src="product.images[0]"
        :alt="product.name"
        loading="lazy"
        class="h-full w-full object-contain p-3 transition-transform duration-700 ease-[var(--ease-sona)] group-hover:scale-105"
      />
      <img
        v-if="product.images[1]"
        :src="product.images[1]"
        alt=""
        loading="lazy"
        class="absolute inset-0 h-full w-full bg-sand-100 object-contain p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div class="absolute left-2 top-2 flex flex-col gap-1">
        <span v-if="product.oldPrice" class="bg-ink-900 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
          -{{ Math.round((1 - product.price / product.oldPrice) * 100) }}%
        </span>
        <span v-if="product.polarized" class="bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-900">Polarizovane</span>
      </div>
      <div v-if="!product.inStock" class="absolute inset-0 flex items-center justify-center bg-white/70">
        <span class="border border-ink-900 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]">Rasprodato</span>
      </div>
    </NuxtLink>

    <div class="flex flex-1 flex-col pt-3">
      <p class="eyebrow truncate !text-[10px]">{{ product.brand }} · {{ shapeLabels[product.shape] }}</p>
      <NuxtLink :to="`/naocare/${product.slug}`" class="mt-1 text-sm font-semibold leading-snug hover:underline">{{ product.name }}</NuxtLink>
      <div class="mt-1 flex items-baseline gap-2 text-sm">
        <span class="font-bold">{{ formatPrice(product.price) }}</span>
        <span v-if="product.oldPrice" class="text-ink-400 line-through">{{ formatPrice(product.oldPrice) }}</span>
      </div>
      <a
        v-if="product.inStock"
        :href="wa"
        target="_blank"
        rel="noopener"
        class="btn-primary mt-3 w-full !py-3"
      >
        <WhatsAppIcon class="h-3.5 w-3.5" /> Naruči
      </a>
      <NuxtLink v-else :to="`/naocare/${product.slug}`" class="btn-secondary mt-3 w-full !py-3">Detalji</NuxtLink>
    </div>
  </div>
</template>
