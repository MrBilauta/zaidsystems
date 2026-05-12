"use client";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard, AuthButton } from "@/components/auth/AuthComponents";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import Link from "next/link";

export default function SessionExpiredPage() {
  return (
    <AuthLayout>
      <AuthCard className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white/40">
          <Clock className="h-8 w-8" />
        </div>
        
        <h2 className="text-xl font-bold text-white uppercase tracking-tighter mb-2">Session De-authorized</h2>
        <p className="text-sm text-white/40 leading-relaxed mb-8">
          Your security session has timed out or was terminated. To maintain platform integrity, please re-authenticate.
        </p>

        <Link href="/sign-in">
          <AuthButton>
            Re-initialize Session
          </AuthButton>
        </Link>

        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 leading-relaxed">
            Security Protocol 802.1X <br/>
            Automated Session Invalidation Active
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
