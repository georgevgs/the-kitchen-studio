# The Kitchen Studio

Website for **The Kitchen Studio** — a custom kitchen furniture studio based in Glyfada, Greece. The site is bilingual (Greek/English), statically generated, and deployed on Vercel.

Live site: [thekitchenstudio.gr](https://www.thekitchenstudio.gr)

---

## Tech Stack

- [Astro](https://astro.build) v7 — static site generator
- [TailwindCSS](https://tailwindcss.com) v4 — styling (via the `@tailwindcss/vite` plugin)
- [astro-i18next](https://github.com/yassinedoghri/astro-i18next) — Greek (default) + English (`/en/`)
- [Embla Carousel](https://www.embla-carousel.com) — image carousels with autoplay
- Deployed on [Vercel](https://vercel.com) (static output, no SSR)

---

## Getting Started

```bash
npm install
npm run dev       # start dev server at localhost:4321
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

> Use `npm`, not `bun` — `package-lock.json` is the source of truth.

---

## Project Structure

```
src/
  pages/            # one .astro file per route (kitchens, bath, doors, etc.)
  pages/en/         # English translations of the same routes
  pages/blog/       # blog index + [slug].astro (renders content collection posts)
  content/blog/     # blog posts as markdown (content collection)
  content.config.ts # content collection schema (glob loader)
  config.ts         # site-wide config (origin, title, meta, keywords)
  layouts/          # page layouts
  components/       # reusable .astro components
  assets/           # images and other build-processed assets
public/             # served as-is (fonts, icons, etc.)
astro-i18next.config.ts   # i18n namespace/language config
tailwind.config.cjs       # Tailwind theme
```

### Pages

| Route | Description |
|---|---|
| `/` | Home |
| `/kitchens` | Kitchen collections |
| `/bath` | Bathroom furniture |
| `/doors` | Doors |
| `/living` | Living room furniture |
| `/tiles` | Tiles |
| `/wardrobes` | Wardrobes |
| `/erga` | Completed projects |
| `/meletes` | Design studies |
| `/showroom` | Showroom info |
| `/blog` | Articles |
| `/contact` | Contact |
| `/about-us` | About |

All routes also available under `/en/` for English.

---

## i18n

Greek is the default language (no prefix). English lives under `/en/`. Translation strings are managed via `astro-i18next` — add new keys in the appropriate namespace files.

---

## Content

Blog posts are markdown files in `src/content/blog/`, managed as an Astro **content collection** (schema in `src/content.config.ts`, loaded with the `glob()` loader). Add a new post by creating a `.md` file there with frontmatter matching the existing posts — the English version uses an `-en` filename suffix. Posts are rendered by `src/pages/blog/[slug].astro`.

---

## Deployment

Pushes to `main` deploy automatically via Vercel. `vercel.json` handles any routing config. Build output goes to `dist/` (static files only, no server functions).
