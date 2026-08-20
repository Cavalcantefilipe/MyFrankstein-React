import type { Locale } from '@/i18n/config';

/**
 * Texto extraído dos currículos do próprio Filipe
 * (~/Documents/Resumo/filipe-cavalcante-{pt,en}.pdf), não traduzido por
 * máquina. Ao editar, mantenha os dois idiomas afirmando exatamente os mesmos
 * fatos e números — src/data/services-claim-guard.ts cruza os números das
 * páginas de serviço com estas frases.
 */
export type Experience = {
  title: Record<Locale, string>;
  company: string;
  location: Record<Locale, string>;
  period: Record<Locale, string>;
  /** Contexto da empresa/projeto, quando o currículo traz um. */
  context?: Record<Locale, string>;
  responsibilities: Record<Locale, string[]>;
  tech: string[];
};

export const experiences: Experience[] = [
  {
    title: {
      pt: 'Engenheiro de Software Full-Stack Sênior',
      en: 'Senior Full-Stack Software Engineer',
    },
    company: 'BrasilTec',
    location: { pt: 'Remoto', en: 'Remote' },
    period: { pt: 'Jul 2025 – Presente', en: 'Jul 2025 – Present' },
    context: {
      pt: 'ERP multi-tenant e marketplace B2B (Mercado Livre, Google Ads, loja própria) mais a universidade online da empresa — 6 bancos de tenants. Único desenvolvedor na universidade; no ERP, ao lado de 3 engenheiros sêniores e 2 juniores.',
      en: "Multi-tenant ERP and B2B marketplace (Mercado Livre, Google Ads, storefront) plus the company's online university platform — 6 tenant databases. Sole developer on the university; alongside 3 senior and 2 junior engineers on the ERP.",
    },
    responsibilities: {
      pt: [
        'Reconstruí a plataforma edtech da BrasilTec do zero em 6 semanas, substituindo um sistema legado em PHP por NestJS + React/TypeScript. Fiz tudo sozinho: backend, frontend, painel administrativo e migração de dados. A plataforma tem hoje 5.143 usuários, 6.983 matrículas e 10 cursos publicados.',
        'Coloquei features de IA em produção na mesma plataforma: transcrição com OpenAI Whisper em português, inglês e espanhol, busca de aulas pelo conteúdo das transcrições, resumos automáticos com o minuto exato de cada tópico no vídeo, e um gerador de questões com IA.',
        'Baixei a query mais pesada de produtos de 1,21s para 47ms (26x) e eliminei até 99,7% das idas ao banco, removendo padrões N+1 num sistema PostgreSQL de 6 tenants. Validei com zero divergência em 65 mil produtos. O tuning de shared_buffers, JIT e índices funcionais levou o cache hit ratio a 98,92% e a pior query de polling de 653ms para 1,9ms.',
        'Tornei todas as aulas acessíveis a alunos surdos e com deficiência auditiva — e aos 10% de alunos fora do Brasil — com um pipeline automático de legendas (OpenAI Whisper) gerando português, inglês e espanhol em mais de 100 horas de vídeo.',
        'Reduzi em mais de 50% o uso do servidor de aplicação movendo fotos de produto, vídeos de curso e legendas para o Amazon S3 e um CDN — antes cada arquivo vivia no próprio servidor.',
        'Reescrevi uma query legada de playlist em PHP de 470ms para 0,18ms e fechei uma injeção de SQL no mesmo arquivo, com deploy sem mudança de schema e rollback em um comando.',
        'Recuperei 82GB de disco (de 91% para 81% de uso) e eliminei ~3% de perda de pacotes no host de produção com 147 containers, sem nenhuma interrupção de serviço.',
        'Transformei toda a base de alunos em leads qualificados dentro da plataforma de vendas da empresa, unificando matrículas legadas e novas por integração entre plataformas e o ERP.',
      ],
      en: [
        "Rebuilt BrasilTec's edtech platform from scratch in 6 weeks, replacing a legacy PHP system with NestJS + React/TypeScript. Backend, frontend, admin panel and data migration, all by myself. The platform now has 5,143 users, 6,983 enrollments and 10 published courses.",
        'Added AI features to the same platform, all in production: automatic transcription with OpenAI Whisper in Portuguese, English and Spanish, lesson search based on transcripts, auto-generated lesson summaries with exact video timestamps, and an AI question generator.',
        'Cut the heaviest product query from 1.21s to 47ms (26x) and up to 99.7% of database round-trips by eliminating N+1 patterns across a 6-tenant PostgreSQL system, validated with zero divergence across 65,000 products. Tuning shared_buffers, JIT thresholds and functional indexes took cache hit ratio to 98.92% and the worst polling query from 653ms to 1.9ms.',
        'Made every lesson usable by deaf and hard-of-hearing students and by the 10% of learners outside Brazil, with an automated captioning pipeline (OpenAI Whisper) generating Portuguese, English and Spanish subtitles across 100+ hours of video.',
        'Cut the application server footprint by 50%+ by moving product photos, course videos and captions off the box to Amazon S3 and a CDN — previously every asset lived on the server itself.',
        'Rewrote a legacy PHP playlist query from 470ms to 0.18ms and closed a SQL injection in the same file, deployed with no schema change and a one-command rollback.',
        'Recovered 82GB of disk (91% to 81%) and eliminated ~3% network packet loss on the production host running 147 containers, with zero service interruption.',
        "Turned the entire student base into qualified leads inside the company's sales platform, unifying legacy and new enrollment records through platform-to-platform ERP integration.",
      ],
    },
    tech: [
      'NestJS',
      'React',
      'TypeScript',
      'PostgreSQL',
      'OpenAI Whisper',
      'AWS',
      'Docker',
    ],
  },
  {
    title: {
      pt: 'Fundador e Engenheiro de Software',
      en: 'Founder & Software Engineer',
    },
    company: 'F A Cavalcante',
    location: { pt: 'Remoto', en: 'Remote' },
    period: { pt: '2018 – Presente', en: '2018 – Present' },
    context: {
      pt: 'Minha própria consultoria de software. Entrego projetos full-stack de ponta a ponta — do desenho do banco ao deploy — para clientes de edtech, mídia, e-commerce e marketing, quase sempre como único desenvolvedor. Cada cliente aparece abaixo com suas próprias datas.',
      en: 'My own software consultancy. Full-stack delivery from database design through to deployment for clients across edtech, media, e-commerce and marketing, almost always as the only developer. Each client is listed below with its own dates.',
    },
    responsibilities: {
      pt: [
        'Construí uma ferramenta de redes sociais para o time da Flexi: eles cortam vídeos longos em reels e shorts, importam conteúdo do YouTube e agendam publicações no Instagram e TikTok. A estimativa do time é reduzir em 40% o trabalho manual de criação de conteúdo.',
        'Passei a usar Claude Code no dia a dia e meu tempo de entrega caiu 40 a 50%, economizando mais de 15 horas por semana que iam para código repetitivo e setup de testes.',
        'Limpei recursos AWS parados de clientes e economizei $500+/mês.',
      ],
      en: [
        'Built a social media tool for the Flexi content team where they cut long videos into reels and shorts, import from YouTube and schedule posts to Instagram and TikTok. The team expects to cut their manual work by around 40%.',
        'Claude Code as part of my daily workflow cut my delivery time by 40 to 50% and saves 15+ hours a week that used to go into boilerplate, refactoring and test setup.',
        'Cleaned up idle AWS resources for clients, saving $500+/month.',
      ],
    },
    tech: [
      'NestJS',
      'React',
      'TypeScript',
      'OpenAI Whisper',
      'AWS',
      'Instagram Graph API',
      'TikTok API',
      'PostgreSQL',
    ],
  },  {
    title: {
      pt: 'Engenheiro de Software',
      en: 'Software Engineer',
    },
    company: 'Gran Cursos Online',
    location: {
      pt: 'Brasília, DF (Remoto)',
      en: 'Brasília, Brazil (Remote)',
    },
    period: { pt: 'Dez 2021 – Jun 2025', en: 'Dec 2021 – Jun 2025' },
    context: {
      pt: 'Plataforma edtech de grande escala. Quando entrei tinham 300 mil alunos pagantes, quando saí eram 800 mil.',
      en: 'Large-scale edtech platform. The company went from 300,000 to 800,000 paying students while I was there.',
    },
    responsibilities: {
      pt: [
        'Resolvi um bug de ordenação de questões que voltava sempre e ninguém tinha conseguido eliminar. O problema não estava no código, era uma regra de negócio que nunca foi documentada. Sentei com o time do sistema de cadastro de questões, entendemos o que estava acontecendo e nunca mais voltou.',
        'Conduzi a migração de MySQL para PostgreSQL com reescrita de queries e índices. Economizou $1.000+/mês em infraestrutura.',
        'Publiquei uma biblioteca de componentes React no NPM usada em 4 repositórios, com mais de 20 componentes e eliminando milhares de linhas de código duplicado.',
        'Entreguei a campanha de Black Friday em 5 dias, contra um prazo de 10: retematizei a plataforma inteira em tema escuro, com banners e páginas promocionais novas para os sites da faculdade e da pós-graduação. A meta do primeiro dia era R$10 milhões e o dia fechou em R$16 milhões.',
        'Construí esse re-skin como uma camada de temas, em vez de páginas avulsas, para que marketing e design continuassem trocando banners e landing pages sem depender da engenharia.',
        'Reconstruí o site de marketing com foco em SEO e performance. Notas do Lighthouse: Performance 7 para 76, Acessibilidade 36 para 93, Boas Práticas 40 para 90, SEO 28 para 95. Depois percorri a fila de tarefas do Google Search Console para subir o ranqueamento do site.',
        'Construí um CMS para que o time de marketing pudesse atualizar qualquer página sem precisar da engenharia.',
        'Fechei lacunas no acompanhamento da jornada do cliente instrumentando a plataforma com Amplitude e um dataLayer de Google Tag Manager para marketing e produto.',
        'Projetei e construí mais de 30 endpoints REST em PHP, Laravel e TypeScript para alto volume de tráfego numa arquitetura de microsserviços.',
      ],
      en: [
        "Fixed a question ordering bug that kept coming back for years. The problem wasn't in the code at all — it was a business rule nobody had written down. I sat with the team that owned the question registration system, we figured it out and it never came back.",
        'Led a MySQL to PostgreSQL migration with query rewrites and index tuning that saved $1,000+/month in infrastructure.',
        'Published a shared React component library on NPM used across 4 repositories, covering 20+ components and removing thousands of lines of duplicated code.',
        'Shipped the Black Friday campaign in 5 days against a 10-day deadline — re-themed the whole platform to a black theme with new banners and promo pages for the university and post-graduation sites. It beat its R$10M first-day target and closed the day at R$16M.',
        'Built that re-skin as a theming layer instead of one-off pages, so marketing and design could keep changing banners and landing pages without engineering.',
        'Rebuilt the company marketing site for performance and SEO — Lighthouse Performance 7 to 76, Accessibility 36 to 93, Best Practices 40 to 90, SEO 28 to 95 — then worked through the Google Search Console backlog to lift the site\u2019s rankings.',
        'Built a CMS so the marketing team could update any page themselves without going through engineering.',
        'Closed customer-journey tracking gaps by instrumenting the platform with Amplitude and a Google Tag Manager dataLayer for marketing and product stakeholders.',
        'Designed and built 30+ REST API endpoints in PHP, Laravel and TypeScript for high-volume traffic across a microservice architecture.',
      ],
    },
    tech: [
      'PHP',
      'Laravel',
      'Node.js',
      'TypeScript',
      'React',
      'Next.js',
      'SQS',
      'AWS',
      'DynamoDB',
      'Tailwind CSS',
      'PostgreSQL',
      'MySQL',
    ],
  },
  {
    title: {
      pt: 'Engenheiro de Software',
      en: 'Software Engineer',
    },
    company: 'Grupo Estado',
    location: {
      pt: 'São Paulo, SP (Remoto)',
      en: 'São Paulo, Brazil (Remote)',
    },
    period: { pt: 'Jul 2021 – Dez 2021', en: 'Jul 2021 – Dec 2021' },
    context: {
      pt: 'Um dos maiores grupos de mídia do Brasil. Fiz parte do time de sustentação cuidando de melhorias e correções em várias plataformas de notícias.',
      en: "One of Brazil's largest media groups. Part of the sustentation team doing maintenance and improvements across multiple news platforms.",
    },
    responsibilities: {
      pt: [
        'Reduzi os erros do Google Search Console em mais de 50%. A plataforma tinha mais de 20.000 erros por dia. Adicionei logs estruturados, fui rastreando de onde os erros vinham e corrigindo no código um por um.',
        'Construí um bot que testava pagamentos a cada deploy e avisava os times certos no Email, Slack e Hangouts com prints e mensagem de erro. Acabou a necessidade de checar pagamentos manualmente depois de cada release.',
        'Construí um sistema de indexação e monitoramento de conteúdo em Node.js e TypeScript com Google APIs que evitou mais de 500 links quebrados por mês em 3 plataformas de notícias.',
        'Dei suporte direto aos times de N1 e N2: revisei as correções deles e os orientei a diagnosticar falhas recorrentes, para que mais chamados fossem resolvidos sem chegar à engenharia.',
      ],
      en: [
        'Cut Google Search Console errors by more than 50%. The platform had 20,000+ daily errors. I added structured logging, traced where they were coming from and fixed the code issues one by one.',
        'Built a bot that tested payments on every deploy and sent alerts to the right teams on Email, Slack and Hangouts, with screenshots and error details. Nobody had to check payments manually after a release anymore.',
        'Built a content indexing and monitoring system in Node.js and TypeScript with Google APIs that stopped 500+ broken links per month across 3 news platforms.',
        'Backed the L1 and L2 support teams directly: reviewed their fixes and walked them through diagnosing recurring failures so more issues were closed without reaching engineering.',
      ],
    },
    tech: [
      'PHP',
      'Laravel',
      'Node.js',
      'TypeScript',
      'React',
      'Google API',
      'Java',
      'SOLID',
      'PHPUnit',
    ],
  },
  {
    title: {
      pt: 'Engenheiro de Software',
      en: 'Software Engineer',
    },
    company: 'Olivas Digital',
    location: {
      pt: 'São Paulo, SP (Remoto)',
      en: 'São Paulo, Brazil (Remote)',
    },
    period: { pt: 'Jul 2020 – Jul 2021', en: 'Jul 2020 – Jul 2021' },
    context: {
      pt: 'Agência de marketing com 13 clientes no portfólio. Trabalhei como full-stack em todos usando PHP, Laravel, Node.js, Express, React, Vue ou React Native conforme o projeto.',
      en: 'Marketing agency with 13 clients in the portfolio. Full-stack across all of them using PHP, Laravel, Node.js, Express, React, Vue or React Native depending on the project.',
    },
    responsibilities: {
      pt: [
        'Introduzi CI/CD nos projetos da agência. Antes os deploys eram por FTP e causavam problemas toda hora: arquivos errados, estado inconsistente, sem rollback. Com pipelines no GitHub as releases ficaram previsíveis e o time parou de ter medo de subir código novo.',
        'Construí landing pages para vários clientes que trouxeram 4 novos clientes por indicação.',
        'Integrei APIs antifraude para uma ONG que recebia doações para resgatar animais do tráfico. Os estornos caíram 40%, o melhor resultado de prevenção a fraude entre todos os clientes da agência.',
        'Construí uma API REST multi-moeda em 5 moedas para aumentar as vendas em 20% com rastreamento mais preciso de pedidos e comissões.',
      ],
      en: [
        'Introduced CI/CD pipelines across most agency projects. Before that, deploys happened via FTP and caused constant problems: wrong files, broken states, no rollback. After the change, releases became predictable and the team stopped dreading deployments.',
        'Built landing pages for several clients that converted well enough to bring in 4 new clients through referrals.',
        'Integrated anti-fraud APIs for a charity that received donations to rescue animals from trafficking. Chargebacks dropped 40%, the best fraud result across all agency clients.',
        'Built a multi-currency REST API in 5 currencies targeting a 20% sales increase through better order tracking and commission reporting.',
      ],
    },
    tech: [
      'React Native',
      'React',
      'Laravel',
      'Slim',
      'WordPress',
      'AWS',
      'Azure',
      'PHP',
      'TypeScript',
      'MySQL',
      'Node.js',
      'Express',
      'Vue.js',
    ],
  },
  {
    title: {
      pt: 'Engenheiro de Software',
      en: 'Software Engineer',
    },
    company: 'Gênesis Tecnologia e Inovação',
    location: {
      pt: 'São Paulo, SP (Remoto)',
      en: 'São Paulo, Brazil (Remote)',
    },
    period: { pt: 'Dez 2018 – Jun 2020', en: 'Dec 2018 – Jun 2020' },
    responsibilities: {
      pt: [
        'Reconstruí um sistema corporativo legado dividido entre Java e PHP 5.6 com Laravel. Sem documentação, sem handover. Li o código antigo, entendi o que fazia, redesenhei o banco e reescrevi o backend do zero.',
        'Mantive 80% de cobertura de testes com PHPUnit e TDD e configurei CI/CD para rodar a suíte completa a cada push.',
        'Troquei um processo de relatórios em planilhas manuais por relatórios gerados pelo backend. Antes: rodavam só à noite, resultado na manhã seguinte. Depois: sob demanda e 50% mais rápidos.',
      ],
      en: [
        'Rebuilt a legacy enterprise system split between Java and PHP 5.6 with Laravel. No documentation, no handover. I read the old code, understood what it did, redesigned the database and rewrote the backend from scratch.',
        'Kept 80% test coverage with PHPUnit and TDD throughout, and set up CI/CD to run the full test suite on every push.',
        'Replaced a manual spreadsheet reporting process with backend-generated reports. Before: run at night, results next morning. After: on demand and 50% faster.',
      ],
    },
    tech: ['PHPUnit', 'Laravel', 'TDD', 'PHP', 'Java', 'Node.js', 'PostgreSQL'],
  },
];
