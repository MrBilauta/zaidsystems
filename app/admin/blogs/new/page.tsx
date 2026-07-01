"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Editor } from "@/components/admin/Editor";
import { 
  ArrowLeft, 
  Save, 
  Sparkles, 
  Search, 
  Loader2,
  FileText,
  AlertCircle,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { createPost } from "@/app/actions/blog";
import { useRouter } from "next/navigation";

export default function NewBlogPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [activeTab, setActiveTab] = useState("edit");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    category: "AI Infrastructure",
    metaTitle: "",
    metaDescription: "",
    status: "DRAFT"
  });

  const handleSave = async () => {
    if (!formData.title || !content) return;
    setLoading(true);
    try {
      await createPost({
        ...formData,
        content,
        slug: formData.slug || formData.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
      });
      router.push("/admin/blogs");
    } catch (error) {
      console.error("Save failed", error);
    } finally {
      setLoading(false);
    }
  };

  const runAiAction = async (action: string) => {
    setAiLoading(action);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        body: JSON.stringify({
          action,
          context: {
            title: formData.title,
            content: content.slice(0, 5000),
            category: formData.category
          }
        })
      });
      const data = await res.json();
      if (data.status === "queued") {
        // In a real app, we'd poll or use SSE/WebSockets
        // For now, we'll just show a "queued" state
        alert("Optimization task queued in background infrastructure.");
      }
    } catch (err) {
      console.error("AI Action failed", err);
    } finally {
      setAiLoading(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/blogs" className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tighter text-white">Draft: <span className="text-white/40">{formData.title || "Untitled Article"}</span></h1>
              <div className="flex items-center gap-2 text-[10px] font-mono text-white/20 uppercase mt-1">
                <span>{loading ? "SAVING..." : "NOT SAVED"}</span>
                <span className="w-1 h-1 rounded-full bg-white/10" />
                <span className="text-primary">AI ASSISTANT ACTIVE</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleSave}
              disabled={loading || !formData.title}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              SAVE AS DRAFT
            </button>
          </div>
        </div>
      </FadeIn>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-1 bg-white/[0.02] border border-white/10 p-1 rounded-xl w-fit">
            <TabButton active={activeTab === "edit"} onClick={() => setActiveTab("edit")} icon={FileText} label="Content" />
            <TabButton active={activeTab === "seo"} onClick={() => setActiveTab("seo")} icon={Search} label="SEO & GEO" />
          </div>

          {activeTab === "edit" && (
            <div className="space-y-6">
              <input 
                type="text" 
                placeholder="Enter article title..." 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-transparent text-4xl md:text-5xl font-bold tracking-tighter text-white placeholder:text-white/10 border-none focus:outline-none"
              />
              <p className="mt-2 text-white/40 font-medium italic">
                &quot;AI is not a replacement for engineering, it is an amplification of it.&quot;
              </p>
              <div className="flex items-center gap-3">
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/60 focus:outline-none"
                >
                  <option>AI Infrastructure</option>
                  <option>Systems Engineering</option>
                  <option>Backend Optimization</option>
                </select>
              </div>
              <Editor content={content} onChange={setContent} />
            </div>
          )}

          {activeTab === "seo" && (
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-8 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" /> SEO & Entity Management
                </h3>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Article Slug</label>
                  <input 
                    type="text" 
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    placeholder="ai-architecture-optimization"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary/30 transition-all font-mono" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Meta Description</label>
                  <textarea 
                    rows={3} 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary/30 transition-all resize-none" 
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 sticky top-8">
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="w-5 h-5" />
                <span className="font-bold text-sm">AI Content Studio</span>
              </div>
            </div>

            <div className="space-y-3">
              <AIAction 
                label="Generate Title Variations" 
                loading={aiLoading === "generate_title"}
                onClick={() => runAiAction("generate_title")} 
              />
              <AIAction 
                label="Draft SEO Description" 
                loading={aiLoading === "generate_meta"}
                onClick={() => runAiAction("generate_meta")} 
              />
              <AIAction 
                label="GEO Authority Check" 
                loading={aiLoading === "seo_optimize"}
                onClick={() => runAiAction("seo_optimize")} 
              />
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-white/40 mt-0.5" />
                <p className="text-[10px] text-white/40 leading-relaxed font-medium">
                  AI suggestions are processed in background infrastructure. Results will appear in the draft revisions list once ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: React.ComponentType<{ className?: string }>, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all",
        active ? "bg-white/10 text-white shadow-xl" : "text-white/40 hover:text-white/60"
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

function AIAction({ label, onClick, loading }: { label: string, onClick: () => void, loading: boolean }) {
  return (
    <button 
      onClick={onClick}
      disabled={loading}
      className="w-full flex items-center justify-between p-3.5 rounded-xl bg-black/30 border border-white/5 hover:border-primary/30 transition-all group disabled:opacity-50"
    >
      <span className="text-xs text-white/80 font-medium group-hover:text-white transition-colors">{label}</span>
      {loading ? <Loader2 className="w-4 h-4 text-primary animate-spin" /> : <ChevronRight className="w-4 h-4 text-primary/40 group-hover:text-primary transition-all group-hover:translate-x-0.5" />}
    </button>
  );
}
