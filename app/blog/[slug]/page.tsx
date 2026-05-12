import { getPostBySlug, getAllPosts } from "@/lib/content/posts";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Calendar, Clock, ChevronRight, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Mermaid from "@/components/mdx/Mermaid";
import { 
  ArchitectureDiagram, 
  TradeoffBox, 
  EngineeringInsight, 
  SecurityWarning, 
  PerformanceBenchmark, 
  FAQAccordion, 
  CodeComparison 
} from "@/components/mdx";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Zaid Systems`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Mohammed Zaid Khan"],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary/30">
      <Navbar />
      
      <article className="relative pt-40 pb-24 overflow-hidden">
        <div className="section-container relative z-10">
          {/* Breadcrumbs */}
          <FadeIn>
            <nav className="flex items-center gap-2 text-xs font-mono text-white/40 mb-12 uppercase tracking-widest">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/60 truncate max-w-[200px]">{post.title}</span>
            </nav>
          </FadeIn>

          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Sidebar Content */}
            <aside className="lg:col-span-3 order-2 lg:order-1 sticky top-32 space-y-12">
              <div className="space-y-6">
                <p className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.2em] border-b border-primary/20 pb-2">Article Metadata</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-white/40" />
                    <div>
                      <p className="text-[10px] text-white/40 uppercase font-mono">Published</p>
                      <p className="text-sm font-bold text-white/80">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-white/40" />
                    <div>
                      <p className="text-[10px] text-white/40 uppercase font-mono">Reading Time</p>
                      <p className="text-sm font-bold text-white/80">{post.readTime || '15 min read'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <button className="flex items-center gap-2 text-[10px] font-bold text-white/60 hover:text-primary transition-all uppercase tracking-widest group">
                  <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Share Insight
                </button>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <FadeIn delay={0.2}>
                <div className="mb-12">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-6">
                    {post.category}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-8">
                    {post.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground/80 leading-relaxed font-medium max-w-4xl italic border-l-4 border-primary pl-6 py-2">
                    {post.description}
                  </p>
                </div>
              </FadeIn>

              <div className="prose prose-invert prose-xl max-w-none prose-headings:tracking-tighter prose-headings:font-bold prose-p:text-muted-foreground/90 prose-p:leading-relaxed prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none prose-img:rounded-3xl prose-img:shadow-2xl prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSlug, rehypeHighlight]}
                  components={{
                    code({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode }) {
                      const match = /language-(\w+)/.exec(className || "");
                      if (!inline && match && match[1] === "mermaid") {
                        return <Mermaid chart={String(children).replace(/\n$/, "")} />;
                      }
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    ArchitectureDiagram,
                    TradeoffBox,
                    EngineeringInsight,
                    SecurityWarning,
                    PerformanceBenchmark,
                    FAQAccordion,
                    CodeComparison
                  } as any}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              <div className="mt-20 pt-10 border-t border-white/5">
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-white/40 hover:text-primary transition-all group">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Back to Insights
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
