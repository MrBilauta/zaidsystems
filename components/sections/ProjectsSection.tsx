"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Code, ExternalLink, Activity } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    slug: "ai-debate-bot",
    title: "AI Debate Bot",
    description: "Multi-agent LLM system capable of deep logical reasoning and real-time structured debate. Implements advanced conversational memory and dynamic persona adaptation.",
    architecture: "Microservices with asynchronous task queues",
    tags: ["Python", "LangChain", "OpenAI", "Redis"],
    github: "https://github.com/mrbilauta",
    demo: "#",
  },
  {
    slug: "rust-micropayment-api",
    title: "Rust Micropayment API",
    description: "High-throughput, low-latency API designed for processing thousands of transactions per second with strict safety guarantees and fault tolerance.",
    architecture: "Event-driven, lock-free concurrency",
    tags: ["Rust", "Actix Web", "PostgreSQL", "Docker"],
    github: "https://github.com/mrbilauta",
    demo: "#",
  },
  {
    slug: "ai-automation-studio",
    title: "AI Automation Studio",
    description: "Visual node-based orchestration platform for building and deploying intelligent agent workflows without writing complex code.",
    architecture: "React frontend with scalable Python executor backend",
    tags: ["Next.js", "FastAPI", "React Flow", "Celery"],
    github: "https://github.com/mrbilauta",
    demo: "#",
  },
  {
    slug: "ecommerce-analytics",
    title: "E-commerce Analytics Dashboard",
    description: "Real-time pipeline aggregating millions of events to provide instant insights into conversion metrics and operational bottlenecks.",
    architecture: "Stream processing architecture",
    tags: ["Next.js", "Go", "Kafka", "ClickHouse"],
    github: "https://github.com/mrbilauta",
    demo: "#",
  },
  {
    slug: "trading-signals",
    title: "AI Trading Signal System",
    description: "Real-time market analysis engine utilizing advanced sentiment analysis and pattern recognition to generate high-confidence trading signals.",
    architecture: "Event-driven microservices with GPU-accelerated inference",
    tags: ["Python", "PyTorch", "WebSocket", "Redis"],
    github: "https://github.com/mrbilauta",
    demo: "#",
  },
  {
    slug: "monitoring-dashboard",
    title: "Enterprise Monitoring Dashboard",
    description: "High-density infrastructure monitoring platform providing real-time telemetry, log aggregation, and predictive anomaly detection.",
    architecture: "Unified observability stack with custom alerting engine",
    tags: ["Next.js", "Rust", "InfluxDB", "Grafana API"],
    github: "https://github.com/mrbilauta",
    demo: "#",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      <div className="section-container relative z-10">
        <FadeIn>
          <div className="mb-20 flex flex-col md:flex-row items-center md:items-end justify-between text-center md:text-left gap-6">
            <div className="max-w-2xl">
              <h2>
                Featured <span className="text-primary">Systems</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground/90 md:text-xl">
                Architectural showcases of production-grade AI infrastructure and high-performance backend systems.
              </p>
            </div>
            <div className="hidden sm:block">
              <Link href="https://github.com/mrbilauta" target="_blank" className={cn(buttonVariants({ variant: "outline", className: "h-12 gap-2 border-white/10 bg-white/[0.03] backdrop-blur-md px-6" }))}>
                <Code className="h-4 w-4" />
                Explore Documentation
              </Link>
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-2">
          {projects.map((project, idx) => (
            <SlideUp key={project.title} delay={idx * 0.1}>
              <SpotlightCard className="group h-full p-0 border-white/10 bg-white/[0.01]">
                <div className="relative flex h-full flex-col justify-between p-10 sm:p-12">
                  <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10">
                    <span className="sr-only">View Case Study</span>
                  </Link>
                  <div className="relative z-20">
                    <div className="mb-8 flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-primary">
                        <Activity className="h-5 w-5 animate-pulse" />
                        <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase">Status: Production</span>
                      </div>
                      <div className="flex gap-4">
                        <Link href={project.github} target="_blank" className="text-white/40 hover:text-white transition-all relative z-30 transform hover:scale-110">
                          <Code className="h-6 w-6" />
                        </Link>
                        <Link href={project.demo} target="_blank" className="text-white/40 hover:text-white transition-all relative z-30 transform hover:scale-110">
                          <ExternalLink className="h-6 w-6" />
                        </Link>
                      </div>
                    </div>
                    
                    <h3 className="mb-4 text-3xl font-bold text-white group-hover:text-primary transition-colors tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mb-8 text-lg text-muted-foreground/80 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="mb-10 rounded-xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                        <p className="text-sm font-mono text-white/60 leading-relaxed">
                          <span className="text-primary/90 font-bold mr-2 uppercase tracking-tighter">System Topology:</span>
                          {project.architecture}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2.5 mt-auto relative z-20">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 text-white/70 border-white/10 px-3 py-1 text-xs font-medium">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
}
