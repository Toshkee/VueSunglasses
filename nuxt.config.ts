import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'sr-Latn-ME' },
      titleTemplate: '%s | VueSunglasses',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0a0a0a' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
        },
      ],
    },
  },

  // Static site: `npm run generate` outputs plain HTML for Netlify / Vercel / GitHub Pages
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      ignore: ['/admin', '/api/admin'],
    },
  },

  // Admin panel (/admin + /api/admin/*) postoji samo u dev modu.
  // U produkcijskom build-u se ti fajlovi uopšte ne uključuju.
  $production: {
    ignore: ['app/pages/admin/**', 'app/layouts/admin.vue', 'server/api/admin/**', 'server/utils/admin.ts'],
  },
})
