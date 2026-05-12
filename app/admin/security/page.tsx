import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { 
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Globe,
  User,
  ArrowUpRight,
  Lock,
  Activity,
  FileText,
  Eye
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/security/auth-guard";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

async function getSecurityData() {
  try {
    const [recentEvents, recentAuditLogs, unresolvedEvents] = await Promise.all([
      prisma.securityEvent.findMany({
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
      prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 30,
        include: { actor: { select: { email: true, name: true } } },
      }),
      prisma.securityEvent.count({ where: { resolved: false } }),
    ]);

    return { recentEvents, recentAuditLogs, unresolvedEvents };
  } catch {
    return { recentEvents: [], recentAuditLogs: [], unresolvedEvents: 0 };
  }
}

const SEVERITY_COLORS: Record<string, string> = {
  CRITICAL: "text-red-400 bg-red-400/10 border-red-400/20",
  HIGH: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  MEDIUM: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  LOW: "text-green-400 bg-green-400/10 border-green-400/20",
};

export default async function SecurityPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/sign-in");
  }

  const { recentEvents, recentAuditLogs, unresolvedEvents } = await getSecurityData();

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">Security <span className="text-primary">Center</span></h1>
            <p className="mt-2 text-white/40 font-medium">Zero-trust audit trail and threat monitoring for Zaid Systems.</p>
          </div>
          <div className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-xl border text-xs font-mono",
            unresolvedEvents > 0 
              ? "bg-red-500/10 border-red-500/20 text-red-400"
              : "bg-green-500/10 border-green-500/20 text-green-400"
          )}>
            <Shield className="w-4 h-4" />
            {unresolvedEvents > 0 
              ? `${unresolvedEvents} UNRESOLVED EVENTS` 
              : "ALL CLEAR — SYSTEM SECURE"
            }
          </div>
        </div>
      </FadeIn>

      {/* Security Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Authentication", value: "Clerk MFA", status: "active", icon: Lock },
          { label: "Rate Limiting", value: "100 req/min", status: "active", icon: Activity },
          { label: "CSP Headers", value: "Strict Mode", status: "active", icon: Shield },
          { label: "Audit Trail", value: `${recentAuditLogs.length} records`, status: "active", icon: FileText },
        ].map((item) => (
          <SlideUp key={item.label}>
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 group hover:bg-white/[0.04] transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400">
                  <item.icon className="w-5 h-5" />
                </div>
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-sm font-bold text-white">{item.value}</p>
            </div>
          </SlideUp>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Security Events */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" /> Security Events
            </h2>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl divide-y divide-white/5">
            {recentEvents.length === 0 ? (
              <div className="p-8 text-center text-white/30 text-sm">
                <Shield className="w-8 h-8 mx-auto mb-3 opacity-30" />
                No security events recorded
              </div>
            ) : (
              recentEvents.map((event) => (
                <div key={event.id} className="p-5 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={cn("px-2 py-0.5 rounded text-[9px] font-bold uppercase border", SEVERITY_COLORS[event.severity] ?? SEVERITY_COLORS.LOW)}>
                      {event.severity}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{event.type.replace(/_/g, " ")}</p>
                      <p className="text-[10px] font-mono text-white/30 mt-0.5 uppercase">{event.ipAddress ?? "unknown"}</p>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-white/20 text-right">
                    {new Date(event.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Audit Log */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" /> Audit Trail
            </h2>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl divide-y divide-white/5">
            {recentAuditLogs.length === 0 ? (
              <div className="p-8 text-center text-white/30 text-sm">
                <FileText className="w-8 h-8 mx-auto mb-3 opacity-30" />
                No audit entries yet
              </div>
            ) : (
              recentAuditLogs.slice(0, 10).map((log) => (
                <div key={log.id} className="p-5 flex items-center justify-between hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <User className="w-4 h-4 text-white/40" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        <span className="text-primary font-bold">{log.action}</span>
                        {" "}{log.resourceType}{log.resourceName ? `: ${log.resourceName.slice(0, 40)}` : ""}
                      </p>
                      <p className="text-[10px] font-mono text-white/30 mt-0.5">{log.actorEmail ?? "system"}</p>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-white/20 text-right">
                    {new Date(log.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
