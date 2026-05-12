"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

/**
 * Production-Safe Error Boundary
 * Hides stack traces from end-users while capturing state for Sentry.
 */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to Sentry
    Sentry.captureException(error);
    console.error("[System Error]:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-primary/30">
      <div className="max-w-xl w-full space-y-8 text-center">
        <div className="inline-flex p-4 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-500 mb-4">
          <AlertTriangle className="w-12 h-12" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter text-white">System <span className="text-red-500">Anomaly</span> Detected</h1>
          <p className="text-white/40 font-medium text-lg leading-relaxed">
            The platform encountered an unexpected state. Our engineering team has been notified via Sentry. 
            Internal trace: <code className="bg-white/5 px-2 py-1 rounded text-xs font-mono">{error.digest || "none"}</code>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-white/90 transition-all group"
          >
            <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            RETRY TRANSACTION
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all"
          >
            <Home className="w-5 h-5" />
            RETURN TO ROOT
          </Link>
        </div>
        
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] pt-12">
          Zaid Systems // Zero-Trust Infrastructure
        </p>
      </div>
    </div>
  );
}
