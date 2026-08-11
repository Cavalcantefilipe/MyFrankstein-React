import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ServiceCard } from '@/components/services/ServiceCard'
import { WhatsAppCta } from '@/components/services/WhatsAppCta'
import { buildMetadata } from '@/seo/metadata'
import { getDictionary } from '@/i18n/get-dictionary'
import { services } from '@/data/services'
import type { Locale } from '@/i18n/config'

const paths = { en: '/services', pt: '/pt/servicos' } as const

export async function generateMetadata() {
  return buildMetadata({
    locale: 'en',
    // 51 caracteres
    title: 'Web Developer for Custom Sites and Systems | Filipe',
    // 142 caracteres
    description:
      'Custom websites, web systems, third-party integrations and AI automation. 6+ years of experience. Remote work for clients in Brazil and abroad.',
    pathByLocale: paths,
  })
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  // Esta rota existe apenas em inglês
  if (lang !== 'en') notFound()

  const dict = getDictionary('en')

  return (
    <>
      <Header locale="en" dict={dict} alternatePath={paths.pt} />
      <main className="bg-white text-black with-header-offset">
        <div className="page-container py-16">
          <h1 className="text-4xl lg:text-5xl !leading-tight max-w-4xl">
            {dict.services.heading}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-black/80">{dict.services.intro}</p>
          <div className="mt-8">
            <WhatsAppCta locale="en" />
          </div>

          <h2 className="mt-16 text-3xl font-semibold">{dict.services.whatIDo}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} locale="en" />
            ))}
          </div>

          <section className="mt-16 rounded-lg bg-black/5 p-8">
            <h2 className="text-3xl font-semibold">{dict.services.contactHeading}</h2>
            <p className="mt-3 max-w-2xl text-black/80">{dict.services.contactBody}</p>
            <div className="mt-6">
              <WhatsAppCta locale="en" />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
