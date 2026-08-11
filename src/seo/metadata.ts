import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { defaultLocale } from '@/i18n/config'
import { site } from './site'

export type BuildMetadataInput = {
  locale: Locale
  title: string
  description: string
  pathByLocale: Record<Locale, string>
}

const ogLocale: Record<Locale, string> = {
  en: 'en_US',
  pt: 'pt_BR',
}

const hreflang: Record<Locale, string> = {
  en: 'en',
  pt: 'pt-BR',
}

export function buildMetadata({
  locale,
  title,
  description,
  pathByLocale,
}: BuildMetadataInput): Metadata {
  const canonical = pathByLocale[locale]

  const languages: Record<string, string> = {
    'x-default': pathByLocale[defaultLocale],
  }
  for (const [loc, path] of Object.entries(pathByLocale) as [Locale, string][]) {
    languages[hreflang[loc]] = path
  }

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: `${site.url}${canonical}`,
      siteName: site.name,
      locale: ogLocale[locale],
      type: 'website',
    },
    robots: { index: true, follow: true },
  }
}
