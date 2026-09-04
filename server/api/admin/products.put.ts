const GENDERS = ['muski', 'zenski', 'unisex']
const SHAPES = ['aviator', 'wayfarer', 'okrugle', 'cat-eye', 'sportske', 'kvadratne', 'oversize']

export default defineEventHandler(async (event) => {
  assertDev(event)
  const body = await readBody(event)
  if (!Array.isArray(body)) throw createError({ statusCode: 400, statusMessage: 'Očekivan niz proizvoda' })

  const seen = new Set<string>()
  const clean = body.map((p: any, i: number) => {
    const where = `Model #${i + 1}${p?.name ? ` (${p.name})` : ''}`
    if (!SLUG_RE.test(p?.slug ?? '')) throw createError({ statusCode: 400, statusMessage: `${where}: neispravan slug` })
    if (seen.has(p.slug)) throw createError({ statusCode: 400, statusMessage: `${where}: slug "${p.slug}" se ponavlja` })
    seen.add(p.slug)
    if (!p.name?.trim()) throw createError({ statusCode: 400, statusMessage: `${where}: nedostaje ime` })
    if (!(Number(p.price) > 0)) throw createError({ statusCode: 400, statusMessage: `${where}: cijena mora biti veća od 0` })
    if (!GENDERS.includes(p.gender)) throw createError({ statusCode: 400, statusMessage: `${where}: neispravan pol` })
    if (!SHAPES.includes(p.shape)) throw createError({ statusCode: 400, statusMessage: `${where}: neispravan oblik` })

    const out: any = {
      slug: p.slug,
      name: String(p.name).trim(),
      brand: String(p.brand ?? '').trim() || 'Vue',
      price: Number(p.price),
    }
    if (Number(p.oldPrice) > Number(p.price)) out.oldPrice = Number(p.oldPrice)
    Object.assign(out, {
      gender: p.gender,
      shape: p.shape,
      frameColor: String(p.frameColor ?? '').trim(),
      lensColor: String(p.lensColor ?? '').trim(),
      polarized: !!p.polarized,
      uv400: p.uv400 !== false,
      inStock: p.inStock !== false,
      featured: !!p.featured,
      images: Array.isArray(p.images) ? p.images.filter((s: any) => typeof s === 'string' && s.startsWith('/images/')) : [],
      description: String(p.description ?? '').trim(),
    })
    return out
  })

  await writeProducts(clean)
  return { ok: true, count: clean.length }
})
