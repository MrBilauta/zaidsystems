"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  BarChart3, 
  Search, 
  Settings, 
  Image as ImageIcon,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Globe,
  Shield
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const menuItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "AI Studio", href: "/admin/ai", icon: Sparkles },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "SEO Control", href: "/admin/seo", icon: Search },
  { name: "Security", href: "/admin/security", icon: Shield },
  { name: "Media", href: "/admin/media", icon: ImageIcon },
  { name: "Site Config", href: "/admin/config", icon: Globe },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "relative h-screen bg-black border-r border-white/10 transition-all duration-300 z-50 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-lg tracking-tighter text-white">ZAID <span className="text-primary">OS</span></span>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-primary" : "text-white/40 group-hover:text-white/80")} />
              {!collapsed && (
                <span className="text-sm font-medium tracking-tight">{item.name}</span>
              )}
              {isActive && !collapsed && (
                <motion.div 
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="p-4 border-t border-white/10 text-white/40 hover:text-white transition-colors flex items-center justify-center"
      >
        {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
    </aside>
  );
}
