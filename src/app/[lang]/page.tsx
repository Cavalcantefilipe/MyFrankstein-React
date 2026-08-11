import Image from 'next/image';
import type { ReactNode } from 'react';
import {
  FaClipboardCheck,
  FaCloud,
  FaCogs,
  FaDatabase,
  FaEnvelope,
  FaFilePdf,
  FaLinkedin,
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
import { buildMetadata } from '@/seo/metadata';
import { site } from '@/seo/site';
import { getDictionary } from '@/i18n/get-dictionary';
import { experiences } from '@/data/experience';
import type { Locale } from '@/i18n/config';
import filipe from '@/assets/filipe.webp';

const paths = { en: '/', pt: '/pt' } as const;

const skills: string[] = [
  'Node.js',
  'Nest.js',
  'TypeScript',
  'PHP',
  'Laravel',
  'Vue.js',
  'React',
  'Next.js',
  'JavaScript',
  'MySQL',
  'SQL Server',
  'Postgresql',
  'RESTful',
  'Tailwind',
  'Redis',
  'Azure Cloud',
  'HTML/CSS',
  'Docker',
  'Unit Tests (PHPUnit, Jest)',
  'TDD',
  'DDD',
  'Git',
  'Jira/Azure Devops',
  'Postman',
  'Agile Methodologies',
  'SQL Azure',
  'S3',
  'SQS',
  'Azure Storage',
  'Design patterns',
  'SOLID principle',
  'AWS',
  'Lambda',
  'DynamoDB',
];

function iconFor(skill: string): ReactNode {
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
      ? 'Filipe Cavalcante — Desenvolvedor Web e Criação de Sites'
      : 'Filipe Cavalcante — Software Engineer Portfolio',
    description: isPt
      ? 'Desenvolvedor web com mais de 6 anos de experiência em criação de sites, sistemas sob medida e integrações. Atendimento remoto para todo o Brasil.'
      : 'Software engineer with 6+ years building reliable web products with Node.js, TypeScript, Laravel and React. Available for remote work worldwide.',
    pathByLocale: paths,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const alternatePath = lang === 'en' ? paths.pt : paths.en;
  const servicesPath = lang === 'pt' ? '/pt/servicos' : '/services';

  return (
    <>
      <Header locale={lang} dict={dict} alternatePath={alternatePath} />
      <div className="with-header-offset bg-white text-black">
        <AnimatedSection className="page-container grid min-h-[calc(100dvh-var(--header-height))] w-full place-content-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-12">
            <div className="order-2 lg:order-1 justify-self-center lg:justify-self-start max-w-2xl text-center lg:text-left">
              <h1 className="mb-2 lg:text-6xl !leading-tight text-4xl">
                {site.authorName}
              </h1>
              <p className="mb-3 text-xl lg:text-2xl text-gray-700">
                {dict.home.role}
              </p>
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap lg:justify-start justify-center">
                <a
                  href={`mailto:${site.email}`}
                  className="px-4 py-2 rounded-md w-full border border-black sm:w-auto text-center flex items-center justify-center gap-2 hover:bg-black/5"
                >
                  <FaEnvelope /> {dict.home.email}
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md border border-black text-black w-full sm:w-auto text-center flex items-center justify-center gap-2 hover:bg-black/5"
                >
                  <FaLinkedin /> LinkedIn
                </a>
                <a
                  href="/filipe-cavalcante-en.pdf"
                  download="Filipe_Cavalcante_CV.pdf"
                  className="px-4 py-2 rounded-md bg-black text-white w-full sm:w-auto text-center flex items-center justify-center gap-2 hover:bg-black/80"
                >
                  <FaFilePdf /> {dict.home.resume}
                </a>
              </div>
              <p className="mt-6 text-center lg:text-left">
                <a href={servicesPath} className="underline hover:opacity-70">
                  {dict.services.heading}
                </a>
              </p>
            </div>
            <div className="order-1 lg:order-2 justify-self-center lg:justify-self-end">
              <Image
                alt={site.authorName}
                src={filipe}
                width={384}
                height={384}
                priority
                className="h-[16rem] w-[16rem] sm:h-[20rem] sm:w-[20rem] lg:h-[24rem] lg:w-[24rem] rounded-full object-cover shadow-lg"
              />
            </div>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection
        id="about"
        className="bg-gradient-to-r from-indigo-500 to-purple-500"
      >
        <div className="page-container py-16 min-h-screen flex flex-col justify-center items-center text-center text-white">
          <h2 className="text-4xl font-semibold mb-4">
            {dict.home.aboutTitle}
          </h2>
          <div className="text-lg md:text-xl lg:text-2xl leading-relaxed">
            <p className="text-white/90 text-left">
              I am a software engineer focused on the backend with over 6 years
              of experience in web development. I have worked on a wide range of
              projects, including PHP, Node.js, Typescript, and frameworks such
              as Laravel, Express, and NestJS. I also have experience working
              with the frontend using React and VueJS.
              <br />
              Experience with scaling issues using AWS products such as SQS,
              DynamoDB, Lambda and also experience integrating with third-party
              systems such as Stripe, GoogleApi, Amplitude, Google Analytics,
              etc.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        id="skills"
        className="bg-gradient-to-r from-emerald-500 to-teal-500"
      >
        <div className="page-container py-16 min-h-screen flex flex-col justify-center items-center text-white">
          <h2 className="text-4xl font-semibold mb-6">
            {dict.home.skillsTitle}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {skills.map((skill) => {
              const href = linkFor(skill);
              const content = (
                <div className="rounded-md border border-white p-3 text-sm flex items-center gap-2 text-white/95">
                  <span className="text-lg">{iconFor(skill)}</span>
                  <span>{skill}</span>
                </div>
              );
              return href ? (
                <a
                  key={skill}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:shadow-sm transition-shadow"
                >
                  {content}
                </a>
              ) : (
                <div key={skill}>{content}</div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        id="experience"
        className="bg-gradient-to-r from-fuchsia-500 to-rose-500"
      >
        <div className="page-container py-16 min-h-screen flex flex-col justify-center items-center text-white">
          <h2 className="text-4xl font-semibold mb-6">
            {dict.home.experienceTitle}
          </h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <article
                key={`${exp.company}-${exp.period}`}
                className="rounded-lg border border-white p-5 text-white"
              >
                <h3 className="font-semibold">
                  {exp.title} · {exp.company}
                </h3>
                <p className="text-sm text-white/90">
                  {exp.period} · {exp.location}
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-1 text-white/90">
                  {exp.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </>
  );
}
