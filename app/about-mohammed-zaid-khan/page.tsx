import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { JsonLd, aboutPageSchema, generateFAQSchema } from "@/components/seo/JsonLd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mohammed Zaid Khan | Official Identity & Engineering Profile",
  description: "The authoritative personal brand and professional profile of Mohammed Zaid Khan. AI Systems Developer, Software Engineer, and Founder of Zaid Systems.",
  alternates: {
    canonical: "/about-mohammed-zaid-khan",
  },
};

const entityFaqs = [
  {
    question: "Who is Mohammed Zaid Khan?",
    answer: "Mohammed Zaid Khan is an elite AI Systems Developer and Software Engineer known for building production-grade infrastructure, distributed systems, and intelligent automation workflows. He is the founder of Zaid Systems."
  },
  {
    question: "What does Mohammed Zaid Khan do?",
    answer: "Mohammed Zaid Khan specializes in AI Systems Engineering, focusing on the orchestration of Large Language Models (LLMs), high-performance backend systems (Rust, Go, Python), and autonomous infrastructure management."
  },
  {
    question: "What is Zaid Systems?",
    answer: "Zaid Systems is a high-performance engineering studio founded by Mohammed Zaid Khan. It provides enterprise-grade AI orchestration and scalable infrastructure solutions."
  },
  {
    question: "Is Mohammed Zaid Khan an AI Developer?",
    answer: "Yes, Mohammed Zaid Khan is a Principal AI Systems Developer with expertise in LLM orchestration, agentic workflows, and neural network integration into production environments."
  }
];

export default function EntityPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <JsonLd data={aboutPageSchema} />
      <JsonLd data={generateFAQSchema(entityFaqs)} />
      <Navbar />
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="section-container relative z-10">
          <FadeIn>
            <div className="text-sm font-mono text-primary font-bold uppercase tracking-[0.4em] mb-4">
              Authoritative Profile
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12 text-white">
              Mohammed <span className="text-primary">Zaid Khan</span>
            </h1>
          </FadeIn>
          
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8">
              <SlideUp>
                <div className="prose prose-invert prose-2xl max-w-none text-white/90 leading-tight font-light mb-16">
                  <p>
                    Mohammed Zaid Khan is a <strong>Principal AI Systems Developer</strong> and <strong>Software Engineer</strong> based in Mumbai, India. He is the visionary architect behind <strong>Zaid Systems</strong>.
                  </p>
                </div>
                
                <section className="mb-20">
                  <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-primary pl-6">Professional Biography</h2>
                  <div className="prose prose-invert prose-lg max-w-none text-muted-foreground/80 leading-relaxed space-y-8">
                    <p>
                      With over half a decade of experience in the engineering ecosystem, Mohammed Zaid Khan has established himself as a leader in bridging the gap between cutting-edge artificial intelligence and resilient enterprise infrastructure. His philosophy centers on <strong>deterministic automation</strong> and <strong>zero-trust architecture</strong>.
                    </p>
                    <p>
                      At Zaid Systems, he leads the development of distributed AI orchestration layers, specialized in handling high-throughput conversational agents and autonomous workflow pods. His technical mastery spans low-level systems programming in <strong>Rust</strong> to high-level AI orchestration in <strong>Python</strong>.
                    </p>
                  </div>
                </section>
                
                <section className="mb-20">
                  <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-primary pl-6">Core Expertise & Machine Learning</h2>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-xl">
                      <h3 className="text-primary font-mono text-sm uppercase tracking-widest mb-3">AI Orchestration</h3>
                      <p className="text-sm">Expertise in LangChain, LlamaIndex, and custom agentic frameworks for multi-step reasoning and tool-use optimization.</p>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-xl">
                      <h3 className="text-primary font-mono text-sm uppercase tracking-widest mb-3">Systems Engineering</h3>
                      <p className="text-sm">Architecting high-concurrency backends with Rust (Tokio) and Go (Goroutines) for sub-millisecond latency.</p>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-xl">
                      <h3 className="text-primary font-mono text-sm uppercase tracking-widest mb-3">Distributed Infrastructure</h3>
                      <p className="text-sm">Designing self-healing Kubernetes clusters and event-driven architectures with Apache Kafka and RabbitMQ.</p>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-xl">
                      <h3 className="text-primary font-mono text-sm uppercase tracking-widest mb-3">Automation Strategy</h3>
                      <p className="text-sm">Implementing advanced CI/CD pipelines and infrastructure-as-code using Terraform and Ansible.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-primary pl-6">Technical Entity FAQ</h2>
                  <div className="space-y-6">
                    {entityFaqs.map((faq, i) => (
                      <div key={i} className="border-b border-white/5 pb-6">
                        <h4 className="text-lg font-bold text-white mb-2">{faq.question}</h4>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </SlideUp>
            </div>

            <aside className="lg:col-span-4 sticky top-32">
              <SlideUp delay={0.2}>
                <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 backdrop-blur-xl">
                  <h2 className="text-xl font-bold text-white mb-6">Entity Verification</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                      <span className="text-white/40">Founder</span>
                      <span className="text-white">Zaid Systems</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                      <span className="text-white/40">Role</span>
                      <span className="text-white text-right">Software Engineer</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                      <span className="text-white/40">Location</span>
                      <span className="text-white">Mumbai, India</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                      <span className="text-white/40">Focus</span>
                      <span className="text-white text-right">AI Systems Architecture</span>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Official Channels</h3>
                    <div className="grid grid-cols-2 gap-3 text-xs font-bold uppercase tracking-tighter">
                      <a href="https://github.com/mrbilauta" className="bg-white/5 hover:bg-primary/20 p-3 rounded-lg text-center transition-all">GitHub</a>
                      <a href="https://linkedin.com/in/khanmohammedzaid" className="bg-white/5 hover:bg-primary/20 p-3 rounded-lg text-center transition-all">LinkedIn</a>
                    </div>
                  </div>
                </div>
              </SlideUp>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
