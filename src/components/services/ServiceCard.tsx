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
      className="rounded-lg border border-white/[.08] bg-raised p-6 transition-colors hover:border-accent/40"
    >
      <h3 className="text-xl font-semibold text-fg">
        <Link href={href} className="hover:text-accent">
          {service.title[locale]}
        </Link>
      </h3>
      <p className="mt-3 text-fg-strong">{service.body[locale]}</p>
      <p className="mt-3 text-sm text-muted">{service.proof[locale]}</p>
    </article>
  );
}
