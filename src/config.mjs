import defaultImage from "./assets/images/the-kitchen-studio-logo.png";

const CONFIG = {
  name: "The Kitchen Studio",

  origin: "https://www.thekitchenstudio.gr",
  basePathname: "/",
  trailingSlash: false,

  title: "The Kitchen Studio",
  description: "Σχεδιάζουμε την κουζίνα στα μέτρα σας",
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

  googleAnalyticsId: "G-80QQFP5723",
  googleSiteVerificationId: "",
};

export const SITE = { ...CONFIG };
export const DATE_FORMATTER = CONFIG.dateFormatter;
