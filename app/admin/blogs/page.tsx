import { FadeIn } from "@/components/animations/FadeIn";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Eye,
  CheckCircle2,
  Clock
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { prisma } from "@/lib/db/client";
import { requireAdmin } from "@/lib/auth/guard";

/**
 * Enterprise Blog Management (CMS)
 * Real-time database integration with server-side RBAC.
 */

export default async function BlogsAdminPage() {
  await requireAdmin();

  const blogs = await prisma.post.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      category: true,
      publishedAt: true,
      createdAt: true,
      // engagement is tracked via aiUsage or external telemetry in future
    }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">Blog <span className="text-primary">Management</span></h1>
            <p className="mt-2 text-white/40 font-medium">Create and optimize high-authority technical content.</p>
          </div>
          <Link 
            href="/admin/blogs/new" 
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            CREATE ARTICLE
          </Link>
        </div>
      </FadeIn>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/[0.02] border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all text-white"
          />
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">Title & Metadata</th>
                <th className="px-8 py-4 text-[10px] font-mono text-white/40 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-4 text-[10px] font-mono text-white/40 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {blogs.length > 0 ? blogs.map((blog) => (
                <tr key={blog.id} className="group hover:bg-white/[0.03] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-white font-bold group-hover:text-primary transition-colors">{blog.title}</span>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] font-mono text-white/30 uppercase">{blog.category}</span>
                        <span className="w-1 h-1 rounded-full bg-white/10" />
                        <span className="text-[10px] font-mono text-white/30 uppercase">
                          {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      blog.status === "PUBLISHED" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                    )}>
                      {blog.status === "PUBLISHED" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {blog.status}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/blogs/${blog.id}`}
                        className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <Link 
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} className="px-8 py-20 text-center text-white/20 font-mono text-xs">
                    NO ARTICLES FOUND. START BY CREATING ONE.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
