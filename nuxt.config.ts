import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@primevue/nuxt-module", "@nuxt/image", "@vueuse/nuxt"],

  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    },
  },

  css: ["~/assets/styles/main.scss"],

  app: {
    head: {
      htmlAttrs: { lang: "ru" },
      title: "pepe app",
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Inter:wght@100..900&display=swap",
        },
        { rel: "icon", href: "/favicon/favicon.ico", sizes: "any" },
        { rel: "icon", href: "/favicon/favicon.svg", type: "image/svg+xml" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/favicon/favicon-96x96.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicon/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/favicon/site.webmanifest" },
      ],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" },
      ],
    },
  },

  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL || "https://jsonplaceholder.typicode.com",
    },
  },

  devServer: {
    port: 8080,
  },

  tailwindcss: {
    configPath: "tailwind.config.js",
    config: {
      content: [
        "./app.vue",
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./shared/**/*.{js,vue,ts}",
        "./features/**/*.{js,vue,ts}",
        "./entities/**/*.{js,vue,ts}",
        "./widgets/**/*.{js,vue,ts}",
      ],
    },
  },

  image: {
    format: ["webp", "avif"],
    quality: 80,
  },

  alias: {
    "#entities": "~/entities",
    "#features": "~/features",
    "#widgets": "~/widgets",
  },
});