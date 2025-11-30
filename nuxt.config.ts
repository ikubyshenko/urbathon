// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    openrouterApiKey: process.env.OPENROUTER_API_KEY,
    public: {
      appName: 'Бытовой AI Помощник',
      siteUrl: 'http://localhost:3000'
    }
  }
})