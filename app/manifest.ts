import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mohammed Zaid Khan | AI Systems Developer',
    short_name: 'Zaid Systems',
    description: 'The official digital footprint of Mohammed Zaid Khan. AI systems developer specializing in production-grade infrastructure and intelligent automation.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['education', 'technology', 'portfolio'],
    lang: 'en',
    dir: 'ltr',
    orientation: 'any',
  };
}
