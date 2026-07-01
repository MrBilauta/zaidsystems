import { prisma } from "@/lib/db/client";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface UnifiedPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  status: string;
  date: Date;
  readTime?: string;
  featured?: boolean;
}

/**
 * Enterprise Content Service — Blog Posts
 * Source-agnostic retrieval (DB with MDX fallback for legacy content).
 * Built for resilience: Fail-safe against database connectivity issues during build.
 */

export async function getAllPosts(): Promise<UnifiedPost[]> {
  let dbPosts: UnifiedPost[] = [];

  // 1. Database Posts (Resilient Fetch)
  try {
    const dbPostsRaw = await prisma.post.findMany({
      where: { status: "PUBLISHED", deletedAt: null },
      orderBy: { publishedAt: "desc" },
    });

    dbPosts = dbPostsRaw.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      content: p.content,
      category: p.category,
      tags: p.tags,
      status: p.status,
      date: p.publishedAt || p.createdAt,
      featured: p.featured,
    }));
  } catch (error) {
    console.warn("[ContentService] DB fetch failed, falling back to static content. (Expected during build/offline).");
  }

  // 2. MDX Posts (Legacy/Static)
  let mdxPosts: UnifiedPost[] = [];
  try {
    if (fs.existsSync(BLOG_DIR)) {
      const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
      mdxPosts = files.map((filename) => {
        const filePath = path.join(BLOG_DIR, filename);
        const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
        const slug = filename.replace(/\.mdx?$/, "");
        return {
          id: slug,
          title: String(data.title || slug),
          slug,
          description: String(data.description || ""),
          content,
          category: String(data.category || "Engineering"),
          tags: Array.isArray(data.tags) ? data.tags : [],
          status: "PUBLISHED",
          date: data.date ? new Date(String(data.date)) : new Date(),
          featured: Boolean(data.featured),
        };
      });
    }
  } catch (error) {
    console.error("[ContentService] MDX fetch failed:", error);
  }

  // 3. Merge (DB takes precedence on slug conflicts)
  const dbSlugs = new Set(dbPosts.map((p) => p.slug));
  const merged = [...dbPosts, ...mdxPosts.filter((p) => !dbSlugs.has(p.slug))];

  return merged.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getPostBySlug(slug: string): Promise<UnifiedPost | null> {
  try {
    const dbPost = await prisma.post.findUnique({
      where: { slug, deletedAt: null },
    });

    if (dbPost) {
      return {
        id: dbPost.id,
        title: dbPost.title,
        slug: dbPost.slug,
        description: dbPost.description,
        content: dbPost.content,
        category: dbPost.category,
        tags: dbPost.tags,
        status: dbPost.status,
        date: dbPost.publishedAt || dbPost.createdAt,
        featured: dbPost.featured,
      };
    }
  } catch {
    // Ignore DB errors and fall back to MDX
  }

  // Check MDX
  try {
    for (const ext of [".md", ".mdx"]) {
      const filePath = path.join(BLOG_DIR, `${slug}${ext}`);
      if (fs.existsSync(filePath)) {
        const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
        return {
          id: slug,
          title: String(data.title || slug),
          slug,
          description: String(data.description || ""),
          content,
          category: String(data.category || "Engineering"),
          tags: Array.isArray(data.tags) ? data.tags : [],
          status: "PUBLISHED",
          date: data.date ? new Date(String(data.date)) : new Date(),
          featured: Boolean(data.featured),
        };
      }
    }
  } catch {
    // MDX missing
  }

  return null;
}
