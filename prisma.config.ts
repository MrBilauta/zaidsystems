import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  // Prisma CLI operations (migrate/introspect)
  // should use DIRECT_URL to bypass PgBouncer.
  datasource: {
    url:
      process.env.DIRECT_URL ??
      process.env.DATABASE_URL ??
      "postgresql://localhost/dev",
  },
});