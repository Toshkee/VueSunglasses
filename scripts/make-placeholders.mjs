/**
 * Pravi privremene SVG slike za proizvode dok ne stignu prave fotografije.
 * Pokreni: node scripts/make-placeholders.mjs
 * Kad ubaciš prave slike (1.jpg), samo promijeni putanju u app/data/products.ts.
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const products = [
  ['aviator-gold-classic', '#d4a017', '#2f6b4f', 'aviator'],
  ['wayfarer-black-matte', '#1a1a1a', '#111', 'wayfarer'],
  ['round-tortoise', '#7a4a1e', '#8b5a2b', 'round'],
  ['cat-eye-rose', '#e8a0b4', '#f2b8c6', 'cateye'],
  ['sport-wrap-blue', '#111', '#2b6cb0', 'sport'],
  ['square-havana', '#6b3f1d', '#2f6b4f', 'square'],
  ['oversize-black-gloss', '#0a0a0a', '#555', 'oversize'],
  ['aviator-silver-mirror', '#b8bcc4', '#c9ced6', 'aviator'],
  ['round-gold-clear', '#d4a017', '#c7a87a', 'round'],
  ['wayfarer-crystal', '#d9dde3', '#7a7f87', 'wayfarer'],
  ['sport-wrap-red', '#111', '#c53030', 'sport'],
  ['cat-eye-black', '#111', '#111', 'cateye'],
]

function lens(shape, x, y, fill) {
  switch (shape) {
    case 'aviator': return `<path d="M${x - 70} ${y - 40} h140 c0 60 -20 90 -70 90 s-70 -30 -70 -90z" fill="${fill}"/>`
    case 'round': return `<circle cx="${x}" cy="${y}" r="62" fill="${fill}"/>`
    case 'cateye': return `<path d="M${x - 75} ${y - 20} q75 -60 150 -25 q-10 80 -75 80 q-65 0 -75 -55z" fill="${fill}"/>`
    case 'sport': return `<path d="M${x - 80} ${y - 35} q80 -25 160 0 q-10 70 -80 70 q-70 0 -80 -70z" fill="${fill}"/>`
    case 'oversize': return `<rect x="${x - 80}" y="${y - 55}" width="160" height="120" rx="55" fill="${fill}"/>`
    case 'square': return `<rect x="${x - 70}" y="${y - 50}" width="140" height="100" rx="18" fill="${fill}"/>`
    default: return `<rect x="${x - 72}" y="${y - 48}" width="144" height="100" rx="28" fill="${fill}"/>`
  }
}

function svg(frame, glass, shape) {
  const w = 800, h = 800, cy = 400, l = 245, r = 555
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="#f4ede0"/>
  <ellipse cx="400" cy="560" rx="260" ry="26" fill="#000" opacity="0.08"/>
  <g stroke="${frame}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M${l + 80} ${cy - 20} q${(r - l) / 2 - 80} -40 ${r - l - 160} 0"/>
    <path d="M${l - 80} ${cy - 30} l-60 -20"/>
    <path d="M${r + 80} ${cy - 30} l60 -20"/>
  </g>
  <g opacity="0.92">${lens(shape, l, cy, glass)}${lens(shape, r, cy, glass)}</g>
  <g stroke="${frame}" stroke-width="12" fill="none">${lens(shape, l, cy, 'none')}${lens(shape, r, cy, 'none')}</g>
  <path d="M${l - 40} ${cy - 30} q30 -20 60 0" stroke="#fff" stroke-width="6" fill="none" opacity="0.5" stroke-linecap="round"/>
  <path d="M${r - 40} ${cy - 30} q30 -20 60 0" stroke="#fff" stroke-width="6" fill="none" opacity="0.5" stroke-linecap="round"/>
</svg>`
}

const root = join(process.cwd(), 'public', 'images')
for (const [slug, frame, glass, shape] of products) {
  const dir = join(root, 'products', slug)
  mkdirSync(dir, { recursive: true })
  const file = join(dir, '1.svg')
  if (!existsSync(file)) writeFileSync(file, svg(frame, glass, shape))
}

const hero = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5b942"/><stop offset="1" stop-color="#e8dcc5"/></linearGradient></defs>
  <rect width="800" height="1000" fill="url(#g)"/>
  <circle cx="400" cy="330" r="170" fill="#fff" opacity="0.5"/>
  <g transform="translate(0,120)">${svg('#0f172a', '#1e293b', 'aviator').replace(/<svg[^>]*>|<\/svg>|<rect width="800" height="800" fill="#f4ede0"\/>/g, '')}</g>
  <text x="400" y="900" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#0f172a">Ovdje ide tvoja fotografija</text>
</svg>`
writeFileSync(join(root, 'hero.svg'), hero)

const about = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#e8dcc5"/>
  <text x="400" y="300" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#0f172a">Fotografija radnje / vas dvojice</text>
</svg>`
writeFileSync(join(root, 'o-nama.svg'), about)

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0f172a"/>
  <g transform="translate(0,16)" stroke="#f5b942" stroke-width="3" stroke-linecap="round" fill="#f5b942" fill-opacity="0.2">
    <path d="M6 12h52" fill="none"/>
    <path d="M10 12c0 8 3 14 10 14s10-6 10-14"/>
    <path d="M34 12c0 8 3 14 10 14s10-6 10-14"/>
  </g>
</svg>`
writeFileSync(join(process.cwd(), 'public', 'favicon.svg'), favicon)

console.log('Placeholder slike napravljene u public/images/')
