import type { MetadataRoute } from 'next';
import { site } from '@/seo/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { en: '/', pt: '/pt', priority: 1.0 },
    { en: '/services', pt: '/pt/servicos', priority: 0.9 },
    { en: '/lab', pt: '/pt/lab', priority: 0.7 },
    { en: '/random-quote', pt: '/pt/random-quote', priority: 0.6 },
    { en: '/pokemon-battle', pt: '/pt/pokemon-battle', priority: 0.6 },
  ];

  return pages.flatMap(({ en, pt, priority }) =>
    [en, pt].map((path) => ({
      url: `${site.url}${path}`,
      changeFrequency: 'weekly' as const,
      priority,
      alternates: {
        languages: {
          en: `${site.url}${en}`,
          'pt-BR': `${site.url}${pt}`,
        },
      },
    }))
  );
}
