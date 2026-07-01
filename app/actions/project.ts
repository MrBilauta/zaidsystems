"use server";

import { prisma } from "@/lib/db/client";
import { revalidatePath } from "next/cache";
import { CreateProjectSchema, UpdateProjectSchema, UpdateSiteSettingsSchema } from "@/lib/security/validate";
import { sanitizePlainText, sanitizeMarkdown } from "@/lib/security/sanitize";
import { logAudit, getAuditContext } from "@/lib/security/audit";
import { withAdminGuard } from "@/lib/auth/guard";
import { AuditAction, Prisma } from "@prisma/client";

// ============================================================
// PROJECT ACTIONS
// ============================================================

export async function createProject(rawInput: unknown) {
  return withAdminGuard(async (ctx) => {
    const input = CreateProjectSchema.parse(rawInput);

    const project = await prisma.project.create({
      data: {
        ...input,
        title: sanitizePlainText(input.title),
        description: sanitizePlainText(input.description),
        content: input.content ? sanitizeMarkdown(input.content) : null,
      },
    });

    const { ipAddress, userAgent } = await getAuditContext();
    await logAudit({
      action: AuditAction.CREATE,
      resourceType: "project",
      resourceId: project.id,
      resourceName: project.title,
      actorId: ctx.dbUserId,
      actorEmail: ctx.email,
      ipAddress,
      userAgent,
    });

    revalidatePath("/admin/projects");
    return project;
  });
}

export async function updateProject(rawInput: unknown) {
  return withAdminGuard(async (ctx) => {
    const input = UpdateProjectSchema.parse(rawInput);
    const { id, content, title, description, ...rest } = input;

    const previous = await prisma.project.findUnique({ where: { id } });
    if (!previous || previous.deletedAt) throw new Error("Project not found");

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...rest,
        ...(title && { title: sanitizePlainText(title) }),
        ...(description && { description: sanitizePlainText(description) }),
        ...(content && { content: sanitizeMarkdown(content) }),
      },
    });

    const { ipAddress, userAgent } = await getAuditContext();
    await logAudit({
      action: AuditAction.UPDATE,
      resourceType: "project",
      resourceId: id,
      resourceName: updated.title,
      actorId: ctx.dbUserId,
      actorEmail: ctx.email,
      ipAddress,
      userAgent,
      previousData: { title: previous.title, visibility: previous.visibility },
      newData: { title: updated.title, visibility: updated.visibility },
    });

    revalidatePath("/admin/projects");
    return updated;
  });
}

export async function deleteProject(projectId: string) {
  return withAdminGuard(async (ctx) => {
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project || project.deletedAt) throw new Error("Project not found");

    await prisma.project.update({
      where: { id: projectId },
      data: { deletedAt: new Date(), visibility: false },
    });

    const { ipAddress, userAgent } = await getAuditContext();
    await logAudit({
      action: AuditAction.DELETE,
      resourceType: "project",
      resourceId: projectId,
      resourceName: project.title,
      actorId: ctx.dbUserId,
      actorEmail: ctx.email,
      ipAddress,
      userAgent,
    });

    revalidatePath("/admin/projects");
    return { success: true };
  });
}

export async function reorderProjects(orders: { id: string; order: number }[]) {
  return withAdminGuard(async (ctx) => {
    if (orders.length > 100) throw new Error("Too many items to reorder");

    const updates = orders.map(({ id, order }) =>
      prisma.project.update({ where: { id }, data: { order } })
    );
    await prisma.$transaction(updates);

    const { ipAddress } = await getAuditContext();
    await logAudit({
      action: AuditAction.UPDATE,
      resourceType: "project",
      resourceName: "Reorder operation",
      actorId: ctx.dbUserId,
      actorEmail: ctx.email,
      ipAddress,
      newData: { operation: "reorder", count: orders.length },
    });

    revalidatePath("/admin/projects");
    return { success: true };
  });
}

// ============================================================
// SITE SETTINGS ACTIONS
// ============================================================

export async function updateSiteSettings(rawInput: unknown) {
  return withAdminGuard(async (ctx) => {
    const input = UpdateSiteSettingsSchema.parse(rawInput);

    const previous = await prisma.siteSettings.findUnique({
      where: { id: "singleton" },
    });

    // Handle JSON casting for Prisma Input
    const updateData: Prisma.SiteSettingsUpdateInput = {
      ...input,
      socialLinks: input.socialLinks as Prisma.InputJsonValue,
      visibility: input.visibility as Prisma.InputJsonValue,
      updatedBy: ctx.userId,
    };

    const createData: Prisma.SiteSettingsCreateInput = {
      id: "singleton",
      ...input,
      socialLinks: input.socialLinks as Prisma.InputJsonValue,
      visibility: input.visibility as Prisma.InputJsonValue,
      updatedBy: ctx.userId,
    };

    const settings = await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: updateData,
      create: createData,
    });

    const { ipAddress, userAgent } = await getAuditContext();
    await logAudit({
      action: AuditAction.UPDATE,
      resourceType: "site_settings",
      resourceId: "singleton",
      resourceName: "Site Settings",
      actorId: ctx.dbUserId,
      actorEmail: ctx.email,
      ipAddress,
      userAgent,
      previousData: previous as unknown as Record<string, unknown>,
      newData: input as unknown as Record<string, unknown>,
    });

    revalidatePath("/");
    revalidatePath("/admin/config");
    return settings;
  });
}

export async function getSiteSettings() {
  return prisma.siteSettings.findUnique({ where: { id: "singleton" } });
}
