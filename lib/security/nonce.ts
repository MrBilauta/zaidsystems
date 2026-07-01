import { headers } from "next/headers";

/**
 * CSP Nonce Generator
 * Generates a unique, cryptographically strong nonce for every request.
 * Used to eliminate 'unsafe-inline' in Content Security Policy.
 */

export async function getNonce(): Promise<string> {
  const h = await headers();
  // We extract the nonce from the request header set by the proxy (middleware)
  // This ensures the nonce is consistent across the request lifecycle.
  return h.get("x-nonce") ?? "";
}

/**
 * Generate a random nonce string (Server Side Only - Edge compatible)
 */
export function generateNonce(): string {
  return Buffer.from(crypto.randomUUID()).toString("base64");
}
