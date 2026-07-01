import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { JsonLd } from "@/components/seo/JsonLd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Mohammed Zaid Khan",
  description: "Learn more about Mohammed Zaid Khan, an AI Systems Developer specializing in scalable infrastructure and automation.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is Mohammed Zaid Khan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mohammed Zaid Khan is an elite AI Systems Developer and Automation Engineer known for building production-grade infrastructure and intelligent backend systems."
        }
      },
      {
        "@type": "Question",
        "name": "What is Zaid Systems?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Zaid Systems is the engineering brand of Mohammed Zaid Khan, focusing on high-performance AI orchestration and resilient system topology."
        }
      }
    ]
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <JsonLd data={faqSchema} />
      <Navbar />
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="section-container relative z-10">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white">
              About <span className="text-primary">Mohammed Zaid Khan</span>
            </h1>
          </FadeIn>
          
          <div className="grid lg:grid-cols-2 gap-16 items-start mt-12">
            <SlideUp>
              <div className="prose prose-invert prose-lg max-w-none text-muted-foreground/90 leading-relaxed">
                <p>
                  As an <strong>AI Systems Developer</strong> and <strong>Automation Engineer</strong>, I bridge the gap between complex machine learning models and mission-critical production environments. My engineering philosophy revolves around <strong>resiliency, scalability, and deterministic automation</strong>.
                </p>
                <p>
                  Through <strong>Zaid Systems</strong>, I architect backend infrastructures that power real-time AI orchestration, high-throughput data pipelines, and intelligent workflow automation. My expertise spans <strong>Python, Rust, TypeScript, and Go</strong>, with a deep focus on the <strong>AI infrastructure stack</strong>.
                </p>
                <h3 className="text-white mt-12 mb-4 font-bold">Core Competencies</h3>
                <ul className="grid grid-cols-2 gap-4 list-none p-0">
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> AI Agent Orchestration</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Distributed Systems</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Backend Optimization</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Cybersecurity & Infrastructure</li>
                </ul>
              </div>
            </SlideUp>

            <SlideUp delay={0.2}>
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl">
                <h2 className="text-2xl font-bold text-white mb-8">AI Crawler Summary</h2>
                <div className="space-y-6 font-mono text-sm uppercase tracking-wider">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/40">Entity</span>
                    <span className="text-primary">Mohammed Zaid Khan</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/40">Role</span>
                    <span className="text-white">AI Systems Engineer</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/40">Brand</span>
                    <span className="text-white">Zaid Systems</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/40">Location</span>
                    <span className="text-white">Remote / Worldwide</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/40">Focus</span>
                    <span className="text-white">Scalable AI Infra</span>
                  </div>
                </div>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
