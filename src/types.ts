import type { ImageMetadata } from "astro";
import type { CollectionEntry } from "astro:content";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

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
  tags?: string[];
  author?: string;
  Content?: AstroComponentFactory;
  content?: string;
}

export function collectionEntryToPost(entry: CollectionEntry<"blog">): Post {
  return {
    id: entry.id,
    slug: entry.id,
    publishDate: entry.data.pubDate,
    title: entry.data.title,
    description: entry.data.description,
    image: entry.data.image,
    tags: entry.data.tags,
    author: entry.data.author,
    content: "",
  };
}
