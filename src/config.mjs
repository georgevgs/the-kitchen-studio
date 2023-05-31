import defaultImage from './assets/images/default.png';

const CONFIG = {
  name: 'The Kitchen Studio',

  origin: 'https://thekitchenstudio.gr',
  basePathname: '/',
  trailingSlash: false,

  title: 'The Kitchen Studio',
  description:
    'Σχεδιάζουμε την κουζίνα στα μέτρα σας',
  defaultImage: defaultImage,

  defaultTheme: 'system', // Values: "system" | "light" | "dark" | "light:only" | "dark:only"

  language: 'el',
  textDirection: 'ltr',

  dateFormatter: new Intl.DateTimeFormat('el', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }),

  googleAnalyticsId: false, // or "G-XXXXXXXXXX",
  googleSiteVerificationId: 'orcPxI47GSa-cRvY11tUe6iGg2IO_RPvnA1q95iEM3M',
};

export const SITE = { ...CONFIG };
export const DATE_FORMATTER = CONFIG.dateFormatter;
