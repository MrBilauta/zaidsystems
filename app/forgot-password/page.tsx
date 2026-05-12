"use client";

import React, { Suspense, useState } from "react";
import { useAuth, useClerk, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard, AuthInput, AuthButton } from "@/components/auth/AuthComponents";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Loader2, KeyRound } from "lucide-react";

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
            Access Recovery Protocol
          </p>
          <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-white/5">
            Initializing Encrypted Reset Handshake...
          </p>
        </div>
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

  const isFullyLoaded = authLoaded && signInLoaded;

  if (!isFullyLoaded) {
    return <AuthLoadingSkeleton />;
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
      console.error("Recovery request error:", err);
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
        router.push("/");
      } else {
        setError("Protocol incomplete. Verify data and retry.");
      }
    } catch (err: any) {
      console.error("Reset execution error:", err);
      setError(err.errors?.[0]?.longMessage || "Reset cycle failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard>
      <div className="mb-8 flex items-center gap-4">
        <Link href="/sign-in" className="p-2 rounded-full hover:bg-white/5 transition-colors group">
          <ArrowLeft className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
        </Link>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/90">
            {step === "request" ? "Initialize Recovery" : "Override Access Key"}
          </h2>
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/20">
            {step === "request" ? "Request encrypted reset link" : "Input security code and new key"}
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
          {step === "request" ? "Initiate Recovery" : "Finalize Override"}
        </AuthButton>
      </form>

      <div className="mt-8 text-center border-t border-white/5 pt-6">
        <div className="flex items-center justify-center gap-2">
          <KeyRound className="w-3 h-3 text-primary/40" />
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/10 leading-relaxed">
            Emergency Access Override Interface
          </p>
        </div>
      </div>
    </AuthCard>
  );
}

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<AuthLoadingSkeleton />}>
        <ForgotPasswordContent />
      </Suspense>
    </AuthLayout>
  );
}
