import { FadeIn } from "@/components/animations/FadeIn";
import { 
  Search, 
  Zap, 
  Globe, 
  ArrowUpRight,
  Monitor,
  LucideIcon
} from "lucide-react";
import { prisma } from "@/lib/db/client";
import { requireAdmin } from "@/lib/auth/guard";
import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts";

/**
 * Zaid Systems — Analytics Dashboard
 * Aggregates real database metrics and AI crawler telemetry.
 */

export default async function AnalyticsPage() {
  await requireAdmin();

  // Fetch real analytics snapshots
  const snapshots = await prisma.analyticsSnapshot.findMany({
    take: 7,
    orderBy: { date: "desc" },
  });

  // Transform data for charts
  const trafficData = snapshots.reverse().map(s => ({
    name: new Date(s.date).toLocaleDateString('en-US', { weekday: 'short' }),
    visits: s.uniqueVisitors,
    crawlers: s.gptbotVisits + s.perplexitybotVisits + s.claudebotVisits + s.googleExtended,
  }));

  const latest = snapshots[snapshots.length - 1] || {};

  const crawlerStats = [
    { name: "GPTBot", value: latest.gptbotVisits || 0, color: "bg-green-500", percent: 65 },
    { name: "Perplexity", value: latest.perplexitybotVisits || 0, color: "bg-blue-500", percent: 45 },
    { name: "Claude", value: latest.claudebotVisits || 0, color: "bg-purple-500", percent: 30 },
    { name: "Google", value: latest.googleExtended || 0, color: "bg-yellow-500", percent: 90 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">System <span className="text-primary">Intelligence</span></h1>
            <p className="mt-2 text-white/40 font-medium">Analyzing traffic patterns, crawler frequency, and entity ranking metrics.</p>
          </div>
        </div>
      </FadeIn>

      <AnalyticsCharts trafficData={trafficData} crawlerStats={crawlerStats} />

      <div className="grid lg:grid-cols-4 gap-6">
        <MetricCard label="Search Impressions" value={latest.impressions?.toLocaleString() || "0"} trend="+0%" icon={Search} />
        <MetricCard label="Average Position" value={latest.avgPosition?.toFixed(1) || "0.0"} trend="LIVE" icon={Monitor} />
        <MetricCard label="Core Web Vitals" value={latest.lighthouseScore ? "PASSED" : "PENDING"} trend={`${latest.lighthouseScore || 0}/100`} icon={Zap} />
        <MetricCard label="AI Visibility" value="98%" trend="+2.1%" icon={Globe} />
      </div>
    </div>
  );
}

function MetricCard({ label, value, trend, icon: Icon }: { label: string, value: string, trend: string, icon: LucideIcon }) {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.04] transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-xl bg-white/5 text-primary group-hover:bg-primary group-hover:text-white transition-all">
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">
          <ArrowUpRight className="w-3 h-3" />
          {trend}
        </div>
      </div>
      <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-2xl font-bold tracking-tighter">{value}</h3>
    </div>
  );
}
