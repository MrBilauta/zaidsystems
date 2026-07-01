"use client";

import dynamic from "next/dynamic";

const CursorSpotlight = dynamic(() => import("@/components/ui/CursorSpotlight").then(mod => mod.CursorSpotlight), { ssr: false });
const CommandPalette = dynamic(() => import("@/components/ui/CommandPalette").then(mod => mod.CommandPalette), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ui/ScrollProgress").then(mod => mod.ScrollProgress), { ssr: false });

export function ClientSideComponents() {
  return (
    <>
      <ScrollProgress />
      <CursorSpotlight />
      <CommandPalette />
    </>
  );
}
