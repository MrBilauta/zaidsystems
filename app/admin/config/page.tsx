import { FadeIn } from "@/components/animations/FadeIn";
import { SiteConfigForm } from "@/components/admin/SiteConfigForm";
import { getSiteSettings } from "@/app/actions/project";
import { requireAdmin } from "@/lib/auth/guard";
import { redirect } from "next/navigation";

export default async function SiteConfigPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/sign-in");
  }

  const settings = await getSiteSettings();

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-10">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">Site <span className="text-primary">Configuration</span></h1>
            <p className="mt-2 text-white/40 font-medium">Manage the structural flow, SEO identity, and system-wide protocols of Zaid Systems.</p>
          </div>
        </div>
      </FadeIn>

      <SiteConfigForm initialData={settings} />
    </div>
  );
}

