import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { processAiContent } from "@/lib/inngest/functions";

/**
 * Inngest API Endpoint
 * Handles background job orchestration.
 */

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    processAiContent,
    // Future jobs: analyticsAggregation, indexing, etc.
  ],
});
