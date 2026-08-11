import { notFound } from 'next/navigation';
import { isLocale, locales } from '@/i18n/config';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPersonJsonLd } from '@/seo/json-ld';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang === 'pt' ? 'pt-BR' : 'en'}>
      <body>
        <JsonLd data={buildPersonJsonLd()} />
        {children}
      </body>
    </html>
  );
}
