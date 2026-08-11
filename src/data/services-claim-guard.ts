import type { Experience } from './experience';

// Guard utilities that back the "no invented claims" test in
// services.test.ts. Extracted into their own module so the fabricated-claim
// regression test can call the exact same logic used against real data.

// Generic words too common to prove a specific claim corresponds to a
// specific CV bullet. Without this, a fabricated "500 clients" would match
// any bullet that happens to mention "clients" for an unrelated reason.
const STOPWORDS = new Set([
  'the',
  'and',
  'for',
  'with',
  'that',
  'from',
  'this',
  'was',
  'were',
  'has',
  'have',
  'had',
  'built',
  'a',
  'an',
  'to',
  'of',
  'in',
  'on',
  'at',
  'by',
  'or',
  'is',
  'as',
  'it',
  'its',
  'their',
  'them',
  'they',
  'i',
  'my',
  'me',
  'per',
  'across',
  'more',
  'than',
  'about',
  'into',
  'now',
  'also',
  'up',
  'clients',
  'client',
  'customers',
  'customer',
  'users',
  'projects',
  'project',
  'team',
  'teams',
  'company',
  'companies',
  'business',
  'work',
  'month',
  'months',
  'year',
  'years',
  'week',
  'weeks',
  'day',
  'days',
  'hour',
  'hours',
  'system',
  'systems',
  'platform',
  'platforms',
  'product',
  'products',
  'sales',
  'result',
  'results',
]);

export function normalizeNumber(raw: string): string {
  // Strips trailing punctuation stuck to a number by sentence structure
  // (e.g. "76," or "95.") and strips thousands/decimal separators so
  // 4,854 (en) and 4.854 (pt) compare equal.
  return raw.replace(/[.,]+$/, '').replace(/[.,]/g, '');
}

export function numbersIn(text: string): string[] {
  return text.match(/\d[\d.,]*/g) ?? [];
}

function tokenize(text: string): string[] {
  const out: string[] = [];
  const re = /\d[\d.,]*|[a-zà-ÿ]+/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    out.push(match[0].toLowerCase());
  }
  return out;
}

function sentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/).filter(Boolean);
}

function distinctiveWords(text: string): Set<string> {
  return new Set(
    tokenize(text).filter(
      (w) => w.length >= 4 && !STOPWORDS.has(w) && !/^\d/.test(w)
    )
  );
}

function sentenceNumbers(sentence: string): string[] {
  return numbersIn(sentence).map(normalizeNumber);
}

export type CorroborationResult = {
  ok: boolean;
  matchedSentence?: string;
  sharedTokens?: string[];
};

/**
 * Checks that `number`, as it appears in `claimText`, corresponds to the
 * SAME sentence-level claim in one of `experiences`' responsibility bullets
 * — not merely that the number appears somewhere in the CV.
 *
 * Correspondence requires two things for at least one CV sentence:
 *   1. The sentence contains the same number.
 *   2. The sentence shares at least one distinctive (non-generic) word with
 *      the sentence in `claimText` that contains the number.
 *
 * This rejects claims like "500 clients" against a CV that only mentions
 * "500" in unrelated contexts ("500+ broken links", "$500+/month"), because
 * neither of those sentences shares a distinctive word with "clients".
 */
export function numberHasCorroboratingBullet(
  number: string,
  claimText: string,
  experiences: readonly Experience[]
): CorroborationResult {
  const target = normalizeNumber(number);
  const claimSentence = sentences(claimText).find((s) =>
    sentenceNumbers(s).includes(target)
  );
  if (!claimSentence) return { ok: false };

  const claimWords = distinctiveWords(claimSentence);

  for (const experience of experiences) {
    // Os dois idiomas afirmam os mesmos fatos, então corroborar contra ambos
    // amplia a base de comparação: uma alegação em português pode casar com a
    // frase em português do CV, e não só com a versão em inglês.
    const allResponsibilities = [
      ...experience.responsibilities.pt,
      ...experience.responsibilities.en,
    ];
    for (const responsibility of allResponsibilities) {
      for (const sentence of sentences(responsibility)) {
        if (!sentenceNumbers(sentence).includes(target)) continue;

        const bulletWords = distinctiveWords(sentence);
        const shared = [...claimWords].filter((t) => bulletWords.has(t));
        if (shared.length > 0) {
          return { ok: true, matchedSentence: sentence, sharedTokens: shared };
        }
      }
    }
  }

  return { ok: false };
}
