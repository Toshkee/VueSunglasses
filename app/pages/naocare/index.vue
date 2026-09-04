<script setup lang="ts">
import { shapeLabels, genderLabels, type Gender, type Shape } from '~/data/products'

useSeoMeta({
  title: 'Sve naočare',
  description: 'Kompletna kolekcija naočara za sunce. Filtriraj po obliku, polu i cijeni.',
})

const route = useRoute()
const router = useRouter()
const { filter, priceRange } = useProducts()

type Sort = 'default' | 'price-asc' | 'price-desc'

const gender = ref<Gender | ''>('')
const shape = ref<Shape | ''>('')
const polarized = ref(false)
const inStockOnly = ref(false)
const q = ref('')
const sort = ref<Sort>('default')

// Filteri žive u URL-u, pa se link može podijeliti (npr. /naocare?gender=zenski).
// Stranica je statički generisana bez query-ja, zato URL čitamo tek na klijentu.
function readFromRoute() {
  gender.value = (route.query.gender as Gender) || ''
  shape.value = (route.query.shape as Shape) || ''
  polarized.value = route.query.polarized === '1'
  inStockOnly.value = route.query.stock === '1'
  q.value = (route.query.q as string) || ''
  sort.value = (route.query.sort as Sort) || 'default'
}
onMounted(readFromRoute)
watch(() => route.query, readFromRoute)

watch([gender, shape, polarized, inStockOnly, q, sort], () => {
  router.replace({
    query: {
      ...(gender.value && { gender: gender.value }),
      ...(shape.value && { shape: shape.value }),
      ...(polarized.value && { polarized: '1' }),
      ...(inStockOnly.value && { stock: '1' }),
      ...(q.value && { q: q.value }),
      ...(sort.value !== 'default' && { sort: sort.value }),
    },
  })
})

const results = computed(() => {
  const list = filter({ gender: gender.value, shape: shape.value, polarized: polarized.value, inStockOnly: inStockOnly.value, q: q.value })
  if (sort.value === 'price-asc') return [...list].sort((a, b) => a.price - b.price)
  if (sort.value === 'price-desc') return [...list].sort((a, b) => b.price - a.price)
  return list
})

const hasFilters = computed(() => gender.value || shape.value || polarized.value || inStockOnly.value || q.value)

function reset() {
  gender.value = ''
  shape.value = ''
  polarized.value = false
  inStockOnly.value = false
  q.value = ''
  sort.value = 'default'
}

const filtersOpen = ref(false)

function chip(active: boolean) {
  return [
    'rounded-full border px-3 py-1.5 text-sm transition-colors',
    active ? 'border-ink-900 bg-ink-900 text-white' : 'border-ink-900/15 bg-white text-ink-800 hover:border-ink-900',
  ]
}
</script>

<template>
  <div class="container-x py-12">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <SectionHeading eyebrow="Kolekcija" title="Sve naočare" :subtitle="`Cijene od ${priceRange.min} do ${priceRange.max} €. Sve sa UV400 zaštitom.`" />
      <button class="btn-secondary lg:hidden" @click="filtersOpen = !filtersOpen">
        {{ filtersOpen ? 'Sakrij filtere' : 'Filteri' }}
      </button>
    </div>

    <div class="mt-10 grid gap-10 lg:grid-cols-[260px_1fr]">
      <!-- Filters -->
      <aside :class="['space-y-8', filtersOpen ? 'block' : 'hidden lg:block']">
        <div>
          <label class="text-xs font-semibold uppercase tracking-wider text-ink-400" for="q">Pretraga</label>
          <input id="q" v-model="q" type="search" placeholder="npr. aviator, crna..." class="mt-2 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-2.5 text-sm focus:border-ink-900 focus:outline-none" />
        </div>

        <fieldset>
          <legend class="text-xs font-semibold uppercase tracking-wider text-ink-400">Za koga</legend>
          <div class="mt-2 flex flex-wrap gap-2">
            <button :class="chip(gender === '')" @click="gender = ''">Sve</button>
            <button v-for="(label, key) in genderLabels" :key="key" :class="chip(gender === key)" @click="gender = key as Gender">{{ label }}</button>
          </div>
        </fieldset>

        <fieldset>
          <legend class="text-xs font-semibold uppercase tracking-wider text-ink-400">Oblik</legend>
          <div class="mt-2 flex flex-wrap gap-2">
            <button :class="chip(shape === '')" @click="shape = ''">Svi</button>
            <button v-for="(label, key) in shapeLabels" :key="key" :class="chip(shape === key)" @click="shape = key as Shape">{{ label }}</button>
          </div>
        </fieldset>

        <fieldset class="space-y-3">
          <legend class="text-xs font-semibold uppercase tracking-wider text-ink-400">Ostalo</legend>
          <label class="flex items-center gap-3 text-sm"><input v-model="polarized" type="checkbox" class="h-4 w-4 accent-ink-900" /> Samo polarizovane</label>
          <label class="flex items-center gap-3 text-sm"><input v-model="inStockOnly" type="checkbox" class="h-4 w-4 accent-ink-900" /> Samo na stanju</label>
        </fieldset>

        <button v-if="hasFilters" class="text-sm font-medium text-ink-600 underline underline-offset-4 hover:text-ink-900" @click="reset">Poništi filtere</button>
      </aside>

      <!-- Results -->
      <div>
        <div class="flex items-center justify-between gap-4 text-sm text-ink-600">
          <span>{{ results.length }} {{ results.length === 1 ? 'model' : 'modela' }}</span>
          <label class="flex items-center gap-2">
            Sortiraj
            <select v-model="sort" class="rounded-lg border border-ink-900/10 bg-white px-3 py-1.5 text-sm">
              <option value="default">Preporučeno</option>
              <option value="price-asc">Cijena: niža prvo</option>
              <option value="price-desc">Cijena: viša prvo</option>
            </select>
          </label>
        </div>

        <div v-if="results.length" class="mt-6 grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-3">
          <ProductCard v-for="p in results" :key="p.slug" :product="p" />
        </div>
        <div v-else class="mt-6 rounded-2xl border border-dashed border-ink-900/20 p-12 text-center">
          <p class="font-display text-xl font-semibold">Nema modela za ove filtere</p>
          <p class="mt-2 text-sm text-ink-600">Probaj da ukloniš neki filter ili nam piši, možda imamo nešto što još nije na sajtu.</p>
          <button class="btn-secondary mt-6" @click="reset">Poništi filtere</button>
        </div>
      </div>
    </div>
  </div>
</template>
