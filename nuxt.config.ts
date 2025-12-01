// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    openrouterApiKey: process.env.OPENROUTER_API_KEY || '',
    public: {
      appName: 'Skohub Urbathon',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://skohuburbathon.vercel.app/'
    }
  },
  nitro: {
    preset: 'vercel'
  }
})