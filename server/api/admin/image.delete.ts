import { rm } from 'node:fs/promises'
import { join, normalize, sep } from 'node:path'

export default defineEventHandler(async (event) => {
  assertDev(event)
  const { path } = await readBody<{ path: string }>(event)
  if (typeof path !== 'string' || !path.startsWith('/images/products/')) {
    throw createError({ statusCode: 400, statusMessage: 'Neispravna putanja' })
  }
  const abs = normalize(join(IMAGES_DIR, path.slice('/images/products/'.length)))
  if (!abs.startsWith(IMAGES_DIR + sep)) throw createError({ statusCode: 400, statusMessage: 'Neispravna putanja' })
  await rm(abs, { force: true })
  return { ok: true }
})
