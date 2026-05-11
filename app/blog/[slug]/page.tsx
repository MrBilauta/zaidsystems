import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { JsonLd } from "@/components/seo/JsonLd";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fs from "fs/promises";
import path from "path";

interface Post {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  filename: string;
  category: string;
}

const posts: Record<string, Post> = {
  "ai-systems-engineering": {
    title: "The Architecture of Scalable AI Multi-Agent Platforms",
    description: "Deep dive into building distributed LLM orchestration layers for enterprise workflows.",
    date: "May 10, 2026",
    author: "Mohammed Zaid Khan",
    tags: ["AI", "Architecture", "Orchestration"],
    filename: "ai-systems-engineering.md",
    category: "AI Infrastructure",
  },
  "backend-optimization-rust": {
    title: "Optimizing High-Throughput APIs with Rust and gRPC",
    description: "How memory safety and zero-cost abstractions redefine backend performance.",
    date: "April 28, 2026",
    author: "Mohammed Zaid Khan",
    tags: ["Rust", "Backend", "Performance"],
    filename: "backend-optimization-rust.md",
    category: "Systems Engineering",
  },
  "future-of-automation": {
    title: "The Future of Autonomous Engineering Workflows",
    description: "How AI agents will redefine CI/CD and infrastructure management.",
    date: "April 15, 2026",
    author: "Mohammed Zaid Khan",
    tags: ["Automation", "Future", "DevOps"],
    filename: "future-of-automation.md",
    category: "Automation & Future",
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

  let content = "";
  try {
    const filePath = path.join(process.cwd(), "content", "blog", post.filename);
    content = await fs.readFile(filePath, "utf-8");
  } catch (error) {
    console.error("Error reading blog post:", error);
    content = "Content loading error. Please check back later.";
  }

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
        <div className="section-container relative z-10 max-w-4xl">
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
                <Tag className="h-4 w-4 text-primary" /> {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-12 text-white leading-[1.1]">
              {post.title}
            </h1>
          </FadeIn>

          <SlideUp delay={0.2}>
            <div className="prose prose-invert prose-xl max-w-none text-muted-foreground/90 leading-relaxed border-t border-white/10 pt-12">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ ...props }) => <h1 className="text-white text-5xl font-bold mt-16 mb-8 tracking-tighter" {...props} />,
                  h2: ({ ...props }) => <h2 className="text-white text-3xl font-bold mt-16 mb-6 border-l-4 border-primary pl-6" {...props} />,
                  h3: ({ ...props }) => <h3 className="text-white text-xl font-bold mt-10 mb-4" {...props} />,
                  p: ({ ...props }) => <p className="mb-8 leading-loose" {...props} />,
                  ul: ({ ...props }) => <ul className="list-disc pl-8 mb-8 space-y-4" {...props} />,
                  ol: ({ ...props }) => <ol className="list-decimal pl-8 mb-8 space-y-4" {...props} />,
                  code: ({ ...props }) => <code className="bg-white/5 px-1.5 py-0.5 rounded font-mono text-primary text-sm" {...props} />,
                  pre: ({ ...props }) => (
                    <pre className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-10 overflow-x-auto font-mono text-sm leading-relaxed" {...props} />
                  ),
                  blockquote: ({ ...props }) => (
                    <blockquote className="border-l-4 border-white/20 pl-8 italic my-12 text-white/70" {...props} />
                  ),
                  a: ({ ...props }) => (
                    <a className="text-primary hover:underline inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer" {...props}>
                      {props.children} <ExternalLink className="h-3 w-3" />
                    </a>
                  ),
                  hr: () => <hr className="border-white/10 my-20" />,
                }}
              >
                {content}
              </ReactMarkdown>

              <div className="mt-32 p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:bg-primary/10 transition-colors" />
                <h3 className="text-white mt-0 text-2xl mb-6">About the Author</h3>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <p className="text-lg leading-relaxed mb-6">
                      <strong>Mohammed Zaid Khan</strong> is an AI Systems Developer and founder of <strong>Zaid Systems</strong>, specializing in scalable backend infrastructure, AI orchestration systems, distributed architectures, and intelligent automation engineering.
                    </p>
                    <div className="flex gap-6">
                      <Link href="https://linkedin.com/in/khanmohammedzaid" className="text-sm font-bold text-primary hover:text-white transition-colors">LinkedIn</Link>
                      <Link href="https://github.com/mrbilauta" className="text-sm font-bold text-primary hover:text-white transition-colors">GitHub</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SlideUp>
        </div>
      </article>

      <Footer />
    </main>
  );
}
