import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { 
  Users, 
  Eye, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  FileText, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { prisma } from "@/lib/db/client";
import { requireAdmin } from "@/lib/auth/guard";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function AdminOverview() {
  // 1. Enforce Server-Side RBAC
  await requireAdmin();

  // 2. Fetch Real Metrics
  const [analytics, auditLogs] = await Promise.all([
    prisma.analyticsSnapshot.findFirst({
      orderBy: { date: "desc" },
    }),
    prisma.auditLog.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const stats = [
    { 
      name: "Total Impressions", 
      value: analytics?.pageViews?.toLocaleString() || "0", 
      change: "+0%", // Future: compare with previous snapshot
      icon: Eye, 
      color: "text-blue-400" 
    },
    { 
      name: "Unique Visitors", 
      value: analytics?.uniqueVisitors?.toLocaleString() || "0", 
      change: "+0%", 
      icon: Users, 
      color: "text-primary" 
    },
    { 
      name: "Avg. Session Time", 
      value: analytics?.avgSessionTime ? `${Math.floor(analytics.avgSessionTime / 60)}m ${analytics.avgSessionTime % 60}s` : "0s", 
      change: "+0%", 
      icon: Clock, 
      color: "text-purple-400" 
    },
    { 
      name: "Core Web Vitals", 
      value: analytics?.lighthouseScore ? `${analytics.lighthouseScore}/100` : "N/A", 
      change: "LIVE", 
      icon: TrendingUp, 
      color: "text-green-400" 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">Command <span className="text-primary">Center</span></h1>
            <p className="mt-2 text-white/40 font-medium">Monitoring Zaid Systems entity health and performance.</p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-mono">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white/60">SYSTEM STATUS: OPTIMIZED</span>
          </div>
        </div>
      </FadeIn>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <SlideUp key={stat.name} delay={idx * 0.1}>
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.04] transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon className="w-16 h-16" />
              </div>
              <div className="flex items-start justify-between mb-4">
                <div className={cn("p-2.5 rounded-xl bg-white/5", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-1">{stat.name}</p>
              <h3 className="text-3xl font-bold tracking-tighter">{stat.value}</h3>
            </div>
          </SlideUp>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Real Audit Logs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Immutable Audit Trail</h2>
            <Link href="/admin/security" className="text-xs font-mono text-primary hover:underline">VIEW SECURITY CENTER</Link>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
            <div className="divide-y divide-white/5">
              {auditLogs.length > 0 ? auditLogs.map((log) => (
                <div key={log.id} className="p-5 flex items-center justify-between hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                        {log.action} <span className="text-white/60 font-normal">on {log.resourceType}: {log.resourceName}</span>
                      </p>
                      <p className="text-[10px] font-mono text-white/30 uppercase mt-1">
                        {new Date(log.createdAt).toLocaleString()} • {log.actorEmail}
                      </p>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="p-10 text-center text-white/20 font-mono text-xs">
                  NO RECENT ACTIVITY DETECTED
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight">Operational Controls</h2>
          <div className="grid gap-4">
            <Link href="/admin/blogs/new" className="flex items-center gap-4 p-4 rounded-2xl bg-primary text-white hover:opacity-90 transition-opacity">
              <FileText className="w-5 h-5" />
              <div className="text-left">
                <p className="text-sm font-bold">New Publication</p>
                <p className="text-[10px] opacity-70">AI-assisted editor enabled</p>
              </div>
            </Link>
            <Link href="/admin/security" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
              <AlertCircle className="w-5 h-5 text-purple-400" />
              <div className="text-left">
                <p className="text-sm font-bold">Security Audit</p>
                <p className="text-[10px] text-white/40">Check bot accessibility</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
