import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Code, ExternalLink, ArrowLeft, Target, GitMerge, Zap, Shield, LineChart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectMetric {
  label: string;
  value: string;
}

interface CaseStudy {
  title: string;
  subtitle: string;
  description: string;
  metrics: ProjectMetric[];
  tags: string[];
  problem: string;
  systemDesign: string;
  architectureDecisions: string;
  optimization: string;
  scalingLogic: string;
  challenges: string;
  impact: string;
  github: string;
  demo: string;
}

// Mock database for case studies — Transitioning to real DB in Phase 3
const caseStudies: Record<string, CaseStudy> = {
  "ai-debate-bot": {
    title: "AI Debate Bot",
    subtitle: "Multi-Agent Structured Reasoning System",
    description: "A comprehensive multi-agent LLM system capable of deep logical reasoning and real-time structured debate. Implements advanced conversational memory and dynamic persona adaptation.",
    metrics: [
      { label: "Latency", value: "< 800ms" },
      { label: "Uptime", value: "99.9%" },
      { label: "Agents", value: "4 Concurrent" }
    ],
    tags: ["Python", "LangChain", "OpenAI", "Redis", "FastAPI", "React"],
    problem: "Existing LLM interfaces fail at complex reasoning tasks that require adversarial thinking. Single-prompt architectures hallucinate or agree blindly, making them unsuitable for robust analytical tasks.",
    systemDesign: "Implemented a multi-agent orchestration layer where distinct 'Persona Agents' debate a topic, monitored by a 'Judge Agent'. Redis handles real-time pub/sub for agent communication.",
    architectureDecisions: "Chose FastAPI over Flask for async native support, crucial for streaming LLM responses. LangChain was used for initial prototyping but heavily customized for the final production memory buffers.",
    optimization: "Reduced API costs by 40% using semantic caching (Redis + vector embeddings) to avoid redundant LLM calls on similar debate topics.",
    scalingLogic: "Stateless agent execution pods scaled horizontally via Kubernetes, with shared context maintained in a low-latency Redis cluster.",
    challenges: "Managing token context windows during long debates. Solved by implementing a summarizing compression agent that periodically compacts older context.",
    impact: "Currently used by 500+ researchers to stress-test logical arguments and uncover cognitive biases in AI models.",
    github: "https://github.com/mrbilauta",
    demo: "#"
  },
  "rust-micropayment-api": {
    title: "Rust Micropayment API",
    subtitle: "High-Throughput Financial Engine",
    description: "High-throughput, low-latency API designed for processing thousands of transactions per second with strict safety guarantees and fault tolerance.",
    metrics: [
      { label: "Throughput", value: "10k TPS" },
      { label: "Latency", value: "2ms P99" },
      { label: "Memory", value: "< 50MB" }
    ],
    tags: ["Rust", "Actix Web", "PostgreSQL", "Docker", "Redis"],
    problem: "Node.js based payment gateways were struggling under burst loads, causing memory leaks and unacceptable latency spikes during peak transaction windows.",
    systemDesign: "Rewrote the core transaction processing engine in Rust using Actix-Web. Implemented a lock-free event-driven architecture using PostgreSQL for durable state and Redis for idempotency checks.",
    architectureDecisions: "Opted for Rust due to its memory safety guarantees without a garbage collector. Actix-Web was chosen over Tokio/Axum for its mature ecosystem and extreme performance benchmarks.",
    optimization: "Implemented connection pooling and prepared statements at startup. Replaced JSON parsing with highly optimized Serde binary formats for internal microservice communication.",
    scalingLogic: "The stateless API scales linearly. Bottlenecks at the DB level were mitigated by implementing a sharded PostgreSQL cluster based on user ID hashes.",
    challenges: "Handling concurrent transaction collisions. Implemented optimistic concurrency control (OCC) with automatic retries on version conflicts.",
    impact: "Reduced infrastructure costs by 80% while increasing theoretical maximum throughput by 15x. Zero memory leaks in production over 12 months.",
    github: "https://github.com/mrbilauta",
    demo: "#"
  },
  "ai-automation-studio": {
    title: "AI Automation Studio",
    subtitle: "Visual Node-Based Orchestration",
    description: "Visual node-based orchestration platform for building and deploying intelligent agent workflows without writing complex code.",
    metrics: [
      { label: "Active Workflows", value: "1,200+" },
      { label: "Nodes Available", value: "150+" },
      { label: "Execution Time", value: "Dynamic" }
    ],
    tags: ["Next.js", "FastAPI", "React Flow", "Celery", "PostgreSQL"],
    problem: "Non-technical operators needed to chain complex AI tasks (OCR -> LLM Parsing -> DB Insert), but existing tools lacked deep AI integration and required Python scripts.",
    systemDesign: "Built a React Flow frontend for visual drag-and-drop orchestration. The backend uses a Directed Acyclic Graph (DAG) executor built in Python with Celery for distributed task execution.",
    architectureDecisions: "Separated the frontend canvas state from the backend execution state. Next.js handles the canvas and UI, while a dedicated Python/FastAPI backend handles the heavy AI inference workloads.",
    optimization: "Implemented aggressive state debouncing on the frontend canvas to maintain 60fps even with 500+ nodes. Task execution is chunked and parallelized where the DAG allows.",
    scalingLogic: "Celery workers can be dynamically spun up based on queue length. Heavy AI nodes are routed to dedicated GPU-backed worker queues.",
    challenges: "Ensuring fault tolerance in long-running workflows. Implemented robust state-checkpoints so failed workflows can resume from the exact node of failure without re-running expensive prior steps.",
    impact: "Empowered marketing and operations teams to automate 10,000+ hours of manual data entry and processing monthly.",
    github: "https://github.com/mrbilauta",
    demo: "#"
  },
  "ecommerce-analytics": {
    title: "E-commerce Analytics Dashboard",
    subtitle: "Real-time Event Streaming",
    description: "Real-time pipeline aggregating millions of events to provide instant insights into conversion metrics and operational bottlenecks.",
    metrics: [
      { label: "Events/Sec", value: "50k+" },
      { label: "Query Latency", value: "< 50ms" },
      { label: "Data Volume", value: "5TB+" }
    ],
    tags: ["Next.js", "Go", "Kafka", "ClickHouse", "WebSockets"],
    problem: "Traditional analytics dashboards were 24 hours behind. The business needed real-time insights into cart abandonment and inventory velocity during flash sales.",
    systemDesign: "Designed a high-throughput ingest pipeline using Go microservices publishing to Apache Kafka. ClickHouse consumes from Kafka using Materialized Views for real-time aggregation.",
    architectureDecisions: "Chose ClickHouse over PostgreSQL/Elasticsearch for its unparalleled OLAP performance on time-series event data. Go was selected for the ingest layer due to its efficient concurrency model.",
    optimization: "Implemented a WebSocket layer in Node.js to push live dashboard updates to the Next.js frontend, avoiding expensive long-polling.",
    scalingLogic: "Kafka partitions allow linear scaling of the Go ingest consumers. ClickHouse cluster scales horizontally for read queries.",
    challenges: "Exactly-once processing semantics. Solved by implementing deduplication logic in the ClickHouse Materialized Views using ReplacingMergeTree engines.",
    impact: "Provided the operations team with a live dashboard during Black Friday, allowing them to dynamically adjust pricing and inventory in real-time, boosting revenue by 15%.",
    github: "https://github.com/mrbilauta",
    demo: "#"
  },
  "trading-signals": {
    title: "AI Trading Signal System",
    subtitle: "Sentiment-Driven Market Intelligence",
    description: "Real-time market analysis engine utilizing advanced sentiment analysis and pattern recognition to generate high-confidence trading signals.",
    metrics: [
      { label: "Accuracy", value: "82%" },
      { label: "Processing", value: "10ms" },
      { label: "Signals/Day", value: "500+" }
    ],
    tags: ["Python", "PyTorch", "WebSocket", "Redis"],
    problem: "Traders struggle to process the sheer volume of news and social media sentiment in real-time, leading to missed opportunities or delayed entries in volatile markets.",
    systemDesign: "Built a distributed sentiment analysis pipeline using Go for data scraping and Python/PyTorch for model inference. Redis acts as the central message bus for signal distribution.",
    architectureDecisions: "Selected PyTorch for its dynamic computational graph, which allowed for rapid iteration on NLP models. WebSockets were used to ensure millisecond signal delivery to clients.",
    optimization: "Quantized the sentiment models to INT8, reducing inference latency by 60% with negligible loss in accuracy.",
    scalingLogic: "The scraper layer scales horizontally across multiple regions to bypass rate limits. Inference workers are deployed on GPU-backed Kubernetes pods.",
    challenges: "Handling the 'noisy' nature of social media data. Implemented a custom filtering heuristic that weights sentiment based on account authority and historical accuracy.",
    impact: "Empowered professional trading desks to capitalize on market-moving news seconds before traditional news terminals.",
    github: "https://github.com/mrbilauta",
    demo: "#"
  },
  "monitoring-dashboard": {
    title: "Enterprise Monitoring Dashboard",
    subtitle: "Infrastructure Observability & Alerting",
    description: "High-density infrastructure monitoring platform providing real-time telemetry, log aggregation, and predictive anomaly detection.",
    metrics: [
      { label: "Hosts", value: "5,000+" },
      { label: "Retention", value: "1 Year" },
      { label: "MTTD", value: "< 30s" }
    ],
    tags: ["Next.js", "Rust", "InfluxDB", "Grafana API"],
    problem: "Fragmented monitoring tools (logs, metrics, traces) led to high Mean Time To Detection (MTTD) and operator fatigue from tool-switching during incidents.",
    systemDesign: "Developed a unified observability dashboard in Next.js that aggregates data from InfluxDB (metrics) and custom Rust-based log collectors.",
    architectureDecisions: "Chose Rust for the log collection agents to minimize host overhead. InfluxDB was selected for its superior compression and query performance on time-series data.",
    optimization: "Implemented a custom query caching layer that stores frequent time-series aggregations, reducing dashboard load times by 70%.",
    scalingLogic: "The dashboard backend is stateless and scales behind a load balancer. The data layer uses InfluxDB Enterprise for high availability and horizontal scaling.",
    challenges: "Visualizing high-cardinality data without crashing the browser. Implemented data downsampling and canvas-based rendering for complex time-series charts.",
    impact: "Reduced Mean Time To Recovery (MTTR) for a major logistics firm by 45%, saving estimated millions in potential downtime costs.",
    github: "https://github.com/mrbilauta",
    demo: "#"
  }
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = caseStudies[slug];

  if (!project) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-fade opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full opacity-40 pointer-events-none translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 blur-[100px] rounded-full opacity-30 pointer-events-none -translate-x-1/2 translate-y-1/4" />
        
        <div className="section-container relative z-10">
          <FadeIn>
            <Link href="/#projects" className="group inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-white/40 hover:text-primary transition-all mb-12">
              <ArrowLeft className="mr-3 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Systems
            </Link>
            
            <div className="mb-8 flex flex-wrap gap-2.5">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/5 text-primary/80 border-white/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 text-white max-w-4xl leading-[0.9]">
              {project.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-primary font-bold uppercase tracking-[0.1em] mb-10 opacity-90">
              {project.subtitle}
            </p>
            
            <p className="text-lg md:text-2xl text-muted-foreground/90 max-w-3xl leading-relaxed mb-12 font-medium">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link href={project.github} target="_blank" className={cn(buttonVariants({ size: "lg", className: "h-16 px-10 text-lg font-bold gap-3" }))}>
                <Code className="h-6 w-6" /> Source Protocol
              </Link>
              <Link href={project.demo} target="_blank" className={cn(buttonVariants({ variant: "outline", size: "lg", className: "h-16 px-10 text-lg font-bold gap-3 bg-white/[0.03] border-white/10 backdrop-blur-md" }))}>
                <ExternalLink className="h-6 w-6" /> Production Link
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Telemetry Bar */}
      <section className="border-y border-white/10 bg-white/[0.02] backdrop-blur-xl relative z-20">
        <div className="section-container py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {project.metrics.map((metric, i) => (
              <SlideUp key={metric.label} delay={0.2 + i * 0.1} className="flex flex-col items-center justify-center pt-8 sm:pt-0">
                <span className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tighter font-mono">{metric.value}</span>
                <span className="text-xs font-mono font-bold text-primary uppercase tracking-[0.3em] opacity-80">{metric.label}</span>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Deep Dive */}
      <section className="py-32 md:py-48 relative overflow-hidden">
        <div className="section-container relative z-10 max-w-5xl">
          <div className="space-y-32 md:space-y-48">
            
            {/* The Problem */}
            <SlideUp>
              <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
                <div className="sticky top-32">
                  <div className="inline-flex h-14 w-14 rounded-2xl bg-primary/10 items-center justify-center border border-primary/20 mb-6">
                    <Target className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight uppercase">The Problem</h2>
                  <div className="h-1 w-12 bg-primary mt-4 rounded-full" />
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-xl md:text-2xl text-muted-foreground/90 leading-relaxed font-medium">
                    {project.problem}
                  </p>
                </div>
              </div>
            </SlideUp>

            {/* System Design */}
            <SlideUp delay={0.1}>
              <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
                <div className="sticky top-32">
                  <div className="inline-flex h-14 w-14 rounded-2xl bg-primary/10 items-center justify-center border border-primary/20 mb-6">
                    <GitMerge className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight uppercase">Architecture</h2>
                  <div className="h-1 w-12 bg-primary mt-4 rounded-full" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl text-muted-foreground/90 leading-relaxed mb-10 font-medium">
                    {project.systemDesign}
                  </p>
                  <div className="bg-white/[0.03] rounded-3xl p-8 md:p-12 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <GitMerge className="h-32 w-32 text-primary" />
                    </div>
                    <h4 className="text-xs font-mono font-bold text-primary uppercase tracking-[0.2em] mb-6">Decision Log</h4>
                    <p className="text-lg md:text-xl text-white/80 leading-relaxed italic">
                      &quot;{project.architectureDecisions}&quot;
                    </p>
                  </div>
                </div>
              </div>
            </SlideUp>

            {/* Optimization & Scaling */}
            <SlideUp delay={0.2}>
              <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
                <div className="sticky top-32">
                  <div className="inline-flex h-14 w-14 rounded-2xl bg-primary/10 items-center justify-center border border-primary/20 mb-6">
                    <Zap className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight uppercase">Performance</h2>
                  <div className="h-1 w-12 bg-primary mt-4 rounded-full" />
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="bg-black/40 rounded-3xl p-10 border border-white/5 hover:border-primary/20 transition-all duration-500 group">
                    <h4 className="font-mono font-bold text-primary mb-6 text-xs uppercase tracking-[0.2em]">Optimization</h4>
                    <p className="text-muted-foreground/90 text-lg leading-relaxed">{project.optimization}</p>
                  </div>
                  <div className="bg-black/40 rounded-3xl p-10 border border-white/5 hover:border-primary/20 transition-all duration-500 group">
                    <h4 className="font-mono font-bold text-primary mb-6 text-xs uppercase tracking-[0.2em]">Scaling Logic</h4>
                    <p className="text-muted-foreground/90 text-lg leading-relaxed">{project.scalingLogic}</p>
                  </div>
                </div>
              </div>
            </SlideUp>

            {/* Engineering Challenges */}
            <SlideUp delay={0.3}>
              <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
                <div className="sticky top-32">
                  <div className="inline-flex h-14 w-14 rounded-2xl bg-primary/10 items-center justify-center border border-primary/20 mb-6">
                    <Shield className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight uppercase">Challenges</h2>
                  <div className="h-1 w-12 bg-primary mt-4 rounded-full" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl text-muted-foreground/90 leading-relaxed font-medium">
                    {project.challenges}
                  </p>
                </div>
              </div>
            </SlideUp>

            {/* Technical Impact */}
            <SlideUp delay={0.4}>
              <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
                <div className="sticky top-32">
                  <div className="inline-flex h-14 w-14 rounded-2xl bg-primary/10 items-center justify-center border border-primary/20 mb-6">
                    <LineChart className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight uppercase">Final Impact</h2>
                  <div className="h-1 w-12 bg-primary mt-4 rounded-full" />
                </div>
                <div className="bg-primary/10 rounded-[2rem] p-10 md:p-16 border border-primary/20 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
                   <p className="text-2xl md:text-3xl text-white font-bold tracking-tight leading-tight relative z-10">
                    {project.impact}
                  </p>
                </div>
              </div>
            </SlideUp>

          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="mb-12">Next System?</h2>
            <Link href="/#projects" className={cn(buttonVariants({ variant: "outline", size: "lg", className: "h-16 px-10 text-lg font-bold border-white/10" }))}>
              Explore More Case Studies
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
