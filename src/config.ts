import type { ImageMetadata } from "astro";
import defaultImage from "./assets/images/the-kitchen-studio-logo.png";

export interface SiteConfig {
  name: string;
  origin: string;
  basePathname: string;
  title: string;
  description: string;
  defaultImage: ImageMetadata;
  defaultTheme: "system" | "light" | "dark" | "light:only" | "dark:only";
  language: string;
  keywords: string[];
}

const CONFIG: SiteConfig = {
  name: "The Kitchen Studio",

  origin: "https://www.thekitchenstudio.gr",
  basePathname: "/",

  title: "The Kitchen Studio",
  description: "Σχεδιάζουμε την κουζίνα στα μέτρα σας. Εξατομικευμένα έπιπλα κουζίνας στη Γλυφάδα για λειτουργικότητα, ποιότητα και στυλ που ανταποκρίνονται στις ανάγκες σας.",
  defaultImage: defaultImage,

  defaultTheme: "system",

  language: "el",

  keywords: [
    'κουζίνες',
    'έπιπλα κουζίνας',
    'σχεδιασμός κουζίνας',
    'ανακαίνιση κουζίνας',
    'kitchen design',
    'kitchen furniture',
    'ντουλάπια κουζίνας',
    'μοντέρνες κουζίνες',
    'κλασικές κουζίνες',
    'κουζίνες γλυφάδα',
    'επιπλα κουζίνας γλυφάδα',
  ],
};

export const SITE = CONFIG;
