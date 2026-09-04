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
| Proizvodi (naočare)                        | `app/data/products.json` (ili /admin) |
| Slike proizvoda                            | `public/images/products/<slug>/` |
| Boje, fontovi                              | `app/assets/css/main.css`     |
| Stranice                                   | `app/pages/`                  |

## Admin panel (dodavanje i izmjena naočara)

1. `npm run dev`
2. Otvori http://localhost:3000/admin
3. Dodaj / izmijeni modele, ubaci slike, klikni **Sačuvaj**.
4. Klikni **Objavi na sajt**: to uradi `git commit` + `git push`, a hosting (Netlify) sam napravi novu verziju sajta.

Admin postoji samo lokalno u dev modu. U produkcijskom build-u ga nema, pa niko sa interneta ne može da mu pristupi.

Podaci se čuvaju u `app/data/products.json`, slike u `public/images/products/<slug>/`.
Možeš ih mijenjati i ručno ako hoćeš: `slug` mora biti jedinstven, mala slova, bez razmaka.

## WhatsApp

U `app/site.config.ts` postavi `whatsappNumber` u međunarodnom formatu bez plusa i razmaka, npr. `38267123456`.
Svako dugme "Naruči" otvara WhatsApp sa gotovom porukom koja sadrži ime modela, cijenu i link.

## Privremene slike

Dok ne stignu prave fotografije, koristi se `node scripts/make-placeholders.mjs` koji generiše SVG placeholder-e.
Kad ubaciš prave slike kroz admin, obriši stare `.svg` slike na modelu (dugme ✕ na slici).

## Deploy (Netlify)

1. Poveži GitHub repo na Netlify.
2. Build command: `npm run generate`, publish directory: `.output/public`.
3. Dodaj domen (npr. `.me`).
