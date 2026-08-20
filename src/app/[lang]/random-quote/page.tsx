import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RandomQuoteClient } from '@/components/lab/RandomQuoteClient';
import { buildMetadata } from '@/seo/metadata';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';

const paths = { en: '/random-quote', pt: '/pt/random-quote' } as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const isPt = lang === 'pt';
  return buildMetadata({
    locale: lang,
    title: isPt
      ? 'Random Quote — Frases Aleatórias Traduzidas | Filipe Cavalcante'
      : 'Random Quote — Translated Random Quotes | Filipe Cavalcante',
    description: isPt
      ? 'Gere uma frase aleatória e traduza para o idioma que quiser. Experimento de laboratório criado por Filipe Cavalcante.'
      : 'Generate a random quote and translate it into the language you want. A lab experiment built by Filipe Cavalcante.',
    pathByLocale: paths,
  });
}

export default async function RandomQuotePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const alternatePath = lang === 'en' ? paths.pt : paths.en;

  return (
    <>
      <Header locale={lang} dict={dict} alternatePath={alternatePath} />
      <main>
      <div className="with-header-offset bg-grid">
        <div className="page-container py-10 min-h-[calc(90dvh-var(--header-height))]">
          <div className="max-w-3xl mx-auto">
            <h1 className="mb-4 text-3xl font-semibold text-center md:text-left">
              Random Quote
            </h1>
          </div>
          <RandomQuoteClient />
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
