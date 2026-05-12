import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/client";
import { Role } from "@prisma/client";

/**
 * Server-Side Authentication & Authorization Guards
 * Zero-Trust Architecture: Never trust client-side state.
 */

export interface AuthContext {
  userId: string;
  dbUserId: string;
  email: string;
  role: Role;
}

export async function requireAuth() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("UNAUTHORIZED: Authentication required");
  }
  return userId;
}

/**
 * Validates admin permissions and returns the full AuthContext.
 */
export async function requireAdmin(): Promise<AuthContext> {
  const userId = await requireAuth();

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true, email: true, role: true, isActive: true },
  });

  if (!user) {
    throw new Error("FORBIDDEN: Account not registered in platform");
  }

  if (!user.isActive) {
    throw new Error("FORBIDDEN: Account is deactivated");
  }

  const authorizedRoles: Role[] = [Role.ADMIN, Role.SUPER_ADMIN, Role.EDITOR];
  if (!authorizedRoles.includes(user.role)) {
    throw new Error(`FORBIDDEN: Insufficient permissions (Got: ${user.role})`);
  }

  return {
    userId,
    dbUserId: user.id,
    email: user.email,
    role: user.role,
  };
}

/**
 * Helper to wrap Server Actions with administrative protection.
 */
export async function withAdminGuard<T>(
  action: (ctx: AuthContext) => Promise<T>
) {
  try {
    const ctx = await requireAdmin();
    const result = await action(ctx);
    return { success: true as const, data: result };
  } catch (error) {
    console.error("[AuthGuard] Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      success: false as const,
      error: message,
      code: message.includes("UNAUTHORIZED") ? "UNAUTHORIZED" : "FORBIDDEN",
    };
  }
}
