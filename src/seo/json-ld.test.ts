import { describe, expect, it } from 'vitest';
import { buildPersonJsonLd, buildProfessionalServiceJsonLd } from './json-ld';

describe('buildPersonJsonLd', () => {
  it('descreve a pessoa com url e perfis', () => {
    const data = buildPersonJsonLd() as Record<string, unknown>;
    expect(data['@type']).toBe('Person');
    expect(data.name).toBe('Filipe Alves Cavalcante');
    expect(data.url).toBe('https://filipelab.com');
    expect(data.sameAs).toContain(
      'https://www.linkedin.com/in/cavalcante-filipe/',
    );
  });
});

describe('buildProfessionalServiceJsonLd', () => {
  it('lista os 5 serviços no catálogo', () => {
    const data = buildProfessionalServiceJsonLd('pt') as {
      '@type': string;
      hasOfferCatalog: { itemListElement: unknown[] };
    };
    expect(data['@type']).toBe('ProfessionalService');
    expect(data.hasOfferCatalog.itemListElement).toHaveLength(5);
  });

  it('nunca usa LocalBusiness, porque o atendimento é remoto', () => {
    const json = JSON.stringify(buildProfessionalServiceJsonLd('pt'));
    expect(json).not.toContain('LocalBusiness');
    expect(json).not.toContain('PostalAddress');
  });

  it('declara área de atendimento como Brasil', () => {
    const data = buildProfessionalServiceJsonLd('pt') as {
      areaServed: { name: string };
    };
    expect(data.areaServed.name).toBe('Brasil');
  });
});
