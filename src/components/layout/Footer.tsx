import { FaEnvelope, FaGlobe, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { site } from '@/seo/site';

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="page-container py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-center">
          <p className="text-sm text-black/80 w-full sm:w-auto">
            © {new Date().getFullYear()} {site.authorName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-black/80 mx-auto sm:mx-0">
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="hover:text-black"
            >
              <FaEnvelope aria-hidden="true" />
            </a>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-black"
            >
              <FaWhatsapp aria-hidden="true" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-black"
            >
              <FaLinkedin aria-hidden="true" />
            </a>
            <a
              href={site.url}
              aria-label="Website"
              className="hover:text-black"
            >
              <FaGlobe aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
