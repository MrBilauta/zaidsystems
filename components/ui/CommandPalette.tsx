"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { 
  Search, 
  FolderGit2, 
  Mail, 
  LayoutDashboard, 
  TerminalSquare, 
  FileText, 
  X, 
  Cpu, 
  Activity, 
  Workflow, 
  Bot, 
  Rocket, 
  ShieldCheck, 
  Globe, 
  Trophy 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";

/**
 * Zaid Systems — Production Command Palette
 * Integrated with RBAC and real system navigation.
 */

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const isAdmin = isLoaded && (
    user?.publicMetadata?.role === "admin" || 
    user?.emailAddresses.some(e => e.emailAddress === "khanmohammedzaid@gmail.com")
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-[10vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5 backdrop-blur-3xl"
          >
            <Command className="flex h-full w-full flex-col overflow-hidden bg-transparent" shouldFilter={true}>
              <div className="flex items-center border-b border-white/10 px-6">
                <Search className="mr-3 h-5 w-5 shrink-0 text-primary opacity-70" />
                <Command.Input
                  autoFocus
                  placeholder="Execute command (e.g. /deploy, /blog)..."
                  className="flex h-16 w-full rounded-md bg-transparent py-4 text-base outline-none placeholder:text-white/20 text-white font-medium"
                />
                <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-white/30 opacity-100">
                  <span className="text-xs">ESC</span>
                </kbd>
              </div>

              <Command.List className="max-h-[450px] overflow-y-auto overflow-x-hidden p-3 custom-scrollbar">
                <Command.Empty className="py-10 text-center text-sm text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <X className="h-8 w-8 opacity-20" />
                    <span>Protocol not found in registry.</span>
                  </div>
                </Command.Empty>

                <Command.Group heading="INFRASTRUCTURE" className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2 mt-2">
                  <Command.Item onSelect={() => runCommand(() => router.push("/"))} className="command-item">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>System Dashboard</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => router.push("/#projects"))} className="command-item">
                    <FolderGit2 className="h-5 w-5" />
                    <span>Project Registry</span>
                  </Command.Item>
                </Command.Group>

                {isAdmin && (
                  <Command.Group heading="COMMAND CENTER" className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50 mb-2 mt-6">
                    <Command.Item onSelect={() => runCommand(() => router.push("/admin"))} className="command-item-admin">
                      <TerminalSquare className="h-5 w-5" />
                      <span>Admin Command Center</span>
                    </Command.Item>
                    <Command.Item onSelect={() => runCommand(() => router.push("/admin/blogs"))} className="command-item-admin">
                      <FileText className="h-5 w-5" />
                      <span>Content Orchestration</span>
                    </Command.Item>
                    <Command.Item onSelect={() => runCommand(() => router.push("/admin/security"))} className="command-item-admin">
                      <ShieldCheck className="h-5 w-5" />
                      <span>Security Audit Logs</span>
                    </Command.Item>
                  </Command.Group>
                )}

                <Command.Group heading="EXTERNAL CHANNELS" className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2 mt-6">
                  <Command.Item onSelect={() => runCommand(() => window.open("https://github.com/mrbilauta", "_blank"))} className="command-item">
                    <Rocket className="h-5 w-5" />
                    <span>Source Repository</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => window.open("https://linkedin.com/in/khanmohammedzaid", "_blank"))} className="command-item">
                    <Globe className="h-5 w-5" />
                    <span>Professional Network</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
