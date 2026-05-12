"use server";

import { prisma } from "@/lib/db/client";
import { revalidatePath } from "next/cache";
import { CreatePostSchema, UpdatePostSchema } from "@/lib/security/validate";
import { sanitizeMarkdown, sanitizePlainText } from "@/lib/security/sanitize";
import { logAudit, getAuditContext } from "@/lib/security/audit";
import { withAdminGuard } from "@/lib/auth/guard";
import { AuditAction } from "@prisma/client";

// ============================================================
// CREATE POST
// ============================================================

export async function createPost(rawInput: unknown) {
  return withAdminGuard(async (ctx) => {
    // 1. Validate input — throws ZodError on failure
    const input = CreatePostSchema.parse(rawInput);

    // 2. Sanitize content — defense-in-depth
    const sanitizedContent = sanitizeMarkdown(input.content);
    const sanitizedTitle = sanitizePlainText(input.title);
    const sanitizedDescription = sanitizePlainText(input.description);

    // 3. Write to DB
    const post = await prisma.post.create({
      data: {
        ...input,
        title: sanitizedTitle,
        description: sanitizedDescription,
        content: sanitizedContent,
        authorId: ctx.dbUserId,
        authorName: "Mohammed Zaid Khan",
      },
    });

    // 4. Create initial revision snapshot
    await prisma.revision.create({
      data: {
        postId: post.id,
        title: post.title,
        content: sanitizedContent,
        status: post.status,
        authorId: ctx.dbUserId,
        label: "Initial draft",
      },
    });

    // 5. Audit log (fire and forget)
    const { ipAddress, userAgent } = await getAuditContext();
    await logAudit({
      action: AuditAction.CREATE,
      resourceType: "post",
      resourceId: post.id,
      resourceName: post.title,
      actorId: ctx.dbUserId,
      actorEmail: ctx.email,
      ipAddress,
      userAgent,
      newData: { title: post.title, slug: post.slug, status: post.status },
    });

    // 6. Revalidate
    revalidatePath("/admin/blogs");
    revalidatePath("/blog");

    return post;
  });
}

// ============================================================
// UPDATE POST
// ============================================================

export async function updatePost(rawInput: unknown) {
  return withAdminGuard(async (ctx) => {
    const input = UpdatePostSchema.parse(rawInput);
    const { id, content, title, description, ...rest } = input;

    // Fetch previous state for audit diff
    const previous = await prisma.post.findUnique({
      where: { id },
      select: { id: true, title: true, content: true, status: true, deletedAt: true },
    });

    if (!previous || previous.deletedAt) {
      throw new Error("Post not found");
    }

    const sanitizedContent = content ? sanitizeMarkdown(content) : undefined;
    const sanitizedTitle = title ? sanitizePlainText(title) : undefined;
    const sanitizedDescription = description ? sanitizePlainText(description) : undefined;

    const updated = await prisma.post.update({
      where: { id },
      data: {
        ...rest,
        ...(sanitizedTitle && { title: sanitizedTitle }),
        ...(sanitizedDescription && { description: sanitizedDescription }),
        ...(sanitizedContent && { content: sanitizedContent }),
        ...(rest.status === "PUBLISHED" && !previous.status.includes("PUBLISHED")
          ? { publishedAt: new Date() }
          : {}),
      },
    });

    // Save revision snapshot on every save
    await prisma.revision.create({
      data: {
        postId: id as string,
        title: updated.title,
        content: updated.content,
        status: updated.status,
        authorId: ctx.dbUserId,
        label: `Auto-save: ${new Date().toISOString()}`,
      },
    });

    const { ipAddress, userAgent } = await getAuditContext();
    await logAudit({
      action: AuditAction.UPDATE,
      resourceType: "post",
      resourceId: id,
      resourceName: updated.title,
      actorId: ctx.dbUserId,
      actorEmail: ctx.email,
      ipAddress,
      userAgent,
      previousData: { title: previous.title, status: previous.status },
      newData: { title: updated.title, status: updated.status },
    });

    revalidatePath("/admin/blogs");
    revalidatePath(`/blog/${updated.slug}`);
    revalidatePath("/blog");

    return updated;
  });
}

// ============================================================
// SOFT DELETE POST (Never hard delete content)
// ============================================================

export async function deletePost(postId: string) {
  return withAdminGuard(async (ctx) => {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, title: true, slug: true, deletedAt: true },
    });

    if (!post || post.deletedAt) {
      throw new Error("Post not found");
    }

    // Soft delete — preserve content forever for audit trail
    await prisma.post.update({
      where: { id: postId },
      data: { deletedAt: new Date(), status: "ARCHIVED" },
    });

    const { ipAddress, userAgent } = await getAuditContext();
    await logAudit({
      action: AuditAction.DELETE,
      resourceType: "post",
      resourceId: postId,
      resourceName: post.title,
      actorId: ctx.dbUserId,
      actorEmail: ctx.email,
      ipAddress,
      userAgent,
    });

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");

    return { success: true };
  });
}

// ============================================================
// RESTORE REVISION
// ============================================================

export async function restoreRevision(revisionId: string) {
  return withAdminGuard(async (ctx) => {
    const revision = await prisma.revision.findUnique({
      where: { id: revisionId },
      include: { post: true },
    });

    if (!revision) throw new Error("Revision not found");

    const updated = await prisma.post.update({
      where: { id: revision.postId },
      data: {
        title: revision.title,
        content: revision.content,
        status: "DRAFT", // Restored content goes back to DRAFT for review
      },
    });

    const { ipAddress, userAgent } = await getAuditContext();
    await logAudit({
      action: AuditAction.RESTORE,
      resourceType: "post",
      resourceId: revision.postId,
      resourceName: revision.title,
      actorId: ctx.dbUserId,
      actorEmail: ctx.email,
      ipAddress,
      userAgent,
      newData: { restoredFromRevisionId: revisionId, label: revision.label },
    });

    revalidatePath("/admin/blogs");
    revalidatePath(`/blog/${updated.slug}`);

    return updated;
  });
}

// ============================================================
// GET REVISIONS — For revision history UI
// ============================================================

export async function getRevisions(postId: string) {
  return withAdminGuard(async () => {
    return prisma.revision.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  });
}
