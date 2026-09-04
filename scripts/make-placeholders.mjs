/**
 * Pravi privremene SVG slike za proizvode dok ne stignu prave fotografije.
 * Pokreni: node scripts/make-placeholders.mjs            (samo modeli bez slike)
 *          node scripts/make-placeholders.mjs --force    (prepiši sve placeholder-e)
 * Prave slike dodaješ kroz admin (http://localhost:3000/admin).
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const force = process.argv.includes('--force')
const root = join(process.cwd(), 'public', 'images')
const products = JSON.parse(readFileSync(join(process.cwd(), 'app', 'data', 'products.json'), 'utf8'))

const BG = '#f4f4f5'

// Boja okvira / stakla iz opisa boje (dovoljno dobro za placeholder)
function colorFrom(text, fallback) {
  const t = (text || '').toLowerCase()
  if (/zlat|gold/.test(t)) return '#c9a227'
  if (/srebr|silver|metal/.test(t)) return '#b8bcc4'
  if (/crn|black|mat/.test(t)) return '#111111'
  if (/havana|tortoise|smeđ|smedj|braon|brown/.test(t)) return '#6b3f1d'
  if (/roze|pink/.test(t)) return '#e8a0b4'
  if (/plav|blue/.test(t)) return '#2b6cb0'
  if (/crven|red/.test(t)) return '#c53030'
  if (/zelen|green|g-15/.test(t)) return '#2f6b4f'
  if (/siv|grey|gray|dim/.test(t)) return '#6b7280'
  if (/provid|clear|kristal|crystal|transparent/.test(t)) return '#d9dde3'
  return fallback
}

const shapeMap = { aviator: 'aviator', okrugle: 'round', 'cat-eye': 'cateye', sportske: 'sport', oversize: 'oversize', kvadratne: 'square', wayfarer: 'wayfarer' }

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

function svg(frame, glass, shape, rimless = false, bg = BG) {
  const w = 800, h = 800, cy = 400, l = 245, r = 555
  const rim = rimless ? 3 : 12
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <ellipse cx="400" cy="560" rx="260" ry="26" fill="#000" opacity="0.08"/>
  <g stroke="${frame}" stroke-width="${rimless ? 8 : 14}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M${l + 80} ${cy - 20} q${(r - l) / 2 - 80} -40 ${r - l - 160} 0"/>
    <path d="M${l - 80} ${cy - 30} l-60 -20"/>
    <path d="M${r + 80} ${cy - 30} l60 -20"/>
  </g>
  <g opacity="0.92">${lens(shape, l, cy, glass)}${lens(shape, r, cy, glass)}</g>
  <g stroke="${frame}" stroke-width="${rim}" fill="none">${lens(shape, l, cy, 'none')}${lens(shape, r, cy, 'none')}</g>
  <path d="M${l - 40} ${cy - 30} q30 -20 60 0" stroke="#fff" stroke-width="6" fill="none" opacity="0.5" stroke-linecap="round"/>
  <path d="M${r - 40} ${cy - 30} q30 -20 60 0" stroke="#fff" stroke-width="6" fill="none" opacity="0.5" stroke-linecap="round"/>
</svg>`
}

let made = 0
for (const p of products) {
  const dir = join(root, 'products', p.slug)
  mkdirSync(dir, { recursive: true })
  const file = join(dir, '1.svg')
  const hasRealImage = (p.images || []).some(i => !i.endsWith('.svg'))
  if (hasRealImage) continue
  if (existsSync(file) && !force) continue
  const rimless = /bez rama|rimless/i.test(`${p.frameColor} ${p.description}`)
  writeFileSync(file, svg(colorFrom(p.frameColor, '#111'), colorFrom(p.lensColor, '#333'), shapeMap[p.shape] || 'wayfarer', rimless))
  made++
}

// Hero: tamna crno-bijela pozadina, dok ne stigne prava fotografija ili video
const hero = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a0a0a"/><stop offset="1" stop-color="#3a3a3a"/></linearGradient>
    <radialGradient id="r" cx="0.7" cy="0.4" r="0.5"><stop offset="0" stop-color="#ffffff" stop-opacity="0.18"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#g)"/>
  <rect width="1600" height="1000" fill="url(#r)"/>
  <g transform="translate(700,120) scale(1.1)">${svg('#f4f4f5', '#1a1a1a', 'wayfarer', false, 'none').replace(/<svg[^>]*>|<\/svg>|<rect width="800" height="800" fill="none"\/>/g, '')}</g>
  <text x="1100" y="930" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="22" letter-spacing="6" fill="#ffffff" opacity="0.5">OVDJE IDE FOTOGRAFIJA ILI VIDEO</text>
</svg>`
writeFileSync(join(root, 'hero.svg'), hero)

const about = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#e4e4e7"/>
  <text x="400" y="300" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="18" letter-spacing="4" fill="#0a0a0a" opacity="0.6">FOTOGRAFIJA RADNJE</text>
</svg>`
writeFileSync(join(root, 'o-nama.svg'), about)

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#0a0a0a"/>
  <g transform="translate(0,16)" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="#ffffff" fill-opacity="0.15">
    <path d="M6 12h52" fill="none"/>
    <path d="M10 12c0 8 3 14 10 14s10-6 10-14"/>
    <path d="M34 12c0 8 3 14 10 14s10-6 10-14"/>
  </g>
</svg>`
writeFileSync(join(process.cwd(), 'public', 'favicon.svg'), favicon)

console.log(`Placeholder slike: ${made} novih proizvoda, hero, o-nama i favicon u public/images/`)
