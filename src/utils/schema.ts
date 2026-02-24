import type { ImageMetadata } from "astro";
import type { Post, SiteConfig, MetaSEO } from "../types";

/**
 * Business information interface
 */
export interface BusinessInfo {
  name: string;
  url: string;
  logo?: string | ImageMetadata;
  description?: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
    addressRegion?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  telephone: string;
  email?: string;
  openingHours?: Array<{
    dayOfWeek: string[] | string;
    opens: string;
    closes: string;
  }>;
  priceRange?: string;
}

/**
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
  name: string;
  item: string;
}

/**
 * Kitchen display/showroom item interface
 */
export interface KitchenDisplayInfo {
  name: string;
  description: string;
  image?: string | ImageMetadata;
  url: string;
  category: string;
  brand?: string;
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
 * Generate JSON-LD schema for a blog post
 * Added flexibility to handle different post formats
 */
export function generateBlogPostSchema(
  post: Partial<Post>,
  url: string,
  siteInfo: Partial<SiteConfig>
): Record<string, any> {
  // Handle both publishDate and pubDate for flexibility
  const publishDate = post.publishDate || (post as any).pubDate;
  const postUrl = post.permalink || `${siteInfo.url}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title || "",
    "description": post.description || post.excerpt || "",
    "image": post.image ? {
      "@type": "ImageObject",
      "url": getImageUrl(post.image, siteInfo.url || ""),
      "width": 1200,
      "height": 630
    } : undefined,
    "datePublished": publishDate ? publishDate.toISOString() : new Date().toISOString(),
    "dateModified": publishDate ? publishDate.toISOString() : new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author || siteInfo.name || ""
    },
    "publisher": {
      "@type": "Organization",
      "name": siteInfo.name || "",
      "logo": siteInfo.logo ? {
        "@type": "ImageObject",
        "url": getImageUrl(siteInfo.logo, siteInfo.url || "")
      } : undefined
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "url": postUrl,
    "keywords": post.tags?.join(", ") || "",
    "articleSection": post.category || ""
  };
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  siteUrl = "https://thekitchenstudio.gr"
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
export function generateWebsiteSchema(siteInfo: Partial<SiteConfig>): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteInfo.name || "",
    "url": siteInfo.url || siteInfo.origin || "",
    "description": siteInfo.description || "",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteInfo.url || siteInfo.origin || ""}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate local business schema
 */
export function generateLocalBusinessSchema(
  businessInfo: BusinessInfo
): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "HomeGoodsStore",
    "name": businessInfo.name,
    "url": businessInfo.url,
    "logo": businessInfo.logo ? getImageUrl(businessInfo.logo, businessInfo.url) : undefined,
    "description": businessInfo.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessInfo.address.streetAddress,
      "addressLocality": businessInfo.address.addressLocality,
      "postalCode": businessInfo.address.postalCode,
      "addressCountry": businessInfo.address.addressCountry,
      "addressRegion": businessInfo.address.addressRegion
    },
    ...(businessInfo.geo ? {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": businessInfo.geo.latitude,
        "longitude": businessInfo.geo.longitude
      }
    } : {}),
    "telephone": businessInfo.telephone,
    ...(businessInfo.email ? { "email": businessInfo.email } : {}),
    "openingHoursSpecification": businessInfo.openingHours || [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "15:00"
      }
    ],
    "priceRange": businessInfo.priceRange || "€€€"
  };
}

/**
 * Generate kitchen display schema - better than product schema for showroom items
 */
export function generateKitchenDisplaySchema(
  item: KitchenDisplayInfo,
  siteUrl = "https://thekitchenstudio.gr"
): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": item.name,
    "description": item.description,
    "image": item.image ? getImageUrl(item.image, siteUrl) : undefined,
    "url": `${siteUrl}${item.url}`,
    "keywords": [item.category, "kitchen", "kitchen design", "interior design", item.brand].filter(Boolean).join(", ")
  };
}
