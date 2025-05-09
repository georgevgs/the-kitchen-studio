import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { SITE } from "./src/config.mjs";
import serviceWorker from "astrojs-service-worker";
import astroI18next from "astro-i18next";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";

import partytown from "@astrojs/partytown";

export default defineConfig({
    site: SITE.origin,
    base: SITE.basePathname,
    trailingSlash: "ignore",
    output: "static",

    adapter: vercel(),

    integrations: [astroI18next(), tailwind({
        applyBaseStyles: false,
    }), sitemap(), mdx(), serviceWorker(), react(), partytown()],
});
