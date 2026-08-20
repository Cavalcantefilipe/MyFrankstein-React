'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { Project } from '@/data/projects';

type Props = {
  projects: Project[];
  locale: Locale;
  dict: Dictionary;
};

export function ProjectGrid({ projects, locale, dict }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const detail = projects.find((p) => p.id === openId) ?? null;

  useEffect(() => {
    if (!detail) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null);
    };
    window.addEventListener('keydown', onKey);
    // Trava o scroll do fundo enquanto o painel está aberto.
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [detail]);

  const kindLabel = (p: Project) =>
    p.kind === 'caseStudy' ? dict.lab.caseStudy : dict.lab.experiment;

  const localizedHref = (p: Project) =>
    p.href ? (locale === 'pt' ? `/pt${p.href}` : p.href) : undefined;

  return (
    <>
      <ul className="grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.id} className="contents">
            <button
              type="button"
              onClick={() => setOpenId(project.id)}
              aria-haspopup="dialog"
              className="group flex flex-col overflow-hidden rounded-md border border-white/[.08] bg-raised text-left transition-transform duration-200 hover:-translate-y-0.5 hover:border-accent/50 focus-visible:-translate-y-0.5 focus-visible:border-accent/50 focus-visible:outline-none"
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={640}
                  height={200}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-[200px] w-full border-b border-white/[.08] object-cover"
                />
              ) : (
                /* Sem screenshot: em vez de expor a tela de um cliente,
                   mostramos o problema resolvido e a arquitetura usada. */
                <div className="flex h-[200px] flex-col justify-between border-b border-white/[.08] bg-ink/60 p-5">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[.1em] text-faint">
                      {dict.lab.problemLabel}
                    </span>
                    <p className="text-sm font-medium leading-snug text-fg-strong">
                      {project.problem?.[locale] ?? project.summary[locale]}
                    </p>
                  </div>
                  <ul
                    aria-hidden="true"
                    className="flex list-none flex-col gap-1 p-0 font-mono text-[11px] text-faint"
                  >
                    {project.arch[locale].slice(0, 3).map((line) => (
                      <li key={line} className="truncate">
                        <span className="text-accent/70">→ </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-1 flex-col gap-2.5 p-5">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-accent">{kindLabel(project)}</span>
                  <span className="text-faint">{project.date[locale]}</span>
                </div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-muted">
                  {project.summary[locale]}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-sm border border-white/[.12] px-2 py-[3px] font-mono text-[11px] text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {detail ? (
        <>
          <div
            onClick={() => setOpenId(null)}
            className="fixed inset-0 z-50 bg-[rgba(5,7,6,.7)] backdrop-blur-[3px]"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label={detail.title}
            className="fixed inset-y-0 right-0 z-[51] flex w-full max-w-[480px] flex-col gap-6 overflow-y-auto border-l border-accent/30 bg-surface p-9"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-accent">
                {kindLabel(detail)} · {detail.date[locale]}
              </span>
              <button
                type="button"
                onClick={() => setOpenId(null)}
                className="rounded border border-white/15 px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {dict.lab.close} ✕
              </button>
            </div>

            <h3 className="text-3xl font-bold tracking-tight">
              {detail.title}
            </h3>

            {detail.image ? (
              <Image
                src={detail.image}
                alt={detail.title}
                width={640}
                height={400}
                sizes="480px"
                className="w-full rounded-md border border-white/10"
              />
            ) : null}

            <p className="text-[15px] leading-relaxed text-fg-strong">
              {detail.body[locale]}
            </p>

            <div>
              <h4 className="mb-2.5 font-mono text-[11px] uppercase tracking-[.08em] text-faint">
                {dict.lab.structure}
              </h4>
              <ul className="flex list-none flex-col gap-2 p-0">
                {detail.arch[locale].map((line) => (
                  <li
                    key={line}
                    className="rounded border border-white/[.07] bg-raised px-3.5 py-2.5 font-mono text-[13px] text-muted"
                  >
                    <span className="text-accent">→ </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {localizedHref(detail) ? (
              <a
                href={localizedHref(detail)}
                className="self-start rounded bg-accent px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-hover"
              >
                {dict.lab.openDemo} →
              </a>
            ) : null}
          </aside>
        </>
      ) : null}
    </>
  );
}
