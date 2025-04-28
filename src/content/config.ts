import { defineCollection, z } from 'astro:content';

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
});

// Define blog collection with schema
const blogCollection = defineCollection({
  type: 'content',
  schema: blogSchema,
});

// Export collections
export const collections = {
  'blog': blogCollection,
};

// Define TypeScript interface that matches the schema
export type BlogFrontmatter = z.infer<typeof blogSchema>;
