import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppCta } from '@/components/services/WhatsAppCta';
import { buildMetadata } from '@/seo/metadata';
import { getDictionary } from '@/i18n/get-dictionary';
import { services } from '@/data/services';
import type { Locale } from '@/i18n/config';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildFaqJsonLd } from '@/seo/json-ld';

const locale: Locale = 'en';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

function paths(slug: string) {
  return { pt: `/pt/servicos/${slug}`, en: `/services/${slug}` } as const;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (lang !== 'en') notFound();

  const service = getService(slug);
  if (!service) notFound();

  return buildMetadata({
    locale,
    title: service.metaTitle[locale],
    description: service.metaDescription[locale],
    pathByLocale: paths(slug),
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  // Esta rota existe apenas em inglês
  if (lang !== 'en') notFound();

  const service = getService(slug);
  if (!service) notFound();

  const dict = getDictionary(locale);
  const routePaths = paths(slug);

  return (
    <>
      <JsonLd data={buildFaqJsonLd(service.faq, locale)} />
      <Header locale={locale} dict={dict} alternatePath={routePaths.pt} />
      <main className="bg-grid with-header-offset">
        <div className="page-container py-16">
          <Link
            href="/services"
            className="text-sm text-faint hover:text-accent"
          >
            &larr; All services
          </Link>

          <h1 className="mt-4 text-4xl lg:text-5xl !leading-tight max-w-4xl">
            {service.heading[locale]}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted">
            {service.intro[locale]}
          </p>
          <div className="mt-8">
            <WhatsAppCta locale={locale} />
          </div>

          <h2 className="mt-16 text-3xl font-semibold">Sound familiar?</h2>
          <ul className="mt-6 max-w-3xl space-y-3 text-muted">
            {service.problems[locale].map((problem) => (
              <li key={problem} className="flex gap-3">
                <span aria-hidden="true">–</span>
                <span>{problem}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 text-3xl font-semibold">What you get</h2>
          <ul className="mt-6 max-w-3xl space-y-3 text-muted">
            {service.deliverables[locale].map((deliverable) => (
              <li key={deliverable} className="flex gap-3">
                <span aria-hidden="true">–</span>
                <span>{deliverable}</span>
              </li>
            ))}
          </ul>

          <section className="mt-16 rounded-lg bg-black/5 p-8">
            <h2 className="text-2xl font-semibold">Real result</h2>
            <p className="mt-3 max-w-2xl text-muted">
              {service.proof[locale]}
            </p>
          </section>

          <h2 className="mt-16 text-3xl font-semibold">
            Frequently asked questions
          </h2>
          <div className="mt-6 max-w-3xl space-y-8">
            {service.faq.map((item) => (
              <div key={item.question[locale]}>
                <h3 className="text-xl font-semibold">
                  {item.question[locale]}
                </h3>
                <p className="mt-2 text-muted">{item.answer[locale]}</p>
              </div>
            ))}
          </div>

          <section className="mt-16 rounded-lg bg-black/5 p-8">
            <h2 className="text-3xl font-semibold">
              {dict.services.contactHeading}
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              {dict.services.contactBody}
            </p>
            <div className="mt-6">
              <WhatsAppCta locale={locale} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
