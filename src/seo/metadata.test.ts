import { describe, expect, it } from 'vitest';
import { buildMetadata } from './metadata';
import { site } from './site';

const paths = { en: '/services', pt: '/pt/servicos' };

describe('site constants', () => {
  it('usa o domínio apex sem www', () => {
    expect(site.url).toBe('https://filipelab.com');
  });

  it('monta a URL do WhatsApp a partir do número', () => {
    expect(site.whatsappUrl).toBe('https://wa.me/5511985346164');
  });
});

describe('buildMetadata', () => {
  it('define o canonical para o caminho do locale atual', () => {
    const meta = buildMetadata({
      locale: 'pt',
      title: 'Título',
      description: 'Descrição',
      pathByLocale: paths,
    });
    expect(meta.alternates?.canonical).toBe('/pt/servicos');
  });

  it('inclui hreflang para os dois locales mais x-default', () => {
    const meta = buildMetadata({
      locale: 'en',
      title: 'Title',
      description: 'Description',
      pathByLocale: paths,
    });
    expect(meta.alternates?.languages).toEqual({
      en: '/services',
      'pt-BR': '/pt/servicos',
      'x-default': '/services',
    });
  });

  it('x-default sempre aponta para o locale padrão, mesmo em páginas pt', () => {
    const meta = buildMetadata({
      locale: 'pt',
      title: 'Título',
      description: 'Descrição',
      pathByLocale: paths,
    });
    expect(meta.alternates?.languages?.['x-default']).toBe('/services');
  });

  it('define openGraph com a URL absoluta e o locale correto', () => {
    const meta = buildMetadata({
      locale: 'pt',
      title: 'Título',
      description: 'Descrição',
      pathByLocale: paths,
    });
    expect(meta.openGraph?.url).toBe('https://filipelab.com/pt/servicos');
    expect(meta.openGraph?.locale).toBe('pt_BR');
  });
});
