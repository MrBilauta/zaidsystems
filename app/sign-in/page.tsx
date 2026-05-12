"use client";

import { useState } from "react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard, AuthInput, AuthButton, AuthDivider } from "@/components/auth/AuthComponents";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

import { Suspense } from "react";

export default function SignInPage() {
  return (
    <AuthLayout>
      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>
    </AuthLayout>
  );
}

function SignInForm() {
  const { isLoaded } = useAuth();
  const { client, setActive } = useClerk();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await client.signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push(redirectUrl);
      } else {
        console.log("Sign in result:", result);
        setError("Unexpected sign-in status. Please try again.");
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      setError(err.errors?.[0]?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSocialSignIn(strategy: "oauth_github" | "oauth_google") {
    if (!isLoaded) return;
    try {
      await client.signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/api/auth/callback",
        redirectUrlComplete: redirectUrl,
      });
    } catch (err: any) {
      console.error("Social sign in error:", err);
      setError("Social authentication failed.");
    }
  }

  return (
    <AuthCard>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <AuthInput
            label="Engineering ID / Email"
            type="email"
            placeholder="name@zaidsystems.dev"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="space-y-1">
            <AuthInput
              label="Access Key / Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-[10px] font-bold uppercase tracking-widest text-primary/60 hover:text-primary transition-colors"
              >
                Forgot Key?
              </Link>
            </div>
          </div>
        </div>

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
          Initialize Session
        </AuthButton>

        <AuthDivider text="External Identity Providers" />

        <div className="grid grid-cols-2 gap-4">
          <AuthButton
            type="button"
            variant="outline"
            className="py-2.5"
            onClick={() => handleSocialSignIn("oauth_github")}
          >
            <GithubIcon className="h-4 w-4" />
          </AuthButton>
          <AuthButton
            type="button"
            variant="outline"
            className="py-2.5"
            onClick={() => handleSocialSignIn("oauth_google")}
          >
            <Mail className="h-4 w-4" />
          </AuthButton>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/10">
          Authorized Personnel Only <br />
          Secure Access Terminal
        </p>
      </div>
    </AuthCard>
  );
}
