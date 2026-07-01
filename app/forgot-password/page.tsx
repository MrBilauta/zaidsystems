"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard, AuthInput, AuthButton } from "@/components/auth/AuthComponents";
import Link from "next/link";
import { ArrowLeft, Loader2, KeyRound, AlertCircle, RefreshCw, Terminal } from "lucide-react";

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
            Recovery Initializing
          </p>
          <div className="flex items-center gap-2 justify-center">
            <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce" />
            <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
            <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
          </div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/5">
            Negotiating Security Protocols
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
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-red-400">Recovery Crash</h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-relaxed max-w-[240px] mx-auto">
            {message || "The recovery kernel encountered a critical exception during override."}
          </p>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-3 mx-auto px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
        >
          <RefreshCw className="w-3 h-3" />
          Reset Interface
        </button>
      </div>
    </AuthCard>
  );
}

function ForgotPasswordContent() {
  const { isLoaded: authLoaded } = useAuth();
  const { signIn, isLoaded: signInLoaded, setActive } = useSignIn() as any;
  
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"request" | "reset">("request");
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
        message="Authentication instance (signIn) is undefined. Override protocol halted."
        reset={() => window.location.reload()}
      />
    );
  }

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!signIn) return;

    setIsLoading(true);
    setError("");

    try {
      await signIn.create({ identifier: email });
      
      const factors = signIn.supportedFirstFactors;
      if (!factors) {
        throw new Error("No recovery factors available.");
      }

      const factor = factors.find((f: any) => f.strategy === "reset_password_email_code");
      if (!factor) {
        throw new Error("Password reset email factor not found.");
      }

      await signIn.prepareFirstFactor({
        strategy: "reset_password_email_code",
        emailAddressId: (factor as any).emailAddressId,
      });
      
      setStep("reset");
    } catch (err: any) {
      console.error("[Auth] Recovery Request Error:", err);
      setError(err.errors?.[0]?.longMessage || err.message || "Initialization failed.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (!signIn) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/admin");
      } else {
        setError("Protocol incomplete. Verify data and retry.");
      }
    } catch (err: any) {
      console.error("[Auth] Reset Execution Error:", err);
      setError(err.errors?.[0]?.longMessage || "Reset cycle failed.");
    } finally {
      setIsLoading(false);
    }
  }

  try {
    return (
      <AuthCard>
        <div className="mb-8 flex items-center gap-4">
          <Link href="/sign-in" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
            <ArrowLeft className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Terminal className="w-3 h-3 text-primary/40" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">
                {step === "request" ? "Emergency Override" : "Finalize Reset"}
              </h2>
            </div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-white/20">
              {step === "request" ? "Request reset synchronization" : "Enter decryption code and new access key"}
            </p>
          </div>
        </div>

        <form onSubmit={step === "request" ? handleRequest : handleReset} className="space-y-6">
          {step === "request" ? (
            <AuthInput
              label="Recovery Email"
              type="email"
              placeholder="operative@zaidsystems.dev"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          ) : (
            <div className="space-y-4">
              <AuthInput
                label="Security Code"
                placeholder="000-000"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <AuthInput
                label="New Access Key"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                {error}
              </p>
            </div>
          )}

          <AuthButton type="submit" isLoading={isLoading}>
            {step === "request" ? "Initiate Link" : "Finalize Reset"}
          </AuthButton>
        </form>

        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <div className="flex items-center justify-center gap-2">
            <KeyRound className="w-3 h-3 text-primary/40" />
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 leading-relaxed">
              Security Override Subsystem v1.4
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

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<LoadingCard />}>
        <ForgotPasswordContent />
      </Suspense>
    </AuthLayout>
  );
}
