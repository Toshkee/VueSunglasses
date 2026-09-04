<script setup lang="ts">
import { site } from '~/site.config'
const { generalLink } = useWhatsApp()

useSeoMeta({
  title: 'O nama',
  description: 'Porodična priča iza radnje. Od veleprodaje naočara do prodaje na komad, direktno tebi.',
})
</script>

<template>
  <div>
    <section class="bg-ink-900 text-white">
      <div class="container-x py-16 md:py-24">
        <p class="eyebrow !text-white/60">O nama</p>
        <h1 class="heading mt-3 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">Otac i sin.<br />I puno naočara.</h1>
      </div>
    </section>

    <div class="container-x grid gap-12 pb-20 pt-16 lg:grid-cols-2 lg:gap-20">
      <div class="space-y-5 text-ink-600">
        <p>
          Godinama moj otac uvozi i prodaje naočare za sunce radnjama širom Crne Gore. Ako si ikad kupio naočare na
          primorju ili u nekoj gradskoj radnji, velika je šansa da su prošle kroz njegove ruke.
        </p>
        <p>
          Ljudi su nas stalno pitali: „Mogu li kupiti samo jedne?“ Odgovor je bio ne. Sada je da.
          {{ site.name }} je naš način da iste naočare, po istim cijenama koje smo davali radnjama,
          ponudimo direktno tebi.
        </p>
        <p>
          Nema skladišta na drugom kraju svijeta, nema call centra. Kad pišeš na WhatsApp, odgovaramo mi lično.
          Ako naočare ne odgovaraju, vratićeš ih bez drame.
        </p>
        <a :href="generalLink()" target="_blank" rel="noopener" class="btn-primary !mt-8">
          <WhatsAppIcon class="h-3.5 w-3.5" /> Upoznaj nas na WhatsApp-u
        </a>
      </div>

      <div class="space-y-3">
        <!-- Zamijeni sa pravom fotografijom: /public/images/o-nama.jpg -->
        <div class="aspect-[4/3] overflow-hidden bg-sand-100">
          <img src="/images/o-nama.svg" alt="Naša radnja" class="h-full w-full object-cover" />
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div class="border border-ink-900/10 p-5 text-center">
            <p class="heading text-3xl">10+</p>
            <p class="mt-1 text-xs text-ink-600">godina u poslu</p>
          </div>
          <div class="border border-ink-900/10 p-5 text-center">
            <p class="heading text-3xl">UV400</p>
            <p class="mt-1 text-xs text-ink-600">na svakom modelu</p>
          </div>
          <div class="border border-ink-900/10 p-5 text-center">
            <p class="heading text-3xl">0</p>
            <p class="mt-1 text-xs text-ink-600">posrednika</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
