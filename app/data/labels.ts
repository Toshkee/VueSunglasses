/** Tipovi i nazivi kategorija. Odvojeno od products.json da admin ne reaguje na HMR podataka. */

export type Gender = 'muski' | 'zenski' | 'unisex'
export type Shape = 'aviator' | 'wayfarer' | 'okrugle' | 'cat-eye' | 'sportske' | 'kvadratne' | 'oversize'

export interface Product {
  slug: string
  name: string
  brand: string
  price: number
  oldPrice?: number
  gender: Gender
  shape: Shape
  frameColor: string
  lensColor: string
  polarized: boolean
  uv400: boolean
  inStock: boolean
  featured?: boolean
  images: string[]
  description: string
}

export const shapeLabels: Record<Shape, string> = {
  aviator: 'Aviator',
  wayfarer: 'Wayfarer',
  okrugle: 'Okrugle',
  'cat-eye': 'Cat-eye',
  sportske: 'Sportske',
  kvadratne: 'Kvadratne',
  oversize: 'Oversize',
}

export const genderLabels: Record<Gender, string> = {
  muski: 'Muške',
  zenski: 'Ženske',
  unisex: 'Unisex',
}
