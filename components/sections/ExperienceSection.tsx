"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { Briefcase } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative section-padding overflow-hidden">
      <div className="section-container relative z-10 max-w-4xl">
        <FadeIn>
          <div className="mb-20 text-center flex flex-col items-center">
            <h2>
              Professional <span className="text-primary">Journey</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground/90 md:text-xl">
              A track record of engineering and maintaining mission-critical production systems.
            </p>
          </div>
        </FadeIn>

        <div className="relative border-l border-white/10 pl-10 ml-4">
          <SlideUp delay={0.1}>
            <div className="relative mb-16">
              <span className="absolute -left-[61px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-background border border-white/10 text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                <Briefcase className="h-4 w-4" />
              </span>
              
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-3">
                <h3 className="text-2xl font-bold text-white tracking-tight">Systems Administrator</h3>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary/80 mt-2 sm:mt-0">2021 — PRESENT</span>
              </div>
              
              <h4 className="text-lg font-medium text-white/40 mb-6">Osman Healthcare</h4>
              
              <ul className="space-y-5 text-muted-foreground/80 text-lg leading-relaxed">
                <li className="flex items-start">
                  <div className="mr-4 mt-2.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                  <span>Engineered and optimized e-commerce operations, resulting in a 40% reduction in order processing latency through automated workflows.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-2.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                  <span>Architected highly available billing systems, ensuring zero downtime during peak transaction periods and strict data consistency.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-2.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                  <span>Deployed analytics dashboards aggregating thousands of daily patient records to improve operational decision-making efficiency.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-2.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                  <span>Maintained on-premise and cloud infrastructure, managing Linux servers, containerized workloads, and CI/CD pipelines.</span>
                </li>
              </ul>
            </div>
          </SlideUp>
        </div>
      </div>
    </section>
  );
}
