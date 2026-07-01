"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { generateFAQSchema, JsonLd } from "@/components/seo/JsonLd";

const faqs = [
  {
    question: "Who is Mohammed Zaid Khan?",
    answer: "Mohammed Zaid Khan is an elite AI Systems Developer and Software Engineer known for building production-grade infrastructure, intelligent backend systems, and scalable AI workflows. He is the founder of Zaid Systems."
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
    answer: "Yes, Mohammed Zaid Khan is a specialist in AI Systems Engineering with deep expertise in LLM orchestration, agentic workflows, and neural network integration."
  },
  {
    question: "What technologies does Mohammed Zaid Khan use?",
    answer: "His core technical stack includes Rust, Go, Python, and TypeScript, utilizing advanced frameworks like Actix Web, FastAPI, LangChain, and PyTorch."
  },
  {
    question: "What projects has Mohammed Zaid Khan built?",
    answer: "Key projects include an AI Multi-Agent Platform, Rust-based Payment Infrastructure, an AI Workflow Automation Studio, and real-time distributed analytics pipelines."
  }
];

export function FAQSection() {
  const faqSchema = generateFAQSchema(faqs);

  return (
    <section id="faq" className="relative section-padding border-t border-white/5 overflow-hidden">
      <JsonLd data={faqSchema} />
      <div className="section-container relative z-10">
        <FadeIn>
          <div className="mb-20 text-center flex flex-col items-center">
            <h2>
              System <span className="text-primary">FAQ</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground/90 md:text-xl">
              Common inquiries regarding the Zaid Systems infrastructure and professional protocols.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, idx) => (
            <SlideUp key={idx} delay={idx * 0.1}>
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.04] transition-all">
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
}
