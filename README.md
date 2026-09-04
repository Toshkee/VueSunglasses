# VueSunglasses

Sajt za maloprodaju naočara za sunce. Nuxt 4 + Tailwind CSS v4, statički generisan, bez servera i baze.
Narudžbe idu preko WhatsApp-a.

## Pokretanje

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run generate   # statički sajt u .output/public  (za Netlify / Vercel / GitHub Pages)
npm run preview    # pregled generisanog sajta
```

## Gdje se šta mijenja

| Šta                                       | Fajl                          |
| ----------------------------------------- | ----------------------------- |
| Broj telefona, adresa, radno vrijeme, dostava | `app/site.config.ts`      |
| Proizvodi (naočare)                        | `app/data/products.ts`        |
| Slike proizvoda                            | `public/images/products/<slug>/` |
| Boje, fontovi                              | `app/assets/css/main.css`     |
| Stranice                                   | `app/pages/`                  |

## Dodavanje novih naočara

1. Napravi folder `public/images/products/<slug>/` i ubaci slike (`1.jpg`, `2.jpg`, ...). Kvadratne, min. 1000x1000 px.
2. U `app/data/products.ts` dodaj novi objekat u niz `products` (kopiraj postojeći i izmijeni).
3. `slug` mora biti jedinstven, mala slova, bez razmaka (npr. `aviator-gold-classic`).
4. `inStock: false` prikazuje "Rasprodato", `featured: true` stavlja model na početnu.

## WhatsApp

U `app/site.config.ts` postavi `whatsappNumber` u međunarodnom formatu bez plusa i razmaka, npr. `38267123456`.
Svako dugme "Naruči" otvara WhatsApp sa gotovom porukom koja sadrži ime modela, cijenu i link.

## Privremene slike

Dok ne stignu prave fotografije, koristi se `node scripts/make-placeholders.mjs` koji generiše SVG placeholder-e.
Kad ubaciš prave slike, promijeni putanje u `products.ts` (npr. `1.svg` -> `1.jpg`).

## Deploy (Netlify)

1. Poveži GitHub repo na Netlify.
2. Build command: `npm run generate`, publish directory: `.output/public`.
3. Dodaj domen (npr. `.me`).
