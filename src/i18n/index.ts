import el from "./el.json";
import en from "./en.json";

export const LOCALES = ["el", "en"] as const;
type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "el";

const translations: Record<Locale, unknown> = { el, en };

// Build-time only: every page must call changeLanguage() in its frontmatter
// before any t()/localizePath() call (Astro builds pages one at a time).
let currentLocale: Locale = DEFAULT_LOCALE;

export function changeLanguage(locale: Locale): void {
  currentLocale = locale;
}

function lookup(locale: Locale, key: string): string | undefined {
  let node: unknown = translations[locale];
  for (const part of key.split(".")) {
    if (typeof node !== "object" || node === null) return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === "string" ? node : undefined;
}

export function t(key: string): string {
  return lookup(currentLocale, key) ?? lookup(DEFAULT_LOCALE, key) ?? key;
}

export function localizePath(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  let normalized = path.startsWith("/") ? path : `/${path}`;
  // Some pages pass already-localized paths into components that localize
  // again; strip any existing locale prefix so it isn't applied twice.
  for (const locale of LOCALES) {
    if (normalized === `/${locale}`) {
      normalized = "/";
      break;
    }
    if (normalized.startsWith(`/${locale}/`)) {
      normalized = normalized.slice(locale.length + 1);
      break;
    }
  }
  if (DEFAULT_LOCALE === currentLocale) {
    return withTrailingSlash(normalized);
  } else {
    return withTrailingSlash(`/${currentLocale}${normalized}`);
  }
}

const withTrailingSlash = (path: string) => {
  if (path.endsWith("/")) {
    return path;
  } else {
    return `${path}/`;
  }
};
