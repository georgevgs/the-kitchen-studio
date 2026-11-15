import type { ImageMetadata } from "astro";
import type { CollectionEntry } from "astro:content";

export interface MetaSEO {
  title?: string;
  description?: string;
  image?: string | ImageMetadata | { src: string; alt: string };
  articlePublishTime?: Date;
  canonicalURL?: string;
  ogType?: 'website' | 'article';
  keywords?: string[] | string;
  author?: string;
  dontUseTitleTemplate?: boolean;
  language?: string;
  noindex?: boolean;
}

export interface Post {
  publishDate: Date;
  title: string;
  description?: string;
  image?: string | ImageMetadata;
  tags?: string[];
  author?: string;
}

export function collectionEntryToPost(entry: CollectionEntry<"blog">): Post {
  return {
    publishDate: entry.data.pubDate,
    title: entry.data.title,
    description: entry.data.description,
    image: entry.data.image,
    tags: entry.data.tags,
    author: entry.data.author,
  };
}
