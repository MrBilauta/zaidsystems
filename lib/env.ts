import { z } from "zod";

/**
 * Global Environment Validation
 * Ensures the platform never starts with missing critical credentials.
 */

const envSchema = z.object({
  // Core
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().url(),
  
  // Auth
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  
  // Security
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string(),
  
  // AI
  OPENAI_API_KEY: z.string().optional(),
  
  // Storage
  CLOUDINARY_URL: z.string().optional(),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
