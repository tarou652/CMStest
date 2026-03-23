import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: true,

  modules: [],

  nitro: {
    prerender: {
      crawlLinks: true,
      concurrency: 10,
    },
  },

  runtimeConfig: {
    microCmsApiKey: process.env.MICROCMS_API_KEY,
    microCmsServiceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  },
});
