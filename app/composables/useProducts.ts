import { products, type Product, type Gender, type Shape } from '~/data/products'

export interface ProductFilters {
  gender?: Gender | ''
  shape?: Shape | ''
  brand?: string
  polarized?: boolean
  inStockOnly?: boolean
  maxPrice?: number
  q?: string
}

export function useProducts() {
  const all = products

  const featured = computed(() => all.filter(p => p.featured && p.inStock).slice(0, 6))

  function bySlug(slug: string): Product | undefined {
    return all.find(p => p.slug === slug)
  }

  function filter(f: ProductFilters): Product[] {
    const q = (f.q ?? '').trim().toLowerCase()
    return all.filter((p) => {
      if (f.gender && p.gender !== f.gender && p.gender !== 'unisex') return false
      if (f.shape && p.shape !== f.shape) return false
      if (f.brand && p.brand !== f.brand) return false
      if (f.polarized && !p.polarized) return false
      if (f.inStockOnly && !p.inStock) return false
      if (f.maxPrice != null && p.price > f.maxPrice) return false
      if (q && !`${p.name} ${p.brand} ${p.frameColor} ${p.lensColor}`.toLowerCase().includes(q)) return false
      return true
    })
  }

  function related(p: Product, n = 4): Product[] {
    return all
      .filter(x => x.slug !== p.slug && x.inStock)
      .sort((a, b) => score(b, p) - score(a, p))
      .slice(0, n)
  }

  function score(a: Product, ref: Product) {
    let s = 0
    if (a.brand === ref.brand) s += 2
    if (a.shape === ref.shape) s += 2
    if (a.gender === ref.gender) s += 1
    if (Math.abs(a.price - ref.price) <= 3) s += 1
    return s
  }

  /** Brendovi po broju modela, najzastupljeniji prvi */
  const brands = computed(() => {
    const count = new Map<string, number>()
    for (const p of all) count.set(p.brand, (count.get(p.brand) ?? 0) + 1)
    return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([name, n]) => ({ name, count: n }))
  })

  const priceRange = computed(() => ({
    min: Math.min(...all.map(p => p.price)),
    max: Math.max(...all.map(p => p.price)),
  }))

  return { all, featured, bySlug, filter, related, priceRange, brands }
}
