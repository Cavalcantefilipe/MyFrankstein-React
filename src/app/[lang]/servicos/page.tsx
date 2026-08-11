import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceCard } from '@/components/services/ServiceCard';
import { WhatsAppCta } from '@/components/services/WhatsAppCta';
import { buildMetadata } from '@/seo/metadata';
import { getDictionary } from '@/i18n/get-dictionary';
import { services } from '@/data/services';
import type { Locale } from '@/i18n/config';

const paths = { en: '/services', pt: '/pt/servicos' } as const;

export async function generateMetadata() {
  return buildMetadata({
    locale: 'pt',
    // 56 caracteres
    title: 'Desenvolvedor Web e Criação de Sites | Filipe Cavalcante',
    // 146 caracteres
    description:
      'Criação de sites, sistemas web sob medida, integrações e automação com IA. Mais de 6 anos de experiência. Atendimento remoto para todo o Brasil.',
    pathByLocale: paths,
  });
}

export default async function ServicosPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  // Esta rota existe apenas em português
  if (lang !== 'pt') notFound();

  const dict = getDictionary('pt');

  return (
    <>
      <Header locale="pt" dict={dict} alternatePath={paths.en} />
      <main className="bg-white text-black with-header-offset">
        <div className="page-container py-16">
          <h1 className="text-4xl lg:text-5xl !leading-tight max-w-4xl">
            {dict.services.heading}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-black/80">
            {dict.services.intro}
          </p>
          <div className="mt-8">
            <WhatsAppCta locale="pt" />
          </div>

          <h2 className="mt-16 text-3xl font-semibold">
            {dict.services.whatIDo}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} locale="pt" />
            ))}
          </div>

          <section className="mt-16 rounded-lg bg-black/5 p-8">
            <h2 className="text-3xl font-semibold">
              {dict.services.contactHeading}
            </h2>
            <p className="mt-3 max-w-2xl text-black/80">
              {dict.services.contactBody}
            </p>
            <div className="mt-6">
              <WhatsAppCta locale="pt" />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
