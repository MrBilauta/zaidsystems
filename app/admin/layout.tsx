import { Sidebar } from "@/components/admin/Sidebar";
import { UserButton } from "@clerk/nextjs";
import { Sparkles, Bell, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white selection:bg-primary/30">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Nav */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/50 backdrop-blur-xl z-40">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full group cursor-pointer" onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-hover:text-primary transition-colors" />
              <div className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white/40 transition-all">
                Search command (Ctrl + K)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-white/40 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-black" />
            </button>
            <div className="h-8 w-[1px] bg-white/10" />
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8 rounded-lg",
                  userButtonPopoverCard: "bg-black border border-white/10 shadow-2xl",
                }
              }}
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
