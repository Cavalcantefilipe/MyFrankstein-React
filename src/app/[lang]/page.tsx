import Image from 'next/image';
import Link from 'next/link';
import { cloneElement, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import {
  FaClipboardCheck,
  FaCloud,
  FaCogs,
  FaDatabase,
  FaPuzzlePiece,
  FaSitemap,
} from 'react-icons/fa';
import {
  SiAwslambda,
  SiCss3,
  SiDocker,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiLaravel,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiRedis,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProjectGrid } from '@/components/lab/ProjectGrid';
import { projects } from '@/data/projects';
import { buildMetadata } from '@/seo/metadata';
import { site } from '@/seo/site';
import { getDictionary } from '@/i18n/get-dictionary';
import { experiences } from '@/data/experience';
import type { Locale } from '@/i18n/config';
import filipe from '@/assets/filipe.webp';

const paths = { en: '/', pt: '/pt' } as const;

/**
 * As mesmas skills de antes, agora agrupadas nas 4 categorias do redesign.
 * Nenhuma foi removida: iconFor/linkFor continuam recebendo os mesmos rótulos.
 */
const skillGroups: { label: Record<Locale, string>; items: string[] }[] = [
  {
    label: { pt: 'Backend', en: 'Backend' },
    items: [
      'Node.js',
      'Nest.js',
      'TypeScript',
      'JavaScript',
      'PHP',
      'Laravel',
      'RESTful',
    ],
  },
  {
    label: { pt: 'Frontend', en: 'Frontend' },
    items: ['React', 'Next.js', 'Vue.js', 'Tailwind', 'HTML/CSS'],
  },
  {
    label: { pt: 'Cloud & Dados', en: 'Cloud & Data' },
    items: [
      'AWS',
      'Lambda',
      'SQS',
      'S3',
      'DynamoDB',
      'Azure Cloud',
      'Azure Storage',
      'SQL Azure',
      'Postgresql',
      'MySQL',
      'SQL Server',
      'Redis',
    ],
  },
  {
    label: { pt: 'Práticas', en: 'Practices' },
    items: [
      'TDD',
      'DDD',
      'Design patterns',
      'SOLID principle',
      'Unit Tests (PHPUnit, Jest)',
      'Docker',
      'Git',
      'Jira/Azure Devops',
      'Postman',
      'Agile Methodologies',
    ],
  },
];

function iconForRaw(skill: string): ReactNode {
  const key = skill.toLowerCase();
  if (key.includes('node')) return <SiNodedotjs />;
  if (key.includes('nest')) return <SiNestjs />;
  if (key.includes('typescript')) return <SiTypescript />;
  if (key === 'php' || key.includes('php ')) return <SiPhp />;
  if (key.includes('laravel')) return <SiLaravel />;
  if (key.includes('vue')) return <SiVuedotjs />;
  if (key.includes('react')) return <SiReact />;
  if (key.includes('next')) return <SiNextdotjs />;
  if (key.includes('javascript')) return <SiJavascript />;
  if (key.includes('mysql')) return <SiMysql />;
  if (key.includes('sql server')) return <FaDatabase />;
  if (key.includes('postgres')) return <SiPostgresql />;
  if (key.includes('redis')) return <SiRedis />;
  if (key.includes('azure')) return <FaCloud />;
  if (key.includes('html')) return <SiHtml5 />;
  if (key.includes('css')) return <SiCss3 />;
  if (key.includes('docker')) return <SiDocker />;
  if (key.includes('phpunit')) return <SiPhp />;
  if (key.includes('jest')) return <SiJest />;
  if (key === 'git') return <SiGit />;
  if (key.includes('jira')) return <FaCogs />;
  if (key.includes('devops')) return <FaCogs />;
  if (key.includes('postman')) return <SiPostman />;
  if (key === 'aws') return <FaCloud />;
  if (key.includes('lambda')) return <SiAwslambda />;
  if (key.includes('dynamodb')) return <FaDatabase />;
  if (key.includes('s3') || key.includes('sqs')) return <FaCloud />;
  if (key.includes('rest')) return <FaSitemap />;
  if (key.includes('tdd') || key.includes('unit tests'))
    return <FaClipboardCheck />;
  if (key.includes('ddd')) return <FaSitemap />;
  if (key.includes('agile')) return <FaCogs />;
  if (key.includes('design patterns') || key.includes('solid'))
    return <FaPuzzlePiece />;
  return null;
}

/**
 * react-icons emite role="img" em cada SVG. Como o nome da skill já aparece
 * ao lado do ícone, esse role vira um "gráfico sem rótulo" para o leitor de
 * tela. aria-hidden no <span> pai não basta: o role do filho continua na
 * árvore. Marcar o próprio SVG resolve, e não muda nada visualmente.
 */
function iconFor(skill: string): ReactNode {
  const icon = iconForRaw(skill);
  if (!isValidElement(icon)) return icon;
  return cloneElement(icon as ReactElement<Record<string, unknown>>, {
    'aria-hidden': 'true',
    focusable: 'false',
    role: undefined,
  });
}

function linkFor(skill: string): string | undefined {
  const key = skill.toLowerCase();
  if (key.includes('node')) return 'https://nodejs.org/';
  if (key.includes('nest')) return 'https://nestjs.com/';
  if (key.includes('typescript')) return 'https://www.typescriptlang.org/';
  if (key === 'php' || key.includes('php ')) return 'https://www.php.net/';
  if (key.includes('laravel')) return 'https://laravel.com/';
  if (key.includes('vue')) return 'https://vuejs.org/';
  if (key.includes('react')) return 'https://react.dev/';
  if (key.includes('next')) return 'https://nextjs.org/';
  if (key.includes('javascript'))
    return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript';
  if (key.includes('mysql')) return 'https://www.mysql.com/';
  if (key.includes('sql server')) return 'https://learn.microsoft.com/sql/';
  if (key.includes('postgres')) return 'https://www.postgresql.org/';
  if (key.includes('redis')) return 'https://redis.io/';
  if (key.includes('azure')) return 'https://azure.microsoft.com/';
  if (key.includes('html'))
    return 'https://developer.mozilla.org/docs/Web/HTML';
  if (key.includes('css')) return 'https://developer.mozilla.org/docs/Web/CSS';
  if (key.includes('docker')) return 'https://www.docker.com/';
  if (key.includes('phpunit')) return 'https://phpunit.de/';
  if (key.includes('jest')) return 'https://jestjs.io/';
  if (key === 'git') return 'https://git-scm.com/';
  if (key.includes('jira')) return 'https://www.atlassian.com/software/jira';
  if (key.includes('devops'))
    return 'https://azure.microsoft.com/services/devops/';
  if (key.includes('postman')) return 'https://www.postman.com/';
  if (key.includes('agile')) return 'https://www.agilealliance.org/agile101/';
  if (key.includes('sql azure'))
    return 'https://azure.microsoft.com/products/azure-sql/';
  if (key.includes('s3')) return 'https://aws.amazon.com/s3/';
  if (key.includes('sqs')) return 'https://aws.amazon.com/sqs/';
  if (key.includes('azure storage'))
    return 'https://azure.microsoft.com/products/storage/';
  if (key.includes('design patterns'))
    return 'https://refactoring.guru/design-patterns';
  if (key.includes('solid')) return 'https://en.wikipedia.org/wiki/SOLID';
  if (key === 'aws') return 'https://aws.amazon.com/';
  if (key.includes('lambda')) return 'https://aws.amazon.com/lambda/';
  if (key.includes('dynamodb')) return 'https://aws.amazon.com/dynamodb/';
  return undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const isPt = lang === 'pt';

  return buildMetadata({
    locale: lang,
    title: isPt
      ? 'Filipe Cavalcante — Engenheiro de Software Full-Stack'
      : 'Filipe Cavalcante — Full-Stack Software Engineer',
    description: isPt
      ? 'Engenheiro full-stack com 6+ anos construindo sistemas web do banco de dados ao deploy. Node.js, TypeScript, React, Laravel e AWS.'
      : 'Full-stack engineer with 6+ years building web systems from the database to the deploy. Node.js, TypeScript, React, Laravel and AWS.',
    pathByLocale: paths,
  });
}

/** Rótulo de seção numerado, como no redesign (001, 002, ...). */
function SectionLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="mb-7 flex items-baseline gap-4">
      <span className="font-mono text-xs text-accent">{n}</span>
      <h2 className="text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
        {children}
      </h2>
    </div>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const alternatePath = lang === 'en' ? paths.pt : paths.en;
  const labPath = lang === 'pt' ? '/pt/lab' : '/lab';
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Header locale={lang} dict={dict} alternatePath={alternatePath} />
      <main className="with-header-offset bg-grid">
        {/* Hero */}
        <AnimatedSection id="top" className="page-container pt-24 pb-20">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_300px]">
          <div className="flex flex-col gap-6">
            <p className="flex items-center gap-2.5 font-mono text-xs text-accent">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-accent motion-safe:animate-pulse"
              />
              {dict.home.available}
            </p>
            {/* Mantém o nome canônico (site.authorName, o mesmo do JSON-LD e
              dos metadados) e só quebra a linha visualmente, como no design.
              e2e/seo.spec.ts compara este h1 com site.authorName. */}
            <h1 className="text-5xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[64px]">
              Filipe <span className="sm:block">Alves Cavalcante</span>
            </h1>
            <p className="max-w-[520px] font-mono text-[15px] leading-relaxed text-muted">
              {dict.home.tagline}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className="rounded bg-accent px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-hover"
              >
                {dict.common.emailCta}
              </a>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-white/[.18] px-5 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                {dict.common.whatsappCta}
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-white/[.18] px-5 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="relative justify-self-center lg:justify-self-end">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-md border border-accent/35"
            />
            <Image
              alt={site.authorName}
              src={filipe}
              width={300}
              height={300}
              priority
              fetchPriority="high"
              sizes="300px"
              className="relative block w-[240px] rounded-md object-cover contrast-[1.05] grayscale-[35%] sm:w-[300px]"
            />
            <p className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-white/10 bg-raised px-3 py-1.5 font-mono text-[11px] text-muted">
              {site.city}/{site.region} · {site.country}
            </p>
          </div>
          </div>
        </AnimatedSection>

        {/* 001 — Lab */}
        <AnimatedSection id="lab" className="page-container pt-10 pb-20">
          <SectionLabel n="001">{dict.home.labTitle}</SectionLabel>
          <p className="mb-9 font-mono text-[13px] text-muted">
            {dict.home.labIntro}
          </p>
          <ProjectGrid projects={featured} locale={lang} dict={dict} />
          <Link
            href={labPath}
            className="mt-7 inline-flex items-center gap-2 rounded border border-accent/35 px-5 py-3 font-mono text-[13px] text-accent transition-colors hover:bg-accent/10 hover:text-accent-hover"
          >
            {dict.home.labViewAll} →
          </Link>
        </AnimatedSection>

        {/* 002 — Sobre */}
        <AnimatedSection id="about" className="page-container pt-10 pb-20">
          <SectionLabel n="002">{dict.home.aboutTitle}</SectionLabel>
          {/* O texto vem com \n\n do dicionário: um <p> por parágrafo, senão
              o navegador colapsa as quebras e vira um bloco único. */}
          <div className="flex max-w-[760px] flex-col gap-5">
            {dict.home.aboutBody.split('\n\n').map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-lg leading-[1.75] text-fg-strong"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </AnimatedSection>

        {/* 003 — Stack */}
        <AnimatedSection id="skills" className="page-container pt-10 pb-20">
          <SectionLabel n="003">{dict.home.skillsTitle}</SectionLabel>
          <div className="grid gap-4 md:grid-cols-2">
            {skillGroups.map((group) => (
              <div
                key={group.label.en}
                className="flex flex-col gap-3 rounded-md border border-white/[.08] bg-raised px-6 py-5"
              >
                <h3 className="font-mono text-[11px] uppercase tracking-[.1em] text-accent">
                  {group.label[lang]}
                </h3>
                <ul className="flex list-none flex-wrap gap-2 p-0">
                  {group.items.map((skill) => {
                    const href = linkFor(skill);
                    const content = (
                      <span className="flex items-center gap-2 rounded-sm border border-white/[.12] px-2.5 py-[5px] font-mono text-[13px] text-fg-strong transition-colors hover:border-accent/50">
                        <span aria-hidden="true">{iconFor(skill)}</span>
                        {skill}
                      </span>
                    );
                    return (
                      <li key={skill}>
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {content}
                          </a>
                        ) : (
                          content
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* 004 — Experiência */}
        <AnimatedSection id="experience" className="page-container pt-10 pb-20">
          <SectionLabel n="004">{dict.home.experienceTitle}</SectionLabel>
          <div className="flex flex-col">
            {experiences.map((exp) => (
              <article
                key={`${exp.company}-${exp.period[lang]}`}
                className="grid gap-4 border-t border-white/[.08] py-7 md:grid-cols-[200px_1fr] md:gap-8"
              >
                <p className="font-mono text-[13px] text-faint">
                  {exp.period[lang]}
                  <span className="block">{exp.location[lang]}</span>
                </p>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-xl font-semibold">
                    {exp.title[lang]}{' '}
                    <span className="text-accent">· {exp.company}</span>
                  </h3>
                  {exp.context ? (
                    <p className="text-sm italic leading-relaxed text-faint">
                      {exp.context[lang]}
                    </p>
                  ) : null}
                  <ul className="flex list-none flex-col gap-2 p-0">
                    {exp.responsibilities[lang].map((r) => (
                      <li key={r} className="text-sm leading-relaxed text-muted">
                        <span className="text-accent">→ </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </AnimatedSection>

        {/* 006 — Contato. 005 (Depoimentos) fica de fora até haver texto real. */}
        <AnimatedSection
          id="contact"
          className="border-t border-white/[.08] bg-surface"
        >
          <div className="page-container flex flex-col items-start gap-6 py-24">
            <p className="font-mono text-xs text-accent">
              006 — {dict.nav.contact.toLowerCase()}
            </p>
            <h2 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
              {dict.home.contactTitle}
            </h2>
            <p className="max-w-[520px] text-base leading-relaxed text-muted">
              {dict.services.contactBody}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className="rounded bg-accent px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:bg-accent-hover"
              >
                {site.email}
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-white/[.18] px-6 py-3.5 text-[15px] transition-colors hover:border-accent hover:text-accent"
              >
                LinkedIn
              </a>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-white/[.18] px-6 py-3.5 text-[15px] transition-colors hover:border-accent hover:text-accent"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </>
  );
}
