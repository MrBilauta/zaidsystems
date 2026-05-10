"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { Database, Server, Cpu, Globe, Workflow, Activity } from "lucide-react";
import { motion } from "framer-motion";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="relative section-padding bg-black/40 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      
      <div className="section-container relative z-10">
        <FadeIn>
          <div className="mb-20 text-center flex flex-col items-center">
            <h2>
              Systems <span className="text-primary">Topology</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground/90 md:text-xl">
              Production-grade architecture optimized for high-throughput AI orchestration, resilient event-driven pipelines, and observable data persistence.
            </p>
          </div>
        </FadeIn>

        <SlideUp delay={0.2}>
          <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-12 glass backdrop-blur-2xl relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 py-12">
              
              {/* Complex SVG Animated Topology Background */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" preserveAspectRatio="none" viewBox="0 0 1000 400">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>

                {/* Ingress to Gateway */}
                <path d="M 120 200 L 350 200" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <motion.path 
                  d="M 120 200 L 350 200" 
                  fill="none" stroke="url(#lineGradient)" strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Gateway to AI Nodes */}
                <path d="M 450 180 C 550 100, 650 100, 750 100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <motion.path 
                  d="M 450 180 C 550 100, 650 100, 750 100" 
                  fill="none" stroke="rgba(var(--primary), 0.5)" strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0.5 }}
                />

                {/* Gateway to Monitoring */}
                <path d="M 450 180 Q 550 50, 750 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <motion.path 
                  d="M 450 180 Q 550 50, 750 50" 
                  fill="none" stroke="rgba(var(--accent), 0.4)" strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 0.8 }}
                />

                {/* AI to Event connection */}
                <path d="M 750 120 L 750 180" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <motion.path 
                  d="M 750 120 L 750 180" 
                  fill="none" stroke="var(--primary)" strokeWidth="1" strokeOpacity="0.2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </svg>

              {/* Node 1: Ingress / Edge */}
              <div className="flex flex-col items-center gap-6 z-10">
                <div className="h-28 w-28 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 shadow-[0_0_50px_rgba(255,255,255,0.05)] backdrop-blur-xl group hover:border-white/20 transition-all duration-500 relative">
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-ping" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full" />
                  <Globe className="h-12 w-12 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-white tracking-tight uppercase">Ingress Layer</h4>
                  <p className="text-xs font-mono text-muted-foreground mt-2 uppercase tracking-[0.2em] opacity-70">Cloudflare / Next.js</p>
                </div>
              </div>

              {/* Node 2: Core Gateway */}
              <div className="flex flex-col items-center gap-6 z-10 scale-110">
                <div className="h-32 w-32 rounded-[2rem] bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_80px_rgba(var(--primary),0.3)] backdrop-blur-xl group hover:border-primary/60 transition-all duration-500 relative overflow-hidden">
                   <motion.div 
                    className="absolute inset-0 bg-primary/20"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                   />
                  <Server className="h-14 w-14 group-hover:scale-110 transition-transform duration-500 relative z-10" />
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-white tracking-tight uppercase">Core API Gateway</h4>
                  <p className="text-xs font-mono text-muted-foreground mt-2 uppercase tracking-[0.2em] opacity-70 underline decoration-primary/30 underline-offset-4">Rust / gRPC / Auth</p>
                </div>
              </div>

              {/* Node 3: Infrastructure Clusters */}
              <div className="flex flex-col gap-5 z-10 w-full sm:w-auto">
                {/* AI Cluster */}
                <div className="flex items-center gap-6 p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl hover:border-accent/40 transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-4 bg-accent/20 rounded-2xl text-accent border border-accent/20 group-hover:bg-accent/30 transition-colors shadow-[0_0_20px_rgba(var(--accent),0.1)]">
                    <Cpu className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white uppercase tracking-tight">AI Orchestration</h4>
                    <p className="text-xs font-mono text-muted-foreground mt-1 uppercase tracking-wider opacity-60">LangChain / Inference</p>
                  </div>
                </div>

                {/* Event Cluster */}
                <div className="flex items-center gap-6 p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl hover:border-primary/40 transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-4 bg-primary/20 rounded-2xl text-primary border border-primary/20 group-hover:bg-primary/30 transition-colors shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                    <Workflow className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white uppercase tracking-tight">Event Pipeline</h4>
                    <p className="text-xs font-mono text-muted-foreground mt-1 uppercase tracking-wider opacity-60">Kafka / Redis PubSub</p>
                  </div>
                </div>

                {/* Persistence Cluster */}
                <div className="flex items-center gap-6 p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl hover:border-blue-500/40 transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-4 bg-blue-500/20 rounded-2xl text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/30 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                    <Database className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white uppercase tracking-tight">Persistence</h4>
                    <p className="text-xs font-mono text-muted-foreground mt-1 uppercase tracking-wider opacity-60">Postgres / ClickHouse</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-16 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground uppercase tracking-[0.3em] font-bold">
                <span className="flex h-2 w-2 rounded-full bg-green-500" />
                Connectivity: [STABLE]
                <span className="mx-2 opacity-20">|</span>
                <Activity className="h-4 w-4 text-primary animate-pulse" />
                Live Nodes: 42 Active
              </div>
              <div className="flex gap-4">
                <code className="text-xs text-primary/80 bg-primary/5 px-4 py-2 rounded-xl font-mono border border-primary/10 uppercase tracking-tighter">
                  throughput: 10k req/s
                </code>
                <code className="text-xs text-accent/80 bg-accent/5 px-4 py-2 rounded-xl font-mono border border-accent/10 uppercase tracking-tighter">
                  latency: 2ms P99
                </code>
              </div>
            </div>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
