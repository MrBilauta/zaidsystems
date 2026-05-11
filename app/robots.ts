import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: [
          'GPTBot', 
          'ChatGPT-User', 
          'Claude-Web', 
          'ClaudeBot', 
          'PerplexityBot', 
          'CCBot', 
          'Googlebot', 
          'Bingbot', 
          'Applebot', 
          'LinkedInBot', 
          'Twitterbot', 
          'facebookexternalhit', 
          'Amazonbot', 
          'Bytespider'
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://www.zaidsystems.dev/sitemap.xml',
    host: 'https://www.zaidsystems.dev',
  };
}
