'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

type Props = {
  locale: Locale;
  dict: Dictionary;
  alternatePath: string;
};

export function Header({ locale, dict, alternatePath }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const base = locale === 'pt' ? '/pt' : '';
  const servicesPath = locale === 'pt' ? '/pt/servicos' : '/services';

  const links = [
    { href: `${base}/#about`, label: dict.nav.about },
    { href: `${base}/#skills`, label: dict.nav.skills },
    { href: `${base}/#experience`, label: dict.nav.experience },
    { href: servicesPath, label: dict.nav.services },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white ${hasScrolled ? 'shadow-sm' : ''}`}
    >
      <div className="page-container pt-5">
        <nav aria-label={dict.nav.mainLabel}>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
            <Link
              className="text-[15px] font-medium italic sm:text-base md:text-[24px] lg:font-bold"
              href={base || '/'}
            >
              &lt;Filipe
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Lab/&gt;
              </span>
            </Link>

            <button
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-label="Menu"
              className="size-6 cursor-pointer md:size-8 lg:hidden"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
              </svg>
            </button>

            <div className="hidden gap-6 font-medium lg:flex xl:gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  className="my-5 transition-opacity duration-75 hover:opacity-50"
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
              <a
                className="my-5 transition-opacity duration-75 hover:opacity-50"
                href="/filipe-cavalcante-en.pdf"
                download="Filipe_Cavalcante_CV.pdf"
              >
                {dict.nav.downloadCv}
              </a>
              <Link
                href={alternatePath}
                hrefLang={locale === 'en' ? 'pt-BR' : 'en'}
                className="my-5 transition-opacity duration-75 hover:opacity-50"
              >
                {dict.common.switchLanguage}
              </Link>
            </div>
          </div>

          <div
            className={`absolute left-0 top-14 w-full bg-white shadow-lg transition-all duration-300 lg:hidden ${
              isMobileMenuOpen
                ? 'opacity-100 z-10 p-5'
                : 'opacity-0 -z-10 p-0 overflow-hidden'
            }`}
            style={{ height: isMobileMenuOpen ? 'auto' : '0px' }}
          >
            <div className="page-container flex flex-col font-medium">
              {links.map((link) => (
                <Link
                  key={link.href}
                  className="my-5 transition-opacity duration-75 hover:opacity-50"
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                className="my-5 transition-opacity duration-75 hover:opacity-50"
                href="/filipe-cavalcante-en.pdf"
                download="Filipe_Cavalcante_CV.pdf"
              >
                {dict.nav.downloadCv}
              </a>
              <Link
                href={alternatePath}
                hrefLang={locale === 'en' ? 'pt-BR' : 'en'}
                className="my-5 transition-opacity duration-75 hover:opacity-50"
              >
                {dict.common.switchLanguage}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
