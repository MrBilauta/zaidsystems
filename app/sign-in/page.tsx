"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard, AuthInput, AuthButton, AuthDivider } from "@/components/auth/AuthComponents";
import Link from "next/link";
import { Mail, Loader2, AlertCircle, RefreshCw, Terminal } from "lucide-react";

/**
 * PRODUCTION-SAFE LOADING SKELETON
 * Standardized to prevent hydration mismatch
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
            Initializing Core
          </p>
          <div className="flex items-center gap-2 justify-center">
            <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce" />
            <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
            <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
          </div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/5">
            Establishing Encrypted Handshake
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
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-red-400">Runtime Exception</h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-relaxed max-w-[240px] mx-auto">
            {message || "The authentication kernel encountered a critical rendering failure."}
          </p>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-3 mx-auto px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
        >
          <RefreshCw className="w-3 h-3" />
          Reset Terminal
        </button>
      </div>
    </AuthCard>
  );
}

function SignInContent() {
  const [renderError, setRenderError] = useState<string | null>(null);
  
  // Use useAuth for initialization check
  const { isLoaded: authLoaded, userId } = useAuth();
  // Use useSignIn for auth logic
  const { signIn, isLoaded: signInLoaded, setActive } = useSignIn() as any;
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Guard: Clerk Loading State
  const isReady = authLoaded && signInLoaded;

  // Defensive Logging
  useEffect(() => {
    if (authLoaded && signInLoaded) {
      console.log("[Auth] Clerk Runtime Initialized");
    }
  }, [authLoaded, signInLoaded]);

  // Handle existing session
  useEffect(() => {
    if (userId) {
      router.push("/admin");
    }
  }, [userId, router]);

  if (!isReady) {
    return <LoadingCard />;
  }

  // Hard Recovery: Missing SignIn Instance
  if (!signIn) {
    return (
      <FatalRecoveryUI 
        message="Authentication instance (signIn) is undefined. Checking provider integrity..."
        reset={() => window.location.reload()}
      />
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!signIn) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/admin");
      } else {
        console.warn("[Auth] Incomplete Status:", result.status);
        setError("Account requires additional verification protocols.");
      }
    } catch (err: any) {
      console.error("[Auth] Execution Failed:", err);
      setError(
        err.errors?.[0]?.longMessage || 
        err.errors?.[0]?.message || 
        "Access Denied: Credentials Rejected."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSocialSignIn(strategy: "oauth_github" | "oauth_google") {
    if (!signIn) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/api/auth/callback",
        redirectUrlComplete: "/admin",
      });
    } catch (err: any) {
      console.error("[Auth] Provider Error:", err);
      setError("External identity provider handshake failed.");
    }
  }

  // PHASE 2: DEFENSIVE RENDERING BLOCK
  try {
    return (
      <AuthCard>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Diagnostic Header (Progressive restoration phase) */}
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-3 h-3 text-primary/40" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">Secure Link Established</span>
          </div>

          <div className="space-y-4">
            <AuthInput
              label="Engineering ID / Email"
              type="email"
              placeholder="name@zaidsystems.dev"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
            <div className="space-y-1">
              <AuthInput
                label="Access Key / Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-[10px] font-black uppercase tracking-[0.1em] text-primary/60 hover:text-primary transition-colors"
                >
                  Forgot Key?
                </Link>
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                {error}
              </p>
            </div>
          )}

          <AuthButton type="submit" isLoading={isLoading}>
            Initialize Session
          </AuthButton>

          <AuthDivider text="Onboard via Provider" />

          <div className="grid grid-cols-2 gap-4">
            <AuthButton
              type="button"
              variant="outline"
              className="py-3"
              onClick={() => handleSocialSignIn("oauth_github")}
            >
              <GithubIcon className="h-4 w-4" />
            </AuthButton>
            <AuthButton
              type="button"
              variant="outline"
              className="py-3"
              onClick={() => handleSocialSignIn("oauth_google")}
            >
              <Mail className="h-4 w-4" />
            </AuthButton>
          </div>
        </form>

        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 leading-relaxed">
            Authorized Personnel Only <br />
            Secure Access Terminal v2.1
          </p>
        </div>
      </AuthCard>
    );
  } catch (err: any) {
    console.error("[Auth] Render Crash:", err);
    return <FatalRecoveryUI message={err.message} reset={() => window.location.reload()} />;
  }
}

/**
 * BRANDING COMPONENTS (Hardcoded as SVGs to prevent import risk)
 */
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

/**
 * SIGN-IN PAGE ENTRY POINT
 */
export default function SignInPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<LoadingCard />}>
        <SignInContent />
      </Suspense>
    </AuthLayout>
  );
}
