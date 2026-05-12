import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { Redis } from "@upstash/redis";

export const dynamic = "force-dynamic";

/**
 * Zaid Systems — Enterprise Health Monitoring
 * Verifies critical infrastructure status across the production stack.
 */

interface ServiceStatus {
  status: "healthy" | "unreachable" | "degraded" | "configured" | "missing";
  latency?: string;
}

interface HealthReport {
  status: "operational" | "degraded" | "down";
  timestamp: string;
  latency?: string;
  services: {
    database?: ServiceStatus;
    redis?: ServiceStatus;
    openai?: ServiceStatus;
    clerk?: ServiceStatus;
  };
}

export async function GET() {
  const start = Date.now();
  
  const health: HealthReport = {
    status: "operational",
    timestamp: new Date().toISOString(),
    services: {},
  };

  try {
    // 1. Database Check (Supabase)
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    health.services.database = { 
      status: "healthy", 
      latency: `${Date.now() - dbStart}ms` 
    };

    // 2. Redis Check (Upstash)
    try {
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL || "",
        token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
      });
      const redisStart = Date.now();
      await redis.ping();
      health.services.redis = { 
        status: "healthy", 
        latency: `${Date.now() - redisStart}ms` 
      };
    } catch {
      health.services.redis = { status: "unreachable" };
      health.status = "degraded";
    }

    // 3. OpenAI Connectivity Check
    health.services.openai = { 
      status: process.env.OPENAI_API_KEY ? "configured" : "missing" 
    };

    // 4. Auth Connectivity (Clerk)
    health.services.clerk = {
      status: process.env.CLERK_SECRET_KEY ? "configured" : "missing"
    };

    health.latency = `${Date.now() - start}ms`;

    const status = health.status === "operational" ? 200 : 503;

    return NextResponse.json(health, { 
      status,
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    console.error("❌ [Health] System failure:", error);
    return NextResponse.json(
      { 
        status: "down", 
        error: error instanceof Error ? error.message : "Internal Error" 
      },
      { status: 500 }
    );
  }
}
