import { describe, expect, it } from 'vitest';
import { buildPersonJsonLd, buildProfessionalServiceJsonLd } from './json-ld';

describe('buildPersonJsonLd', () => {
  it('descreve a pessoa com url e perfis', () => {
    const data = buildPersonJsonLd() as Record<string, unknown>;
    expect(data['@type']).toBe('Person');
    expect(data.name).toBe('Filipe Alves Cavalcante');
    expect(data.url).toBe('https://filipelab.com');
    expect(data.sameAs).toContain(
      'https://www.linkedin.com/in/cavalcante-filipe/'
    );
  });
});

describe('buildProfessionalServiceJsonLd', () => {
  // O nome precisa ser idêntico ao do Google Business Profile: é a chave que
  // o Google usa para conectar o site ao perfil local.
  it('usa o nome do Google Business Profile', () => {
    const data = buildProfessionalServiceJsonLd('pt') as Record<
      string,
      unknown
    >;
    expect(data.name).toBe('FA Cavalcante');
    expect(data.alternateName).toBe('Filipe Alves Cavalcante');
  });

  it('lista os 5 serviços no catálogo', () => {
    const data = buildProfessionalServiceJsonLd('pt') as {
      '@type': string;
      hasOfferCatalog: { itemListElement: unknown[] };
    };
    expect(data['@type']).toBe('ProfessionalService');
    expect(data.hasOfferCatalog.itemListElement).toHaveLength(5);
  });

  // O Google exige `address` no LocalBusiness (ProfessionalService é subtipo).
  // Sem ele, o bloco é ignorado para rich results locais.
  it('inclui o endereço mínimo exigido pelo Google', () => {
    const data = buildProfessionalServiceJsonLd('pt') as {
      address: Record<string, string>;
    };
    expect(data.address['@type']).toBe('PostalAddress');
    expect(data.address.addressLocality).toBe('Caraguatatuba');
    expect(data.address.addressRegion).toBe('SP');
    expect(data.address.addressCountry).toBe('BR');
  });

  // O endereço residencial nunca deve chegar ao HTML público: cidade e estado
  // bastam para o Google, e a rua só pertence ao Business Profile.
  it('não publica rua nem número', () => {
    const json = JSON.stringify(buildProfessionalServiceJsonLd('pt'));
    expect(json).not.toContain('streetAddress');
    expect(json).not.toContain('Victor Augusto');
    expect(json).not.toContain('postalCode');
  });

  it('declara atendimento local, nacional e remoto', () => {
    const data = buildProfessionalServiceJsonLd('pt') as {
      areaServed: { '@type': string; name: string }[];
    };
    const names = data.areaServed.map((a) => a.name);
    expect(names).toContain('Caraguatatuba');
    expect(names).toContain('Brasil');
    expect(names).toContain('Remoto');
  });

  it('usa os nomes em inglês no locale en', () => {
    const data = buildProfessionalServiceJsonLd('en') as {
      areaServed: { name: string }[];
    };
    const names = data.areaServed.map((a) => a.name);
    expect(names).toContain('Brazil');
    expect(names).toContain('Worldwide');
  });
});
