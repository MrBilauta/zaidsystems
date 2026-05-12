"use client";

import React, { Suspense, useState } from "react";
import { useAuth, useClerk, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard, AuthInput, AuthButton } from "@/components/auth/AuthComponents";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Loader2, Lock } from "lucide-react";

function AuthLoadingSkeleton() {
  return (
    <AuthCard>
      <div className="space-y-8 py-8 flex flex-col items-center justify-center min-h-[300px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-10 h-10 text-primary/40" />
        </motion.div>
        <div className="space-y-2 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 animate-pulse">
            Identity Authorization
          </p>
          <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-white/5">
            Negotiating Second Factor Handshake...
          </p>
        </div>
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

  const isFullyLoaded = authLoaded && signInLoaded;

  if (!isFullyLoaded) {
    return <AuthLoadingSkeleton />;
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
        router.push("/");
      } else {
        setError("MFA sequence incomplete. Re-authorize.");
      }
    } catch (err: any) {
      console.error("MFA verification error:", err);
      setError(err.errors?.[0]?.longMessage || "Invalid security code.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard>
      <div className="mb-8 text-center">
        <div className="inline-flex p-3 rounded-2xl bg-primary/5 border border-primary/10 mb-4">
          <ShieldCheck className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">Identity Verification</h2>
        <p className="text-[10px] font-medium uppercase tracking-widest text-white/20 mt-1">Multi-Factor Authentication Required</p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <AuthInput
          label="Verification Code"
          placeholder="000-000"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-center"
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AuthButton type="submit" isLoading={isLoading}>
          Authorize Session
        </AuthButton>
      </form>

      <div className="mt-8 text-center border-t border-white/5 pt-6">
        <div className="flex items-center justify-center gap-2">
          <Lock className="w-3 h-3 text-primary/40" />
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/10 leading-relaxed">
            Encrypted High-Security Tunnel
          </p>
        </div>
      </div>
    </AuthCard>
  );
}

export default function MFAPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<AuthLoadingSkeleton />}>
        <MFAContent />
      </Suspense>
    </AuthLayout>
  );
}
