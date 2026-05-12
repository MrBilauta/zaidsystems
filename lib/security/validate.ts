import { z } from "zod";

/**
 * Enterprise Validation Schemas
 */

export const PostSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string().min(5).max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().min(20).max(300),
  content: z.string().min(50),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  featured: z.boolean().default(false),
  metaTitle: z.string().max(70).optional().nullable(),
  metaDescription: z.string().max(160).optional().nullable(),
});

export const ProjectSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string().min(2).max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().max(500),
  content: z.string().optional().nullable(),
  image: z.string().url().optional().nullable(),
  githubUrl: z.string().url().optional().nullable(),
  liveUrl: z.string().url().optional().nullable(),
  techStack: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  visibility: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const SiteSettingsSchema = z.object({
  siteName: z.string().optional(),
  siteDescription: z.string().optional(),
  siteUrl: z.string().url().optional().or(z.literal("")),
  ogImage: z.string().optional(),
  maintenanceMode: z.boolean().default(false),
  authorName: z.string().optional(),
  authorRole: z.string().optional(),
  gaMeasurementId: z.string().optional(),
  robotsTxt: z.string().optional(),
  customHead: z.string().optional(),
  socialLinks: z.record(z.string(), z.any()).optional(),
  visibility: z.record(z.string(), z.any()).optional(),
});

export const AiGenerationSchema = z.object({
  action: z.string(),
  context: z.record(z.string(), z.any()),
});

export const CreatePostSchema = PostSchema.omit({ id: true });
export const UpdatePostSchema = PostSchema;
export const CreateProjectSchema = ProjectSchema.omit({ id: true });
export const UpdateProjectSchema = ProjectSchema;
export const UpdateSiteSettingsSchema = SiteSettingsSchema;
export const AiGenerateSchema = AiGenerationSchema;
