"use client";

import { Suspense, useState } from "react";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ShieldCheck, Fingerprint, ArrowRight } from "lucide-react";

function SignInContent() {
  const { isLoaded: authLoaded } = useAuth();
  const { signIn, setActive } = useSignIn() as any;

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect_url") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!authLoaded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center space-y-6"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
          <Fingerprint className="w-16 h-16 text-blue-400 animate-pulse relative z-10" />
        </div>
        <p className="text-blue-400/80 font-mono text-sm tracking-widest uppercase animate-pulse">
          Initializing Secure Terminal...
        </p>
      </motion.div>
    );
  }

  if (!signIn) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-400 font-mono text-center bg-red-500/10 border border-red-500/20 p-6 rounded-2xl backdrop-blur-xl"
      >
        <ShieldCheck className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-sm tracking-widest uppercase">Clerk failed to initialize.</p>
        <p className="text-xs text-red-500/60 mt-2">Missing environment keys or provider error.</p>
      </motion.div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setError("");
      setIsAuthenticating(true);

      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        console.log("AUTH SUCCESS", result);
        console.log("SETTING ACTIVE SESSION");

        await setActive?.({
          session: result.createdSessionId,
        });

        console.log("REDIRECTING TO:", redirectUrl);
        router.push(redirectUrl);
      }
    } catch (err: any) {
      console.error("FULL AUTH ERROR:", err);
      console.log("Clerk Error Object:", JSON.stringify(err, null, 2));

      setError(
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "Authentication failed"
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md relative z-10"
    >
      {/* Glow Behind Card */}
      <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-[3rem] pointer-events-none" />
      
      <div className="relative rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-8 shadow-2xl overflow-hidden">
        {/* Subtle inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            >
              <Lock className="w-8 h-8 text-blue-400" />
            </motion.div>
            <h1 className="text-white text-3xl font-bold tracking-tight mb-2">
              Secure Access
            </h1>
            <p className="text-blue-200/60 font-mono text-xs tracking-widest uppercase">
              Zaid Systems Infrastructure
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-white/50 text-xs font-mono uppercase tracking-wider ml-1">
                System Identifier
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-blue-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 rounded-xl bg-white/5 border border-white/10 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-blue-500/5 transition-all"
                  placeholder="admin@zaidsystems.dev"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-white/50 text-xs font-mono uppercase tracking-wider ml-1">
                Access Code
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-blue-400 transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 rounded-xl bg-white/5 border border-white/10 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-blue-500/5 transition-all"
                  placeholder="••••••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isAuthenticating}
              className="relative w-full h-12 mt-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isAuthenticating ? "Authenticating..." : "Establish Connection"}
                {!isAuthenticating && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* Developer Diagnostics Panel */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-6 p-4 rounded-2xl bg-black/50 border border-blue-500/30 backdrop-blur-md">
          <h3 className="text-blue-400 text-xs font-mono uppercase tracking-widest mb-3 flex items-center gap-2">
            <Lock className="w-4 h-4" /> Auth Diagnostics
          </h3>
          <div className="space-y-2 text-xs font-mono text-white/70">
            <div className="flex justify-between">
              <span>Auth Loaded:</span>
              <span className={authLoaded ? "text-green-400" : "text-yellow-400"}>{String(authLoaded)}</span>
            </div>
            <div className="flex justify-between">
              <span>SignIn Exists:</span>
              <span className={signIn ? "text-green-400" : "text-red-400"}>{String(!!signIn)}</span>
            </div>
            <div className="flex justify-between">
              <span>Redirect URL:</span>
              <span className="text-blue-400 truncate max-w-[150px]" title={redirectUrl}>{redirectUrl}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
              <span>Error State:</span>
              <span className={error ? "text-red-400" : "text-green-400"}>{error ? "Present" : "None"}</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#030712] relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#030712] to-[#030712] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Animated Glow Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-blue-500/20 rounded-full blur-[128px] pointer-events-none mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"
      />

      <div className="relative z-10 w-full px-4 flex justify-center py-12">
        <Suspense
          fallback={
            <div className="text-blue-400/80 font-mono text-sm tracking-widest uppercase animate-pulse">
              Initializing Network...
            </div>
          }
        >
          <SignInContent />
        </Suspense>
      </div>
    </main>
  );
}
