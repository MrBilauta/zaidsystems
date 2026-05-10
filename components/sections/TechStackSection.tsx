"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const categories = [
  {
    name: "Languages",
    skills: ["Python", "Rust", "TypeScript", "SQL", "JavaScript", "Go"],
  },
  {
    name: "Backend & Systems",
    skills: ["FastAPI", "PostgreSQL", "Node.js", "Redis", "gRPC", "Docker"],
  },
  {
    name: "AI & Automation",
    skills: ["TensorFlow", "PyTorch", "AI Agents", "NLP", "LangChain", "OpenAI"],
  },
  {
    name: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Shadcn"],
  },
  {
    name: "Infrastructure",
    skills: ["AWS", "Vercel", "GitHub Actions", "Terraform", "Linux"],
  },
  {
    name: "Analytics",
    skills: ["Pandas", "Streamlit", "Grafana", "Prometheus"],
  },
];

export function TechStackSection() {
  return (
    <section id="tech" className="relative section-padding bg-background border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-fade pointer-events-none opacity-40" />
      <div className="section-container relative z-10">
        <FadeIn>
          <div className="mb-20 text-center flex flex-col items-center">
            <h2>
              Technology <span className="text-primary">Stack</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground/90 md:text-xl">
              Production-tested tools and frameworks utilized for architecting resilient, high-performance systems.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, idx) => (
            <SlideUp key={category.name} delay={idx * 0.1}>
              <SpotlightCard className="h-full p-8 border-white/10 bg-white/[0.02]">
                <h3 className="mb-6 text-xl font-bold text-white tracking-tight">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-white/70 transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
}
