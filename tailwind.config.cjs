const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--aw-color-primary)",
        secondary: "var(--aw-color-secondary)",
        accent: "var(--aw-color-accent)",
        offwhite: "var(--aw-offwhite-bg-page)",
      },
      fontFamily: {
        sans: ["var(--aw-font-sans)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--aw-font-serif)", ...defaultTheme.fontFamily.serif],
        heading: ["var(--aw-font-heading)", ...defaultTheme.fontFamily.sans],
      },
      objectFit: {
        "scale-down": "scale-down",
      },
      height: {
        128: "32rem",
        152: "38rem",
        "1/3vh": "33vh",
        screenMinusHeader: "calc((var(--vh, 1vh) * 100) - 5.5rem)",
      },
      margin: {
        22: "5.5rem",
      },
      animation: {
        "fade-in": "fade-in 0.5s forwards",
        "slide-in-from-left": "slide-in 0.5s forwards",
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      transitionDelay: {
        150: "150ms",
        300: "300ms",
        450: "450ms",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
