import { FaEnvelope, FaGlobe, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { site } from '@/seo/site';

export function Footer() {
  return (
    <footer className="border-t border-white/[.08] bg-surface">
      <div className="page-container py-7">
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-faint">
          <p>
            © {new Date().getFullYear()} {site.businessName} ·{' '}
            {site.authorName}
          </p>
          <div className="flex items-center gap-5 text-base">
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="transition-colors hover:text-accent"
            >
              <FaEnvelope aria-hidden="true" />
            </a>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="transition-colors hover:text-accent"
            >
              <FaWhatsapp aria-hidden="true" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-accent"
            >
              <FaLinkedin aria-hidden="true" />
            </a>
            <a
              href={site.url}
              aria-label="Website"
              className="transition-colors hover:text-accent"
            >
              <FaGlobe aria-hidden="true" />
            </a>
          </div>
          <p className="w-full text-center sm:w-auto sm:text-right">
            ~/filipelab · {site.city}/{site.region}
          </p>
        </div>
      </div>
    </footer>
  );
}
