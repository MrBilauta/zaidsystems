import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { AiGenerateSchema } from "@/lib/security/validate";
import { detectPromptInjection, sanitizePlainText } from "@/lib/security/sanitize";
import { logAudit, logSecurityEvent } from "@/lib/security/audit";
import { prisma } from "@/lib/db/client";
import { AuditAction } from "@prisma/client";
import { inngest } from "@/lib/inngest/client";

// ============================================================
// SYSTEM PROMPTS — Never exposed to client
// ============================================================

const SYSTEM_PROMPTS: Record<string, string> = {
  generate_title: `You are an expert technical content strategist for Zaid Systems. Generate 5 compelling, authoritative article title variations. Output ONLY valid JSON array.`,
  generate_meta: `You are an SEO specialist. Generate JSON with "metaTitle" and "metaDescription". Output ONLY valid JSON.`,
  generate_faq: `Generate 5 relevant FAQ entries. Output ONLY JSON array of {question, answer}.`,
  expand_content: `Expand and deepen technical section. Maintaining author's voice (Mohammed Zaid Khan). Output markdown.`,
  seo_optimize: `Perform GEO analysis. Return JSON with suggestions, semanticDensity, eeatScore. Output ONLY JSON.`,
};

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true, email: true },
  });

  if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 403 });

  // 1. Quota Check (10 per hour)
  const oneHourAgo = new Date(Date.now() - 3600000);
  const recentUsage = await prisma.aiUsage.count({
    where: { userId: dbUser.id, createdAt: { gte: oneHourAgo } },
  });

  if (recentUsage >= 10) {
    return NextResponse.json({ error: "Quota exceeded" }, { status: 429 });
  }

  // 2. Validate & Sanitize
  const body = await req.json();
  const parsed = AiGenerateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 422 });

  const { action, context } = parsed.data;
  
  // Type-safe content extraction
  const ctx = context as Record<string, unknown>;
  const userContent = String(ctx.content ?? ctx.title ?? "");

  if (detectPromptInjection(userContent)) {
    await logSecurityEvent({
      type: "PROMPT_INJECTION_DETECTED",
      severity: "HIGH",
      actorId: dbUser.id,
      path: "/api/ai/generate",
    });
    return NextResponse.json({ error: "Malicious input detected" }, { status: 400 });
  }

  // 3. Create Placeholder Record
  const systemPrompt = SYSTEM_PROMPTS[action];
  const userPrompt = `Title: ${sanitizePlainText(String(ctx.title ?? "N/A"))}\nContent: ${sanitizePlainText(String(ctx.content ?? "")).slice(0, 4000)}`;

  const usageRecord = await prisma.aiUsage.create({
    data: {
      userId: dbUser.id,
      action,
      model: "gpt-4o-mini",
      prompt: userPrompt.slice(0, 2000),
      output: "PENDING_GENERATION",
      approved: false,
    },
  });

  // 4. Trigger Background Job
  await inngest.send({
    name: "cms/ai.generate",
    data: {
      action,
      context,
      usageId: usageRecord.id,
      systemPrompt,
      userPrompt,
    },
  });

  await logAudit({
    action: AuditAction.CREATE,
    resourceType: "ai_generation",
    resourceName: action,
    actorId: dbUser.id,
    actorEmail: dbUser.email,
    newData: { usageId: usageRecord.id, status: "queued" },
  });

  return NextResponse.json({
    status: "queued",
    usageId: usageRecord.id,
    message: "Generation started in background infrastructure.",
  });
}
