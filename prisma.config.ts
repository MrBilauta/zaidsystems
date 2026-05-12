import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  // Prisma CLI (migrate, introspect) uses DIRECT_URL to bypass connection pooler.
  // Falls back to DATABASE_URL if DIRECT_URL is not set (e.g., in simple setups).
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "postgresql://localhost/dev",
  },
});
