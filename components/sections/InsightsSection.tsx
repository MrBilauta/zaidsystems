"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    title: "Building Deterministic AI Workflows",
    date: "May 12, 2026",
    readTime: "8 min read",
    category: "AI Engineering",
    description: "Why probabilistic models need deterministic wrappers in production environments, and how to architect them using Python and state machines.",
  },
  {
    title: "Rust for Backend Optimization",
    date: "April 28, 2026",
    readTime: "12 min read",
    category: "Systems",
    description: "A deep dive into migrating CPU-bound microservices from Node.js to Rust, achieving 10x throughput with lower memory footprint.",
  },
  {
    title: "The Reality of Scalable Automation",
    date: "April 05, 2026",
    readTime: "6 min read",
    category: "Infrastructure",
    description: "Lessons learned from automating critical business operations at scale. When to use queues, when to use cron, and when to rethink the process.",
  },
];

export function InsightsSection() {
  return (
    <section className="relative section-padding bg-background border-t border-white/5 overflow-hidden">
      <div className="section-container relative z-10">
        <FadeIn>
          <div className="mb-20 flex flex-col md:flex-row items-center md:items-end justify-between text-center md:text-left gap-6">
            <div className="max-w-2xl">
              <h2>
                Engineering <span className="text-primary">Insights</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground/90 md:text-xl">
                Technical deep-dives on systems architecture, automation strategies, and the integration of AI models into production.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article, idx) => (
            <SlideUp key={idx} delay={idx * 0.1}>
              <Link href="#" className="block h-full group">
                <SpotlightCard className="h-full p-8 flex flex-col border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500">
                  <div className="mb-6 flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span>{article.category}</span>
                    <span className="opacity-20">/</span>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <h3 className="mb-4 text-2xl font-bold text-white group-hover:text-primary transition-colors tracking-tight">
                    {article.title}
                  </h3>
                  
                  <p className="mb-10 text-base text-muted-foreground/80 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5 text-sm">
                    <span className="text-white/30 font-mono text-xs">{article.date}</span>
                    <span className="text-primary flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] group-hover:gap-3 transition-all duration-300">
                      Read Analysis <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </SpotlightCard>
              </Link>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
}
