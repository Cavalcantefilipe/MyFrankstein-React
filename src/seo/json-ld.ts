import type { Locale } from '@/i18n/config';
import { services } from '@/data/services';
import type { ServiceFaqItem } from '@/data/services';
import { site } from './site';

export function buildPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.authorName,
    url: site.url,
    jobTitle: 'Software Engineer',
    email: `mailto:${site.email}`,
    sameAs: [site.linkedin],
  };
}

export function buildProfessionalServiceJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.authorName,
    url: `${site.url}${locale === 'pt' ? '/pt/servicos' : '/services'}`,
    telephone: `+${site.whatsapp}`,
    email: `mailto:${site.email}`,
    // Atendimento remoto: área de serviço, sem endereço físico
    areaServed: { '@type': 'Country', name: 'Brasil' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name:
        locale === 'pt'
          ? 'Serviços de desenvolvimento web'
          : 'Web development services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title[locale],
          description: service.body[locale],
        },
      })),
    },
  };
}

/**
 * FAQPage structured data for a single service page. Only include questions
 * actually rendered on that page — the schema must match visible content.
 */
export function buildFaqJsonLd(faq: ServiceFaqItem[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question[locale],
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer[locale],
      },
    })),
  };
}
