# The Kitchen Studio

Website for The Kitchen Studio, a custom kitchen furniture studio in Glyfada. Greek and English, static, hosted on Vercel.

Live: [thekitchenstudio.gr](https://www.thekitchenstudio.gr)

## Run it

```bash
npm install
npm run dev       # localhost:4321
npm run build     # static output in dist/
npm run preview
```

Use npm, not bun. `package-lock.json` is the lockfile that counts.

## Stack

Astro 7, Tailwind 4 (through `@tailwindcss/vite`), Inter via fontsource. No UI framework, the few scripts live in `src/js/`.

## Where things are

```
src/pages/          one file per route, Greek at the root
src/pages/en/       the same routes in English
src/components/     page widgets and shared pieces
src/content/blog/   blog posts in markdown
src/i18n/           el.json, en.json and the t() helper
src/assets/images/  photos, one folder per collection
src/data.ts         business details, nav and footer links
src/config.ts       site title, origin, default meta
```

## Translations

Greek has no URL prefix, English lives under `/en/`. Strings are in `src/i18n/el.json` and `src/i18n/en.json`, add every key to both. Pages call `changeLanguage()` in their frontmatter, then `t("key")` reads the right file.

## Blog

Add a markdown file to `src/content/blog/` with the same frontmatter as the existing posts. The English version gets an `-en` suffix, for example `nisida-kouzinas-en.md`. The schema is in `src/content.config.ts`.

## Gallery images

The `erga`, `meletes`, `showroom` and `wardrobes` folders are read automatically. Name a new `.avif` like the others (`erga-59.avif`), it is sorted by its number. Erga shows the newest first.

## Deploy

Push to `main`. Vercel builds and deploys it, this uses no GitHub Actions minutes. `vercel.json` holds the security and cache headers.
