"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ArrowRight, Bot, CreditCard, Cpu } from "lucide-react";

const buildingItems = [
  {
    title: "AI Multi-Agent Platform",
    description: "A robust orchestration layer for autonomous agents to collaborate, share context, and execute complex workflows dynamically.",
    icon: Bot,
    status: "Beta Testing",
  },
  {
    title: "Rust Payment Infrastructure",
    description: "High-throughput, lock-free microservices designed for executing sub-millisecond financial transactions securely.",
    icon: CreditCard,
    status: "Architecture Phase",
  },
  {
    title: "AI Workflow Automation Studio",
    description: "Visual node-based IDE for designing, simulating, and deploying intelligent operational pipelines without code.",
    icon: Cpu,
    status: "Active Development",
  },
];

export function NowBuildingSection() {
  return (
    <section id="now-building" className="relative section-padding bg-white/[0.01] border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
      <div className="section-container relative z-10">
        <FadeIn>
          <div className="mb-20 flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Infrastructure Roadmap
            </div>
            <h2 className="max-w-3xl">
              Active <span className="text-primary">Research & Development</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground/90 md:text-xl">
              Deep-dives into scalable infrastructure, agentic AI orchestration, and high-performance engineering.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3">
          {buildingItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <SlideUp key={item.title} delay={idx * 0.1}>
                <SpotlightCard className="group h-full p-10 flex flex-col relative overflow-hidden border-white/10 bg-white/[0.02]">
                  <div className="absolute top-0 right-0 p-4 opacity-5 transition-opacity group-hover:opacity-10 transform translate-x-8 -translate-y-8">
                    <Icon className="w-40 h-40 text-primary" />
                  </div>
                  <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-white tracking-tight">{item.title}</h3>
                  <p className="mb-8 text-base leading-relaxed text-muted-foreground/80">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary/80">{item.status}</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </SpotlightCard>
              </SlideUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
