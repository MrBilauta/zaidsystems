import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insights & Engineering Blog",
  description: "Technical articles on AI systems engineering, backend optimization, and the future of automation by Mohammed Zaid Khan.",
  alternates: {
    canonical: "/blog",
  },
};

const posts = [
  {
    title: "The Architecture of Scalable AI Multi-Agent Platforms",
    excerpt: "Exploring the challenges and solutions in building distributed LLM orchestration layers for enterprise workflows.",
    date: "May 10, 2026",
    slug: "ai-systems-engineering",
    tags: ["AI", "Architecture", "Orchestration"]
  },
  {
    title: "Optimizing High-Throughput APIs with Rust and gRPC",
    excerpt: "How switching to a memory-safe, compiled language transformed our system throughput by 15x while reducing latency.",
    date: "April 28, 2026",
    slug: "backend-optimization-rust",
    tags: ["Rust", "Backend", "Performance"]
  },
  {
    title: "The Future of Autonomous Engineering Workflows",
    excerpt: "Predictive analysis on how AI agents will redefine CI/CD and infrastructure management in the next 5 years.",
    date: "April 15, 2026",
    slug: "future-of-automation",
    tags: ["Automation", "Future", "DevOps"]
  }
];

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="section-container relative z-10">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white">
              Engineering <span className="text-primary">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground/90 max-w-2xl mb-16 leading-relaxed">
              Deep dives into AI systems, backend architecture, and the future of autonomous technology.
            </p>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, idx) => (
              <SlideUp key={post.slug} delay={idx * 0.1}>
                <Link href={`/blog/${post.slug}`}>
                  <SpotlightCard className="h-full p-8 border-white/10 bg-white/[0.02] hover:border-primary/40 transition-colors">
                    <div className="text-xs font-mono text-primary font-bold uppercase tracking-widest mb-4">
                      {post.date}
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground/80 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-white/40 border border-white/10 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
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
