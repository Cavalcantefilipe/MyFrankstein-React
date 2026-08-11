import type { Locale } from './config'
import { en } from './dictionaries/en'
import { pt } from './dictionaries/pt'

export type Dictionary = typeof en

const dictionaries: Record<Locale, Dictionary> = { en, pt }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
