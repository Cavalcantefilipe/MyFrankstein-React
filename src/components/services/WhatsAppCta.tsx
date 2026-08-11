import { FaWhatsapp } from 'react-icons/fa';
import { site } from '@/seo/site';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';

export function WhatsAppCta({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <a
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-md bg-black px-6 py-3 text-white hover:bg-black/80"
    >
      <FaWhatsapp aria-hidden="true" /> {dict.common.whatsappCta}
    </a>
  );
}
