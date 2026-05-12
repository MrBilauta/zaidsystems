"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#02040a] selection:bg-primary/30">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" 
          style={{ maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)" }}
        />
        
        {/* Breathing Glow Effects */}
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-[20%] -left-[10%] h-[70%] w-[70%] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div 
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-[20%] -right-[10%] h-[70%] w-[70%] rounded-full bg-accent/10 blur-[120px]"
        />

        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light pointer-events-none" />
      </div>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="mb-8 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent p-[1px]"
          >
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#0a0c14]">
              <span className="text-xl font-bold text-white tracking-tighter">Z</span>
            </div>
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Zaid Systems</h1>
          <p className="text-sm text-white/40 font-mono uppercase tracking-[0.2em] mt-1">Enterprise AI Infrastructure</p>
        </div>

        {children}
      </motion.div>

      {/* Footer Decoration */}
      <div className="absolute bottom-8 z-10 flex gap-6 text-[10px] font-medium uppercase tracking-[0.2em] text-white/20">
        <span>Protected by Zero-Trust Architecture</span>
        <span className="h-3 w-[1px] bg-white/10" />
        <span>Hardware Root of Trust</span>
      </div>
    </main>
  );
}
