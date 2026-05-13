"use client";

import { Suspense, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";

function SignInContent() {
  const { isLoaded, signIn, setActive } = useSignIn() as any;

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect_url") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  console.log("Clerk State:", {
    isLoaded,
    signInExists: !!signIn,
  });

  if (!isLoaded) {
    return (
      <div className="text-white text-center">
        Initializing authentication...
      </div>
    );
  }

  if (!signIn) {
    return (
      <div className="text-red-400 text-center">
        Clerk failed to initialize.
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setError("");

      const result = await signIn.create({
        identifier: email,
        password,
      });

      console.log("SignIn Result:", result);

      if (result.status === "complete") {
        await setActive?.({
          session: result.createdSessionId,
        });

        router.push(redirectUrl);
      }
    } catch (err: any) {
      console.error("AUTH ERROR:", err);

      setError(
        err?.errors?.[0]?.longMessage ||
        "Authentication failed"
      );
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8">
      <h1 className="text-white text-3xl font-bold mb-6">
        Secure Access
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-12 rounded-xl bg-black/40 border border-white/10 px-4 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 rounded-xl bg-black/40 border border-white/10 px-4 text-white"
        />

        {error && (
          <div className="text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full h-12 rounded-xl bg-blue-500 text-white font-semibold"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <Suspense
        fallback={
          <div className="text-white">
            Loading secure terminal...
          </div>
        }
      >
        <SignInContent />
      </Suspense>
    </main>
  );
}
