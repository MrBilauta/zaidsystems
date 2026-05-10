"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mail, Code, Globe, SquareTerminal, Trophy } from "lucide-react";
import Link from "next/link";

export function ContactSection() {
  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full opacity-30 pointer-events-none" />
      
      <div className="section-container relative z-10 text-center flex flex-col items-center">
        <FadeIn>
          <div className="mb-10 inline-flex items-center justify-center rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur-xl">
            <SquareTerminal className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-8 max-w-2xl">
            Initialize <span className="text-primary">Connection</span> Protocol
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground/90 mb-12 max-w-2xl leading-relaxed">
            I&apos;m currently optimizing for new engineering opportunities. If you&apos;re looking to architect production-grade infrastructure or deploy intelligent automation, my protocols are open.
          </p>
        </FadeIn>

        <SlideUp delay={0.2}>
          <div className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl mx-auto">
            <Link href="mailto:hello@zaidsystems.dev" className={cn(buttonVariants({ size: "lg", className: "h-20 px-12 w-full sm:w-auto text-xl font-bold gap-4 shadow-[0_0_40px_rgba(var(--primary),0.3)] rounded-2xl" }))}>
              <Mail className="h-7 w-7" />
              Send Dispatch
            </Link>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
              <Link href="https://github.com/mrbilauta" target="_blank" className={cn(buttonVariants({ variant: "outline", size: "lg", className: "h-20 px-8 gap-4 bg-white/[0.03] border-white/10 backdrop-blur-md rounded-2xl group hover:border-primary/50 transition-all duration-500" }))}>
                <Code className="h-7 w-7 text-white/50 group-hover:text-primary transition-colors" />
                <div className="text-left">
                  <div className="text-[10px] font-mono uppercase tracking-widest opacity-40">Repositories</div>
                  <div className="text-lg font-bold">GitHub</div>
                </div>
              </Link>
              
              <Link href="https://www.linkedin.com/in/khanmohammedzaid" target="_blank" className={cn(buttonVariants({ variant: "outline", size: "lg", className: "h-20 px-8 gap-4 bg-white/[0.03] border-white/10 backdrop-blur-md rounded-2xl group hover:border-primary/50 transition-all duration-500" }))}>
                <Globe className="h-7 w-7 text-white/50 group-hover:text-primary transition-colors" />
                <div className="text-left">
                  <div className="text-[10px] font-mono uppercase tracking-widest opacity-40">Network</div>
                  <div className="text-lg font-bold">LinkedIn</div>
                </div>
              </Link>

              <Link href="https://www.hackerrank.com/profile/khanmohammedzaid" target="_blank" className={cn(buttonVariants({ variant: "outline", size: "lg", className: "h-20 px-8 gap-4 bg-white/[0.03] border-white/10 backdrop-blur-md rounded-2xl group hover:border-primary/50 transition-all duration-500" }))}>
                <Trophy className="h-7 w-7 text-white/50 group-hover:text-primary transition-colors" />
                <div className="text-left">
                  <div className="text-[10px] font-mono uppercase tracking-widest opacity-40">Certificates</div>
                  <div className="text-lg font-bold">HackerRank</div>
                </div>
              </Link>
            </div>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
