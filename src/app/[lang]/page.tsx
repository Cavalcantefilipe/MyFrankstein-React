import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'

export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = getDictionary(lang)
  return <h1>{dict.home.role}</h1>
}
