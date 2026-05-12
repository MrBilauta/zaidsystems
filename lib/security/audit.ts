/**
 * Audit Logging Service
 * 
 * Provides an immutable audit trail of all admin actions.
 * Every state-mutating Server Action MUST call logAudit().
 */

import { prisma } from "@/lib/db/client";
import { AuditAction, Prisma } from "@prisma/client";

interface AuditLogParams {
  action: AuditAction;
  resourceType: string;
  resourceId?: string;
  resourceName?: string;
  actorId?: string;
  actorEmail?: string;
  ipAddress?: string;
  userAgent?: string;
  previousData?: Record<string, unknown>;
  newData?: Record<string, unknown>;
}

/**
 * Log an admin action to the immutable audit trail.
 */
export async function logAudit(params: AuditLogParams): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        action: params.action,
        resourceType: params.resourceType,
        resourceId: params.resourceId,
        resourceName: params.resourceName,
        actorId: params.actorId,
        actorEmail: params.actorEmail,
        ipAddress: params.ipAddress ?? "server-action",
        userAgent: params.userAgent,
        previousData: params.previousData as Prisma.InputJsonValue,
        newData: params.newData as Prisma.InputJsonValue,
      },
    });
  } catch (error) {
    console.error("[AuditLog] Failed to write audit record:", error);
  }
}

/**
 * Log a security event (failed login, suspicious activity, etc.)
 */
interface SecurityEventParams {
  type: 
    | "FAILED_LOGIN"
    | "SUSPICIOUS_IP"
    | "RATE_LIMIT_HIT"
    | "UNAUTHORIZED_ACCESS"
    | "PROMPT_INJECTION_DETECTED"
    | "UPLOAD_VIOLATION";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  actorId?: string;
  ipAddress?: string;
  userAgent?: string;
  path?: string;
  details?: Record<string, unknown>;
}

export async function logSecurityEvent(params: SecurityEventParams): Promise<void> {
  try {
    await prisma.securityEvent.create({
      data: {
        type: params.type,
        severity: params.severity,
        actorId: params.actorId,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
        path: params.path,
        details: params.details as Prisma.InputJsonValue,
      },
    });
  } catch (error) {
    console.error("[SecurityEvent] Failed to log security event:", error);
  }
}

/**
 * Helper to get audit context from a server action request.
 */
export async function getAuditContext(): Promise<{
  ipAddress: string;
  userAgent: string;
}> {
  try {
    const { headers } = await import("next/headers");
    const h = await headers();
    return {
      ipAddress: h.get("x-forwarded-for")?.split(",")[0] ?? "unknown",
      userAgent: h.get("user-agent") ?? "unknown",
    };
  } catch {
    return { ipAddress: "unknown", userAgent: "unknown" };
  }
}
