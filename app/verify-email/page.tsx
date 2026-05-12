"use client";

import { useState } from "react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard, AuthInput, AuthButton } from "@/components/auth/AuthComponents";
import { motion } from "framer-motion";

export default function VerifyEmailPage() {
  const { isLoaded } = useAuth();
  const { client, setActive } = useClerk();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    setError("");

    try {
      const completeSignUp = await client.signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      } else {
        console.error("Verification failed:", completeSignUp);
        setError("Verification incomplete. Please try again.");
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.errors?.[0]?.message || "Invalid verification code.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        <div className="mb-6 text-center">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">Identity Verification</h2>
          <p className="text-xs text-white/40 mt-1">A verification code has been sent to your operative email.</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <AuthInput
            label="One-Time Passcode (OTP)"
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="text-center text-xl tracking-[1em] font-mono"
            maxLength={6}
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-center"
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                {error}
              </p>
            </motion.div>
          )}

          <AuthButton type="submit" isLoading={isLoading}>
            Verify Identity
          </AuthButton>

          <button
            type="button"
            onClick={() => client.signUp.prepareEmailAddressVerification({ strategy: "email_code" })}
            className="w-full text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-primary transition-colors"
          >
            Resend Passcode
          </button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
