import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProjectGrid } from '@/components/lab/ProjectGrid';
import { projects } from '@/data/projects';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import { buildMetadata } from '@/seo/metadata';

const paths = { en: '/lab', pt: '/pt/lab' } as const;

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
      ? 'Experimentos ao vivo, estudos de caso e projetos entregues: plataforma EdTech, ferramenta de reels, simulador de batalha Pokemon e gerador de frases.'
      : 'Live experiments, case studies and shipped projects: an EdTech platform, a reels tool, a Pokemon battle simulator and a random quote generator.',
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
  const homePath = lang === 'pt' ? '/pt' : '/';

  return (
    <>
      <Header locale={lang} dict={dict} alternatePath={alternatePath} />
      <main className="with-header-offset bg-grid min-h-dvh">
        <section
          aria-labelledby="lab-heading"
          className="page-container pt-20 pb-12"
        >
          <p className="font-mono text-xs text-accent">~/filipelab/lab</p>
          <h1
            id="lab-heading"
            className="mt-3 mb-4 text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[56px]"
          >
            {dict.lab.heading}
          </h1>
          <p className="max-w-[560px] font-mono text-sm leading-relaxed text-muted">
            {dict.lab.intro}
          </p>
        </section>

        <section className="page-container pb-24">
          <ProjectGrid projects={projects} locale={lang} dict={dict} />
        </section>

        <div className="page-container pb-24">
          <Link
            href={homePath}
            className="font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            ← {dict.lab.backHome}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
