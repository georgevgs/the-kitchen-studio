import type { ImageMetadata } from 'astro';

interface ImageModule {
  default: ImageMetadata;
}

type Lang = 'el' | 'en';

/**
 * Descriptive alt text per image collection. Collections not listed here
 * fall back to a cleaned-up filename.
 */
const ALT_TEXT_BY_COLLECTION: Record<string, Record<Lang, string>> = {
  'home-images': {
    el: 'Έπιπλα κουζίνας του The Kitchen Studio στη Γλυφάδα',
    en: 'Kitchen furniture by The Kitchen Studio in Glyfada',
  },
  erga: {
    el: 'Ολοκληρωμένο έργο κουζίνας από το The Kitchen Studio στη Γλυφάδα',
    en: 'Completed kitchen project by The Kitchen Studio in Glyfada',
  },
  meletes: {
    el: '3D μελέτη και σχεδιασμός κουζίνας από το The Kitchen Studio',
    en: '3D kitchen design study by The Kitchen Studio',
  },
  showroom: {
    el: 'Το showroom του The Kitchen Studio στη Γρηγορίου Λαμπράκη 28, Γλυφάδα',
    en: 'The Kitchen Studio showroom at 28 Grigoriou Lampraki, Glyfada',
  },
  wardrobes: {
    el: 'Ντουλάπα υπνοδωματίου στα μέτρα σας από το The Kitchen Studio',
    en: 'Made-to-measure bedroom wardrobe by The Kitchen Studio',
  },
};

/**
 * Extracts number from image filename for sorting
 */
const extractImageNumber = (src: string, prefix: string): number => {
  const regex = new RegExp(`${prefix}-?(\\d+[a-zA-Z]?)`);
  const match = src.match(regex);

  if (match) {
    const [numStr, suffix] = match[1].match(/(\d+)([a-zA-Z])?/) || [];
    const num = parseInt(numStr || '0');

    return suffix ? num + (suffix.charCodeAt(0) - 96) / 10 : num;
  }

  return 0;
};

/**
 * Builds a descriptive alt text for a collection image; falls back to the
 * cleaned-up filename when the collection has no template.
 */
const createAltText = (src: string, prefix: string, lang: Lang, position: number): string => {
  const template = ALT_TEXT_BY_COLLECTION[prefix];

  if (template) {
    const suffix = lang === 'el' ? `φωτογραφία ${position}` : `photo ${position}`;
    return `${template[lang]}, ${suffix}`;
  }

  const filename = src.split('?')[0];
  const baseFilename = filename.split('/').pop()?.replace(/\.[^/.]+$/, '');

  return (baseFilename || `${prefix} image`).replace(/-/g, ' ');
};

/**
 * Sorts image modules based on their numerical suffix
 */
const sortImagesByNumber = (
  imageModules: ImageModule[],
  prefix: string
): ImageModule[] => {
  return [...imageModules].sort((a, b) => {
    const aNum = extractImageNumber(a.default.src, prefix);
    const bNum = extractImageNumber(b.default.src, prefix);

    return aNum - bNum;
  });
};

/**
 * Process images from a specific collection
 */
export const processImagesForCarousel = (
  collectionName: string,
  lang: Lang = 'el'
): { src: ImageMetadata; alt: string }[] => {
  // Using template literal to construct the glob pattern
  const modules = import.meta.glob<ImageModule>('/src/assets/images/*/*.avif', { eager: true });

  // Filter modules to only include those from the requested collection
  const collectionModules = Object.entries(modules).filter(([path]) =>
    path.includes(`/images/${collectionName}/`)
  );

  const modulesArray = collectionModules.map(([_, module]) => module);
  const sortedModules = sortImagesByNumber(modulesArray, collectionName);

  return sortedModules.map((module, index) => ({
    src: module.default,
    alt: createAltText(module.default.src, collectionName, lang, index + 1)
  }));
};
