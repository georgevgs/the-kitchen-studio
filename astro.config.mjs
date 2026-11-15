import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { SITE } from "./src/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
    site: SITE.origin,
    base: SITE.basePathname,
    trailingSlash: "always",
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

    build: {
        // Inline all CSS to eliminate render-blocking stylesheet requests
        inlineStylesheets: "always",
    },

    vite: {
        plugins: [tailwindcss()],
        build: {
            // Never inline fonts as data: URIs. The production CSP (vercel.json)
            // sets `font-src 'self'`, which blocks data: fonts — emitting them as
            // same-origin /_astro/*.woff2 files keeps the CSP strict and the fonts
            // rendering. Everything else keeps Vite's default size-based inlining.
            assetsInlineLimit(filePath) {
                if (/\.(woff2?|ttf|otf|eot)$/i.test(filePath)) return false;
                return undefined;
            },
        },
    },
});
