import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import AnimatedSection from '../components/AnimatedSection.jsx';
import Footer from '../components/Footer.jsx';
import filipe from '../assets/filipe.jpg';
import { experiences as experienceData } from '../data/experience.js';
import {
  FaLinkedin,
  FaGlobe,
  FaEnvelope,
  FaFilePdf,
  FaCloud,
  FaCubes,
  FaDatabase,
  FaCogs,
  FaPuzzlePiece,
  FaSitemap,
  FaClipboardCheck,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiNestjs,
  SiPhp,
  SiLaravel,
  SiVuedotjs,
  SiMysql,
  SiRedis,
  SiHtml5,
  SiCss3,
  SiJest,
  SiPostman,
  SiAwslambda,
} from 'react-icons/si';
function Index() {
  React.useEffect(() => {}, []);

  return (
    <>
      <Header />
      <div className="with-header-offset bg-white text-black">
        <AnimatedSection className="page-container grid min-h-[calc(100dvh-var(--header-height))] w-full place-content-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-12">
          <div className="order-2 lg:order-1 justify-self-center lg:justify-self-start max-w-2xl text-center lg:text-left">
            <h1 className="mb-2 lg:text-6xl !leading-tight text-4xl">
              Filipe Alves Cavalcante
            </h1>
            <h2 className="mb-3 text-xl lg:text-2xl text-gray-700">
              Software Engineer
            </h2>
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:flex-wrap lg:items-center lg:justify-start justify-center">
              <a
                href="mailto:filipe.alvescavalcante@gmail.com"
                className="px-4 py-2 rounded-md w-full border border-black sm:w-auto text-center flex items-center justify-center gap-2 hover:bg-black/5"
              >
                <FaEnvelope /> Email
              </a>
              <a
                href="https://www.linkedin.com/in/cavalcante-filipe/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-md border border-black text-black w-full sm:w-auto text-center flex items-center justify-center gap-2 hover:bg-black/5"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a
                href={'/resume'}
                className="px-4 py-2 rounded-md bg-black text-white w-full sm:w-auto text-center flex items-center justify-center gap-2 hover:bg-black/80"
              >
                <FaFilePdf /> Resume
              </a>
            </div>
          </div>
          <div className="order-1 lg:order-2 justify-self-center lg:justify-self-end">
            <img
              alt="Filipe"
              src={filipe}
              className="h-[16rem] w-[16rem] sm:h-[20rem] sm:w-[20rem] lg:h-[24rem] lg:w-[24rem] rounded-full object-cover shadow-lg"
            />
          </div>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection id="about" className="bg-gradient-to-r from-indigo-500 to-purple-500">
        <div className="page-container py-16 min-h-screen flex flex-col justify-center items-center text-center text-white">
          <h3 className="text-4xl font-semibold mb-4">About me</h3>
          <div className="text-lg md:text-xl lg:text-2xl leading-relaxed">
          <p className="text-white/90 text-left">
            I am a software engineer focused on the backend with over 6 years of experience in web development. I have worked on a wide range of projects, including PHP, Node.js, Typescript, and frameworks such as Laravel, Express, and NestJS. I also have experience working with the frontend using React and VueJS.<br/>
            Experience with scaling issues using AWS products such as SQS, DynamoDB, Lambda and also experience integrating with third-party systems such as Stripe, GoogleApi, Amplitude, Google Analytics, etc.
          </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="skills" className="bg-gradient-to-r from-emerald-500 to-teal-500">
        <div className="page-container py-16 min-h-screen flex flex-col justify-center items-center text-white">
          <h3 className="text-4xl font-semibold mb-6">Skills</h3>
          <SkillsFromCv />
        </div>
      </AnimatedSection>

      <AnimatedSection id="experience" className="bg-gradient-to-r from-fuchsia-500 to-rose-500">
        <div className="page-container py-16 min-h-screen flex flex-col justify-center items-center text-white">
          <h3 className="text-4xl font-semibold mb-6">Work experience</h3>
          <ExperienceFromCv />
        </div>
      </AnimatedSection>
      <Footer />
    </>
  );
}

export default Index;

function SkillsFromCv() {
  const [skills] = useState([
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
  ]);
  const list = skills;

  const iconFor = (name) => {
    const key = name.toLowerCase();
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
  };

  const linkFor = (name) => {
    const key = name.toLowerCase();
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
    if (key.includes('css'))
      return 'https://developer.mozilla.org/docs/Web/CSS';
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
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {list.map((skill) => {
        const href = linkFor(skill);
        const content = (
          <div className="rounded-md border border-white p-3 text-sm flex items-center gap-2 text-white/95 ">
            <span className="text-lg">{iconFor(skill)}</span>
            <span>{skill}</span>
          </div>
        );
        return href ? (
          <a
            key={skill}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="hover:shadow-sm transition-shadow"
          >
            {content}
          </a>
        ) : (
          <div key={skill}>{content}</div>
        );
      })}
    </div>
  );
}

function ExperienceFromCv() {
  const items = experienceData;
  return (
    <div className="relative">
      <div className="absolute left-3 top-0 bottom-0 w-px" aria-hidden="true" />
      <div className="space-y-6">
        {items.map((exp, idx) => (
          <div key={idx} className="relative">
            <div className="rounded-lg border border-white p-5 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h4 className="font-semibold">
                  {exp.title} · {exp.company}
                </h4>
                <span className="text-sm text-white/90">
                  {exp.period}
                  {exp.location ? ` · ${exp.location}` : ''}
                </span>
              </div>
              {exp.responsibilities?.length ? (
                <ul className="list-disc pl-5 mt-3 space-y-1 text-white/90">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
