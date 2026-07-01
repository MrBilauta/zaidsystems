"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard, AuthInput, AuthButton } from "@/components/auth/AuthComponents";
import { ShieldCheck, Loader2, Lock, AlertCircle, RefreshCw, Terminal } from "lucide-react";

/**
 * PRODUCTION-SAFE LOADING SKELETON
 */
function LoadingCard() {
  return (
    <AuthCard className="border-primary/20 bg-primary/[0.01]">
      <div className="space-y-8 py-10 flex flex-col items-center justify-center min-h-[320px]">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-primary animate-spin opacity-40" />
          <div className="absolute inset-0 blur-xl bg-primary/20 animate-pulse" />
        </div>
        <div className="space-y-3 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-primary/60">
            Authorization Sync
          </p>
          <div className="flex items-center gap-2 justify-center">
            <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce" />
            <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
            <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
          </div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/5">
            Establishing High-Trust Tunnel
          </p>
        </div>
      </div>
    </AuthCard>
  );
}

/**
 * HARD RUNTIME RECOVERY UI
 */
function FatalRecoveryUI({ message, reset }: { message?: string; reset: () => void }) {
  return (
    <AuthCard className="border-red-500/20 bg-red-500/[0.02]">
      <div className="space-y-6 py-8 text-center">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-red-400">MFA Kernel Exception</h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-relaxed max-w-[240px] mx-auto">
            {message || "The identity verification terminal encountered a critical runtime failure."}
          </p>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-3 mx-auto px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
        >
          <RefreshCw className="w-3 h-3" />
          Re-Initialize
        </button>
      </div>
    </AuthCard>
  );
}

function MFAContent() {
  const { isLoaded: authLoaded } = useAuth();
  const { signIn, isLoaded: signInLoaded, setActive } = useSignIn() as any;
  
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isReady = authLoaded && signInLoaded;

  if (!isReady) {
    return <LoadingCard />;
  }

  if (!signIn) {
    return (
      <FatalRecoveryUI 
        message="Authentication instance (signIn) is undefined. Verification protocol halted."
        reset={() => window.location.reload()}
      />
    );
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!signIn) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await signIn.attemptSecondFactor({
        strategy: "totp",
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/admin");
      } else {
        setError("MFA sequence incomplete. Re-authorize identity.");
      }
    } catch (err: any) {
      console.error("[Auth] MFA verification error:", err);
      setError(err.errors?.[0]?.longMessage || "Invalid security code signature.");
    } finally {
      setIsLoading(false);
    }
  }

  try {
    return (
      <AuthCard>
        <div className="mb-8 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-primary/5 border border-primary/10 mb-4 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <div className="flex items-center gap-2 justify-center mb-1">
            <Terminal className="w-3 h-3 text-primary/40" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/90">Identity Challenge</h2>
          </div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-white/20">Multi-Factor Authentication Required</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <AuthInput
            label="Verification Signature"
            placeholder="000-000"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            autoFocus
          />

          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                {error}
              </p>
            </div>
          )}

          <AuthButton type="submit" isLoading={isLoading}>
            Authorize Terminal
          </AuthButton>
        </form>

        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-3 h-3 text-primary/40" />
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/10">
              Encrypted Authorization Tunnel
            </p>
          </div>
        </div>
      </AuthCard>
    );
  } catch (err: any) {
    console.error("[Auth] Render Crash:", err);
    return <FatalRecoveryUI message={err.message} reset={() => window.location.reload()} />;
  }
}

export default function MFAPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<LoadingCard />}>
        <MFAContent />
      </Suspense>
    </AuthLayout>
  );
}
