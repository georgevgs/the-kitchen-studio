import { defineConfig, squooshImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { SITE } from './src/config.mjs';
import serviceWorker from "astrojs-service-worker";
import astroI18next from "astro-i18next";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  image: {
    service: squooshImageService()
  },
  site: SITE.origin,
  base: SITE.basePathname,
  trailingSlash: "ignore",
  output: 'static',
  integrations: [astroI18next(), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), sitemap(), mdx(), serviceWorker()],
});