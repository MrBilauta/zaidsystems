import Link from "next/link";

const projects = [
  {
    title: "ReconMind-AI",
    description: "An intelligent reconnaissance and threat intelligence platform powered by Python.",
    github: "https://github.com/mrbilauta/ReconMind-AI",
    demo: "https://github.com/mrbilauta/ReconMind-AI",
  },
  {
    title: "IoT Micropayment API",
    description: "A high-performance, low-latency Rust-based backend for processing micro-transactions across IoT networks.",
    github: "https://github.com/mrbilauta/Micropayment-API-for-IoT-Devices",
    demo: "https://github.com/mrbilauta/Micropayment-API-for-IoT-Devices",
  },
  {
    title: "AgentKart",
    description: "A scalable Python architecture for managing and orchestrating autonomous AI agents.",
    github: "https://github.com/mrbilauta/agentkart",
    demo: "https://github.com/mrbilauta/agentkart",
  },
  {
    title: "OpenEnv Ticket Resolver",
    description: "Automated IT/DevOps ticket resolution system using Python and LLMs.",
    github: "https://github.com/mrbilauta/openenv-ticket-resolver",
    demo: "https://github.com/mrbilauta/openenv-ticket-resolver",
  },
  {
    title: "Zaid Systems Core",
    description: "The core TypeScript monorepo powering modular enterprise applications and backend services.",
    github: "https://github.com/mrbilauta/zaidsystems",
    demo: "https://github.com/mrbilauta/zaidsystems",
  },
];

export function ProjectsSection() {
  return (
    <section id="sec-projects" style={{ marginTop: '48px' }}>
      <h2>✦ Projects</h2>
      <div className="separator"></div>
      <div className="project-list">
        {projects.map((project) => (
          <article className="project-item has-icon" id={`sec-${project.title.toLowerCase().replace(/\s+/g, '-')}`} key={project.title}>
            <div className="project-icon-wrapper">
              <svg className="project-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" style={{ color: 'white' }}><path d="M11.4697 4.53033C11.1768 4.23744 11.1768 3.76256 11.4697 3.46967C11.7626 3.17678 12.2374 3.17678 12.5303 3.46967L20.5303 11.4697C20.8232 11.7626 20.8232 12.2374 20.5303 12.5303L12.5303 20.5303C12.2374 20.8232 11.7626 20.8232 11.4697 20.5303C11.1768 20.2374 11.1768 19.7626 11.4697 19.4697L18.9393 12L11.4697 4.53033Z" fill="currentColor"></path><path d="M3.46967 4.53033C3.17678 4.23744 3.17678 3.76256 3.46967 3.46967C3.76256 3.17678 4.23744 3.17678 4.53033 3.46967L12.5303 11.4697C12.8232 11.7626 12.8232 12.2374 12.5303 12.5303L4.53033 20.5303C4.23744 20.8232 3.76256 20.8232 3.46967 20.5303C3.17678 20.2374 3.17678 19.7626 3.46967 19.4697L10.9393 12L3.46967 4.53033Z" fill="currentColor"></path></svg>
            </div>
            <div className="project-content">
              <div className="project-title-row">
                <h3 className="project-title">
                  <Link href={project.demo} target="_blank" rel="noopener noreferrer">{project.title}</Link>
                </h3>
                {project.github !== "#" && (
                  <div className="project-meta">
                    <Link href={project.github} target="_blank" rel="noopener noreferrer">Source</Link>
                  </div>
                )}
              </div>
              <p className="project-desc">{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
