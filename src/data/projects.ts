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
    id: 'temaqui',
    kind: 'caseStudy',
    date: { pt: '2026', en: '2026' },
    title: 'Tem Aqui Achadinhos',
    href: 'https://temaquiachadinhos.com.br',
    summary: {
      pt: 'Lojinha de afiliados do Mercado Livre com encurtador de links próprio, painel admin e estúdio de artes de divulgação.',
      en: 'Mercado Livre affiliate storefront with its own link shortener, admin panel and a promo-art studio.',
    },
    stack: ['Go', 'Next.js', 'PostgreSQL', 'Tailwind'],
    problem: {
      pt: 'Afiliada divulgando produtos sem vitrine própria nem métricas de clique',
      en: 'An affiliate promoting products with no storefront of her own and no click metrics',
    },
    body: {
      pt: 'Vitrine de achadinhos em domínio próprio: ela cola o link de afiliada no painel e título, imagem e preço se autopreenchem. Todo clique passa por um link curto do domínio (/r/{code}), que conta o acesso e redireciona para o Mercado Livre com a URL de afiliada intacta. Tem ainda um estúdio que gera as artes de divulgação (story, feed, banner) com a identidade da marca.',
      en: 'A storefront on her own domain: she pastes the affiliate link into the panel and title, image and price auto-fill. Every click goes through a short link on the domain (/r/{code}) that counts the visit and redirects to Mercado Livre with the affiliate URL untouched. There is also a studio that generates promo art (story, feed, banner) with the brand identity.',
    },
    arch: {
      pt: [
        'Backend em Go (chi + pgx/sqlc) e PostgreSQL',
        'Next.js na frente, reescrevendo /api e /r para o Go',
        'Encurtador próprio com contagem de cliques',
        'Deploy na Railway com DNS no Cloudflare',
      ],
      en: [
        'Go backend (chi + pgx/sqlc) with PostgreSQL',
        'Next.js in front, rewriting /api and /r to Go',
        'In-house shortener with click counting',
        'Deployed on Railway with DNS on Cloudflare',
      ],
    },
  },
  {
    id: 'orthoneuro',
    kind: 'caseStudy',
    date: { pt: '2026', en: '2026' },
    title: 'Clínica Ortho Neuro',
    href: 'https://clinicaorthoneuro.com.br',
    summary: {
      pt: 'Site institucional de uma clínica de fisioterapia e Pilates em Caraguatatuba, focado em SEO local e agendamento via WhatsApp.',
      en: 'Institutional site for a physiotherapy and Pilates clinic in Caraguatatuba, focused on local SEO and WhatsApp scheduling.',
    },
    stack: ['Next.js', 'React', 'TypeScript'],
    problem: {
      pt: 'Clínica local sem presença na busca do Google além do perfil no Maps',
      en: 'A local clinic with no Google search presence beyond its Maps profile',
    },
    body: {
      pt: 'Site de página única para a Ortho Neuro Fisioterapia e Pilates: especialidades, equipe, localização e chamada de agendamento pelo WhatsApp. Por baixo, SEO local completo — dados estruturados de clínica (schema.org), sitemap, Open Graph e Google Tag Manager medindo de onde vêm os pacientes.',
      en: 'Single-page site for Ortho Neuro Fisioterapia e Pilates: specialties, team, location and a WhatsApp scheduling call to action. Under the hood, full local SEO — clinic structured data (schema.org), sitemap, Open Graph and Google Tag Manager measuring where patients come from.',
    },
    arch: {
      pt: [
        'Next.js App Router + TypeScript',
        'Dados estruturados MedicalClinic (schema.org)',
        'Google Tag Manager + SEO local',
        'Deploy na Railway',
      ],
      en: [
        'Next.js App Router + TypeScript',
        'MedicalClinic structured data (schema.org)',
        'Google Tag Manager + local SEO',
        'Deployed on Railway',
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
