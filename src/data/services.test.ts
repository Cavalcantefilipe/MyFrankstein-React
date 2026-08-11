import { describe, expect, it } from 'vitest';
import { services } from './services';
import { experiences, type Experience } from './experience';
import {
  numbersIn,
  normalizeNumber,
  numberHasCorroboratingBullet,
} from './services-claim-guard';

describe('services data', () => {
  it('tem exatamente os 5 serviços acordados', () => {
    expect(services).toHaveLength(5);
    expect(services.map((s) => s.slug)).toEqual([
      'sites-institucionais',
      'sistemas-web',
      'landing-pages-seo',
      'automacao-ia',
      'integracoes',
    ]);
  });

  it('todo serviço tem conteúdo nos dois idiomas', () => {
    for (const service of services) {
      for (const locale of ['en', 'pt'] as const) {
        expect(service.title[locale].length).toBeGreaterThan(0);
        expect(service.body[locale].length).toBeGreaterThan(0);
        expect(service.proof[locale].length).toBeGreaterThan(0);
      }
    }
  });

  it('cada prova cita apenas números que existem no histórico real', () => {
    const cv = JSON.stringify(experiences);

    for (const service of services) {
      for (const n of numbersIn(service.proof.pt)) {
        // Normaliza separadores para comparar com o CV (4.854 vs 4,854)
        const variants = [n, n.replace(/\./g, ','), n.replace(/,/g, '.')];
        expect(
          variants.some((v) => cv.includes(v)),
          `número "${n}" em "${service.slug}" não existe em experience.ts`
        ).toBe(true);
      }
    }
  });

  it('proof.pt e proof.en citam exatamente o mesmo conjunto de números', () => {
    // O guard de correspondência abaixo roda contra proof.en (mesmo idioma
    // do CV em experience.ts). Esta asserção garante que essa checagem cobre
    // proof.pt por transitividade — os dois não podem divergir em silêncio.
    for (const service of services) {
      const ptNumbers = numbersIn(service.proof.pt).map(normalizeNumber).sort();
      const enNumbers = numbersIn(service.proof.en).map(normalizeNumber).sort();
      expect(
        enNumbers,
        `números de proof.en devem bater com proof.pt em "${service.slug}"`
      ).toEqual(ptNumbers);
    }
  });

  it('cada número em proof.en corresponde à mesma frase de uma responsibility real, não apenas presença solta no arquivo', () => {
    // Regressão para o achado do code review: checar só "o número existe em
    // algum lugar de experience.ts" passa vacuamente. Um "500 clientes
    // atendidos" inventado passaria, porque "500" já aparece em
    // "500+ broken links" e "$500+/month" — contextos sem relação nenhuma
    // com "clientes atendidos". Aqui exigimos que o número apareça na MESMA
    // frase de proof.en e de alguma responsibility, e que essa frase
    // compartilhe pelo menos uma palavra distintiva (não genérica) entre as
    // duas — ou seja, correspondência número+contexto, não só número.
    for (const service of services) {
      for (const n of numbersIn(service.proof.en)) {
        const result = numberHasCorroboratingBullet(
          n,
          service.proof.en,
          experiences
        );
        expect(
          result.ok,
          `número "${n}" em "${service.slug}" (proof.en) não corresponde a nenhuma frase específica de experience.ts — presença solta não basta`
        ).toBe(true);
      }
    }
  });

  it('guarda rejeita alegação fabricada: "500 clientes atendidos" não deve passar', () => {
    // Prova que o guard efetivamente rejeita uma alegação inventada, mesmo
    // quando o número "500" existe em experience.ts em contextos não
    // relacionados. Sem este teste, não saberíamos se o guard realmente
    // guarda — ele poderia estar tão frouxo quanto a checagem antiga.
    // A fixture é local a este teste, não é injetada em services.ts.
    const fabricatedClaim =
      'Served 500 clients across multiple industries with custom platforms.';

    for (const n of numbersIn(fabricatedClaim)) {
      const result = numberHasCorroboratingBullet(
        n,
        fabricatedClaim,
        experiences
      );
      expect(
        result.ok,
        `guard deveria rejeitar "${n}" na alegação fabricada, mas aceitou`
      ).toBe(false);
    }
  });

  it('guarda aceita uma alegação legítima construída como fixture isolada, provando que não é vacuamente restritivo', () => {
    // Complementa o teste anterior: mostra que o mesmo guard aceita uma
    // frase nova (não presente em services.ts) quando o número e uma
    // palavra distintiva realmente correspondem à mesma frase do histórico.
    const legitimateClaim =
      'The edtech platform now has 4,854 users and 6,415 enrollments.';
    const fixtureExperiences: Experience[] = experiences;

    const result = numberHasCorroboratingBullet(
      '4,854',
      legitimateClaim,
      fixtureExperiences
    );
    expect(result.ok).toBe(true);
  });
});
