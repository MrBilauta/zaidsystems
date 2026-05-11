import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.zaidsystems.dev';
  const currentDate = new Date('2026-05-10'); // Stable timestamp for SEO

  const blogSlugs = [
    'ai-systems-engineering',
    'backend-optimization-rust',
    'future-of-automation',
  ];

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.7,
    images: [`${baseUrl}/og-image.jpg`],
  }));

  const projectSlugs = [
    'ai-debate-bot',
    'rust-payment-api',
    'automation-studio',
    'ecommerce-analytics',
    'trading-signals',
    'monitoring-dashboard'
  ];

  const projectEntries: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
    images: [`${baseUrl}/og-image.jpg`],
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      images: [`${baseUrl}/og-image.jpg`],
    },
    {
      url: `${baseUrl}/about-mohammed-zaid-khan`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [`${baseUrl}/og-image.jpg`],
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
      images: [`${baseUrl}/og-image.jpg`],
    },
    ...projectEntries,
    ...blogEntries,
  ];
}
