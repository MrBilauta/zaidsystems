"use client";

import React, { Suspense, useState } from "react";
import { useAuth, useClerk, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard, AuthInput, AuthButton, AuthDivider } from "@/components/auth/AuthComponents";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Mail, Loader2, ShieldAlert } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

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
            Establishing Operative Link
          </p>
          <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-white/5">
            Synchronizing with Zaid Systems Central...
          </p>
        </div>
      </div>
    </AuthCard>
  );
}

function SignUpContent() {
  const { isLoaded: authLoaded } = useAuth();
  const { signUp, isLoaded: signUpLoaded, setActive } = useSignUp() as any;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isFullyLoaded = authLoaded && signUpLoaded;

  if (!isFullyLoaded) {
    return <AuthLoadingSkeleton />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!signUp) return;

    setIsLoading(true);
    setError("");

    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      router.push("/verify-email");
    } catch (err: any) {
      console.error("Sign up execution error:", err);
      setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "Registration sequence failed.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSocialSignUp(strategy: "oauth_github" | "oauth_google") {
    if (!signUp) return;
    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/api/auth/callback",
        redirectUrlComplete: "/",
      });
    } catch (err: any) {
      console.error("Social provider error:", err);
      setError("Provider authorization failed.");
    }
  }

  return (
    <AuthCard>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <AuthInput
            label="First Name"
            placeholder="Zaid"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <AuthInput
            label="Last Name"
            placeholder="Khan"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <AuthInput
          label="Professional Email"
          type="email"
          placeholder="operative@zaidsystems.dev"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthInput
          label="Secure Access Key"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Request Credentials
        </AuthButton>

        <AuthDivider text="Onboard via Provider" />

        <div className="grid grid-cols-2 gap-4">
          <AuthButton
            type="button"
            variant="outline"
            className="py-2.5"
            onClick={() => handleSocialSignUp("oauth_github")}
          >
            <GithubIcon className="h-4 w-4" />
          </AuthButton>
          <AuthButton
            type="button"
            variant="outline"
            className="py-2.5"
            onClick={() => handleSocialSignUp("oauth_google")}
          >
            <Mail className="h-4 w-4" />
          </AuthButton>
        </div>
      </form>

      <div className="mt-8 text-center border-t border-white/5 pt-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <ShieldAlert className="w-3 h-3 text-primary/40" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">
            Authorized Operations Only
          </p>
        </div>
      </div>
    </AuthCard>
  );
}

export default function SignUpPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<AuthLoadingSkeleton />}>
        <SignUpContent />
      </Suspense>
    </AuthLayout>
  );
}
