<script setup lang="ts">
import { site } from '~/site.config'
const { generalLink } = useWhatsApp()

useSeoMeta({
  title: 'O nama',
  description: 'Porodična priča iza radnje. Od veleprodaje naočara do prodaje na komad, direktno tebi.',
})
</script>

<template>
  <div class="container-x py-16">
    <div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
      <div>
        <SectionHeading eyebrow="O nama" title="Otac i sin, i puno naočara" />
        <div class="prose mt-8 max-w-none text-ink-600">
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
        </div>
        <a :href="generalLink()" target="_blank" rel="noopener" class="btn-wa mt-8">
          <WhatsAppIcon class="h-5 w-5" /> Upoznaj nas na WhatsApp-u
        </a>
      </div>

      <div class="space-y-4">
        <!-- Zamijeni sa pravom fotografijom: /public/images/o-nama.jpg -->
        <div class="aspect-[4/3] overflow-hidden rounded-3xl bg-sand-200">
          <img src="/images/o-nama.svg" alt="Naša radnja" class="h-full w-full object-cover" />
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div class="rounded-2xl bg-white p-5 text-center shadow-sm">
            <p class="font-display text-3xl font-semibold">10+</p>
            <p class="mt-1 text-xs text-ink-600">godina u poslu</p>
          </div>
          <div class="rounded-2xl bg-white p-5 text-center shadow-sm">
            <p class="font-display text-3xl font-semibold">UV400</p>
            <p class="mt-1 text-xs text-ink-600">na svakom modelu</p>
          </div>
          <div class="rounded-2xl bg-white p-5 text-center shadow-sm">
            <p class="font-display text-3xl font-semibold">0</p>
            <p class="mt-1 text-xs text-ink-600">posrednika</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
