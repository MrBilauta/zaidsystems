import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

/**
 * Enterprise Prisma Client
 * Optimized for Next.js 16 Edge & Node.js runtimes.
 * Includes driver adapter for PostgreSQL with PgBouncer/Supabase support.
 */

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.warn("⚠️ [Prisma] DATABASE_URL is not set. Database features will be disabled.");
    return new PrismaClient();
  }

  // Configure connection pool with resilience
  const pool = new pg.Pool({ 
    connectionString,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  // Handle pool errors to prevent process crashes
  pool.on("error", (err) => {
    console.error("❌ [Prisma] Unexpected error on idle client", err);
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export * from "@prisma/client";
