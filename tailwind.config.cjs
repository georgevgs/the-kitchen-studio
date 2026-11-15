const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
      },
      fontFamily: {
        sans: ["var(--aw-font-sans)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
