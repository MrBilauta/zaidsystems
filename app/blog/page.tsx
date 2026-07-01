import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { getAllPosts, UnifiedPost } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Insights | Zaid Systems",
  description: "Deep technical analysis of AI infrastructure, distributed systems, and automation architecture by Mohammed Zaid Khan.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="section-container relative z-10">
          <FadeIn>
            <div className="mb-20">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white">
                Engineering <span className="text-primary">Insights</span>
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground/90 md:text-xl leading-relaxed">
                Technical deep-dives on systems architecture, automation strategies, and the integration of AI models into mission-critical production.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: UnifiedPost, idx: number) => (
              <SlideUp key={post.slug} delay={idx * 0.1}>
                <Link href={`/blog/${post.slug}`} className="block h-full group">
                  <SpotlightCard className="h-full p-8 flex flex-col border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 rounded-3xl">
                    <div className="mb-6 flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
                      <span className="text-primary">{post.category}</span>
                      <span className="opacity-20">/</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime || '15 min read'}</span>
                    </div>
                    
                    <h3 className="mb-4 text-2xl font-bold text-white group-hover:text-primary transition-colors tracking-tight line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="mb-10 text-base text-muted-foreground/80 leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5 text-sm">
                      <div className="flex items-center gap-2 text-white/30 font-mono text-[10px] uppercase">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
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
      <Footer />
    </main>
  );
}
