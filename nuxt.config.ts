import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { C } from 'vue-router/dist/index-BQLwgiyK.js'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
   build: {
    transpile: ['vuetify'],
  },
  vite: {
    plugins: [
      
      vuetify({ autoImport: true }),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  runtimeConfig:{
    public:{
      //@ts-ignore
      googleClientId: process.env.NUXT_PUBLICT_GOOGLE_CLIENT_ID
    }
  }
})
