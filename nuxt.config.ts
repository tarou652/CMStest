import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: true,

  modules: ["vuetify-nuxt-module"],

  vuetify: {
    moduleOptions: {
      treeshaking: true,
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: "dark",
        themes: {
          dark: {
            colors: {
              primary: "#E53935",
              secondary: "#1E88E5",
              background: "#121212",
              surface: "#1E1E1E",
            },
          },
        },
      },
    },
  },

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
