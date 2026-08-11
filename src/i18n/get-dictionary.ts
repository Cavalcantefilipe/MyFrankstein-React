import type { Locale } from './config';
import { en } from './dictionaries/en';
import { pt } from './dictionaries/pt';

type Widen<T> = { [K in keyof T]: T[K] extends object ? Widen<T[K]> : string };

export type Dictionary = Widen<typeof en>;

const dictionaries: Record<Locale, Dictionary> = { en, pt };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
