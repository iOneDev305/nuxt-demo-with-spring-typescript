// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  // devtools: { enabled: true },

  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
      API_KEY: process.env.API_KEY,
    },
  },
  
  vite: {
    server: {
      proxy: {
        '/api': {
          target: process.env.BASE_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''), 
        },
      },
    },
  },
})
