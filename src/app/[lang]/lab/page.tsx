import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LabCard } from '@/components/lab/LabCard';
import { buildMetadata } from '@/seo/metadata';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import randomQuotesImg from '@/assets/randomquotes.png';
import battlepokemon from '@/assets/battlepokemon.png';

const paths = { en: '/lab', pt: '/pt/lab' } as const;

const openIcon = (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>Open</title>
    <path
      d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"
      fill="currentColor"
    />
    <path d="M5 5h5V3H3v7h2V5z" fill="currentColor" />
  </svg>
);

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
      ? 'Lab — Experimentos de Filipe Cavalcante'
      : 'Lab — Filipe Cavalcante experiments',
    description: isPt
      ? 'Experimentos e demos interativas: um tradutor de frases aleatórias e um simulador de batalhas Pokémon construídos por Filipe Cavalcante.'
      : 'Interactive experiments and demos: a random quote translator and a Pokemon battle simulator built by Filipe Cavalcante.',
    pathByLocale: paths,
  });
}

export default async function LabPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const alternatePath = lang === 'en' ? paths.pt : paths.en;
  const randomQuotePath = lang === 'pt' ? '/pt/random-quote' : '/random-quote';
  const pokemonBattlePath =
    lang === 'pt' ? '/pt/pokemon-battle' : '/pokemon-battle';

  return (
    <>
      <Header locale={lang} dict={dict} alternatePath={alternatePath} />
      <div className="with-header-offset bg-white text-black">
        <div className="page-container py-10 min-h-[calc(90dvh-var(--header-height))]">
          <div className="max-w-6xl mx-auto">
            <h1 className="mb-6 text-3xl font-semibold text-center md:text-left">
              {dict.nav.lab}
            </h1>
            <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] justify-items-center md:justify-items-stretch">
              <LabCard
                title="Random Quotes"
                subtitle="How about a random phrase translated into the language you want?"
                date="Est. 2025"
                href={randomQuotePath}
                imageSrc={randomQuotesImg}
                icon={openIcon}
              />

              <LabCard
                title="Pokemon Battle Simulator"
                subtitle="Build your dream team and prepare for battle!"
                date="Est. 2025"
                href={pokemonBattlePath}
                imageSrc={battlepokemon}
                icon={openIcon}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
