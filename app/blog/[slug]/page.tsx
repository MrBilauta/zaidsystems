import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { JsonLd } from "@/components/seo/JsonLd";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";

interface Post {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
}

const posts: Record<string, Post> = {
  "ai-systems-engineering": {
    title: "The Architecture of Scalable AI Multi-Agent Platforms",
    description: "Deep dive into building distributed LLM orchestration layers for enterprise workflows.",
    date: "May 10, 2026",
    author: "Mohammed Zaid Khan",
    tags: ["AI", "Architecture", "Orchestration"],
    content: "Building multi-agent systems requires more than just calling an API. It requires a resilient orchestration layer, state management, and asynchronous task execution..."
  },
  "backend-optimization-rust": {
    title: "Optimizing High-Throughput APIs with Rust and gRPC",
    description: "How memory safety and zero-cost abstractions redefine backend performance.",
    date: "April 28, 2026",
    author: "Mohammed Zaid Khan",
    tags: ["Rust", "Backend", "Performance"],
    content: "Rust provides the performance of C++ with the safety of a high-level language. In this article, we explore how gRPC and Rust can handle 100k+ requests per second..."
  },
  "future-of-automation": {
    title: "The Future of Autonomous Engineering Workflows",
    description: "How AI agents will redefine CI/CD and infrastructure management.",
    date: "April 15, 2026",
    author: "Mohammed Zaid Khan",
    tags: ["Automation", "Future", "DevOps"],
    content: "The next 5 years will see a shift from human-in-the-loop to autonomous agents managing the entire software lifecycle..."
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": post.title,
    "description": post.description,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://www.zaidsystems.dev"
    },
    "datePublished": post.date,
    "image": "https://www.zaidsystems.dev/og-image.jpg",
    "publisher": {
      "@type": "Organization",
      "name": "Zaid Systems",
      "logo": "https://www.zaidsystems.dev/logo.png"
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <JsonLd data={articleSchema} />
      <Navbar />
      
      <article className="relative pt-40 pb-24 overflow-hidden">
        <div className="section-container relative z-10 max-w-3xl">
          <FadeIn>
            <Link href="/blog" className="group inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-white/40 hover:text-primary transition-all mb-12">
              <ArrowLeft className="mr-3 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Insights
            </Link>
            
            <div className="flex flex-wrap gap-4 mb-8 items-center text-xs font-mono text-white/40 uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> {post.date}
              </span>
              <span className="mx-2 opacity-20">|</span>
              <span className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" /> {post.tags.join(", ")}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 text-white leading-tight">
              {post.title}
            </h1>
          </FadeIn>

          <SlideUp delay={0.2}>
            <div className="prose prose-invert prose-lg max-w-none text-muted-foreground/90 leading-relaxed border-t border-white/10 pt-12">
              <p className="text-xl text-white font-medium mb-8">
                {post.description}
              </p>
              <div className="whitespace-pre-wrap">
                {post.content}
              </div>
              <div className="mt-20 p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
                <h3 className="text-white mt-0">About the Author</h3>
                <p className="mb-0">
                  Mohammed Zaid Khan is the founder of Zaid Systems and an expert in AI infrastructure. He specializes in building high-performance automation systems and distributed backends.
                </p>
              </div>
            </div>
          </SlideUp>
        </div>
      </article>

      <Footer />
    </main>
  );
}
