"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Code, ArrowRight, SquareTerminal } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-grid pt-20"
    >
      <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
      
      {/* Centered Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full opacity-40 pointer-events-none" />

      <div className="section-container relative z-10 flex flex-col items-center text-center">
        <FadeIn delay={0.2} y={-20}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <AnimatedText text="System Status: Operational" delay={0.5} />
          </div>
        </FadeIn>

        <SlideUp delay={0.4}>
          <h1 className="max-w-5xl bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent leading-tight sm:leading-tight">
            Mohammed Zaid Khan
          </h1>
        </SlideUp>

        <SlideUp delay={0.5}>
          <h2 className="mt-6 text-xl font-medium text-primary sm:text-3xl max-w-2xl">
            AI Systems Developer & Software Engineer
          </h2>
        </SlideUp>

        <SlideUp delay={0.6}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground/90 md:text-xl">
            The official engineering <strong>portfolio</strong> of <strong>Mohammed Zaid Khan</strong>. Building production-grade AI systems and scalable backend infrastructure.
          </p>
        </SlideUp>

        <SlideUp delay={0.8}>
          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row w-full sm:w-auto">
            <Link href="#projects" className={cn(buttonVariants({ size: "lg", className: "h-14 w-full sm:w-auto px-10 gap-2 group text-base" }))}>
              View Systems
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="https://github.com/mrbilauta" target="_blank" className={cn(buttonVariants({ variant: "outline", size: "lg", className: "h-14 w-full sm:w-auto px-10 gap-2 bg-background/40 backdrop-blur-md border-white/10 text-base" }))}>
              <Code className="h-5 w-5 text-white/70" />
              GitHub
            </Link>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
