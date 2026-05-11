"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { Server, Database, Zap, Cpu } from "lucide-react";
import Link from "next/link";

const principles = [
  {
    title: "Scalable Infrastructure",
    description: "Designing systems that handle high throughput and seamless scaling without compromising performance.",
    icon: Server,
  },
  {
    title: "Intelligent Automation",
    description: "Replacing manual overhead with deterministic, AI-driven workflows and continuous integration pipelines.",
    icon: Zap,
  },
  {
    title: "Robust Data Pipelines",
    description: "Architecting resilient data flow architectures for real-time analytics and machine learning applications.",
    icon: Database,
  },
  {
    title: "AI Integration",
    description: "Embedding large language models and neural networks directly into production application logic.",
    icon: Cpu,
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative section-padding overflow-hidden">
      <div className="section-container relative z-10">
        <FadeIn>
          <div className="mb-20 flex flex-col items-center text-center">
            <h2 className="max-w-3xl">
              Engineering <span className="text-primary">Philosophy</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground/90 md:text-xl">
              As the founder of <strong>Zaid Systems</strong>, I specialize in bridging the gap between cutting-edge AI models and highly reliable enterprise systems.
            </p>
            <div className="mt-8">
              <Link href="/about-mohammed-zaid-khan" className="text-sm font-mono text-primary hover:underline uppercase tracking-widest font-bold">
                Official Entity Record &gt;
              </Link>
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, index) => (
            <SlideUp key={index} delay={index * 0.1}>
              <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-primary/50 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(var(--primary),0.1)]">
                <div>
                  <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-3.5 text-primary ring-1 ring-primary/20">
                    <principle.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">
                    {principle.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground/80">
                    {principle.description}
                  </p>
                </div>
              </div>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
}
