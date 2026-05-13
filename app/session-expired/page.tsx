"use client";

import React from "react";
import Link from "next/link";

/**
 * MINIMAL STABLE CLIENT COMPONENT
 * Simplified to ensure successful manifest generation in Next.js 16
 */
export default function SessionExpiredPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#02040a] text-white selection:bg-primary/30">
      <div className="max-w-md w-full rounded-3xl border border-white/10 p-10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {/* Simplified Background Glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-50" />
        
        <div className="flex flex-col items-center text-center">
          {/* Logo Placeholder */}
          <div className="mb-6 h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent p-[1px]">
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#0a0c14]">
              <span className="text-xl font-bold text-white tracking-tighter">Z</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white mb-3 uppercase">
            Session Expired
          </h1>

          <p className="text-sm text-white/40 leading-relaxed mb-8 uppercase tracking-wide">
            Your secure session has ended or was terminated. To maintain platform integrity, please authenticate again.
          </p>

          <Link
            href="/sign-in"
            className="flex w-full items-center justify-center h-12 rounded-xl bg-primary text-black font-bold text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-primary/90 active:scale-95"
          >
            Return to Terminal
          </Link>

          <div className="mt-8 pt-6 border-t border-white/5 w-full">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 leading-relaxed">
              Security Protocol 802.1X <br/>
              Automated Session Invalidation
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
