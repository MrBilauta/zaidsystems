import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiLimiter, aiLimiter, checkRateLimit } from "@/lib/security/limiter";

/**
 * Zaid Systems — Zero-Trust Proxy (Next.js 16)
 * Enforces production-grade security, rate limiting, and RBAC at the edge.
 */

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isPublicApiRoute = createRouteMatcher(["/api/health", "/api/og(.*)"]);
const isWebhookRoute = createRouteMatcher(["/api/webhooks(.*)"]);
const isAiApiRoute = createRouteMatcher(["/api/ai/(.*)"]);
const isAuthRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

function applySecurityHeaders(request: NextRequest, response: NextResponse, requestId: string): NextResponse {
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.zaidsystems.dev https://*.clerk.accounts.dev https://accounts.clerk.dev https://challenges.cloudflare.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: blob: https:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://clerk.zaidsystems.dev https://*.clerk.accounts.dev https://accounts.clerk.dev https://api.clerk.com wss://*.clerk.accounts.dev https://challenges.cloudflare.com;
    frame-src https://challenges.cloudflare.com https://*.clerk.accounts.dev;
    media-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, " ").trim();

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Request-ID", requestId);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-DNS-Prefetch-Control", "off");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  
  // Advanced Production Headers
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  
  response.headers.delete("X-Powered-By");

  return response;
}

export const proxy = clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;
  const requestId = req.headers.get("x-request-id") || crypto.randomUUID();
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  // 1. Skip over-aggressive checks for internal Next.js assets
  if (pathname.startsWith("/_next") || pathname.includes("favicon.ico") || isWebhookRoute(req)) {
    return applySecurityHeaders(req, NextResponse.next(), requestId);
  }

  // 2. Private Onboarding Gate (Disable public sign-ups)
  if (pathname === "/sign-up") {
    const onboardingToken = req.nextUrl.searchParams.get("token");
    const secretToken = process.env.SECRET_ONBOARDING_TOKEN;

    // If token is missing or incorrect, redirect to sign-in (Public Disguise)
    if (!secretToken || onboardingToken !== secretToken) {
      const signInUrl = new URL("/sign-in", req.url);
      return applySecurityHeaders(req, NextResponse.redirect(signInUrl), requestId);
    }
  }

  // 3. Allow public access to sign-in
  if (pathname === "/sign-in") {
    return applySecurityHeaders(req, NextResponse.next(), requestId);
  }

  // 2. Rate Limiting
  if (pathname.startsWith("/api") && !isPublicApiRoute(req) && !isWebhookRoute(req)) {
    const limiter = isAiApiRoute(req) ? aiLimiter : apiLimiter;
    const { success, limit, reset } = await checkRateLimit(limiter, ip);

    if (!success) {
      const response = new NextResponse(JSON.stringify({ 
        error: "Too many requests", 
        requestId 
      }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(reset),
        },
      });
      return applySecurityHeaders(req, response, requestId);
    }
  }

  // 3. Admin Route & Role Protection
  if (isAdminRoute(req)) {
    const session = await auth();
    if (!session.userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", pathname);
      return applySecurityHeaders(req, NextResponse.redirect(signInUrl), requestId);
    }

    // Role-based Access Control (Enforce ADMIN or SUPER_ADMIN)
    const role = (session.sessionClaims?.metadata as any)?.role;
    if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
      return applySecurityHeaders(req, NextResponse.rewrite(new URL("/403", req.url)), requestId);
    }
  }

  const response = NextResponse.next();
  return applySecurityHeaders(req, response, requestId);
});

export default proxy;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf)).*)"],
};
