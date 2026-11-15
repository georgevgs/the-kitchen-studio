import type { ImageMetadata } from "astro";
import modernKitchenImage from "~/assets/images/kitchens/modern/modern-kitchen.avif";
import classicKitchenImage from "~/assets/images/kitchens/classic/classic-kitchen-5.avif";
import corianKitchenImage from "~/assets/images/kitchens/corian/corian-kitchen-countertop.avif";
import bathImage from "~/assets/images/bath/furniture/bath-furniture.avif";
import tilesImage from "~/assets/images/tiles/tile.avif";
import wardrobesImage from "~/assets/images/wardrobes/wardrobe.avif";
import doorsImage from "~/assets/images/doors/door-2.avif";
import livingImage from "~/assets/images/living/living.avif";
import bathFurnitureImage from "~/assets/images/bath/furniture/bath-furniture-2.avif";
import corianBathImage from "~/assets/images/bath/corian/corian-bathroom-sink-4.avif";

export interface NavLink {
  labelKey: string;
  href: string;
}

export interface NavCard extends NavLink {
  image: ImageMetadata;
}

export interface FooterGroup {
  titleKey: string;
  links: NavLink[];
}

export const BUSINESS = {
  phoneDisplay: "210 8981423",
  phoneHref: "tel:+302108981423",
  email: "info@thekitchenstudio.gr",
  mapEmbedHref:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12599.46668416214!2d23.7539803!3d37.86341!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bfd2351a4041%3A0xae265f67cd7f7a72!2sThe%20Kitchen%20Studio!5e0!3m2!1sen!2sgr!4v1685711084495!5m2!1sen!2sgr",
  mapsHref: "https://maps.google.com/?q=Γρηγορίου+Λαμπράκη+28+Γλυφάδα",
  instagramHref: "https://www.instagram.com/thekitchenstudiogr/",
  facebookHref: "https://www.facebook.com/kitchenstudio/",
  creditHref: "https://vagdas.eu/",
  morningHours: "10:00–14:00",
  eveningHours: "10:00–14:00 & 17:30–20:30",
};

export const KITCHEN_CARDS: NavCard[] = [
  { labelKey: "nav.modern_kitchens", href: "/kitchens/modern-kitchens", image: modernKitchenImage },
  { labelKey: "nav.classic_kitchens", href: "/kitchens/classic-kitchens", image: classicKitchenImage },
  { labelKey: "nav.corian_kitchens", href: "/kitchens/corian-kitchens", image: corianKitchenImage },
];

export const PRODUCT_CARDS: NavCard[] = [
  { labelKey: "nav.bath", href: "/bath", image: bathImage },
  { labelKey: "nav.tiles", href: "/tiles", image: tilesImage },
  { labelKey: "nav.wardrobes", href: "/wardrobes", image: wardrobesImage },
  { labelKey: "nav.doors", href: "/doors", image: doorsImage },
  { labelKey: "nav.living", href: "/living", image: livingImage },
];

export const BATH_CARDS: NavCard[] = [
  { labelKey: "nav.bath_furniture", href: "/bath/bath-furnitures", image: bathFurnitureImage },
  { labelKey: "nav.corian_bath", href: "/bath/corian-bath", image: corianBathImage },
];

export const STANDALONE_CARDS: NavCard[] = PRODUCT_CARDS.filter((card) => "/bath" !== card.href);

export const PLAIN_LINKS: NavLink[] = [
  { labelKey: "nav.projects", href: "/erga" },
  { labelKey: "nav.studies", href: "/meletes" },
  { labelKey: "nav.showroom", href: "/showroom" },
  { labelKey: "nav.blog", href: "/blog" },
];

export const KITCHEN_CHIPS: NavLink[] = [
  { labelKey: "nav.modern_short", href: "/kitchens/modern-kitchens" },
  { labelKey: "nav.classic_short", href: "/kitchens/classic-kitchens" },
  { labelKey: "nav.corian_short", href: "/kitchens/corian-kitchens" },
];

export const BATH_CHIPS: NavLink[] = [
  { labelKey: "nav.bath_furniture", href: "/bath/bath-furnitures" },
  { labelKey: "nav.corian_bath", href: "/bath/corian-bath" },
];

export const PRODUCT_CHIPS: NavLink[] = [
  { labelKey: "nav.bath_short", href: "/bath" },
  { labelKey: "nav.tiles", href: "/tiles" },
  { labelKey: "nav.wardrobes", href: "/wardrobes" },
  { labelKey: "nav.doors", href: "/doors" },
  { labelKey: "nav.living", href: "/living" },
];

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    titleKey: "nav.kitchens",
    links: [
      { labelKey: "nav.modern_kitchens", href: "/kitchens/modern-kitchens" },
      { labelKey: "nav.classic_kitchens", href: "/kitchens/classic-kitchens" },
      { labelKey: "nav.corian_kitchens", href: "/kitchens/corian-kitchens" },
    ],
  },
  {
    titleKey: "nav.products",
    links: [
      { labelKey: "nav.bath_short", href: "/bath" },
      { labelKey: "nav.tiles", href: "/tiles" },
      { labelKey: "nav.wardrobes", href: "/wardrobes" },
      { labelKey: "nav.living", href: "/living" },
      { labelKey: "nav.doors", href: "/doors" },
    ],
  },
  {
    titleKey: "footer.company",
    links: [
      { labelKey: "nav.about", href: "/about-us" },
      { labelKey: "nav.showroom", href: "/showroom" },
      { labelKey: "nav.projects", href: "/erga" },
      { labelKey: "nav.studies", href: "/meletes" },
      { labelKey: "nav.blog", href: "/blog" },
    ],
  },
];
