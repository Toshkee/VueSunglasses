<script setup lang="ts">
import { site } from '~/site.config'
import { shapeLabels, type Shape } from '~/data/labels'

const { all, featured, brands } = useProducts()
const { generalLink } = useWhatsApp()

useSeoMeta({
  title: 'Naočare za sunce',
  ogTitle: `${site.name} | ${site.tagline}`,
  description: site.description,
})

// Kategorije: jedna pločica po obliku, slika je prvi model tog oblika
const categoryOrder: Shape[] = ['aviator', 'wayfarer', 'okrugle', 'cat-eye', 'sportske', 'kvadratne', 'oversize']
const categories = computed(() =>
  categoryOrder
    .map(shape => ({ shape, label: shapeLabels[shape], product: all.find(p => p.shape === shape) }))
    .filter(c => c.product)
    .slice(0, 5),
)

// "Trending": izdvojeni prvi, pa ostali na stanju, ukupno 6
const trending = computed(() => {
  const rest = all.filter(p => p.inStock && !p.featured)
  return [...featured.value, ...rest].slice(0, 6)
})

const perks = [
  { icon: 'truck', title: 'Dostava u cijeloj CG', text: `Besplatno preko ${site.delivery.freeShippingFrom} ${site.currency}` },
  { icon: 'shield', title: 'UV400 zaštita', text: 'Na svakom modelu, bez izuzetka' },
  { icon: 'tag', title: 'Cijene od uvoznika', text: 'Bez marže posrednika' },
  { icon: 'chat', title: 'Podrška na WhatsApp', text: 'Odgovor u roku od 24h' },
]

const promos = computed(() => [
  { eyebrow: 'Novi modeli', title: 'Svake sedmice', cta: 'Pogledaj', to: '/naocare', image: all[0]?.images[0] },
  { eyebrow: 'Polarizovane', title: 'Za more i vožnju', cta: 'Pogledaj', to: '/naocare?polarized=1', image: all.find(p => p.polarized)?.images[0] },
  { eyebrow: 'Akcija', title: 'Sniženi modeli', cta: 'Iskoristi', to: '/naocare?sort=price-asc', image: all.find(p => p.oldPrice)?.images[0] ?? all[1]?.images[0] },
])

const instaImages = computed(() => all.slice(0, 6).map(p => p.images[0]))
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative min-h-[560px] overflow-hidden bg-ink-900 text-white md:min-h-[640px]">
      <!-- Video ili slika u pozadini: podešava se u app/site.config.ts (hero) -->
      <video
        v-if="site.hero.video"
        :src="site.hero.video"
        :poster="site.hero.image"
        autoplay
        muted
        loop
        playsinline
        class="absolute inset-0 h-full w-full object-cover object-center opacity-90"
      />
      <img v-else :src="site.hero.image" alt="" class="absolute inset-0 h-full w-full object-cover object-right opacity-90" />
      <div class="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/70 to-transparent" />
      <div class="container-x relative flex min-h-[560px] items-center py-16 md:min-h-[640px]">
        <div class="max-w-xl">
          <p class="eyebrow !text-white/60">Nova kolekcija · {{ new Date().getFullYear() }}</p>
          <h1 class="heading mt-4 text-5xl sm:text-6xl lg:text-7xl">
            <SonaStaggerText text="Sunce." as="span" class="block" />
            <SonaStaggerText text="Stil." as="span" class="block" :delay="0.15" />
            <SonaStaggerText text="Cijena." as="span" class="block text-white/50" :delay="0.3" />
          </h1>
          <p class="mt-6 max-w-md text-sm text-white/70 sm:text-base">
            {{ site.tagline }}. Provjereni modeli sa UV400 zaštitom, cijene bez posrednika.
          </p>
          <div class="mt-8 flex flex-wrap items-center gap-3">
            <SonaMagnetic>
              <NuxtLink to="/naocare" class="btn-white">Pogledaj kolekciju</NuxtLink>
            </SonaMagnetic>
            <a :href="generalLink()" target="_blank" rel="noopener" class="btn border border-white/30 text-white hover:border-white">
              <WhatsAppIcon class="h-3.5 w-3.5" /> Pitaj nas
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Perks -->
    <section class="border-b border-ink-900/10">
      <div class="container-x grid grid-cols-2 divide-ink-900/10 md:grid-cols-4 md:divide-x">
        <div v-for="perk in perks" :key="perk.title" class="flex items-center gap-3 py-5 md:justify-center">
          <PerkIcon :name="perk.icon" class="h-5 w-5 shrink-0" />
          <div>
            <p class="text-[11px] font-bold uppercase tracking-[0.14em]">{{ perk.title }}</p>
            <p class="text-xs text-ink-600">{{ perk.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section id="kategorije" class="container-x scroll-mt-28 py-16">
      <SectionHeading center title="Kupuj po obliku" />
      <div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <NuxtLink
          v-for="c in categories"
          :key="c.shape"
          :to="`/naocare?shape=${c.shape}`"
          class="group relative aspect-[4/5] overflow-hidden bg-ink-900"
        >
          <img :src="c.product!.images[0]" :alt="c.label" loading="lazy" class="h-full w-full object-cover opacity-80 transition-transform duration-700 ease-[var(--ease-sona)] group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-transparent" />
          <div class="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 p-4 text-center text-white">
            <span class="heading text-base">{{ c.label }}</span>
            <span class="btn-white !px-3 !py-2 !text-[9px]">Pogledaj</span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Brands -->
    <section class="border-y border-ink-900/10">
      <div class="container-x grid divide-ink-900/10 sm:grid-cols-3 sm:divide-x">
        <NuxtLink
          v-for="b in brands"
          :key="b.name"
          :to="`/naocare?brand=${encodeURIComponent(b.name)}`"
          class="group flex items-center justify-between gap-4 py-6 sm:justify-center sm:px-6"
        >
          <span class="heading text-xl transition-colors group-hover:text-ink-600">{{ b.name }}</span>
          <span class="eyebrow">{{ b.count }} {{ b.count === 1 ? 'model' : 'modela' }}</span>
        </NuxtLink>
      </div>
    </section>

    <!-- Trending -->
    <section class="bg-sand-50 py-16">
      <div class="container-x">
        <SectionHeading center title="Trenutno traženo" />
        <div class="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
          <ProductCard v-for="p in trending" :key="p.slug" :product="p" />
        </div>
        <div class="mt-10 text-center">
          <NuxtLink to="/naocare" class="btn-secondary">Sve naočare</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Promo -->
    <section class="container-x py-16">
      <div class="grid gap-3 md:grid-cols-3">
        <SonaSpotlightCard v-for="promo in promos" :key="promo.title" class="bg-ink-900 text-white">
          <NuxtLink :to="promo.to" class="relative flex min-h-[220px] items-end">
            <img :src="promo.image" alt="" loading="lazy" class="absolute inset-0 h-full w-full object-cover opacity-30" />
            <div class="absolute inset-0 bg-gradient-to-r from-ink-900 to-transparent" />
            <div class="relative p-6">
              <p class="eyebrow !text-white/60">{{ promo.eyebrow }}</p>
              <p class="heading mt-2 text-2xl">{{ promo.title }}</p>
              <span class="btn-white mt-5 !px-4 !py-2.5 !text-[10px]">{{ promo.cta }}</span>
            </div>
          </NuxtLink>
        </SonaSpotlightCard>
      </div>
    </section>

    <!-- Instagram -->
    <section class="bg-ink-900 py-10 text-white">
      <div class="container-x grid items-center gap-6 lg:grid-cols-[260px_1fr]">
        <div>
          <p class="heading text-base">Prati nas na Instagramu</p>
          <a v-if="site.instagram" :href="site.instagram" target="_blank" rel="noopener" class="mt-1 block text-sm text-white/60 hover:text-white">
            @{{ site.instagram.split('/').filter(Boolean).pop() }}
          </a>
        </div>
        <div class="grid grid-cols-3 gap-2 sm:grid-cols-6">
          <a v-for="(img, i) in instaImages" :key="i" :href="site.instagram || '#'" target="_blank" rel="noopener" class="aspect-square overflow-hidden bg-ink-800">
            <img :src="img" alt="" loading="lazy" class="h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0" />
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
