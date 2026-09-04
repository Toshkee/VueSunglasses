import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { join, extname } from 'node:path'

const ALLOWED: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/svg+xml': '.svg',
}
const MAX_BYTES = 8 * 1024 * 1024

export default defineEventHandler(async (event) => {
  assertDev(event)
  const parts = (await readMultipartFormData(event)) ?? []
  const slug = parts.find(p => p.name === 'slug')?.data.toString('utf8') ?? ''
  if (!SLUG_RE.test(slug)) throw createError({ statusCode: 400, statusMessage: 'Neispravan slug' })

  const dir = join(IMAGES_DIR, slug)
  await mkdir(dir, { recursive: true })

  // Sljedeći slobodan redni broj (1.jpg, 2.jpg, ...)
  const existing = await readdir(dir).catch(() => [] as string[])
  let next = existing.reduce((m, f) => Math.max(m, parseInt(f, 10) || 0), 0) + 1

  const saved: string[] = []
  for (const part of parts) {
    if (part.name !== 'files' || !part.filename) continue
    const ext = ALLOWED[part.type ?? ''] ?? (Object.values(ALLOWED).includes(extname(part.filename).toLowerCase()) ? extname(part.filename).toLowerCase() : null)
    if (!ext) throw createError({ statusCode: 400, statusMessage: `Nepodržan format: ${part.filename}. Dozvoljeno: jpg, png, webp, svg` })
    if (part.data.length > MAX_BYTES) throw createError({ statusCode: 400, statusMessage: `${part.filename} je veći od 8 MB` })
    const file = `${next++}${ext}`
    await writeFile(join(dir, file), part.data)
    saved.push(`/images/products/${slug}/${file}`)
  }
  return { images: saved }
})
