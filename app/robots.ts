import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },

      // AI Crawlers
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Claude-Web',
          'ClaudeBot',
          'PerplexityBot',
          'CCBot',
          'Google-Extended',
          'Bytespider',
          'meta-externalagent',
        ],
        allow: '/',
      },

      // Search Engines
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Applebot',
          'DuckDuckBot',
          'Slurp',
          'YandexBot',
        ],
        allow: '/',
      },

      // Social Crawlers
      {
        userAgent: [
          'LinkedInBot',
          'Twitterbot',
          'facebookexternalhit',
          'Discordbot',
          'Slackbot',
        ],
        allow: '/',
      },
    ],

    sitemap: 'https://www.zaidsystems.dev/sitemap.xml',

    host: 'https://www.zaidsystems.dev',
  };
}
