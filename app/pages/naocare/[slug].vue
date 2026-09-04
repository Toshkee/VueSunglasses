<script setup lang="ts">
import { site } from '~/site.config'
import { shapeLabels, genderLabels } from '~/data/products'

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
  <div v-if="product" class="container-x py-10">
    <nav class="text-sm text-ink-600" aria-label="Putanja">
      <NuxtLink to="/" class="hover:text-ink-900">Početna</NuxtLink>
      <span class="mx-2">/</span>
      <NuxtLink to="/naocare" class="hover:text-ink-900">Naočare</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-ink-900">{{ product.name }}</span>
    </nav>

    <div class="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
      <!-- Gallery -->
      <div>
        <SonaLightbox v-model:index="active" :images="product.images" :alt="product.name">
          <div class="aspect-square overflow-hidden rounded-3xl bg-sand-100">
            <img :src="product.images[active]" :alt="product.name" class="h-full w-full object-cover" />
          </div>
        </SonaLightbox>
        <div v-if="product.images.length > 1" class="mt-4 flex gap-3">
          <button
            v-for="(img, i) in product.images"
            :key="img"
            :class="['h-20 w-20 overflow-hidden rounded-xl border-2 bg-sand-100', i === active ? 'border-ink-900' : 'border-transparent']"
            @click="active = i"
          >
            <img :src="img" :alt="`${product.name} ${i + 1}`" class="h-full w-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Info -->
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sun-600">{{ product.brand }} · {{ shapeLabels[product.shape] }}</p>
        <h1 class="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{{ product.name }}</h1>

        <div class="mt-4 flex items-baseline gap-3">
          <span class="text-3xl font-bold">{{ formatPrice(product.price) }}</span>
          <span v-if="product.oldPrice" class="text-lg text-ink-400 line-through">{{ formatPrice(product.oldPrice) }}</span>
          <span v-if="product.oldPrice" class="rounded-full bg-sun-500 px-2.5 py-1 text-xs font-semibold">
            -{{ Math.round((1 - product.price / product.oldPrice) * 100) }}%
          </span>
        </div>

        <p class="mt-6 text-ink-600">{{ product.description }}</p>

        <div class="mt-6 flex flex-wrap gap-2">
          <span v-if="product.uv400" class="rounded-full bg-ink-900 px-3 py-1 text-xs font-semibold text-white">UV400</span>
          <span v-if="product.polarized" class="rounded-full bg-ink-900 px-3 py-1 text-xs font-semibold text-white">Polarizovane</span>
          <span :class="['rounded-full px-3 py-1 text-xs font-semibold', product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
            {{ product.inStock ? 'Na stanju' : 'Rasprodato' }}
          </span>
        </div>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <a :href="waLink" target="_blank" rel="noopener" class="btn-wa flex-1 !py-4 text-base">
            <WhatsAppIcon class="h-5 w-5" />
            {{ product.inStock ? 'Naruči preko WhatsApp-a' : 'Javi mi kad stigne' }}
          </a>
          <a :href="`tel:${site.phoneDisplay.replace(/\s/g, '')}`" class="btn-secondary !py-4 text-base">Pozovi</a>
        </div>
        <p class="mt-3 text-xs text-ink-400">Klikom se otvara WhatsApp sa gotovom porukom. Bez registracije, bez kartice.</p>

        <dl class="mt-10 divide-y divide-ink-900/10 border-y border-ink-900/10 text-sm">
          <div v-for="[k, v] in specs" :key="k" class="flex justify-between py-3">
            <dt class="text-ink-600">{{ k }}</dt>
            <dd class="font-medium">{{ v }}</dd>
          </div>
        </dl>

        <div class="mt-8 rounded-2xl bg-sand-100 p-5 text-sm">
          <p class="font-semibold">Dostava i preuzimanje</p>
          <ul class="mt-2 space-y-1 text-ink-600">
            <li>{{ site.delivery.pickup }}</li>
            <li>{{ site.delivery.shipping }}: {{ site.delivery.shippingPrice }} {{ site.currency }}, besplatno preko {{ site.delivery.freeShippingFrom }} {{ site.currency }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Related -->
    <section class="mt-24">
      <SectionHeading eyebrow="Slični modeli" title="Možda ti se svidi i ovo" />
      <div class="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        <ProductCard v-for="p in related(product)" :key="p.slug" :product="p" />
      </div>
    </section>
  </div>
</template>
