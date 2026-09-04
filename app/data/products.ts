/**
 * Katalog proizvoda.
 *
 * Kako dodati novi model:
 *  1. Ubaci slike u /public/images/products/<slug>/  (npr. 1.jpg, 2.jpg)
 *  2. Dodaj novi objekat u niz ispod. `slug` mora biti jedinstven, mala slova, bez razmaka.
 *  3. Sačuvaj. Sajt se sam osvježi.
 */

export type Gender = 'muski' | 'zenski' | 'unisex'
export type Shape = 'aviator' | 'wayfarer' | 'okrugle' | 'cat-eye' | 'sportske' | 'kvadratne' | 'oversize'

export interface Product {
  slug: string
  name: string
  brand: string
  price: number
  oldPrice?: number
  gender: Gender
  shape: Shape
  frameColor: string
  lensColor: string
  polarized: boolean
  uv400: boolean
  inStock: boolean
  featured?: boolean
  images: string[]
  description: string
}

export const shapeLabels: Record<Shape, string> = {
  aviator: 'Aviator',
  wayfarer: 'Wayfarer',
  okrugle: 'Okrugle',
  'cat-eye': 'Cat-eye',
  sportske: 'Sportske',
  kvadratne: 'Kvadratne',
  oversize: 'Oversize',
}

export const genderLabels: Record<Gender, string> = {
  muski: 'Muške',
  zenski: 'Ženske',
  unisex: 'Unisex',
}

export const products: Product[] = [
  {
    slug: 'aviator-gold-classic',
    name: 'Aviator Gold Classic',
    brand: 'Vue',
    price: 24,
    gender: 'unisex',
    shape: 'aviator',
    frameColor: 'Zlatna',
    lensColor: 'Zelena',
    polarized: true,
    uv400: true,
    inStock: true,
    featured: true,
    images: ['/images/products/aviator-gold-classic/1.svg'],
    description:
      'Bezvremenski aviator sa tankim metalnim okvirom i polarizovanim zelenim staklima. Lagane, udobne i odgovaraju gotovo svakom obliku lica.',
  },
  {
    slug: 'wayfarer-black-matte',
    name: 'Wayfarer Black Matte',
    brand: 'Vue',
    price: 19,
    gender: 'unisex',
    shape: 'wayfarer',
    frameColor: 'Crna mat',
    lensColor: 'Crna',
    polarized: false,
    uv400: true,
    inStock: true,
    featured: true,
    images: ['/images/products/wayfarer-black-matte/1.svg'],
    description:
      'Klasičan wayfarer kroj u mat crnoj boji. Ide uz sve, od plaže do grada. Čvrst acetatni okvir sa metalnim šarkama.',
  },
  {
    slug: 'round-tortoise',
    name: 'Round Tortoise',
    brand: 'Vue',
    price: 22,
    gender: 'zenski',
    shape: 'okrugle',
    frameColor: 'Tortoise (smeđa)',
    lensColor: 'Braon gradient',
    polarized: false,
    uv400: true,
    inStock: true,
    featured: true,
    images: ['/images/products/round-tortoise/1.svg'],
    description:
      'Retro okrugle naočare u kornjačinom dezenu sa braon gradient staklima. Topao, vintage izgled.',
  },
  {
    slug: 'cat-eye-rose',
    name: 'Cat-eye Rose',
    brand: 'Vue',
    price: 21,
    gender: 'zenski',
    shape: 'cat-eye',
    frameColor: 'Roze',
    lensColor: 'Roze gradient',
    polarized: false,
    uv400: true,
    inStock: true,
    images: ['/images/products/cat-eye-rose/1.svg'],
    description:
      'Elegantne cat-eye naočare u nježnoj roze nijansi. Za one koje vole da se izdvoje.',
  },
  {
    slug: 'sport-wrap-blue',
    name: 'Sport Wrap Blue',
    brand: 'Vue',
    price: 26,
    oldPrice: 32,
    gender: 'muski',
    shape: 'sportske',
    frameColor: 'Crna',
    lensColor: 'Plava mirror',
    polarized: true,
    uv400: true,
    inStock: true,
    featured: true,
    images: ['/images/products/sport-wrap-blue/1.svg'],
    description:
      'Sportske naočare sa polarizovanim plavim mirror staklima. Odlične za vožnju, biciklizam i more. Gumirane drške ne klize.',
  },
  {
    slug: 'square-havana',
    name: 'Square Havana',
    brand: 'Vue',
    price: 23,
    gender: 'muski',
    shape: 'kvadratne',
    frameColor: 'Havana',
    lensColor: 'Zelena',
    polarized: true,
    uv400: true,
    inStock: true,
    images: ['/images/products/square-havana/1.svg'],
    description:
      'Kvadratni okvir u havana dezenu sa polarizovanim zelenim staklima. Muževan, ozbiljan izgled.',
  },
  {
    slug: 'oversize-black-gloss',
    name: 'Oversize Black Gloss',
    brand: 'Vue',
    price: 25,
    gender: 'zenski',
    shape: 'oversize',
    frameColor: 'Crna sjajna',
    lensColor: 'Siva gradient',
    polarized: false,
    uv400: true,
    inStock: true,
    images: ['/images/products/oversize-black-gloss/1.svg'],
    description:
      'Velike, glamurozne naočare u sjajnoj crnoj boji. Maksimalna zaštita i holivudski izgled.',
  },
  {
    slug: 'aviator-silver-mirror',
    name: 'Aviator Silver Mirror',
    brand: 'Vue',
    price: 24,
    gender: 'unisex',
    shape: 'aviator',
    frameColor: 'Srebrna',
    lensColor: 'Srebrna mirror',
    polarized: true,
    uv400: true,
    inStock: false,
    images: ['/images/products/aviator-silver-mirror/1.svg'],
    description:
      'Aviator sa srebrnim mirror staklima. Trenutno rasprodat, javi se da te obavijestimo kad stigne.',
  },
  {
    slug: 'round-gold-clear',
    name: 'Round Gold Clear',
    brand: 'Vue',
    price: 20,
    gender: 'unisex',
    shape: 'okrugle',
    frameColor: 'Zlatna',
    lensColor: 'Svijetlo braon',
    polarized: false,
    uv400: true,
    inStock: true,
    images: ['/images/products/round-gold-clear/1.svg'],
    description:
      'Tanki zlatni okvir sa svijetlim staklima. Za oblačne dane i večernje izlaske.',
  },
  {
    slug: 'wayfarer-crystal',
    name: 'Wayfarer Crystal',
    brand: 'Vue',
    price: 19,
    gender: 'unisex',
    shape: 'wayfarer',
    frameColor: 'Providna',
    lensColor: 'Siva',
    polarized: false,
    uv400: true,
    inStock: true,
    images: ['/images/products/wayfarer-crystal/1.svg'],
    description:
      'Wayfarer sa providnim kristalnim okvirom i sivim staklima. Moderan i neutralan.',
  },
  {
    slug: 'sport-wrap-red',
    name: 'Sport Wrap Red',
    brand: 'Vue',
    price: 26,
    gender: 'muski',
    shape: 'sportske',
    frameColor: 'Crno-crvena',
    lensColor: 'Crvena mirror',
    polarized: true,
    uv400: true,
    inStock: true,
    images: ['/images/products/sport-wrap-red/1.svg'],
    description:
      'Sportski model sa crvenim mirror polarizovanim staklima. Za trčanje, more i vožnju.',
  },
  {
    slug: 'cat-eye-black',
    name: 'Cat-eye Black',
    brand: 'Vue',
    price: 21,
    gender: 'zenski',
    shape: 'cat-eye',
    frameColor: 'Crna',
    lensColor: 'Crna',
    polarized: false,
    uv400: true,
    inStock: true,
    images: ['/images/products/cat-eye-black/1.svg'],
    description: 'Klasične crne cat-eye naočare. Uvijek u modi.',
  },
]
