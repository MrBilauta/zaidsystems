"use client";

import { useState } from "react";
import { 
  Save, 
  Settings2,
  Layout,
  Type,
  Link2,
  LayoutTemplate,
  Search,
  CheckCircle2,
  AlertCircle,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { updateSiteSettings } from "@/app/actions/project";
import { SiteSettings } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";

interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  hackerrank: string;
}

interface ModuleVisibility {
  hero: boolean;
  about: boolean;
  projects: boolean;
  blog: boolean;
  techStack: boolean;
  experience: boolean;
  faq: boolean;
  [key: string]: boolean;
}

export function SiteConfigForm({ initialData }: { initialData: SiteSettings | null }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    siteName: initialData?.siteName ?? "Zaid Systems",
    siteDescription: initialData?.siteDescription ?? "",
    siteUrl: initialData?.siteUrl ?? "https://www.zaidsystems.dev",
    ogImage: initialData?.ogImage ?? "",
    gaMeasurementId: initialData?.gaMeasurementId ?? "",
    robotsTxt: initialData?.robotsTxt ?? "User-agent: *\nAllow: /",
    customHead: initialData?.customHead ?? "",
    maintenanceMode: initialData?.maintenanceMode ?? false,
    authorName: initialData?.authorName ?? "Mohammed Zaid Khan",
    authorRole: initialData?.authorRole ?? "AI Systems Developer",
    socialLinks: (initialData?.socialLinks as unknown as SocialLinks) ?? {
      github: "https://github.com/mrbilauta",
      linkedin: "https://www.linkedin.com/in/khanmohammedzaid",
      twitter: "",
      hackerrank: "https://www.hackerrank.com/profile/khanmohammedzaid"
    },
    visibility: (initialData?.visibility as unknown as ModuleVisibility) ?? {
      hero: true,
      about: true,
      projects: true,
      blog: true,
      techStack: true,
      experience: false,
      faq: true
    }
  });

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      await updateSiteSettings(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update configuration");
    } finally {
      setLoading(false);
    }
  };

  const updateVisibility = (key: string) => {
    setFormData(prev => ({
      ...prev,
      visibility: {
        ...prev.visibility,
        [key]: !prev.visibility[key]
      }
    }));
  };

  const updateSocial = (key: keyof SocialLinks, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [key]: value
      }
    }));
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 pb-20">
      <div className="lg:col-span-8 space-y-8">
        {/* Brand & Identity */}
        <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-8 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Type className="w-5 h-5 text-primary" /> Core Identity
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Site Name</label>
              <input 
                type="text" 
                value={formData.siteName}
                onChange={(e) => setFormData({...formData, siteName: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary/30 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Site URL</label>
              <input 
                type="text" 
                value={formData.siteUrl}
                onChange={(e) => setFormData({...formData, siteUrl: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary/30 outline-none"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Site Description (SEO Meta)</label>
              <textarea 
                rows={2} 
                value={formData.siteDescription}
                onChange={(e) => setFormData({...formData, siteDescription: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary/30 outline-none resize-none"
              />
            </div>
          </div>
        </section>

        {/* Author Settings */}
        <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-8 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-primary" /> Author Profile
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Author Name</label>
              <input 
                type="text" 
                value={formData.authorName}
                onChange={(e) => setFormData({...formData, authorName: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary/30 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Author Role</label>
              <input 
                type="text" 
                value={formData.authorRole}
                onChange={(e) => setFormData({...formData, authorRole: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary/30 outline-none"
              />
            </div>
          </div>
        </section>

        {/* SEO & Analytics */}
        <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-8 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" /> SEO & Intel
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Google Analytics ID</label>
              <input 
                type="text" 
                placeholder="G-XXXXXXXXXX"
                value={formData.gaMeasurementId}
                onChange={(e) => setFormData({...formData, gaMeasurementId: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary/30 outline-none font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">robots.txt Content</label>
              <textarea 
                rows={4} 
                value={formData.robotsTxt}
                onChange={(e) => setFormData({...formData, robotsTxt: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary/30 outline-none resize-none font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Custom Head Scripts (GSC, etc.)</label>
              <textarea 
                rows={4} 
                placeholder="<meta name='google-site-verification' content='...' />"
                value={formData.customHead}
                onChange={(e) => setFormData({...formData, customHead: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary/30 outline-none resize-none font-mono text-green-400/80"
              />
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-8 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Link2 className="w-5 h-5 text-primary" /> Social Infrastructure
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {(Object.keys(formData.socialLinks) as Array<keyof SocialLinks>).map((platform) => (
              <div key={platform} className="space-y-2">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{platform}</label>
                <input 
                  type="text" 
                  value={formData.socialLinks[platform]}
                  onChange={(e) => updateSocial(platform, e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary/30 outline-none"
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Sidebar: Controls */}
      <div className="lg:col-span-4 space-y-8">
        <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-xl sticky top-8">
          <div className="flex flex-col gap-4">
            <button 
              onClick={handleSave}
              disabled={loading}
              className={cn(
                "w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all",
                loading ? "bg-white/10 text-white/40 cursor-not-allowed" : "bg-primary text-white hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
              )}
            >
              {loading ? <Activity className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {loading ? "COMMITTING..." : "DEPLOY CONFIG"}
            </button>
            
            <AnimatePresence>
              {success && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 px-4 py-3 rounded-xl text-xs font-bold"
                >
                  <CheckCircle2 className="w-4 h-4" /> CONFIG DEPLOYED SUCCESSFULLY
                </motion.div>
              )}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3 rounded-xl text-xs font-bold"
                >
                  <AlertCircle className="w-4 h-4" /> {error}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-[1px] bg-white/10" />

          <h3 className="lg:text-lg font-bold text-white flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-primary" /> Module Control
          </h3>
          <div className="space-y-4">
            {Object.keys(formData.visibility).map((key) => (
              <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-xs text-white font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <button 
                  onClick={() => updateVisibility(key)}
                  className={cn(
                  "w-10 h-5 rounded-full relative transition-colors",
                  formData.visibility[key] ? "bg-primary" : "bg-white/10"
                )}>
                  <div className={cn(
                    "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                    formData.visibility[key] ? "right-1" : "left-1"
                  )} />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/5">
            <div className={cn(
              "rounded-2xl p-4 border transition-colors",
              formData.maintenanceMode ? "bg-red-500/10 border-red-500/20" : "bg-primary/5 border-primary/20"
            )}>
              <div className={cn(
                "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-2",
                formData.maintenanceMode ? "text-red-400" : "text-primary"
              )}>
                <Layout className="w-3.5 h-3.5" /> Maintenance Mode
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Global site lock?</span>
                <button 
                  onClick={() => setFormData({...formData, maintenanceMode: !formData.maintenanceMode})}
                  className={cn(
                  "w-8 h-4 rounded-full relative",
                  formData.maintenanceMode ? "bg-red-500" : "bg-white/10"
                )}>
                  <div className={cn(
                    "absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all",
                    formData.maintenanceMode ? "right-0.5" : "left-0.5"
                  )} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
