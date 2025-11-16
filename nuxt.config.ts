import checker from 'vite-plugin-checker'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@vueuse/nuxt', '@pinia/nuxt'],
  preset: "cloudflare_module",
  cloudflare: {
    deployConfig: true,
    nodeCompat: true
  },
  vite: {
    plugins: [
      checker({
        overlay: {
          initialIsOpen : false,
        },
        typescript: true,
        vueTsc: true,
        oxlint: true,
        /*
        biome: {
          command: "lint",
        },*/
      }),
    ]
  },
  runtimeConfig: {
    // Private runtime config (only available on server)
    apiSecret: process.env.API_SECRET,
    workosApiKey: process.env.WORKOS_API_KEY,
    
    // Public runtime config (exposed to client)
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3000',
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
      workosClientId: process.env.WORKOS_CLIENT_ID,
    }
  },
  routeRules: {
    // API routes
    '/api/**': { cors: true },
    
    // Static routes with caching
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    
    // SPA fallback for specific routes
    '/admin/**': { ssr: false },
    
    // Redirects
    '/old-page': { redirect: '/new-page' },
    
    // Prerender specific routes
    '/': { prerender: true },
  }
})