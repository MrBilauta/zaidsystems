"use client";

import { useState } from "react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard, AuthInput, AuthButton } from "@/components/auth/AuthComponents";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const { isLoaded } = useAuth();
  const { client, setActive } = useClerk();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"request" | "reset">("request");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    setError("");

    try {
      // Step 1: Initialize the sign-in attempt with the identifier via direct client
      await client.signIn.create({
        identifier: email,
      });
      
      // Step 2: Null-safe factor guard
      const factors = client.signIn.supportedFirstFactors;

      if (!factors) {
        throw new Error("Initialization failed: No recovery factors available.");
      }

      // Step 3: Find email reset factor
      const factor = factors.find(
        (f: any) => f.strategy === "reset_password_email_code"
      );

      if (!factor) {
        throw new Error("Password reset email factor not found.");
      }

      // Step 4: Prepare the password reset code factor via direct client with the required ID
      await client.signIn.prepareFirstFactor({
        strategy: "reset_password_email_code",
        emailAddressId: (factor as any).emailAddressId,
      });
      
      setStep("reset");
    } catch (err: any) {
      console.error("Forgot password request error:", err);
      setError(
        err.errors?.[0]?.longMessage ||
        err.message ||
        "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await client.signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        console.error("Password reset failed:", result);
        setError("Reset incomplete. Please try again.");
      }
    } catch (err: any) {
      console.error("Password reset error:", err);
      setError(err.errors?.[0]?.message || "Invalid code or password requirements not met.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        <div className="mb-6">
          <Link href="/sign-in" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors mb-4">
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">Access Recovery</h2>
          <p className="text-xs text-white/40 mt-1">
            {step === "request" 
              ? "Initialize password override via operative email." 
              : "Enter the reset code sent to your email and set a new access key."}
          </p>
        </div>

        {step === "request" ? (
          <form onSubmit={handleRequest} className="space-y-6">
            <AuthInput
              label="Engineering Email"
              type="email"
              placeholder="name@zaidsystems.dev"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-[10px] font-bold uppercase text-red-400 text-center">{error}</p>}
            <AuthButton type="submit" isLoading={isLoading}>
              Request Override
            </AuthButton>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
            <AuthInput
              label="Reset Code"
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="font-mono tracking-widest"
            />
            <AuthInput
              label="New Access Key"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-[10px] font-bold uppercase text-red-400 text-center">{error}</p>}
            <AuthButton type="submit" isLoading={isLoading}>
              Confirm Override
            </AuthButton>
          </form>
        )}
      </AuthCard>
    </AuthLayout>
  );
}
