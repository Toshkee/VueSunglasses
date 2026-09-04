<script setup lang="ts">
import { shapeLabels, genderLabels, type Gender, type Shape } from '~/data/labels'

useSeoMeta({
  title: 'Sve naočare',
  description: 'Kompletna kolekcija naočara za sunce. Filtriraj po obliku, polu i cijeni.',
})

const route = useRoute()
const router = useRouter()
const { filter, priceRange, brands } = useProducts()

type Sort = 'default' | 'price-asc' | 'price-desc'

const gender = ref<Gender | ''>('')
const shape = ref<Shape | ''>('')
const brand = ref('')
const polarized = ref(false)
const inStockOnly = ref(false)
const q = ref('')
const sort = ref<Sort>('default')

// Filteri žive u URL-u, pa se link može podijeliti (npr. /naocare?gender=zenski).
// Stranica je statički generisana bez query-ja, zato URL čitamo tek na klijentu.
function readFromRoute() {
  gender.value = (route.query.gender as Gender) || ''
  shape.value = (route.query.shape as Shape) || ''
  brand.value = (route.query.brand as string) || ''
  polarized.value = route.query.polarized === '1'
  inStockOnly.value = route.query.stock === '1'
  q.value = (route.query.q as string) || ''
  sort.value = (route.query.sort as Sort) || 'default'
}
onMounted(readFromRoute)
watch(() => route.query, readFromRoute)

watch([gender, shape, brand, polarized, inStockOnly, q, sort], () => {
  router.replace({
    query: {
      ...(gender.value && { gender: gender.value }),
      ...(shape.value && { shape: shape.value }),
      ...(brand.value && { brand: brand.value }),
      ...(polarized.value && { polarized: '1' }),
      ...(inStockOnly.value && { stock: '1' }),
      ...(q.value && { q: q.value }),
      ...(sort.value !== 'default' && { sort: sort.value }),
    },
  })
})

const results = computed(() => {
  const list = filter({ gender: gender.value, shape: shape.value, brand: brand.value, polarized: polarized.value, inStockOnly: inStockOnly.value, q: q.value })
  if (sort.value === 'price-asc') return [...list].sort((a, b) => a.price - b.price)
  if (sort.value === 'price-desc') return [...list].sort((a, b) => b.price - a.price)
  return list
})

const hasFilters = computed(() => gender.value || shape.value || brand.value || polarized.value || inStockOnly.value || q.value)

function reset() {
  gender.value = ''
  shape.value = ''
  brand.value = ''
  polarized.value = false
  inStockOnly.value = false
  q.value = ''
  sort.value = 'default'
}

const genderTabs = [{ value: '', label: 'Sve' }, ...Object.entries(genderLabels).map(([value, label]) => ({ value, label }))]
const genderModel = computed({ get: () => gender.value, set: v => (gender.value = v as Gender | '') })

const filtersOpen = ref(false)

function chip(active: boolean) {
  return [
    'border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors',
    active ? 'border-ink-900 bg-ink-900 text-white' : 'border-ink-900/15 bg-white text-ink-800 hover:border-ink-900',
  ]
}

const title = computed(() => {
  if (brand.value && shape.value) return `${brand.value} ${shapeLabels[shape.value].toLowerCase()}`
  if (brand.value) return brand.value
  if (shape.value) return shapeLabels[shape.value]
  if (gender.value) return `${genderLabels[gender.value]} naočare`
  return 'Sve naočare'
})
</script>

<template>
  <div>
    <div class="border-b border-ink-900/10 bg-sand-50">
      <div class="container-x py-10">
        <nav class="eyebrow" aria-label="Putanja">
          <NuxtLink to="/" class="hover:text-ink-900">Početna</NuxtLink> / <span class="text-ink-900">Naočare</span>
        </nav>
        <h1 class="heading mt-3 text-3xl sm:text-4xl">{{ title }}</h1>
        <p class="mt-2 text-sm text-ink-600">Cijene od {{ priceRange.min }} do {{ priceRange.max }} €. Sve sa UV400 zaštitom.</p>
      </div>
    </div>

    <div class="container-x grid gap-10 pb-20 pt-10 lg:grid-cols-[240px_1fr]">
      <!-- Filters -->
      <aside>
        <button class="btn-secondary mb-4 w-full lg:hidden" @click="filtersOpen = !filtersOpen">
          {{ filtersOpen ? 'Sakrij filtere' : 'Filteri' }}
        </button>
        <div :class="['space-y-8', filtersOpen ? 'block' : 'hidden lg:block']">
          <div>
            <label class="eyebrow" for="q">Pretraga</label>
            <input id="q" v-model="q" type="search" placeholder="npr. aviator, crna..." class="mt-2 w-full border border-ink-900/15 bg-white px-3 py-2.5 text-sm focus:border-ink-900 focus:outline-none" />
          </div>

          <fieldset>
            <legend class="eyebrow">Brend</legend>
            <div class="mt-3 flex flex-wrap gap-2">
              <button :class="chip(brand === '')" @click="brand = ''">Svi</button>
              <button v-for="b in brands" :key="b.name" :class="chip(brand === b.name)" @click="brand = b.name">{{ b.name }}</button>
            </div>
          </fieldset>

          <fieldset>
            <legend class="eyebrow">Oblik</legend>
            <div class="mt-3 flex flex-wrap gap-2">
              <button :class="chip(shape === '')" @click="shape = ''">Svi</button>
              <button v-for="(label, key) in shapeLabels" :key="key" :class="chip(shape === key)" @click="shape = key as Shape">{{ label }}</button>
            </div>
          </fieldset>

          <fieldset class="space-y-3">
            <legend class="eyebrow">Ostalo</legend>
            <label class="flex items-center gap-3 text-sm"><input v-model="polarized" type="checkbox" class="h-4 w-4 accent-ink-900" /> Samo polarizovane</label>
            <label class="flex items-center gap-3 text-sm"><input v-model="inStockOnly" type="checkbox" class="h-4 w-4 accent-ink-900" /> Samo na stanju</label>
          </fieldset>

          <button v-if="hasFilters" class="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-600 underline underline-offset-4 hover:text-ink-900" @click="reset">Poništi filtere</button>
        </div>
      </aside>

      <!-- Results -->
      <div>
        <div class="flex flex-wrap items-center justify-between gap-4">
          <SonaFluidTabs v-model="genderModel" :tabs="genderTabs" />
          <div class="flex items-center gap-4 text-xs text-ink-600">
            <span>{{ results.length }} {{ results.length === 1 ? 'model' : 'modela' }}</span>
            <label class="flex items-center gap-2">
              <select v-model="sort" class="border border-ink-900/15 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-900">
                <option value="default">Preporučeno</option>
                <option value="price-asc">Cijena: niža prvo</option>
                <option value="price-desc">Cijena: viša prvo</option>
              </select>
            </label>
          </div>
        </div>

        <div v-if="results.length" class="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
          <ProductCard v-for="p in results" :key="p.slug" :product="p" />
        </div>
        <div v-else class="mt-8 border border-dashed border-ink-900/20 p-12 text-center">
          <p class="heading text-lg">Nema modela za ove filtere</p>
          <p class="mt-2 text-sm text-ink-600">Probaj da ukloniš neki filter ili nam piši, možda imamo nešto što još nije na sajtu.</p>
          <button class="btn-secondary mt-6" @click="reset">Poništi filtere</button>
        </div>
      </div>
    </div>
  </div>
</template>
