import type { ImageMetadata } from "astro";
import { t } from "~/i18n";
import modernKitchenLake from "~/assets/images/kitchens/modern/modern-kitchen-15.avif";
import projectGlassCabinets from "~/assets/images/erga/erga-53.avif";
import italianKitchenWarm from "~/assets/images/home-images/italian-kitchen-home-4.avif";
import modernKitchenIsland from "~/assets/images/kitchens/modern/modern-kitchen-5.avif";
import wardrobeGlass from "~/assets/images/wardrobes/wardrobe-10.avif";
import modernKitchenDark from "~/assets/images/kitchens/modern/modern-kitchen-6.avif";
import projectWoodKitchen from "~/assets/images/erga/erga-13.avif";
import italianKitchenGarden from "~/assets/images/home-images/italian-kitchen-home-2.avif";
import modernKitchenGold from "~/assets/images/kitchens/modern/modern-kitchen-16.avif";
import italianKitchenPlants from "~/assets/images/home-images/italian-kitchen-home-3.avif";

const SLIDES: { src: ImageMetadata; altKey: string }[] = [
  { src: modernKitchenLake, altKey: "home.hero.slide_alt_kitchen" },
  { src: projectGlassCabinets, altKey: "home.hero.slide_alt_project" },
  { src: italianKitchenWarm, altKey: "home.hero.slide_alt_kitchen" },
  { src: modernKitchenIsland, altKey: "home.hero.slide_alt_kitchen" },
  { src: wardrobeGlass, altKey: "home.hero.slide_alt_wardrobe" },
  { src: modernKitchenDark, altKey: "home.hero.slide_alt_kitchen" },
  { src: projectWoodKitchen, altKey: "home.hero.slide_alt_project" },
  { src: italianKitchenGarden, altKey: "home.hero.slide_alt_kitchen" },
  { src: modernKitchenGold, altKey: "home.hero.slide_alt_kitchen" },
  { src: italianKitchenPlants, altKey: "home.hero.slide_alt_kitchen" },
];

export const heroSlides = (): { src: ImageMetadata; alt: string }[] =>
  SLIDES.map((slide) => ({ src: slide.src, alt: t(slide.altKey) }));
