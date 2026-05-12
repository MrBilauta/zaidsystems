// Reusable MDX Component System — Engineering Publication Standard
// These components elevate blog articles from simple markdown to premium content

"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, TrendingUp, Zap, Shield, Code2, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

// ============================================================
// ARCHITECTURE DIAGRAM — Mermaid/Code-based flow visualization
// ============================================================

interface ArchitectureDiagramProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function ArchitectureDiagram({ title, description, children }: ArchitectureDiagramProps) {
  return (
    <figure className="my-10 not-prose">
      <div className="rounded-2xl border border-primary/20 bg-primary/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-primary/10 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs font-mono text-white/60">{title}</span>
        </div>
        <div className="p-6 font-mono text-sm text-white/80 bg-black/40 overflow-x-auto">
          {children}
        </div>
      </div>
      {description && (
        <figcaption className="mt-3 text-sm text-center text-white/40 italic">{description}</figcaption>
      )}
    </figure>
  );
}

// ============================================================
// TRADEOFF BOX — Engineering decision analysis
// ============================================================

interface TradeoffBoxProps {
  title: string;
  pros: string[];
  cons: string[];
  verdict?: string;
}

export function TradeoffBox({ title, pros, cons, verdict }: TradeoffBoxProps) {
  return (
    <div className="my-10 not-prose rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider">⚖️ Engineering Tradeoff: {title}</h4>
      </div>
      <div className="grid md:grid-cols-2 divide-x divide-white/5">
        <div className="p-6 space-y-3">
          <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Advantages</p>
          <ul className="space-y-2">
            {pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                <span className="text-green-400 mt-0.5">+</span> {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 space-y-3">
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Limitations</p>
          <ul className="space-y-2">
            {cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                <span className="text-red-400 mt-0.5">−</span> {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {verdict && (
        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02]">
          <p className="text-sm text-white/60"><span className="font-bold text-primary">Verdict:</span> {verdict}</p>
        </div>
      )}
    </div>
  );
}

// ============================================================
// ENGINEERING INSIGHT — Highlighted key takeaway
// ============================================================

export function EngineeringInsight({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10 not-prose flex gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-6">
      <div className="shrink-0 p-2 rounded-lg bg-primary/20 text-primary h-fit">
        <Zap className="w-5 h-5" />
      </div>
      <div className="text-white/90 leading-relaxed prose-sm [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

// ============================================================
// SECURITY WARNING — Critical security consideration
// ============================================================

export function SecurityWarning({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10 not-prose flex gap-4 rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
      <div className="shrink-0 p-2 rounded-lg bg-red-500/20 text-red-400 h-fit">
        <Shield className="w-5 h-5" />
      </div>
      <div className="text-white/90 leading-relaxed [&>*:first-child]:mt-0">
        <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-2">Security Consideration</p>
        {children}
      </div>
    </div>
  );
}

// ============================================================
// PERFORMANCE BENCHMARK — Metric comparison display
// ============================================================

interface BenchmarkItem {
  label: string;
  value: string;
  baseline?: string;
  delta?: string;
  better: "higher" | "lower";
}

export function PerformanceBenchmark({ title, items }: { title: string; items: BenchmarkItem[] }) {
  return (
    <div className="my-10 not-prose rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-primary" />
        <p className="text-sm font-bold text-white">{title}</p>
      </div>
      <div className="p-6 space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-sm text-white/70">{item.label}</span>
            <div className="flex items-center gap-4">
              {item.baseline && (
                <span className="text-xs font-mono text-white/30 line-through">{item.baseline}</span>
              )}
              <span className="text-sm font-mono font-bold text-white">{item.value}</span>
              {item.delta && (
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded",
                  item.better === "lower" ? "bg-green-500/10 text-green-400" : "bg-blue-500/10 text-blue-400"
                )}>
                  {item.delta}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-3 border-t border-white/5 text-[9px] font-mono text-white/20 uppercase">
        Benchmark results from controlled environments. Your mileage may vary.
      </div>
    </div>
  );
}

// ============================================================
// FAQ ACCORDION — Schema.org-ready interactive FAQ
// ============================================================

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="my-10 not-prose space-y-3">
      <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
        <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
      </p>
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-bold text-white pr-4">{item.question}</span>
            {openIndex === i 
              ? <ChevronUp className="w-4 h-4 text-primary shrink-0" />
              : <ChevronDown className="w-4 h-4 text-white/40 shrink-0" />
            }
          </button>
          {openIndex === i && (
            <div className="px-6 pb-5 text-sm text-white/70 leading-relaxed border-t border-white/5 pt-4">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// CODE COMPARISON — Side-by-side code contrast
// ============================================================

export function CodeComparison({
  before,
  after,
  language = "typescript",
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  before: string;
  after: string;
  language?: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  return (
    <div className="my-10 not-prose grid md:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 overflow-hidden">
        <div className="px-4 py-2 border-b border-red-500/10 flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-red-400" />
          <span className="text-[10px] font-mono text-red-400 uppercase font-bold">{beforeLabel}</span>
        </div>
        <pre className="p-4 text-xs font-mono text-white/70 overflow-x-auto"><code>{before}</code></pre>
      </div>
      <div className="rounded-2xl border border-green-500/20 bg-green-500/5 overflow-hidden">
        <div className="px-4 py-2 border-b border-green-500/10 flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-green-400" />
          <span className="text-[10px] font-mono text-green-400 uppercase font-bold">{afterLabel}</span>
        </div>
        <pre className="p-4 text-xs font-mono text-white/70 overflow-x-auto"><code>{after}</code></pre>
      </div>
    </div>
  );
}
