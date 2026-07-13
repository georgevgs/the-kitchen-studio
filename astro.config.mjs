import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { SITE } from "./src/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
    site: SITE.origin,
    base: SITE.basePathname,
    trailingSlash: "ignore",
    output: "static",

    adapter: vercel(),

    i18n: {
        defaultLocale: "el",
        locales: ["el", "en"],
        routing: {
            prefixDefaultLocale: false,
        },
    },

    integrations: [sitemap({
        filter: (page) => !page.includes('/404'),
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date(),
    }), mdx()],

    vite: {
        plugins: [
            tailwindcss(),
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
