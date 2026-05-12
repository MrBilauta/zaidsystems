import { inngest } from "./client";
import { prisma } from "@/lib/db/client";
import { logger } from "@/lib/logger";

interface AiGenerateEvent {
  data: {
    usageId: string;
    systemPrompt: string;
    userPrompt: string;
  };
}

/**
 * Zaid Systems — Background AI Workflow
 */
export const processAiContent = inngest.createFunction(
  { 
    id: "process-ai-content", 
    name: "AI: Generate Technical Content",
  },
  { event: "cms/ai.generate" },
  async ({ event, step }) => {
    const { usageId, systemPrompt, userPrompt } = (event as unknown as AiGenerateEvent).data;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY is missing");

    const completion = await step.run("call-openai", async () => {
      const { OpenAI } = await import("openai");
      const openai = new OpenAI({ apiKey });

      return await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      });
    });

    const output = completion.choices[0]?.message?.content ?? "";
    const tokensUsed = completion.usage?.total_tokens ?? 0;

    await step.run("update-usage-record", async () => {
      await prisma.aiUsage.update({
        where: { id: usageId },
        data: {
          output: output.slice(0, 10000),
          tokensUsed,
        },
      });
    });

    logger.info({ usageId, tokensUsed }, "AI content generation complete");
    return { success: true };
  }
);
