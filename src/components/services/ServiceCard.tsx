import type { Service } from '@/data/services';
import type { Locale } from '@/i18n/config';

export function ServiceCard({
  service,
  locale,
}: {
  service: Service;
  locale: Locale;
}) {
  return (
    <article
      id={service.slug}
      className="rounded-lg border border-black/15 p-6"
    >
      <h3 className="text-xl font-semibold">{service.title[locale]}</h3>
      <p className="mt-3 text-black/80">{service.body[locale]}</p>
      <p className="mt-3 text-sm text-black/60">{service.proof[locale]}</p>
    </article>
  );
}
