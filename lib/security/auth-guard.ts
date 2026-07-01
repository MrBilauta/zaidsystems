/**
 * Authentication & Authorization Guards
 * 
 * Centralized server-side permission verification.
 * Every protected Server Action MUST call requireAdmin() or requireRole().
 * 
 * Never trust the client for auth state — always verify server-side.
 */

import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

// ============================================================
// TYPES
// ============================================================

export interface AuthContext {
  userId: string;       // Clerk user ID
  dbUserId?: string;    // Internal DB user ID
  email?: string;
  role?: Role;
}

// ============================================================
// REQUIRE AUTH — Base authentication check
// ============================================================

/**
 * Verifies the user is authenticated.
 * Throws with a structured error if not — Server Actions catch this.
 */
export async function requireAuth(): Promise<AuthContext> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("UNAUTHORIZED: Authentication required");
  }

  return { userId };
}

// ============================================================
// REQUIRE ADMIN — Role-based access check
// ============================================================

/**
 * Verifies the user is authenticated AND has admin role in the DB.
 * This is the primary guard for all CMS operations.
 */
export async function requireAdmin(): Promise<AuthContext> {
  const { userId } = await requireAuth();

  // Look up the user in our DB to get their role
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true, email: true, role: true, isActive: true },
  });

  if (!dbUser) {
    throw new Error("FORBIDDEN: User not registered in platform");
  }

  if (!dbUser.isActive) {
    throw new Error("FORBIDDEN: Account is deactivated");
  }

  const allowedRoles: Role[] = [Role.ADMIN, Role.SUPER_ADMIN, Role.EDITOR];
  if (!allowedRoles.includes(dbUser.role)) {
    throw new Error(`FORBIDDEN: Insufficient permissions. Required: ADMIN or EDITOR, Got: ${dbUser.role}`);
  }

  return {
    userId,
    dbUserId: dbUser.id,
    email: dbUser.email,
    role: dbUser.role,
  };
}

// ============================================================
// REQUIRE SUPER ADMIN — Elevated privilege check
// ============================================================

export async function requireSuperAdmin(): Promise<AuthContext> {
  const ctx = await requireAdmin();

  if (ctx.role !== Role.SUPER_ADMIN) {
    throw new Error("FORBIDDEN: Super admin access required");
  }

  return ctx;
}

// ============================================================
// SYNC USER — Upsert Clerk user into our DB (called on first admin visit)
// ============================================================

export async function syncClerkUser(): Promise<void> {
  const { userId } = await auth();
  if (!userId) return;

  const clerkUser = await currentUser();
  if (!clerkUser) return;

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) return;

  await prisma.user.upsert({
    where: { clerkId: userId },
    create: {
      clerkId: userId,
      email,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      avatarUrl: clerkUser.imageUrl,
      role: Role.ADMIN, // First user gets admin; SUPER_ADMIN set manually in DB
      lastLoginAt: new Date(),
    },
    update: {
      lastLoginAt: new Date(),
      avatarUrl: clerkUser.imageUrl,
    },
  });
}

// ============================================================
// ACTION GUARD — Wraps Server Actions with auth + error handling
// ============================================================

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; code: "UNAUTHORIZED" | "FORBIDDEN" | "VALIDATION" | "SERVER_ERROR" };

export async function withAdminGuard<T>(
  action: (ctx: AuthContext) => Promise<T>
): Promise<ActionResult<T>> {
  try {
    const ctx = await requireAdmin();
    const data = await action(ctx);
    return { success: true, data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message.startsWith("UNAUTHORIZED")) {
      return { success: false, error: "Authentication required", code: "UNAUTHORIZED" };
    }
    if (message.startsWith("FORBIDDEN")) {
      return { success: false, error: "Insufficient permissions", code: "FORBIDDEN" };
    }
    if (message.includes("validation") || message.includes("ZodError")) {
      return { success: false, error: message, code: "VALIDATION" };
    }

    console.error("[ServerAction] Unhandled error:", error);
    return { success: false, error: "An unexpected error occurred", code: "SERVER_ERROR" };
  }
}
