// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    openrouterApiKey: process.env.OPENROUTER_API_KEY,
    public: {
      appName: 'БытМастер',
      siteUrl: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://skohuburbathon.vercel.app/'
    }
  },
  nitro: {
    preset: 'vercel'
  }
})