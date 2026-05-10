import Link from "next/link";
import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
      <div className="section-container relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-white">
          <Terminal className="h-5 w-5 text-primary" />
          <span className="font-bold tracking-[0.2em] uppercase text-xs">ZAID SYSTEMS</span>
        </div>
        
        <p className="text-sm text-muted-foreground text-center md:text-left">
          Built with Next.js, Tailwind & AI-driven engineering.
        </p>
        
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link href="https://github.com/mrbilauta" target="_blank" className="hover:text-white transition-colors">GitHub</Link>
          <Link href="https://www.linkedin.com/in/khanmohammedzaid" target="_blank" className="hover:text-white transition-colors">LinkedIn</Link>
          <Link href="https://www.hackerrank.com/profile/khanmohammedzaid" target="_blank" className="hover:text-white transition-colors">HackerRank</Link>
        </div>
      </div>
    </footer>
  );
}
