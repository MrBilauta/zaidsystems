"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { GitCommit, Boxes, Server, Activity, Database, Workflow } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  { label: "Total Commits", value: "3,402", icon: GitCommit, suffix: "+" },
  { label: "Repositories", value: "42", icon: Boxes, suffix: "" },
  { label: "Deployments", value: "1,205", icon: Server, suffix: "+" },
  { label: "Uptime", value: "99.99", icon: Activity, suffix: "%" },
  { label: "APIs Built", value: "18", icon: Database, suffix: "" },
  { label: "AI Workflows Executed", value: "1.2", icon: Workflow, suffix: "M" },
];

export function MetricsSection() {
  return (
    <section id="metrics" className="relative section-padding overflow-hidden">
      <div className="section-container relative z-10">
        <FadeIn>
          <div className="mb-20 flex flex-col md:flex-row items-center md:items-end justify-between text-center md:text-left gap-6">
            <div className="max-w-2xl">
              <h2>
                Engineering <span className="text-primary">Velocity</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground/90 md:text-xl">
                Real-time telemetry dashboard showcasing active infrastructure performance and development throughput.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em]">Simulated Infrastructure Telemetry</span>
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <SlideUp key={metric.label} delay={idx * 0.1}>
                <SpotlightCard className="flex flex-col p-8 border-white/10 bg-white/[0.02]">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest">{metric.label}</span>
                    <Icon className="h-5 w-5 text-primary opacity-70" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white tracking-tighter font-mono">{metric.value}</span>
                    <span className="text-2xl font-bold text-primary font-mono">{metric.suffix}</span>
                  </div>
                  <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "70%" }}
                      transition={{ duration: 1.5, delay: idx * 0.1 + 0.5 }}
                      className="h-full bg-primary/40"
                    />
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
