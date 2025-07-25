import { defineNuxtConfig } from "nuxt/config";
import Aura from "@primeuix/themes/aura";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@primevue/nuxt-module",
    "@nuxtjs/supabase"
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        mode: "light"
      },
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: ["~/style.css"],
  
});