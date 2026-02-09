/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app.vue",
    "./components/**/*.{js,vue,ts}",
    "./composables/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./shared/**/*.{js,vue,ts}",
    "./features/**/*.{js,vue,ts}",
    "./entities/**/*.{js,vue,ts}",
    "./widgets/**/*.{js,vue,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FB5E08",
        secondary: "#F9F9F9",
        dark: "#2A2A2A",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        caveat: ["Caveat", "cursive"],
      },
    },
  },
  plugins: [],
};


