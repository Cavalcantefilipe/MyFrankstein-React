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

  // Fecha o menu ao navegar por âncora ou apertar Escape: o drawer é
  // position:fixed e continuaria cobrindo a seção de destino.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileMenuOpen]);

  const base = locale === 'pt' ? '/pt' : '';
  const servicesPath = locale === 'pt' ? '/pt/servicos' : '/services';
  const labPath = locale === 'pt' ? '/pt/lab' : '/lab';

  const links = [
    { href: labPath, label: dict.nav.lab },
    { href: `${base}/#about`, label: dict.nav.about },
    { href: `${base}/#skills`, label: dict.nav.skills },
    { href: `${base}/#experience`, label: dict.nav.experience },
    { href: servicesPath, label: dict.nav.services },
  ];

  const close = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/[.07] bg-ink/[.88] backdrop-blur-md">
      <div className="page-container">
        <nav aria-label={dict.nav.mainLabel}>
          <div className="flex h-16 items-center justify-between gap-6">
            <Link
              href={base || '/'}
              className="font-mono text-[15px] font-semibold text-fg"
            >
              ~/filipe<span className="text-accent">lab</span>
            </Link>

            <button
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-label="Menu"
              className="size-6 cursor-pointer text-muted transition-colors hover:text-fg lg:hidden"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
              </svg>
            </button>

            <div className="hidden items-center gap-7 font-mono text-[13px] lg:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted transition-colors hover:text-fg"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={alternatePath}
                hrefLang={locale === 'en' ? 'pt-BR' : 'en'}
                className="rounded border border-white/15 px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {locale === 'pt' ? 'EN' : 'PT'}
              </Link>
              <a
                href="/filipe-cavalcante-en.pdf"
                download="Filipe_Cavalcante_CV.pdf"
                className="rounded bg-accent px-3.5 py-[7px] font-semibold text-ink transition-colors hover:bg-accent-hover"
              >
                cv.pdf
              </a>
            </div>
          </div>

          <div
            id="mobile-menu"
            hidden={!isMobileMenuOpen}
            className="border-t border-white/[.07] bg-surface pb-6 lg:hidden"
          >
            <div className="flex flex-col font-mono text-sm">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="py-3 text-muted transition-colors hover:text-fg"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={alternatePath}
                hrefLang={locale === 'en' ? 'pt-BR' : 'en'}
                onClick={close}
                className="py-3 text-muted transition-colors hover:text-fg"
              >
                {dict.common.switchLanguage}
              </Link>
              <a
                href="/filipe-cavalcante-en.pdf"
                download="Filipe_Cavalcante_CV.pdf"
                onClick={close}
                className="mt-3 rounded bg-accent px-4 py-2.5 text-center font-semibold text-ink"
              >
                {dict.nav.downloadCv}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
