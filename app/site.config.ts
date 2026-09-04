/**
 * Podaci o radnji. Ovdje mijenjaš broj telefona, adresu, radno vrijeme itd.
 * Sve stranice čitaju odavde, pa je dovoljno promijeniti na jednom mjestu.
 */
export const site = {
  name: 'VueSunglasses',
  tagline: 'Naočare za sunce po cijenama direktno od uvoznika',
  description:
    'Porodična radnja za naočare za sunce u Crnoj Gori. UV400 zaštita, provjereni modeli, cijene bez posrednika. Naruči preko WhatsApp-a.',

  // Broj u međunarodnom formatu BEZ plusa, razmaka i crtica. Primjer za CG: 38267123456
  whatsappNumber: '38267000000',

  phoneDisplay: '+382 67 000 000',
  email: 'info@vuesunglasses.me',
  instagram: 'https://instagram.com/vuesunglasses',
  facebook: '',

  address: 'Podgorica, Crna Gora',
  workingHours: 'Pon-Sub: 09:00-20:00',

  currency: '€',

  // Preuzimanje i dostava
  delivery: {
    pickup: 'Lično preuzimanje u Podgorici',
    shipping: 'Dostava poštom u cijeloj Crnoj Gori (plaćanje pouzećem)',
    shippingPrice: 3,
    freeShippingFrom: 50,
  },
}

export type SiteConfig = typeof site
