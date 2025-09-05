import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import filipe from '../assets/filipe.jpg';
import { experiences as experienceData } from '../data/experience.js';
import { FaLinkedin, FaGlobe, FaEnvelope, FaCloud, FaCubes, FaDatabase, FaCogs, FaPuzzlePiece, FaSitemap, FaClipboardCheck } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiExpress, SiNextdotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiGit, SiDocker, SiNestjs, SiPhp, SiLaravel, SiVuedotjs, SiMysql, SiRedis, SiHtml5, SiCss3, SiJest, SiPostman, SiAwslambda } from 'react-icons/si';
function Index() {
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <div className="with-header-offset bg-white text-black">
        <div className="page-container grid h-full gap-10 min-h-[calc(100vh-var(--header-height))] w-full grid-cols-1 items-center justify-items-center lg:grid-cols-2 reveal">
          <div className="row-start-2 lg:row-auto">
            <h1 className="mb-2 lg:text-5xl !leading-tight text-3xl text-center lg:text-left">
              Filipe Alves Cavalcante
            </h1>
            <h2
              variant="lead"
              className="mb-6 md:pr-16 xl:pr-28 text-center lg:text-left"
            >
              Software Engineer
            </h2>
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start">
              <a href="mailto:filipe.alvescavalcante@gmail.com" className="px-4 py-2 rounded-md  w-full border border-black sm:w-auto text-center flex items-center justif-center gap-2 hover:bg-black/80"><FaEnvelope /> Email</a>
              <a href="https://www.linkedin.com/in/cavalcante-filipe/" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md border border-black text-black w-full sm:w-auto text-center flex items-center justify-center gap-2 hover:bg-black/5"><FaLinkedin /> LinkedIn</a>
              <a href="https://filipelab.com" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md border border-black text-black w-full sm:w-auto text-center flex items-center justify-center gap-2 hover:bg-black/5"><FaGlobe /> Website</a>
            </div>
          </div>
          <img
            alt="Filipe"
            src={filipe}
            className="h-[25rem] lg:h-[36rem] rounded-full w-full object-cover shadow-lg lg:h-[40rem] lg:w-[40rem] lg:rounded-lg"
          />
        </div>
      </div>

      <section id="about" className="bg-gradient-to-r from-indigo-500 to-purple-500 reveal">
        <div className="page-container py-16 min-h-screen flex flex-col justify-center items-center text-center text-white">
          <h3 className="text-4xl font-semibold mb-4">About me</h3>
          <div className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl"><AboutSummary /></div>
        </div>
      </section>

      <section id="skills" className="bg-gradient-to-r from-emerald-500 to-teal-500 reveal">
        <div className="page-container py-16 min-h-screen flex flex-col justify-center items-center text-white">
          <h3 className="text-4xl font-semibold mb-6">Skills</h3>
          <SkillsFromCv />
        </div>
      </section>

      {/* Projects section intentionally removed as requested */}

      <section id="experience" className="bg-gradient-to-r from-fuchsia-500 to-rose-500 reveal">
        <div className="page-container py-16 min-h-screen flex flex-col justify-center items-center text-white">
          <h3 className="text-4xl font-semibold mb-6">Work experience</h3>
          <ExperienceFromCv />
        </div>
      </section>

      {/* Contact section excluded as requested */}
      <Footer />
    </>
  );
}

export default Index;

function AboutSummary() {
  const summary = 'I am a software engineer focused on the backend with over 6 years of experience in web development. I have worked on a wide range of projects, including PHP, Node.js, Typescript, and frameworks such as Laravel, Express, and NestJS. I also have experience working with the frontend using React and VueJS. Experience with scaling issues using AWS products such as SQS, DynamoDB, Lambda and also experience integrating with third-party systems such as Stripe, GoogleApi, Amplitude, Google Analytics, etc';
  return <p className="max-w-3xl text-white/90 text-center">{summary}</p>;
}

function SkillsFromCv() {
  const [skills] = useState([
    'Node.js','Nest.js','TypeScript','PHP','Laravel','Vue.js','React','Next.js','JavaScript','MySQL','SQL Server','Postgresql','RESTful','Tailwind','Redis','Azure Cloud','HTML/CSS','Docker','Unit Tests (PHPUnit, Jest)','TDD','DDD','Git','Jira/Azure Devops','Postman','Agile Methodologies','SQL Azure','S3','SQS','Azure Storage','Design patterns','SOLID principle','AWS','Lambda','DynamoDB'
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
    if (key.includes('tdd') || key.includes('unit tests')) return <FaClipboardCheck />;
    if (key.includes('ddd')) return <FaSitemap />;
    if (key.includes('agile')) return <FaCogs />;
    if (key.includes('design patterns') || key.includes('solid')) return <FaPuzzlePiece />;
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
    if (key.includes('javascript')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript';
    if (key.includes('mysql')) return 'https://www.mysql.com/';
    if (key.includes('sql server')) return 'https://learn.microsoft.com/sql/';
    if (key.includes('postgres')) return 'https://www.postgresql.org/';
    if (key.includes('redis')) return 'https://redis.io/';
    if (key.includes('azure')) return 'https://azure.microsoft.com/';
    if (key.includes('html')) return 'https://developer.mozilla.org/docs/Web/HTML';
    if (key.includes('css')) return 'https://developer.mozilla.org/docs/Web/CSS';
    if (key.includes('docker')) return 'https://www.docker.com/';
    if (key.includes('phpunit')) return 'https://phpunit.de/';
    if (key.includes('jest')) return 'https://jestjs.io/';
    if (key === 'git') return 'https://git-scm.com/';
    if (key.includes('jira')) return 'https://www.atlassian.com/software/jira';
    if (key.includes('devops')) return 'https://azure.microsoft.com/services/devops/';
    if (key.includes('postman')) return 'https://www.postman.com/';
    if (key.includes('agile')) return 'https://www.agilealliance.org/agile101/';
    if (key.includes('sql azure')) return 'https://azure.microsoft.com/products/azure-sql/';
    if (key.includes('s3')) return 'https://aws.amazon.com/s3/';
    if (key.includes('sqs')) return 'https://aws.amazon.com/sqs/';
    if (key.includes('azure storage')) return 'https://azure.microsoft.com/products/storage/';
    if (key.includes('design patterns')) return 'https://refactoring.guru/design-patterns';
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
          <a key={skill} href={href} target="_blank" rel="noreferrer" className="hover:shadow-sm transition-shadow">{content}</a>
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
      <div className="absolute left-3 top-0 bottom-0 w-px bg-white/40" aria-hidden="true" />
      <div className="space-y-6">
        {items.map((exp, idx) => (
          <div key={idx} className="relative pl-10">
            <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-white" />
            <div className="rounded-lg border border-white p-5 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h4 className="font-semibold">{exp.title} · {exp.company}</h4>
                <span className="text-sm text-white/80">{exp.period}{exp.location ? ` · ${exp.location}` : ''}</span>
              </div>
              {exp.responsibilities?.length ? (
                <ul className="list-disc pl-5 mt-3 space-y-1 text-white/90">
                  {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
