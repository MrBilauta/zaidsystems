import Link from "next/link";
import { FileText } from "lucide-react";

const certificates = [
  {
    title: "Tools for Data Science",
    href: "/certificates/Coursera 1DAL9JPYK4KQ IBM Tool Certificate.pdf",
    issuer: "IBM",
  },
  {
    title: "MLOps and responsible AI practices",
    href: "/certificates/Coursera 2QVKXV1O2JD0.pdf",
    issuer: "Microsoft",
  },
  {
    title: "Microsoft Generative AI Engineering",
    href: "/certificates/Coursera 4R2L47UY14QG.pdf",
    issuer: "Microsoft",
  },
  {
    title: "Foundations of Cybersecurity",
    href: "/certificates/Coursera 7IEVVE1ZHTTP.pdf",
    issuer: "Google",
  },
  {
    title: "Python Project for Data Science",
    href: "/certificates/Coursera AN860INJ9G3D.pdf",
    issuer: "IBM",
  },
  {
    title: "Multimodal and cross-modal AI integrations",
    href: "/certificates/Coursera B37DEQ3TB2XM.pdf",
    issuer: "Microsoft",
  },
  {
    title: "Working with large language models using Azure",
    href: "/certificates/Coursera BWTFH2B0I1U1.pdf",
    issuer: "Microsoft",
  },
  {
    title: "Python for Data Science, AI & Development",
    href: "/certificates/Coursera JGKM6K0KW267.pdf",
    issuer: "IBM",
  },
  {
    title: "Core generative models and techniques",
    href: "/certificates/Coursera S16I9EXX6BE4.pdf",
    issuer: "Microsoft",
  },
  {
    title: "Getting started with generative AI in Azure",
    href: "/certificates/Coursera SNNS5FD3L598.pdf",
    issuer: "Microsoft",
  },
  {
    title: "Data Science Methodology",
    href: "/certificates/Coursera YTT1UD9KLLZ1.pdf",
    issuer: "IBM",
  },
  {
    title: "Data Visualisation",
    href: "/certificates/ibm.pdf",
    issuer: "IBM",
  },
];

export function CertificatesSection() {
  return (
    <section id="sec-certificates" style={{ marginTop: '48px' }}>
      <h2 id="certificates">✦ Licenses & Certificates</h2>
      <div className="separator"></div>
      <div className="project-list">
        {certificates.map((cert) => (
          <article className="project-item has-icon" key={cert.href}>
            <div className="project-icon-wrapper" style={{ marginTop: '4px' }}>
              <FileText className="h-5 w-5 text-zinc-400" />
            </div>
            <div className="project-content">
              <div className="project-title-row">
                <h3 className="project-title">
                  <Link href={cert.href} target="_blank" rel="noopener noreferrer">{cert.title}</Link>
                </h3>
                <div className="project-meta">
                  <span style={{ color: 'var(--ink-50)' }}>{cert.issuer}</span>
                  <span className="footer-divider" style={{ margin: '0 6px', opacity: 0.5 }}>•</span>
                  <Link href={cert.href} target="_blank" rel="noopener noreferrer">View PDF</Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
