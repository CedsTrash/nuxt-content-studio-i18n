// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },

  modules: ['@nuxt/content', '@nuxtjs/i18n', '@nuxt/eslint', 'nuxt-studio'],

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  i18n: {
    locales: [
      { code: 'fr', name: 'Français', file: 'fr.json', dir: 'ltr' },
      { code: 'es', name: 'Español', file: 'es.json', dir: 'ltr' },
      { code: 'ar', name: 'العربية', file: 'ar.json', dir: 'rtl' },
      { code: 'it', name: 'Italiano', file: 'it.json', dir: 'ltr' },
      { code: 'de', name: 'Deutsch', file: 'de.json', dir: 'ltr' }
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  content: {
    // Nuxt Content configuration
  },

  app: {
    head: {
      title: 'Khamlia Association',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Association Khamlia - Supporting the Gnawa community in the Sahara desert of Morocco' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Google Fonts for Arabic and Latin text
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap' }
      ]
    }
  },

  typescript: {
    strict: true,
    typeCheck: true
  },

  nitro: {
    storage: {
      data: {
        driver: 'fs',
        base: './.data'
      }
    }
  }
})