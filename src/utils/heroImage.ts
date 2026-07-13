// Shared responsive-image settings for the hero background.
// The homepage preload (<link rel="preload" as="image" imagesrcset>) MUST generate
// the exact same variants the Hero <Image> renders, or the browser preloads a URL it
// never uses. Keeping the options here — imported by both — prevents that drift.
export const HERO_IMAGE = {
  widths: [640, 1024, 1440, 1920],
  sizes: "100vw",
  format: "avif" as const,
  quality: 65,
};
