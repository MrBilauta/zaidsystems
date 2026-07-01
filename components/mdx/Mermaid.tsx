"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "var(--font-geist-mono)",
});

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = React.useId();

  useEffect(() => {
    if (ref.current && chart) {
      mermaid.contentLoaded();
      // Render the mermaid chart with deterministic ID
      const chartId = `mermaid-${id.replace(/:/g, "")}`;
      mermaid.render(chartId, chart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      }).catch((err) => {
        console.error("Mermaid error:", err);
      });
    }
  }, [chart, id]);

  return (
    <div className="mermaid-wrapper my-8 flex justify-center bg-white/[0.02] p-8 rounded-2xl border border-white/10">
      <div ref={ref} />
    </div>
  );
}
