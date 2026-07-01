import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Zap, Shield, GitMerge } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const caseStudies = [
  {
    slug: "ai-debate-bot",
    title: "AI Debate Bot",
    subtitle: "Multi-Agent Structured Reasoning",
    description: "A comprehensive multi-agent LLM system capable of deep logical reasoning and real-time structured debate.",
    tags: ["Python", "LangChain", "OpenAI"],
    icon: <Zap className="w-5 h-5" />
  },
  {
    slug: "rust-micropayment-api",
    title: "Rust Micropayment API",
    subtitle: "High-Throughput Financial Engine",
    description: "High-throughput, low-latency API designed for processing thousands of transactions per second.",
    tags: ["Rust", "Actix Web", "PostgreSQL"],
    icon: <GitMerge className="w-5 h-5" />
  },
  {
    slug: "ai-automation-studio",
    title: "AI Automation Studio",
    subtitle: "Visual Node-Based Orchestration",
    description: "Visual node-based orchestration platform for building and deploying intelligent agent workflows.",
    tags: ["Next.js", "FastAPI", "React Flow"],
    icon: <Code className="w-5 h-5" />
  },
  {
    slug: "ecommerce-analytics",
    title: "E-commerce Analytics",
    subtitle: "Real-time Event Streaming",
    description: "Real-time pipeline aggregating millions of events to provide instant insights into conversion metrics.",
    tags: ["Go", "Kafka", "ClickHouse"],
    icon: <Zap className="w-5 h-5" />
  },
  {
    slug: "trading-signals",
    title: "AI Trading Signal System",
    subtitle: "Sentiment-Driven Market Intel",
    description: "Real-time market analysis engine utilizing advanced sentiment analysis to generate trading signals.",
    tags: ["Python", "PyTorch", "Redis"],
    icon: <Shield className="w-5 h-5" />
  },
  {
    slug: "monitoring-dashboard",
    title: "Enterprise Monitoring",
    subtitle: "Infrastructure Observability",
    description: "High-density infrastructure monitoring platform providing real-time telemetry and anomaly detection.",
    tags: ["Next.js", "Rust", "InfluxDB"],
    icon: <Shield className="w-5 h-5" />
  }
];

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary/30">
      <Navbar />
      
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-fade opacity-40 pointer-events-none" />
        <div className="section-container relative z-10">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white">
              Systems <span className="text-primary">Architecture</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl leading-relaxed mb-16">
              A collection of production-grade systems, distributed architectures, and AI-native platforms engineered for extreme scale and reliability.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((project, i) => (
              <SlideUp key={project.slug} delay={i * 0.1}>
                <Link 
                  href={`/projects/${project.slug}`}
                  className="group block relative p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-primary/40 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden h-full"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    {project.icon}
                  </div>
                  
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-white/5 text-[9px] font-mono border-white/5 uppercase tracking-widest">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-primary/80 font-mono text-[10px] uppercase tracking-[0.2em] mb-4">
                    {project.subtitle}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover:text-primary transition-colors">
                    Analyze Protocol <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
