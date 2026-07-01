import { prisma } from "@/lib/db/client";

/**
 * Enterprise Content Service — Projects
 * Built for resilience against build-time database connectivity failures.
 */

export interface UnifiedProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string | null;
  image: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  techStack: string[];
  featured: boolean;
  order: number;
}

export async function getAllProjects(): Promise<UnifiedProject[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { visibility: true, deletedAt: null },
      orderBy: { order: "asc" },
    });
    return projects;
  } catch {
    console.warn("[ContentService] Projects fetch failed, returning empty set. (Expected during build/offline).");
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<UnifiedProject | null> {
  try {
    return await prisma.project.findUnique({
      where: { slug, deletedAt: null },
    });
  } catch {
    return null;
  }
}

export async function getFeaturedProjects(): Promise<UnifiedProject[]> {
  try {
    return await prisma.project.findMany({
      where: { featured: true, visibility: true, deletedAt: null },
      orderBy: { order: "asc" },
      take: 6,
    });
  } catch {
    return [];
  }
}
