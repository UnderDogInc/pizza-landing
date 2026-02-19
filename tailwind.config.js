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
        primary: {
          DEFAULT: "#FB5E08",
          50: "#FFF5F0",
          100: "#FFE6D9",
          200: "#FFCCB3",
          300: "#FFA87A",
          400: "#FF8542",
          500: "#FB5E08",
          600: "#E55507",
          700: "#C44806",
          800: "#9E3A05",
          900: "#782D04",
          950: "#4A1C02",
        },
        secondary: "#F9F9F9",
        dark: {
          DEFAULT: "#2A2A2A",
          50: "#F5F5F5",
          100: "#E5E5E5",
          200: "#CCCCCC",
          300: "#A3A3A3",
          400: "#737373",
          500: "#525252",
          600: "#404040",
          700: "#363636",
          800: "#2A2A2A",
          900: "#1A1A1A",
          950: "#0D0D0D",
        },
        brand: {
          green: "#2F4A38",
          "green-light": "#3D5C4A",
          "green-dark": "#243830",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        caveat: ["Caveat", "cursive"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
