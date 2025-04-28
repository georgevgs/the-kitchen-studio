import type { ImageMetadata } from "astro";
import type { CollectionEntry } from "astro:content";

/**
 * SEO Metadata Interface
 */
export interface MetaSEO {
  title?: string;
  description?: string;
  image?: string | ImageMetadata | { src: string; alt: string };
  articlePublishTime?: Date;
  canonicalURL?: string;
  ogType?: 'website' | 'article';
  keywords?: string[] | string;
  author?: string;
  twitterHandle?: string;
  language?: string;
}

/**
 * Site Configuration Interface
 */
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  language: string;
  url: string;
  origin: string;
  basePathname?: string;
  trailingSlash?: string;
  defaultImage?: string;
  defaultTheme?: string;
  textDirection?: string;
  themeColorLight?: string;
  themeColorDark?: string;
  logo?: string;
  twitterHandle?: string;
  keywords?: string[] | string;
  dateFormatter?: Intl.DateTimeFormat;
}

/**
 * Blog Post Interface
 */
export interface Post {
  id: string;
  slug: string;
  publishDate: Date;
  title: string;
  description?: string;
  image?: string | ImageMetadata;
  canonical?: string | URL;
  permalink?: string;
  draft?: boolean;
  excerpt?: string;
  category?: string;
  tags?: Array<string>;
  author?: string;
  Content?: any;
  content?: string;
  // For compatibility with collection entries
  data?: any;
}

/**
 * Blog Post Frontmatter Interface
 */
export interface BlogFrontmatter {
  title: string;
  description?: string;
  pubDate: Date;
  updatedDate?: Date;
  image?: string;
  tags?: string[];
  author?: string;
  readingTime?: string;
  featured?: boolean;
  draft?: boolean;
}

/**
 * Interface for Breadcrumb Items
 */
export interface BreadcrumbItem {
  name: string;
  item: string;
}

/**
 * Helper function to convert CollectionEntry to Post
 */
export function collectionEntryToPost(entry: CollectionEntry<"blog">): Post {
  return {
    id: entry.id,
    slug: entry.slug,
    publishDate: entry.data.pubDate,
    title: entry.data.title,
    description: entry.data.description,
    image: entry.data.image,
    tags: entry.data.tags,
    author: entry.data.author,
    content: "",
    data: entry.data
  };
}
