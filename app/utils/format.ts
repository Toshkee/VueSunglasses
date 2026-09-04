import { site } from '~/site.config'

export function formatPrice(n: number) {
  return `${n.toFixed(n % 1 === 0 ? 0 : 2)} ${site.currency}`
}
