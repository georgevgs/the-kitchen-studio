import type { AstroI18nextConfig } from "astro-i18next";

const config: AstroI18nextConfig = {
  defaultLocale: "el",
  locales: ["el", "en"],
  i18nextServer: {
    debug: true,
  },
};

export default config;
