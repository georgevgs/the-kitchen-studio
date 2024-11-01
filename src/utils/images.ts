import type { ImageMetadata } from 'astro';

export interface ImageModule {
  default: ImageMetadata;
}

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
 * Cleans up the image filename to create a proper alt text
 */
const createAltText = (src: string, prefix: string): string => {
  const filename = src.split('?')[0];
  const baseFilename = filename.split('/').pop()?.replace(/\.[^/.]+$/, '');

  return baseFilename || `${prefix} image`;
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
  collectionName: string
): { src: ImageMetadata; alt: string }[] => {
  // Using template literal to construct the glob pattern
  const modules = import.meta.glob<ImageModule>('/src/assets/images/*/*.avif', { eager: true });

  // Filter modules to only include those from the requested collection
  const collectionModules = Object.entries(modules).filter(([path]) =>
    path.includes(`/images/${collectionName}/`)
  );

  const modulesArray = collectionModules.map(([_, module]) => module);
  const sortedModules = sortImagesByNumber(modulesArray, collectionName);

  return sortedModules.map((module) => ({
    src: module.default,
    alt: createAltText(module.default.src, collectionName)
  }));
};
