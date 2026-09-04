import { site } from '~/site.config'
import type { Product } from '~/data/products'

/**
 * Pravi wa.me linkove sa unaprijed napisanom porukom.
 * Kupac klikne, otvori mu se WhatsApp sa porukom, samo pošalje.
 */
export function useWhatsApp() {
  const base = `https://wa.me/${site.whatsappNumber}`

  function link(message: string) {
    return `${base}?text=${encodeURIComponent(message)}`
  }

  function orderLink(p: Product, opts?: { origin?: string }) {
    const url = opts?.origin ? `${opts.origin}/naocare/${p.slug}` : ''
    const lines = [
      `Zdravo! Zanima me model *${p.name}* (${p.frameColor}, ${p.lensColor}).`,
      `Cijena: ${p.price} ${site.currency}`,
      url ? `Link: ${url}` : '',
      '',
      'Molim vas informacije o dostupnosti i dostavi.',
    ].filter(l => l !== undefined)
    return link(lines.join('\n'))
  }

  function generalLink() {
    return link(`Zdravo! Imam pitanje u vezi naočara.`)
  }

  return { link, orderLink, generalLink }
}
