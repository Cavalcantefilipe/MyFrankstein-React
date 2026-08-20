import type { StaticImageData } from 'next/image';
import type { Locale } from '@/i18n/config';
import battlepokemon from '@/assets/battlepokemon.png';
import randomquotes from '@/assets/randomquotes.png';

/**
 * Projetos do Lab. Os números aqui (usuários, matrículas, % de ganho) repetem
 * afirmações já presentes em src/data/experience.ts, que por sua vez vem dos
 * currículos do Filipe — nada é inventado neste arquivo. Ao editar, mantenha
 * pt e en afirmando exatamente os mesmos fatos.
 */
export type Project = {
  id: string;
  kind: 'caseStudy' | 'experiment';
  date: Record<Locale, string>;
  title: string;
  summary: Record<Locale, string>;
  /** O problema que o projeto resolveu. Vira o destaque do card quando não há
   *  screenshot — mostrar arquitetura em vez de expor a tela do cliente. */
  problem?: Record<Locale, string>;
  stack: string[];
  body: Record<Locale, string>;
  arch: Record<Locale, string[]>;
  image?: StaticImageData;
  href?: string;
  /** Destaque na prévia da home. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'brasiltec',
    kind: 'caseStudy',
    date: { pt: '2025', en: '2025' },
    title: 'Plataforma EdTech BrasilTec',
    featured: true,
    summary: {
      pt: 'Plataforma de cursos reconstruída do zero em 6 semanas, com recursos de IA em produção. 5.143 usuários e 6.983 matrículas.',
      en: 'Course platform rebuilt from scratch in 6 weeks, with AI features in production. 5,143 users and 6,983 enrollments.',
    },
    stack: ['NestJS', 'React', 'TypeScript', 'OpenAI'],
    problem: {
      pt: 'Sistema PHP legado travando o crescimento de uma escola online',
      en: 'A legacy PHP system holding back an online school',
    },
    body: {
      pt: 'Substituí um sistema PHP legado por uma plataforma nova em NestJS + React/TypeScript: backend, frontend, painel admin e migração de dados, tudo sozinho. Depois adicionei IA em produção: transcrição automática com Whisper em 3 idiomas, busca nas aulas por transcrição, resumos com timestamps exatos do vídeo e gerador de questões.',
      en: 'I replaced a legacy PHP system with a new platform in NestJS + React/TypeScript: backend, frontend, admin panel and data migration, all on my own. Then I shipped AI features to production: automatic Whisper transcription in 3 languages, lesson search by transcript, summaries with exact video timestamps and a question generator.',
    },
    arch: {
      pt: [
        'NestJS + PostgreSQL no backend',
        'React + TypeScript no frontend e admin',
        'OpenAI Whisper para transcrição PT/EN/ES',
        'Migração completa de dados do legado',
      ],
      en: [
        'NestJS + PostgreSQL on the backend',
        'React + TypeScript on the frontend and admin',
        'OpenAI Whisper for PT/EN/ES transcription',
        'Full data migration off the legacy system',
      ],
    },
  },
  {
    id: 'flexi',
    kind: 'caseStudy',
    date: { pt: '2025', en: '2025' },
    title: 'Ferramenta de Reels — Flexi',
    featured: true,
    summary: {
      pt: 'Ferramenta para o time de conteúdo cortar vídeos longos em reels/shorts, importar do YouTube e agendar posts.',
      en: 'A tool for the content team to cut long videos into reels/shorts, import from YouTube and schedule posts.',
    },
    stack: ['Node.js', 'React', 'AWS'],
    problem: {
      pt: 'Time de conteúdo perdendo horas cortando vídeo à mão',
      en: 'A content team losing hours cutting video by hand',
    },
    body: {
      pt: 'Ferramenta interna onde o time de conteúdo da Flexi corta vídeos longos em reels e shorts, importa direto do YouTube e agenda publicações para Instagram e TikTok. A expectativa do time é cortar cerca de 40% do trabalho manual.',
      en: "Internal tool where Flexi's content team cuts long videos into reels and shorts, imports straight from YouTube and schedules posts to Instagram and TikTok. The team expects it to cut roughly 40% of the manual work.",
    },
    arch: {
      pt: [
        'Processamento de vídeo no backend Node.js',
        'Importação via API do YouTube',
        'Agendamento para Instagram e TikTok',
        'Fila de jobs na AWS (SQS)',
      ],
      en: [
        'Video processing on the Node.js backend',
        'Import through the YouTube API',
        'Scheduling for Instagram and TikTok',
        'Job queue on AWS (SQS)',
      ],
    },
  },
  {
    id: 'pokemon',
    kind: 'experiment',
    date: { pt: 'Est. 2025', en: 'Est. 2025' },
    title: 'Pokemon Battle Simulator',
    image: battlepokemon,
    href: '/pokemon-battle',
    summary: {
      pt: 'Monte seu time dos sonhos e prepare-se para a batalha! Simulador construído sobre a PokéAPI.',
      en: 'Build your dream team and get ready for battle! A simulator built on top of the PokéAPI.',
    },
    stack: ['Next.js', 'TypeScript', 'PokéAPI'],
    body: {
      pt: 'Simulador de batalhas onde você monta um time com dados reais da PokéAPI e enfrenta um oponente. Lógica de turno, tipos e dano rodando no cliente.',
      en: 'A battle simulator where you build a team from real PokéAPI data and face an opponent. Turn, type and damage logic all running on the client.',
    },
    arch: {
      pt: [
        'Next.js App Router + TypeScript',
        'Dados da PokéAPI com cache no cliente',
        'Arena de batalha com lógica de turnos',
      ],
      en: [
        'Next.js App Router + TypeScript',
        'PokéAPI data cached on the client',
        'Battle arena with turn-based logic',
      ],
    },
  },
  {
    id: 'quotes',
    kind: 'experiment',
    date: { pt: 'Est. 2025', en: 'Est. 2025' },
    title: 'Random Quotes',
    image: randomquotes,
    href: '/random-quote',
    summary: {
      pt: 'Que tal uma frase aleatória traduzida para o idioma que você quiser?',
      en: 'How about a random quote translated into whatever language you want?',
    },
    stack: ['Next.js', 'TypeScript', 'i18n'],
    body: {
      pt: 'Busca uma citação aleatória numa API pública e traduz na hora para o idioma escolhido, combinando duas APIs num fluxo só.',
      en: 'Fetches a random quote from a public API and translates it on the fly into the chosen language, combining two APIs into a single flow.',
    },
    arch: {
      pt: [
        'API de quotes + API de tradução',
        'Next.js + TypeScript',
        'Seleção de idioma em tempo real',
      ],
      en: [
        'Quotes API + translation API',
        'Next.js + TypeScript',
        'Real-time language selection',
      ],
    },
  },
];
