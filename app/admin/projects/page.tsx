import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { 
  Plus, 
  Search, 
  ExternalLink,
  GitBranch,
  Globe,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Eye,
  GripVertical
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const projects = [
  { id: "1", title: "AI Multi-Agent Platform", status: "active", views: "1.2k", tech: ["Rust", "Python", "gRPC"], featured: true },
  { id: "2", title: "Rust Payment Infrastructure", status: "active", views: "840", tech: ["Rust", "PostgreSQL"], featured: true },
  { id: "3", title: "AI Workflow Automation", status: "paused", views: "320", tech: ["Next.js", "OpenAI"], featured: false },
];

export default function ProjectsAdminPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">Project <span className="text-primary">Gallery</span></h1>
            <p className="mt-2 text-white/40 font-medium">Manage your engineering showcase and system architectures.</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
            <Plus className="w-5 h-5" />
            ADD SYSTEM
          </button>
        </div>
      </FadeIn>

      <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-4 text-[10px] font-mono text-white/40 uppercase tracking-widest w-12"></th>
                <th className="px-8 py-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">Architecture Name</th>
                <th className="px-8 py-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">Stack</th>
                <th className="px-8 py-4 text-[10px] font-mono text-white/40 uppercase tracking-widest text-center">Visibility</th>
                <th className="px-8 py-4 text-[10px] font-mono text-white/40 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((project) => (
                <tr key={project.id} className="group hover:bg-white/[0.03] transition-colors">
                  <td className="px-8 py-6 text-white/20 hover:text-white cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-4 h-4" />
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-bold group-hover:text-primary transition-colors">{project.title}</span>
                        {project.featured && (
                          <span className="text-[9px] font-bold text-primary uppercase mt-1">FEATURED PROJECT</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map(t => (
                        <span key={t} className="text-[9px] font-mono bg-white/5 border border-white/5 px-2 py-0.5 rounded text-white/40">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      project.status === "active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    )}>
                      {project.status === "active" ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {project.status}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                        <GitBranch className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
