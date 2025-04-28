import defaultImage from "./assets/images/the-kitchen-studio-logo.png";

const CONFIG = {
  name: "The Kitchen Studio",

  origin: "https://www.thekitchenstudio.gr",
  basePathname: "/",
  trailingSlash: "",

  title: "The Kitchen Studio",
  description: "Σχεδιάζουμε την κουζίνα στα μέτρα σας. Εξατομικευμένα έπιπλα κουζίνας στη Γλυφάδα για λειτουργικότητα, ποιότητα και στυλ που ανταποκρίνονται στις ανάγκες σας.",
  defaultImage: defaultImage,

  defaultTheme: "system", // Values: "system" | "light" | "dark" | "light:only" | "dark:only"

  language: "el",
  textDirection: "ltr",

  dateFormatter: new Intl.DateTimeFormat("el", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }),

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

export const SITE = { ...CONFIG };
export const DATE_FORMATTER = CONFIG.dateFormatter;
