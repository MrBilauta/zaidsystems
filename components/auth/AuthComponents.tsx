"use client";

import { motion } from "framer-motion";
import { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/**
 * Premium Glassmorphic Card
 */
export function AuthCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-2xl shadow-2xl", className)}>
      {/* Animated Border Effect */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/10 opacity-50" />
      {children}
    </div>
  );
}

/**
 * Futuristic Input Field
 */
interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function AuthInput({ label, error, className, ...props }: AuthInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">
        {label}
      </label>
      <div className="group relative">
        <input
          {...props}
          className={cn(
            "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/10",
            "focus:border-primary/50 focus:bg-white/[0.08] focus:ring-1 focus:ring-primary/20",
            error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20",
            className
          )}
        />
        {/* Subtle Inner Glow on Focus */}
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-primary/5 opacity-0 transition-opacity group-focus-within:opacity-100" />
      </div>
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="ml-1 text-[10px] font-medium text-red-400 uppercase tracking-wider"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

/**
 * High-End Interactive Button
 */
interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

export function AuthButton({ children, isLoading, variant = "primary", className, ...props }: AuthButtonProps) {
  const variants = {
    primary: "bg-primary text-black hover:bg-primary/90",
    secondary: "bg-white/10 text-white hover:bg-white/20",
    outline: "border border-white/10 text-white hover:bg-white/5",
  };

  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={cn(
        "relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          {children}
          {/* Shine Effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 hover:translate-x-full" />
        </>
      )}
    </button>
  );
}

/**
 * Auth Divider
 */
export function AuthDivider({ text }: { text: string }) {
  return (
    <div className="relative flex items-center py-4">
      <div className="flex-grow border-t border-white/5"></div>
      <span className="mx-4 flex-shrink text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">
        {text}
      </span>
      <div className="flex-grow border-t border-white/5"></div>
    </div>
  );
}
