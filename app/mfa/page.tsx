"use client";

import { useState } from "react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard, AuthInput, AuthButton } from "@/components/auth/AuthComponents";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function MFAPage() {
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
      const result = await client.signIn.attemptSecondFactor({
        strategy: "totp",
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        console.error("MFA failed:", result);
        setError("MFA incomplete. Please try again.");
      }
    } catch (err: any) {
      console.error("MFA error:", err);
      setError(err.errors?.[0]?.message || "Invalid authenticator code.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">Multi-Factor Authentication</h2>
          <p className="text-xs text-white/40 mt-1">Enter the security code from your authenticator app to authorize this session.</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <AuthInput
            label="Security Token"
            placeholder="000 000"
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
            Authorize Access
          </AuthButton>

          <button
            type="button"
            className="w-full text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors"
          >
            Use Backup Recovery Key
          </button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
