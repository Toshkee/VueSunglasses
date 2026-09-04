<script setup lang="ts">
import { site } from '~/site.config'
import { shapeLabels, genderLabels } from '~/data/labels'

const route = useRoute()
const { bySlug, related } = useProducts()
const { orderLink } = useWhatsApp()

const product = bySlug(route.params.slug as string)
if (!product) {
  throw createError({ statusCode: 404, statusMessage: 'Model nije pronađen', fatal: true })
}

const active = ref(0)
const origin = useRequestURL().origin
const waLink = computed(() => orderLink(product, { origin }))

useSeoMeta({
  title: product.name,
  description: product.description,
  ogTitle: `${product.name} | ${site.name}`,
  ogDescription: product.description,
  ogImage: `${origin}${product.images[0]}`,
})

const specs = [
  ['Oblik', shapeLabels[product.shape]],
  ['Za koga', genderLabels[product.gender]],
  ['Boja okvira', product.frameColor],
  ['Boja stakla', product.lensColor],
  ['Polarizovane', product.polarized ? 'Da' : 'Ne'],
  ['UV zaštita', product.uv400 ? 'UV400 (100%)' : 'Ne'],
]
</script>

<template>
  <div v-if="product" class="container-x pb-20 pt-8">
    <nav class="eyebrow" aria-label="Putanja">
      <NuxtLink to="/" class="hover:text-ink-900">Početna</NuxtLink> /
      <NuxtLink to="/naocare" class="hover:text-ink-900">Naočare</NuxtLink> /
      <span class="text-ink-900">{{ product.name }}</span>
    </nav>

    <div class="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
      <!-- Gallery -->
      <div class="grid gap-2 sm:grid-cols-[72px_1fr]">
        <div v-if="product.images.length > 1" class="order-2 flex gap-2 sm:order-1 sm:flex-col">
          <button
            v-for="(img, i) in product.images"
            :key="img"
            :class="['aspect-square w-[72px] overflow-hidden border bg-sand-100', i === active ? 'border-ink-900' : 'border-transparent hover:border-ink-900/30']"
            @click="active = i"
          >
            <img :src="img" :alt="`${product.name} ${i + 1}`" class="h-full w-full object-contain p-1" />
          </button>
        </div>
        <div :class="['order-1 sm:order-2', product.images.length <= 1 && 'sm:col-span-2']">
          <SonaLightbox v-model:index="active" :images="product.images" :alt="product.name">
            <div class="aspect-square overflow-hidden bg-sand-100">
              <img :src="product.images[active]" :alt="product.name" class="h-full w-full object-contain p-6" />
            </div>
          </SonaLightbox>
        </div>
      </div>

      <!-- Info -->
      <div>
        <p class="eyebrow">{{ product.brand }} · {{ shapeLabels[product.shape] }}</p>
        <h1 class="heading mt-2 text-3xl sm:text-4xl">{{ product.name }}</h1>

        <div class="mt-4 flex items-baseline gap-3">
          <span class="text-2xl font-bold">{{ formatPrice(product.price) }}</span>
          <span v-if="product.oldPrice" class="text-base text-ink-400 line-through">{{ formatPrice(product.oldPrice) }}</span>
          <span v-if="product.oldPrice" class="bg-ink-900 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
            -{{ Math.round((1 - product.price / product.oldPrice) * 100) }}%
          </span>
        </div>

        <p class="mt-5 text-sm leading-relaxed text-ink-600">{{ product.description }}</p>

        <div class="mt-5 flex flex-wrap gap-2">
          <span v-if="product.uv400" class="border border-ink-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]">UV400</span>
          <span v-if="product.polarized" class="border border-ink-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]">Polarizovane</span>
          <span :class="['px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]', product.inStock ? 'bg-ink-900 text-white' : 'bg-sand-200 text-ink-600']">
            {{ product.inStock ? 'Na stanju' : 'Rasprodato' }}
          </span>
        </div>

        <div class="mt-8 flex flex-col gap-2 sm:flex-row">
          <a :href="waLink" target="_blank" rel="noopener" class="btn-wa flex-1 !py-4">
            <WhatsAppIcon class="h-4 w-4" />
            {{ product.inStock ? 'Naruči preko WhatsApp-a' : 'Javi mi kad stigne' }}
          </a>
          <a :href="`tel:${site.phoneDisplay.replace(/\s/g, '')}`" class="btn-secondary !py-4">Pozovi</a>
        </div>
        <p class="mt-3 text-xs text-ink-600">Klikom se otvara WhatsApp sa gotovom porukom. Bez registracije, bez kartice.</p>

        <dl class="mt-8 divide-y divide-ink-900/10 border-y border-ink-900/10 text-sm">
          <div v-for="[k, v] in specs" :key="k" class="flex justify-between py-3">
            <dt class="text-ink-600">{{ k }}</dt>
            <dd class="font-semibold">{{ v }}</dd>
          </div>
        </dl>

        <div class="mt-6 bg-sand-100 p-5 text-sm">
          <p class="text-[11px] font-bold uppercase tracking-[0.14em]">Dostava i preuzimanje</p>
          <ul class="mt-2 space-y-1 text-ink-600">
            <li>{{ site.delivery.pickup }}</li>
            <li>{{ site.delivery.shipping }}: {{ site.delivery.shippingPrice }} {{ site.currency }}, besplatno preko {{ site.delivery.freeShippingFrom }} {{ site.currency }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Related -->
    <section class="mt-20">
      <SectionHeading center title="Možda ti se svidi i ovo" />
      <div class="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
        <ProductCard v-for="p in related(product)" :key="p.slug" :product="p" />
      </div>
    </section>
  </div>
</template>
