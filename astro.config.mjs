import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, squooshImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import partytown from "@astrojs/partytown";
import { SITE } from './src/config.mjs';
import serviceWorker from "astrojs-service-worker";
import astroI18next from "astro-i18next";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const whenExternalScripts = (items = []) =>
  SITE.googleAnalyticsId
    ? Array.isArray(items)
      ? items.map((item) => item())
      : [items()]
    : [];

// https://astro.build/config
export default defineConfig({
  image: {
    service: squooshImageService(),
  },
  site: SITE.origin,
  base: SITE.basePathname,
  trailingSlash: "ignore",
  output: "static",
  integrations: [
    astroI18next(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sitemap(),
    mdx(),
    ...whenExternalScripts(() =>
      partytown({
        config: {
          forward: ["dataLayer.push"],
        },
      })
    ),
    serviceWorker(),
  ],
  markdown: {},
  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  },
});