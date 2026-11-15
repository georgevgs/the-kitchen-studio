import type { ImageMetadata } from "astro";
import type { Post } from "../types";
import type { SiteConfig } from "../config";

const SITE_URL = "https://www.thekitchenstudio.gr";
const BUSINESS_ID = `${SITE_URL}/#business`;
const LOGO_URL = `${SITE_URL}/assets/logo/the-kitchen-studio-logo.png`;

interface BreadcrumbItem {
  name: string;
  item: string;
}

/**
 * Helper function to get image URL from different types
 */
export function getImageUrl(
  image: string | ImageMetadata | { src: string; alt: string } | undefined,
  baseUrl: string
): string | undefined {
  if (!image) {
    return undefined;
  }

  // Handle imported images (ImageMetadata objects)
  if (typeof image === 'object' && 'src' in image) {
    return new URL(image.src, baseUrl).toString();
  }

  // Handle string URLs
  if (typeof image === 'string') {
    // Check if it's already an absolute URL
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
    // Otherwise, it's a relative URL
    return `${baseUrl}${image}`;
  }

  return undefined;
}

/**
 * Canonical business entity for the whole site. Every other schema references
 * it via its @id, so it must be rendered on every page (done in MetaTags).
 */
export function generateLocalBusinessSchema(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": BUSINESS_ID,
    name: "The Kitchen Studio",
    alternateName: "The Kitchen Studio Glyfada",
    url: SITE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    telephone: "+302108981423",
    email: "info@thekitchenstudio.gr",
    foundingDate: "2000",
    sameAs: [
      "https://www.instagram.com/thekitchenstudiogr/",
      "https://www.facebook.com/kitchenstudio/",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Γρηγορίου Λαμπράκη 28",
      addressLocality: "Γλυφάδα",
      addressRegion: "Αττική",
      postalCode: "16674",
      addressCountry: "GR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.86350802540611,
      longitude: 23.754075789949074,
    },
    areaServed: [
      { "@type": "City", name: "Γλυφάδα", alternateName: "Glyfada" },
      { "@type": "City", name: "Βούλα", alternateName: "Voula" },
      { "@type": "City", name: "Βουλιαγμένη", alternateName: "Vouliagmeni" },
      { "@type": "City", name: "Βάρκιζα", alternateName: "Varkiza" },
      { "@type": "City", name: "Ελληνικό", alternateName: "Elliniko" },
      { "@type": "City", name: "Άλιμος", alternateName: "Alimos" },
      { "@type": "City", name: "Παλαιό Φάληρο", alternateName: "Palaio Faliro" },
      { "@type": "City", name: "Αργυρούπολη", alternateName: "Argyroupoli" },
      {
        "@type": "AdministrativeArea",
        name: "Νότια Προάστια Αθήνας",
        alternateName: "Southern Suburbs of Athens",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "14:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Thursday", "Friday"],
        opens: "17:30",
        closes: "20:30",
      },
    ],
    knowsAbout: [
      "Έπιπλα κουζίνας",
      "Ανακαίνιση κουζίνας",
      "Κουζίνες Corian",
      "Έπιπλα μπάνιου",
      "Ντουλάπες υπνοδωματίου",
      "3D σχεδιασμός κουζίνας",
      "Πλακάκια",
      "Εσωτερικές πόρτες",
    ],
  };
}

/**
 * Generate JSON-LD schema for a blog post
 */
export function generateBlogPostSchema(
  post: Partial<Post>,
  url: string,
  siteInfo: Partial<SiteConfig>,
  lang: "el" | "en" = "el"
): Record<string, any> {
  const publishDate = post.publishDate || (post as any).pubDate;
  const siteUrl = siteInfo.origin || SITE_URL;

  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title || "",
    "description": post.description ?? "",
    "image": post.image ? {
      "@type": "ImageObject",
      "url": getImageUrl(post.image, siteUrl),
      "width": 1200,
      "height": 630
    } : undefined,
    "datePublished": publishDate ? publishDate.toISOString() : new Date().toISOString(),
    "dateModified": publishDate ? publishDate.toISOString() : new Date().toISOString(),
    "inLanguage": lang,
    "author": {
      "@type": "Organization",
      "@id": BUSINESS_ID,
      "name": post.author || siteInfo.name || "The Kitchen Studio"
    },
    "publisher": {
      "@type": "Organization",
      "@id": BUSINESS_ID,
      "name": siteInfo.name || "The Kitchen Studio",
      "logo": {
        "@type": "ImageObject",
        "url": LOGO_URL
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "url": url,
  };

  if (post.tags?.length) {
    schema.keywords = post.tags.join(", ");
  }

  return schema;
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  siteUrl = SITE_URL
): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteUrl}${item.item}`
    }))
  };
}

/**
 * Generate website schema
 */
export function generateWebsiteSchema(
  siteInfo: Partial<SiteConfig>,
  language = "el"
): Record<string, any> {
  const isEnglish = language.startsWith("en");
  const siteUrl = siteInfo.origin || SITE_URL;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "name": siteInfo.name || "The Kitchen Studio",
    "url": siteUrl,
    "description": isEnglish
      ? "Custom kitchen furniture designed and built to measure in Glyfada, Athens."
      : "Εξατομικευμένα έπιπλα κουζίνας, σχεδιασμένα και κατασκευασμένα στα μέτρα σας στη Γλυφάδα.",
    "inLanguage": isEnglish ? "en" : "el",
    "publisher": { "@id": BUSINESS_ID },
  };
}

/**
 * Generate an ItemList schema for hub pages (kitchens, bath) linking to
 * their category pages.
 */
export function generateItemListSchema(
  items: { name: string; description?: string; url: string; image?: string | ImageMetadata }[],
  siteUrl = SITE_URL
): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...(item.description && { "description": item.description }),
      ...(item.image && { "image": getImageUrl(item.image, siteUrl) }),
      "url": `${siteUrl}${item.url}`,
    })),
  };
}

/**
 * Generate a Service schema for category pages, provided by the business.
 */
export function generateServiceSchema(
  service: { name: string; description: string; url: string; serviceType?: string },
  siteUrl = SITE_URL
): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "url": `${siteUrl}${service.url}`,
    ...(service.serviceType && { "serviceType": service.serviceType }),
    "provider": { "@id": BUSINESS_ID },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Νότια Προάστια Αθήνας",
      "alternateName": "Southern Suburbs of Athens",
    },
  };
}

/**
 * Generate a ContactPage schema pointing at the business entity.
 */
export function generateContactPageSchema(
  lang: "el" | "en" = "el",
  siteUrl = SITE_URL
): Record<string, any> {
  const isEnglish = lang === "en";

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": isEnglish ? "Contact The Kitchen Studio" : "Επικοινωνία με το The Kitchen Studio",
    "url": isEnglish ? `${siteUrl}/en/contact` : `${siteUrl}/contact`,
    "inLanguage": lang,
    "mainEntity": { "@id": BUSINESS_ID },
  };
}
