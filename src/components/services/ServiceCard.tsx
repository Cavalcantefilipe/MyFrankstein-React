import Link from 'next/link';
import type { Service } from '@/data/services';
import type { Locale } from '@/i18n/config';

export function ServiceCard({
  service,
  locale,
}: {
  service: Service;
  locale: Locale;
}) {
  const href =
    locale === 'pt'
      ? `/pt/servicos/${service.slug}`
      : `/services/${service.slug}`;

  return (
    <article
      id={service.slug}
      className="rounded-lg border border-black/15 p-6"
    >
      <h3 className="text-xl font-semibold">
        <Link href={href} className="hover:underline">
          {service.title[locale]}
        </Link>
      </h3>
      <p className="mt-3 text-black/80">{service.body[locale]}</p>
      <p className="mt-3 text-sm text-black/60">{service.proof[locale]}</p>
    </article>
  );
}
