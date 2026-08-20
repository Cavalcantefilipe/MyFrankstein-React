import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PokemonBattleClient } from '@/components/lab/PokemonBattleClient';
import { buildMetadata } from '@/seo/metadata';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';

const paths = { en: '/pokemon-battle', pt: '/pt/pokemon-battle' } as const;

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
      ? 'Pokemon Battle Simulator — Monte seu Time | Filipe Cavalcante'
      : 'Pokemon Battle Simulator — Build Your Team | Filipe Cavalcante',
    description: isPt
      ? 'Monte seu time dos sonhos e simule batalhas Pokémon automaticamente ou jogue turno a turno. Experimento de laboratório criado por Filipe Cavalcante.'
      : 'Build your dream team and simulate Pokemon battles automatically or play them turn by turn. A lab experiment built by Filipe Cavalcante.',
    pathByLocale: paths,
  });
}

export default async function PokemonBattlePage({
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
          <h1 className="mb-6 text-center text-4xl font-bold tracking-[-0.02em] text-fg">
            Pokemon Battle Simulator
          </h1>
          <PokemonBattleClient />
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
