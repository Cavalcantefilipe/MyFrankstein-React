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
    jobTitle: 'Full-Stack Software Engineer',
    email: `mailto:${site.email}`,
    // sameAs liga esta entidade aos perfis externos: é o que permite a
    // buscadores e assistentes de IA confirmar que o autor do site, o
    // Cavalcantefilipe do GitHub e o perfil do LinkedIn são a mesma pessoa.
    sameAs: [site.linkedin, site.github],
    // knowsAbout + localização dão à entidade os atributos que consultas como
    // "desenvolvedor full-stack no Brasil" precisam cruzar.
    knowsAbout: [
      'PHP',
      'Laravel',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'NestJS',
      'React',
      'Next.js',
      'Vue.js',
      'PostgreSQL',
      'MySQL',
      'AWS',
      'Docker',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    nationality: { '@type': 'Country', name: 'Brazil' },
  };
}

export function buildProfessionalServiceJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    // ProfessionalService é subtipo de LocalBusiness no schema.org, então este
    // bloco já satisfaz os requisitos de LocalBusiness (name + address) sem
    // precisar declarar um segundo tipo.
    '@type': 'ProfessionalService',
    // Mesmo nome do Google Business Profile: é assim que o Google liga o site
    // ao perfil e dá mais destaque ao card local.
    '@id': `${site.url}/#fa-cavalcante`,
    name: site.businessName,
    alternateName: site.authorName,
    founder: {
      '@type': 'Person',
      name: site.authorName,
      sameAs: [site.linkedin, site.github],
    },
    image: `${site.url}/icon.svg`,
    sameAs: [site.linkedin, site.github],
    url: `${site.url}${locale === 'pt' ? '/pt/servicos' : '/services'}`,
    telephone: `+${site.whatsapp}`,
    email: `mailto:${site.email}`,
    priceRange: '$$',
    // O Google exige `address` no LocalBusiness. Publicamos apenas cidade,
    // estado e país: é o mínimo aceito e não expõe o endereço residencial.
    // A rua fica só no Google Business Profile, onde o dono controla o que
    // aparece publicamente.
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    // Atende presencialmente na região e remotamente no Brasil e no exterior.
    areaServed: [
      { '@type': 'City', name: site.city },
      { '@type': 'Country', name: locale === 'pt' ? 'Brasil' : 'Brazil' },
      { '@type': 'Place', name: locale === 'pt' ? 'Remoto' : 'Worldwide' },
    ],
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
