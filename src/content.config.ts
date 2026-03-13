import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Define schema for blog posts using Zod
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.date(),
  image: z.string().optional(),
  featured: z.boolean().optional().default(false),
  tags: z.array(z.string()).optional().default([]),
  author: z.string().optional(),
  readingTime: z.number().optional(),
  lang: z.string().optional().default("el"),
});

// Define blog collection with glob loader
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: blogSchema,
});

// Export collections
export const collections = {
  'blog': blogCollection,
};

// Define TypeScript interface that matches the schema
export type BlogFrontmatter = z.infer<typeof blogSchema>;
