import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Enterprise Rate Limiting Service
 * Powered by Upstash Redis for global distributed state.
 * Edge-compatible and zero-latency (fire-and-forget logging).
 */

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  console.warn("⚠️ [Security] Upstash Redis credentials missing. Rate limiting will be disabled.");
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

// 1. Global API Limiter — 100 requests per 60 seconds
export const apiLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "60 s"),
  analytics: true,
  prefix: "zs_api",
});

// 2. AI Generation Limiter — 10 requests per 1 hour
export const aiLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 h"),
  analytics: true,
  prefix: "zs_ai",
});

// 3. Auth Attempt Limiter — 5 attempts per 5 minutes
export const authLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "5 m"),
  analytics: true,
  prefix: "zs_auth",
});

/**
 * Helper to check rate limit in Proxy/Middleware.
 */
export async function checkRateLimit(
  limiter: Ratelimit,
  identifier: string
) {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    return { success: true, limit: 1000, remaining: 999, reset: Date.now() };
  }
  return await limiter.limit(identifier);
}
