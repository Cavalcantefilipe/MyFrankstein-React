import { describe, expect, it } from 'vitest';
import { getDictionary } from './get-dictionary';
import { isLocale, locales, defaultLocale } from './config';

describe('locale config', () => {
  it('lista en e pt, com en como padrão', () => {
    expect(locales).toEqual(['en', 'pt']);
    expect(defaultLocale).toBe('en');
  });

  it('isLocale aceita locales válidos e rejeita o resto', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('pt')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(isLocale('')).toBe(false);
  });
});

describe('getDictionary', () => {
  it('retorna textos em português para pt', () => {
    const dict = getDictionary('pt');
    expect(dict.nav.services).toBe('Serviços');
    expect(dict.common.whatsappCta).toBe('Fale comigo no WhatsApp');
  });

  it('retorna textos em inglês para en', () => {
    const dict = getDictionary('en');
    expect(dict.nav.services).toBe('Services');
  });

  it('en e pt têm exatamente as mesmas chaves', () => {
    const flatten = (obj: object, prefix = ''): string[] =>
      Object.entries(obj).flatMap(([k, v]) =>
        typeof v === 'object' && v !== null
          ? flatten(v, `${prefix}${k}.`)
          : [`${prefix}${k}`]
      );
    expect(flatten(getDictionary('en')).sort()).toEqual(
      flatten(getDictionary('pt')).sort()
    );
  });
});
