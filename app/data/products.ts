/**
 * Katalog proizvoda.
 *
 * Podaci žive u `products.json` pored ovog fajla. Najlakše ih mijenjaš kroz
 * admin panel: pokreni `npm run dev` i otvori http://localhost:3000/admin
 *
 * Ručno: slike u /public/images/products/<slug>/, pa dodaj objekat u products.json.
 */
import raw from './products.json'
import type { Product } from './labels'

export type { Product, Gender, Shape } from './labels'
export { shapeLabels, genderLabels } from './labels'

export const products = raw as Product[]
