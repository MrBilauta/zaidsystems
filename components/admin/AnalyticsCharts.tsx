"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { TrendingUp, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrafficDataPoint {
  name: string;
  visits: number;
  crawlers: number;
}

interface CrawlerStat {
  name: string;
  value: number;
  color: string;
  percent: number;
}

interface AnalyticsChartsProps {
  trafficData: TrafficDataPoint[];
  crawlerStats: CrawlerStat[];
}

export function AnalyticsCharts({ trafficData, crawlerStats }: AnalyticsChartsProps) {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Traffic Chart */}
      <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Traffic Distribution
          </h3>
          <div className="flex items-center gap-4 text-[10px] font-mono">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-white/60 uppercase">Human Visits</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-white/60 uppercase">AI Crawlers</span>
            </div>
          </div>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGPT" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="name" stroke="#ffffff20" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff20" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#000", border: "1px solid #ffffff10", borderRadius: "12px" }}
                itemStyle={{ fontSize: "12px" }}
              />
              <Area type="monotone" dataKey="visits" stroke="var(--primary)" fillOpacity={1} fill="url(#colorVisits)" strokeWidth={2} />
              <Area type="monotone" dataKey="crawlers" stroke="#3b82f6" fillOpacity={1} fill="url(#colorGPT)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Crawler Breakdown */}
      <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-primary" /> Crawler Frequency
        </h3>
        <div className="space-y-6">
          {crawlerStats.map((stat) => (
            <div key={stat.name} className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60 font-medium">{stat.name}</span>
                <span className="text-white font-mono">{stat.value} Hits</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={cn("h-full transition-all duration-1000", stat.color)} 
                  style={{ width: `${stat.percent}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
