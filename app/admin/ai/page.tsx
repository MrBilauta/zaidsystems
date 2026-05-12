import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { 
  Bot, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  Database,
  Cpu,
  History
} from "lucide-react";
import { prisma } from "@/lib/db/client";
import { requireAdmin } from "@/lib/auth/guard";
import { cn } from "@/lib/utils";
import Link from "next/link";

/**
 * Zaid Systems — AI Studio Admin
 * Real-time monitoring of background AI generation tasks.
 */

async function getAiUsage() {
  try {
    return await prisma.aiUsage.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { user: { select: { name: true, email: true } } },
    });
  } catch {
    return [];
  }
}

export default async function AiStudioPage() {
  await requireAdmin();
  const usage = await getAiUsage();

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">AI Content <span className="text-primary">Studio</span></h1>
            <p className="mt-2 text-white/40 font-medium">Review, approve, and deploy AI-assisted technical architecture content.</p>
          </div>
          <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary tracking-widest uppercase">Infrastructure: Scale Active</span>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Generations", value: usage.length.toString(), icon: Cpu },
          { label: "Tokens Consumed", value: usage.reduce((acc, curr) => acc + curr.tokensUsed, 0).toLocaleString(), icon: Database },
          { label: "Approval Rate", value: usage.length > 0 ? `${Math.round((usage.filter(u => u.approved).length / usage.length) * 100)}%` : "0%", icon: CheckCircle2 },
          { label: "Pending Review", value: usage.filter(u => !u.approved).length.toString(), icon: Clock },
        ].map((item) => (
          <SlideUp key={item.label}>
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 group hover:bg-white/[0.04] transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <item.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-sm font-bold text-white font-mono">{item.value}</p>
            </div>
          </SlideUp>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 px-2">
          <History className="w-5 h-5 text-primary" /> Generation Pipeline
        </h2>
        
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-8 py-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">Protocol</th>
                  <th className="px-8 py-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">Intent</th>
                  <th className="px-8 py-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">Tokens</th>
                  <th className="px-8 py-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-[10px] font-mono text-white/40 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {usage.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-white/20 text-sm">
                      <Bot className="w-8 h-8 mx-auto mb-3 opacity-20" />
                      No AI generations found in history.
                    </td>
                  </tr>
                ) : (
                  usage.map((item) => (
                    <tr key={item.id} className="group hover:bg-white/[0.03] transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{item.action.replace(/_/g, ' ').toUpperCase()}</p>
                            <p className="text-[10px] font-mono text-white/30 uppercase tracking-tighter">{item.model}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 max-w-xs">
                        <p className="text-xs text-white/60 truncate italic">
                          &quot;{item.prompt?.slice(0, 80)}...&quot;
                        </p>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-[10px] font-mono text-white/40">{item.tokensUsed} tx</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                          item.approved ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                        )}>
                          {item.approved ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {item.approved ? "Approved" : "Pending"}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Link 
                          href={`/admin/ai/${item.id}`}
                          className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-widest hover:translate-x-1 transition-transform"
                        >
                          Review Output <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
