/**
 * "Objavi": commit + push. Netlify (ili drugi hosting) onda sam pravi novi build sajta.
 */
export default defineEventHandler(async (event) => {
  assertDev(event)
  const { message } = (await readBody<{ message?: string }>(event)) ?? {}
  const log: string[] = []

  const status = await git(['status', '--porcelain'])
  if (status) {
    await git(['add', 'app/data/products.json', 'public/images/products'])
    const staged = await git(['diff', '--cached', '--name-only'])
    if (staged) {
      const date = new Date().toISOString().slice(0, 16).replace('T', ' ')
      log.push(await git(['commit', '-m', message?.trim() || `Ažuriran katalog (${date})`]))
    }
  }

  try {
    log.push(await git(['push']))
  } catch (e: any) {
    throw createError({ statusCode: 500, statusMessage: 'Push nije uspio', data: String(e?.stderr || e?.message || e) })
  }
  return { ok: true, log: log.filter(Boolean).join('\n') }
})
