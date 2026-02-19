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
          DEFAULT: "#FF6B35",
          50: "#FFF5F0",
          100: "#FFE6D9",
          200: "#FFCCB3",
          300: "#FFA87A",
          400: "#FF8542",
          500: "#FF6B35",
          600: "#E55A2B",
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
          green: "#1A3C2A",
          "green-light": "#3D5C4A",
          "green-dark": "#0F2818",
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
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
