"use client";

import * as Sentry from "@sentry/nextjs";

/**
 * Root Global Error Boundary
 * Catch-all for errors outside the main layout.
 */

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-black text-white">
        <div className="min-h-screen flex items-center justify-center text-center p-12">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter">Critical <span className="text-red-500">Infrastructure</span> Failure</h1>
            <p className="text-white/40 max-w-md mx-auto">
              A root-level exception has occurred. The system state has been captured for engineering review.
            </p>
            <button
              onClick={() => reset()}
              className="bg-primary text-white px-8 py-3 rounded-xl font-bold"
            >
              RELOAD PLATFORM
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
