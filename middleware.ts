import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const middleware = clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  if (isAdminRoute(req)) {
    const session = await auth();

    if (!session.userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", pathname);

      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

export default middleware;

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
