import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { SITE } from "./src/config.mjs";
import serviceWorker from "astrojs-service-worker";
import astroI18next from "astro-i18next";
import vercel from "@astrojs/vercel";

export default defineConfig({
    site: SITE.origin,
    base: SITE.basePathname,
    trailingSlash: "ignore",
    output: "static",

    adapter: vercel(),

    integrations: [astroI18next(), tailwind({
        applyBaseStyles: false,
    }), sitemap({
        filter: (page) => !page.includes('/404'),
        changefreq: 'weekly',
        priority: 0.7,
    }), mdx(), serviceWorker()],

    vite: {
        plugins: [
            {
                name: "fontawesome-font-display",
                transform(code, id) {
                    if (id.includes("fontawesome-free") && id.includes(".css")) {
                        return code.replace(/font-display:block/g, "font-display:swap");
                    }
                },
            },
        ],
    },
});
