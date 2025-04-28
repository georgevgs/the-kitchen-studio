import { getCollection, type CollectionEntry } from "astro:content";
import type { BlogFrontmatter } from "../content/config";

/**
 * Format a date into a readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("el-GR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Calculate reading time for a blog post
 * @param content The content of the blog post
 * @returns Reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Get all blog posts, sorted by date
 */
export async function getAllPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog");

  return posts.sort((a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) => {
    const dateA: Date = a.data.pubDate;
    const dateB: Date = b.data.pubDate;
    return dateB.valueOf() - dateA.valueOf();
  });
}

/**
 * Get featured blog posts
 */
export async function getFeaturedPosts(): Promise<CollectionEntry<"blog">[]> {
  const allPosts = await getAllPosts();

  return allPosts.filter((post) => post.data.featured);
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<CollectionEntry<"blog">[]> {
  const allPosts = await getAllPosts();

  return allPosts.filter((post) => {
    if (!post.data.tags) return false;
    return post.data.tags.includes(tag);
  });
}

/**
 * Get all unique tags from blog posts
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();

  const allTags = allPosts.flatMap((post) => post.data.tags || []);

  return [...new Set(allTags)].sort();
}

/**
 * Get related posts based on tags
 */
export async function getRelatedPosts(
  currentPost: CollectionEntry<"blog">,
  limit = 3
): Promise<CollectionEntry<"blog">[]> {
  const allPosts = await getAllPosts();

  // Filter out the current post and posts without tags
  const otherPosts = allPosts.filter(
    (post) => post.id !== currentPost.id && post.data.tags && post.data.tags.length > 0
  );

  // Calculate relevance score based on shared tags
  const scoredPosts = otherPosts
    .map((post) => {
      const currentTags = currentPost.data.tags || [];
      const postTags = post.data.tags || [];

      // Count shared tags
      const sharedTags: string[] = currentTags.filter((tag: string) => postTags.includes(tag));

      return {
        post,
        score: sharedTags.length,
      };
    })
    .filter((item) => item.score > 0) // Only include posts with at least one shared tag
    .sort((a, b) => b.score - a.score) // Sort by relevance score
    .map((item) => item.post);

  return scoredPosts.slice(0, limit);
}
