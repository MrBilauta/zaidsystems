import pino from "pino";

/**
 * Enterprise Structured Logger
 * Production: Optimized JSON format for ingestion (Datadog, Logtail, etc.)
 * Development: Human-readable pretty-printing.
 */

const isDev = process.env.NODE_ENV === "development";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  browser: {
    asObject: true,
  },
  transport: isDev
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          ignore: "pid,hostname",
        },
      }
    : undefined,
});

/**
 * Log a production event with correlation context
 */
export function logEvent(message: string, context: Record<string, unknown> = {}) {
  const level = (context.level as string) || "info";
  const requestId = (context.requestId as string) || "unknown";

  const payload = {
    ...context,
    requestId,
    timestamp: new Date().toISOString(),
  };

  switch (level) {
    case "error": logger.error(payload, message); break;
    case "warn": logger.warn(payload, message); break;
    case "debug": logger.debug(payload, message); break;
    case "trace": logger.trace(payload, message); break;
    default: logger.info(payload, message);
  }
}
