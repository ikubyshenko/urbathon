// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    openrouterApiKey: process.env.OPENROUTER_API_KEY || 'OPENROUTER_API_KEY=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',
    public: {
      appName: 'БытМастер',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://skohuburbathon.vercel.app/'
    }
  },
  nitro: {
    preset: 'vercel-edge' // Важно для Vercel
  }
})