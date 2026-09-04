/**
 * PRIVREMENO: skida zvanične fotografije proizvođača (Ray-Ban, Tom Ford) za brendirane modele.
 * Ove slike su vlasništvo proizvođača i koriste se samo dok ne stignu naše fotografije.
 * Kad ubaciš svoje slike kroz admin, ovaj skript više nije potreban.
 *
 * Pokreni: node scripts/fetch-brand-images.mjs
 */
import { mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const PRODUCTS = join(ROOT, 'app', 'data', 'products.json')
const IMAGES = join(ROOT, 'public', 'images', 'products')

const rb = (upc) => ['qt', 'fr', 'lt'].map(v => `https://images.ray-ban.com/is/image/RayBan/${upc}__STD__shad__${v}.png?impolicy=RB_Product&width=1600`)
const tf = (code) => ['B', 'A', 'C'].map(v => `https://cdn.media.amplience.net/i/tom_ford/FT1355_${code}_53MM_${v}?w=1600&fmt=jpg`)

const SOURCES = {
  'rb3928-asap-rocky-gold-green': rb('8056262905807'),
  'rb3928-asap-rocky-black-grey-polarized': rb('8056262905845'),
  'rb3928-asap-rocky-gold-blue-gradient': rb('8056262905784'),
  'rb3929-asap-rocky-gold-brown': rb('8056262905722'),
  'rb3929-asap-rocky-black-grey-polarized': rb('8056262905760'),
  'rb3929-asap-rocky-gold-violet-gradient': rb('8056262905739'),
  'rb3025-aviator-classic-gold-g15': rb('805289602057'),
  'rb2140-original-wayfarer-black-g15': rb('805289126577'),
  'rb3016-clubmaster-black-gold': rb('805289653653'),
  'rb3447-round-metal-gold-g15': rb('805289439899'),
  'rb3548-hexagonal-gold-g15': rb('8053672611632'),
  'rb4165-justin-black-grey-gradient': rb('805289526575'),
  'tom-ford-ft1355-ethan-palladium-smoke': tf('16B'),
  'tom-ford-ft1355-ethan-gold-brown': tf('30E'),
  'tom-ford-ft1355-ethan-rose-gold-green': tf('28P'),
}

const products = JSON.parse(readFileSync(PRODUCTS, 'utf8'))
const headers = { 'User-Agent': 'Mozilla/5.0', Accept: 'image/*' }
let ok = 0, failed = 0

for (const [slug, urls] of Object.entries(SOURCES)) {
  const product = products.find(p => p.slug === slug)
  if (!product) { console.warn(`! nema modela ${slug} u products.json`); continue }
  const dir = join(IMAGES, slug)
  mkdirSync(dir, { recursive: true })
  const saved = []
  for (let i = 0; i < urls.length; i++) {
    try {
      const res = await fetch(urls[i], { headers })
      const buf = Buffer.from(await res.arrayBuffer())
      const isJpeg = buf[0] === 0xff && buf[1] === 0xd8
      if (!res.ok || buf.length < 10_000 || !isJpeg) throw new Error(`${res.status} ${buf.length}b jpeg=${isJpeg}`)
      const file = `${i + 1}.jpg`
      writeFileSync(join(dir, file), buf)
      saved.push(`/images/products/${slug}/${file}`)
      ok++
    } catch (e) {
      console.warn(`! ${slug} #${i + 1}: ${e.message}`)
      failed++
    }
  }
  if (saved.length) {
    product.images = saved
    const svg = join(dir, '1.svg')
    if (existsSync(svg)) rmSync(svg)
  }
}

writeFileSync(PRODUCTS, JSON.stringify(products, null, 2) + '\n', 'utf8')
console.log(`Skinuto ${ok} slika, neuspjelo ${failed}. products.json ažuriran.`)
