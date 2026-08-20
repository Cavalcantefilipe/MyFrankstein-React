import { notFound } from 'next/navigation';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { isLocale, locales } from '@/i18n/config';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPersonJsonLd } from '@/seo/json-ld';

// As duas famílias do redesign. `variable` expõe cada uma como custom
// property para o @theme do app.css consumir via --font-display/--font-mono.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

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
    <html
      lang={lang === 'pt' ? 'pt-BR' : 'en'}
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-ink text-fg font-display antialiased">
        <JsonLd data={buildPersonJsonLd()} />
        {children}
      </body>
    </html>
  );
}
