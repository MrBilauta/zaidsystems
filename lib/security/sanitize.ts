import DOMPurify from "isomorphic-dompurify";

/**
 * Enterprise Content Sanitization
 * Defense-in-depth against XSS, Injection, and Malicious Input.
 */

const SAFE_TAGS = [
  "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "hr", "div", "span", "section", "article",
  "ul", "ol", "li", "strong", "em", "b", "i", "u", "s", "code", "pre", "a", "img",
  "table", "thead", "tbody", "tr", "th", "td", "blockquote", "figure", "figcaption",
  "details", "summary", "kbd", "sub", "sup"
];

const SAFE_ATTR = ["href", "title", "target", "rel", "src", "alt", "class", "id", "lang", "dir"];

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: SAFE_TAGS,
    ALLOWED_ATTR: SAFE_ATTR,
    FORCE_BODY: true,
    ADD_ATTR: ["target"], // Ensure target="_blank" can be added safely
  });
}

export function sanitizePlainText(input: string): string {
  return input.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

/**
 * Advanced Prompt Injection Detection
 * Protects AI endpoints from manipulation.
 */
export function detectPromptInjection(input: string): boolean {
  const patterns = [
    /ignore\s+(?:previous|above|all)\s+instructions/i,
    /system\s*:\s*/i,
    /you\s+are\s+now\s+a\s+/i,
    /jailbreak/i,
    /\[INST\]/i,
    /<<<[^>]+>>>/i,
    /\b(dan|jailbroken|unfiltered)\b/i,
    /assistant\s*:\s*/i,
    /developer\s*mode/i
  ];
  
  return patterns.some(p => p.test(input));
}

/**
 * Sanitize Markdown for safe rendering.
 * Strictly blocks iframes, scripts, and dangerous rehype targets.
 */
export function sanitizeMarkdown(raw: string): string {
  return raw
    .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
    .replace(/<iframe\b[^>]*>([\s\S]*?)<\/iframe>/gim, "")
    .replace(/on\w+="[^"]*"/gim, "")
    .replace(/javascript:/gim, "blocked:");
}
