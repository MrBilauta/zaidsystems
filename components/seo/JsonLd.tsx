import React from 'react';

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.zaidsystems.dev/#person",
  "name": "Mohammed Zaid Khan",
  "alternateName": ["Zaid Khan", "mrbilauta"],
  "url": "https://www.zaidsystems.dev",
  "image": "https://www.zaidsystems.dev/og-image.jpg",
  "description": "Mohammed Zaid Khan is an elite AI Systems Developer and Software Engineer specializing in production-grade infrastructure, distributed systems, and intelligent automation.",
  "jobTitle": "AI Systems Developer",
  "gender": "Male",
  "nationality": {
    "@type": "Country",
    "name": "India"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "addressCountry": "IN"
  },
  "knowsAbout": [
    "Artificial Intelligence",
    "Software Engineering",
    "Distributed Systems",
    "System Architecture",
    "Cybersecurity",
    "Cloud Computing",
    "Automation",
    "Rust (Programming Language)",
    "Python (Programming Language)",
    "Go (Programming Language)",
    "Large Language Models (LLMs)"
  ],
  "sameAs": [
    "https://github.com/mrbilauta",
    "https://linkedin.com/in/khanmohammedzaid",
    "https://twitter.com/mrbilauta",
    "https://www.hackerrank.com/profile/khanmohammedzaid"
  ]
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.zaidsystems.dev/#organization",
  "name": "Zaid Systems",
  "url": "https://www.zaidsystems.dev",
  "logo": "https://www.zaidsystems.dev/logo.png",
  "founder": { "@id": "https://www.zaidsystems.dev/#person" },
  "description": "Zaid Systems is a high-performance engineering studio specializing in AI orchestration and scalable backend infrastructure.",
  "sameAs": ["https://github.com/mrbilauta"]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.zaidsystems.dev/#website",
  "url": "https://www.zaidsystems.dev",
  "name": "Zaid Systems",
  "publisher": { "@id": "https://www.zaidsystems.dev/#organization" },
  "author": { "@id": "https://www.zaidsystems.dev/#person" }
};

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": { "@id": "https://www.zaidsystems.dev/#person" },
  "description": "Authoritative biography and engineering profile of Mohammed Zaid Khan.",
  "publisher": { "@id": "https://www.zaidsystems.dev/#organization" }
};

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith('http') ? item.item : `https://www.zaidsystems.dev${item.item}`
    }))
  };
}
