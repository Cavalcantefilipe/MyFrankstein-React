import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { caseStudies } from '@/data/case-studies';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import { buildMetadata } from '@/seo/metadata';

type Props = { params: Promise<{ lang: Locale; slug: string }> };

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();
  return buildMetadata({
    locale: lang,
    title: `${study.title[lang]} | Filipe Cavalcante`,
    description: study.summary[lang],
    pathByLocale: { en: `/cases/${slug}`, pt: `/pt/cases/${slug}` },
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { lang, slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();
  const pt = lang === 'pt';
  return (
    <>
      <Header locale={lang} dict={getDictionary(lang)} alternatePath={pt ? `/cases/${slug}` : `/pt/cases/${slug}`} />
      <main className="with-header-offset bg-grid min-h-dvh">
        <article className="page-container py-16">
          <div className="mx-auto max-w-3xl">
            <Link href={pt ? '/pt#cases' : '/#cases'} className="text-sm text-accent underline underline-offset-4">
              {pt ? 'Todos os casos técnicos' : 'All technical cases'}
            </Link>
            <p className="mt-8 font-mono text-sm text-accent">{study.kind[lang]}</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{study.title[lang]}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">{study.summary[lang]}</p>
            <ul className="mt-6 flex list-none flex-wrap gap-2 p-0">
              {study.stack.map((item) => <li key={item} className="rounded border border-white/15 px-3 py-1 text-sm text-muted">{item}</li>)}
            </ul>
            {study.sections.map((section) => (
              <section key={section.heading.en} className="mt-12">
                <h2 className="mb-5 text-2xl font-semibold">{section.heading[lang]}</h2>
                {section.paragraphs[lang].map((paragraph) => <p key={paragraph} className="mb-5 text-base leading-8 text-fg-strong">{paragraph}</p>)}
              </section>
            ))}
            {study.code && (
              <section className="mt-12">
                <h2 className="mb-5 text-2xl font-semibold">{pt ? 'Exemplo em TypeScript' : 'TypeScript example'}</h2>
                <pre className="overflow-x-auto rounded-md border border-white/15 bg-ink p-5 text-sm leading-6 text-fg-strong"><code>{study.code}</code></pre>
              </section>
            )}
            <section className="mt-12 border-t border-white/15 pt-8">
              <h2 className="mb-5 text-2xl font-semibold">{pt ? 'Referências e evidências' : 'References and evidence'}</h2>
              <ul className="space-y-3">
                {study.links.map((link) => <li key={link.url}><a href={link.url} className="break-words text-base text-accent underline underline-offset-4">{link.label}</a></li>)}
              </ul>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
