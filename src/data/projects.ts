import type { StaticImageData } from 'next/image';
import type { Locale } from '@/i18n/config';
import battlepokemon from '@/assets/battlepokemon.png';
import randomquotes from '@/assets/randomquotes.png';
import orthoneuro from '@/assets/orthoneuro.png';
import temaqui from '@/assets/temaqui.png';

// Destaques ordenados por relevância para engenharia sênior. PT e EN compartilham os mesmos fatos.
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
  caseSlug?: string;
};

export const projects: Project[] = [
  {
    "id": "temaqui",
    "kind": "caseStudy",
    "date": {
      "pt": "2026",
      "en": "2026"
    },
    "title": "Tem Aqui Achadinhos",
    "href": "https://temaquiachadinhos.com.br",
    "image": temaqui,
    "summary": {
      "pt": "Produto em produção com Go, Next.js e PostgreSQL: vitrine de afiliados, encurtador próprio e controles de autenticação e sessão.",
      "en": "A production product with Go, Next.js, and PostgreSQL: affiliate storefront, custom short links, and authentication and session controls."
    },
    "stack": [
      "Go",
      "Next.js",
      "PostgreSQL",
      "Tailwind"
    ],
    "problem": {
      "pt": "Afiliada divulgando produtos sem vitrine própria nem métricas de clique",
      "en": "An affiliate promoting products with no storefront of her own and no click metrics"
    },
    "body": {
      "pt": "Construí a vitrine, o painel administrativo e o encurtador de links. Implementei hashing de senhas com Argon2id, sessões com expiração e revogação, consultas com pgx e sqlc e logs estruturados. Frontend e API compartilham uma origem pública, com cookies same-origin, verificações de CSRF e Content Security Policy. O código permanece privado; o caso técnico explica as decisões e os testes existentes.",
      "en": "I built the storefront, administration panel, and link shortener. I implemented Argon2id password hashing, sessions with expiration and revocation, queries with pgx and sqlc, and structured logging. The frontend and API share a public origin, with same-origin cookies, CSRF checks, and a Content Security Policy. Source code remains private; the technical case explains the decisions and existing tests."
    },
    "arch": {
      "pt": [
        "Backend em Go (chi + pgx/sqlc) e PostgreSQL",
        "Next.js na frente, reescrevendo /api e /r para o Go",
        "Encurtador próprio com contagem de cliques",
        "Deploy na Railway com DNS no Cloudflare"
      ],
      "en": [
        "Go backend (chi + pgx/sqlc) with PostgreSQL",
        "Next.js in front, rewriting /api and /r to Go",
        "In-house shortener with click counting",
        "Deployed on Railway with DNS on Cloudflare"
      ]
    },
    "featured": true,
    "caseSlug": "temaqui-secure-development"
  },
  {
    "id": "brasiltec",
    "kind": "caseStudy",
    "date": {
      "pt": "2025",
      "en": "2025"
    },
    "title": "Plataforma EdTech BrasilTec",
    "featured": true,
    "summary": {
      "pt": "Reconstrução de uma plataforma de cursos com APIs, interface, painel administrativo e migração do legado.",
      "en": "Rebuilt a learning platform with APIs, UI, administration, and migration from a legacy system."
    },
    "stack": [
      "NestJS",
      "React",
      "TypeScript",
      "PostgreSQL"
    ],
    "problem": {
      "pt": "Modernizar uma plataforma de cursos sem perder seu histórico de dados",
      "en": "Modernize a learning platform while preserving its data history"
    },
    "body": {
      "pt": "Reconstruí a plataforma de cursos da BrasilTec substituindo o sistema legado em PHP por NestJS, React e TypeScript. Fui responsável pelo backend, frontend, painel administrativo e migração de dados. O caso destaca modernização e entrega de produto; não atribui números de usuários ou prazo sem uma base verificável.",
      "en": "I rebuilt BrasilTec’s learning platform, replacing the legacy PHP system with NestJS, React, and TypeScript. I was responsible for the backend, frontend, administration interface, and data migration. The case highlights modernization and product delivery without unverified user counts or delivery-time claims."
    },
    "arch": {
      "pt": [
        "APIs em NestJS e banco PostgreSQL",
        "Interface e administração em React e TypeScript",
        "Migração de dados do sistema legado"
      ],
      "en": [
        "NestJS APIs and PostgreSQL database",
        "React and TypeScript UI and administration",
        "Data migration from the legacy system"
      ]
    },
    "href": "https://universidade.brasiltec.ind.br/"
  },
  {
    "id": "pokemon",
    "kind": "experiment",
    "date": {
      "pt": "Est. 2025",
      "en": "Est. 2025"
    },
    "title": "Pokemon Battle Simulator",
    "image": battlepokemon,
    "href": "/pokemon-battle",
    "summary": {
      "pt": "Interface Next.js, API Laravel e simulador Node.js: integração entre serviços com código público.",
      "en": "Next.js UI, Laravel API, and Node.js simulator: service integration with public source code."
    },
    "stack": [
      "Next.js",
      "TypeScript",
      "Laravel",
      "Node.js",
      "PostgreSQL"
    ],
    "body": {
      "pt": "Construí a interface e a integração entre uma API Laravel e um serviço Node.js que executa @pkmn/sim. A PokéAPI fornece os dados dos Pokémon. Laravel valida entradas, orquestra as chamadas e persiste resultados; o navegador apresenta os eventos. O motor de batalha é de terceiros. O caso técnico apresenta as fronteiras, os custos da separação e os limites do laboratório.",
      "en": "I built the UI and integration between a Laravel API and a Node.js service running @pkmn/sim. PokéAPI supplies Pokémon data. Laravel validates input, orchestrates calls, and persists results; the browser presents events. The battle engine is third-party software. The technical case discusses boundaries, the cost of separation, and the lab’s limits."
    },
    "arch": {
      "pt": [
        "Next.js e TypeScript na interface",
        "Laravel: validação, orquestração e PostgreSQL",
        "Node.js: motor @pkmn/sim e eventos"
      ],
      "en": [
        "Next.js and TypeScript UI",
        "Laravel: validation, orchestration, and PostgreSQL",
        "Node.js: @pkmn/sim engine and events"
      ]
    },
    "featured": true,
    "caseSlug": "pokemon-service-architecture"
  },
  {
    "id": "orthoneuro",
    "kind": "caseStudy",
    "date": {
      "pt": "2026",
      "en": "2026"
    },
    "title": "Clínica Ortho Neuro",
    "href": "https://clinicaorthoneuro.com.br",
    "image": orthoneuro,
    "summary": {
      "pt": "Site institucional de uma clínica de fisioterapia e Pilates em Caraguatatuba, focado em SEO local e agendamento via WhatsApp.",
      "en": "Institutional site for a physiotherapy and Pilates clinic in Caraguatatuba, focused on local SEO and WhatsApp scheduling."
    },
    "stack": [
      "Next.js",
      "React",
      "TypeScript"
    ],
    "problem": {
      "pt": "Clínica local sem presença na busca do Google além do perfil no Maps",
      "en": "A local clinic with no Google search presence beyond its Maps profile"
    },
    "body": {
      "pt": "Site de página única para a Ortho Neuro Fisioterapia e Pilates: especialidades, equipe, localização e chamada de agendamento pelo WhatsApp. Por baixo, SEO local completo — dados estruturados de clínica (schema.org), sitemap, Open Graph e Google Tag Manager medindo de onde vêm os pacientes.",
      "en": "Single-page site for Ortho Neuro Fisioterapia e Pilates: specialties, team, location and a WhatsApp scheduling call to action. Under the hood, full local SEO — clinic structured data (schema.org), sitemap, Open Graph and Google Tag Manager measuring where patients come from."
    },
    "arch": {
      "pt": [
        "Next.js App Router + TypeScript",
        "Dados estruturados MedicalClinic (schema.org)",
        "Google Tag Manager + SEO local",
        "Deploy na Railway"
      ],
      "en": [
        "Next.js App Router + TypeScript",
        "MedicalClinic structured data (schema.org)",
        "Google Tag Manager + local SEO",
        "Deployed on Railway"
      ]
    }
  },
  {
    "id": "flexi",
    "kind": "caseStudy",
    "date": {
      "pt": "2025",
      "en": "2025"
    },
    "title": "Ferramenta de Reels — Flexi",
    "featured": false,
    "summary": {
      "pt": "Ferramenta para o time de conteúdo cortar vídeos longos em reels/shorts, importar do YouTube e agendar posts.",
      "en": "A tool for the content team to cut long videos into reels/shorts, import from YouTube and schedule posts."
    },
    "stack": [
      "Node.js",
      "React",
      "AWS"
    ],
    "problem": {
      "pt": "Time de conteúdo perdendo horas cortando vídeo à mão",
      "en": "A content team losing hours cutting video by hand"
    },
    "body": {
      "pt": "Ferramenta interna onde o time de conteúdo da Flexi corta vídeos longos em reels e shorts, importa direto do YouTube e agenda publicações para Instagram e TikTok.",
      "en": "Internal tool where Flexi's content team cuts long videos into reels and shorts, imports straight from YouTube and schedules posts to Instagram and TikTok."
    },
    "arch": {
      "pt": [
        "Processamento de vídeo no backend Node.js",
        "Importação via API do YouTube",
        "Agendamento para Instagram e TikTok",
        "Fila de jobs na AWS (SQS)"
      ],
      "en": [
        "Video processing on the Node.js backend",
        "Import through the YouTube API",
        "Scheduling for Instagram and TikTok",
        "Job queue on AWS (SQS)"
      ]
    }
  },
  {
    "id": "quotes",
    "kind": "experiment",
    "date": {
      "pt": "Est. 2025",
      "en": "Est. 2025"
    },
    "title": "Random Quotes",
    "image": randomquotes,
    "href": "/random-quote",
    "summary": {
      "pt": "Que tal uma frase aleatória traduzida para o idioma que você quiser?",
      "en": "How about a random quote translated into whatever language you want?"
    },
    "stack": [
      "Next.js",
      "TypeScript",
      "i18n"
    ],
    "body": {
      "pt": "Busca uma citação aleatória numa API pública e traduz na hora para o idioma escolhido, combinando duas APIs num fluxo só.",
      "en": "Fetches a random quote from a public API and translates it on the fly into the chosen language, combining two APIs into a single flow."
    },
    "arch": {
      "pt": [
        "API de quotes + API de tradução",
        "Next.js + TypeScript",
        "Seleção de idioma em tempo real"
      ],
      "en": [
        "Quotes API + translation API",
        "Next.js + TypeScript",
        "Real-time language selection"
      ]
    }
  }
];
