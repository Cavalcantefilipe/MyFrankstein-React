import type { Locale } from '@/i18n/config';

export type ServiceFaqItem = {
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
};

export type Service = {
  slug: string;
  title: Record<Locale, string>;
  body: Record<Locale, string>;
  proof: Record<Locale, string>;
  metaTitle: Record<Locale, string>;
  metaDescription: Record<Locale, string>;
  heading: Record<Locale, string>;
  intro: Record<Locale, string>;
  problems: Record<Locale, string[]>;
  deliverables: Record<Locale, string[]>;
  faq: ServiceFaqItem[];
};

export const services: Service[] = [
  {
    slug: 'sites-institucionais',
    title: {
      pt: 'Criação de sites institucionais',
      en: 'Company websites',
    },
    body: {
      pt: 'Site rápido, responsivo e preparado para aparecer no Google. Estrutura semântica, performance e SEO técnico desde o primeiro dia, não como remendo depois.',
      en: 'Fast, responsive sites built to rank. Semantic structure, performance and technical SEO from day one, not bolted on later.',
    },
    proof: {
      pt: 'Reconstruí o site de marketing da Gran Cursos Online: Lighthouse saiu de 7 para 76 em performance e de 28 para 95 em SEO.',
      en: 'Rebuilt Gran Cursos Online marketing site: Lighthouse went from 7 to 76 on performance and 28 to 95 on SEO.',
    },
    metaTitle: {
      pt: 'Site Institucional para Empresa | Filipe Cavalcante',
      en: 'Company Website Development | Filipe Cavalcante Dev',
    },
    metaDescription: {
      pt: 'Site institucional para empresa com estrutura semântica, performance e SEO técnico desde o início. Desenvolvedor freelancer remoto para todo o Brasil.',
      en: 'Company website development with semantic structure, performance and technical SEO from day one. Freelance developer, remote for clients in Brazil.',
    },
    heading: {
      pt: 'Site Institucional para Empresa',
      en: 'Company Website Development',
    },
    intro: {
      pt: 'Faço o site institucional da sua empresa do zero: design responsivo, código limpo e estrutura pensada para o Google entender do que se trata cada página. Não uso construtor visual nem template genérico — cada site é escrito à mão para carregar rápido e crescer junto com o negócio.',
      en: 'I build your company website from scratch: responsive design, clean code and a structure built so Google understands what each page is about. No page builder, no generic template — every site is hand-coded to load fast and grow with the business.',
    },
    problems: {
      pt: [
        'Sua empresa ainda não tem site, ou o site atual foi feito num construtor visual e ficou lento.',
        'O site existente não aparece no Google nem para o nome da própria empresa.',
        'Não dá para atualizar uma página sem chamar quem fez o site.',
        'O site quebra ou fica torto no celular.',
      ],
      en: [
        "Your company doesn't have a website yet, or the current one was built on a page builder and ended up slow.",
        "The existing site doesn't show up on Google, not even for the company's own name.",
        "You can't update a single page without calling whoever built the site.",
        'The site breaks or looks wrong on mobile.',
      ],
    },
    deliverables: {
      pt: [
        'Site responsivo, testado em desktop e celular',
        'Estrutura semântica em HTML, com títulos e seções que o Google consegue ler',
        'SEO técnico básico: meta tags, sitemap, dados estruturados',
        'Performance otimizada (imagens, fontes e código carregando rápido)',
        'Formulário de contato ou botão de WhatsApp integrado',
      ],
      en: [
        'Responsive site, tested on desktop and mobile',
        'Semantic HTML structure, with headings and sections Google can read',
        'Basic technical SEO: meta tags, sitemap, structured data',
        'Optimized performance (images, fonts and code loading fast)',
        'Contact form or WhatsApp button integrated',
      ],
    },
    faq: [
      {
        question: {
          pt: 'Quanto tempo leva para fazer um site institucional?',
          en: 'How long does it take to build a company website?',
        },
        answer: {
          pt: 'Depende do número de páginas e do quanto de conteúdo já está pronto. Depois de uma conversa sobre o escopo eu passo um prazo estimado antes de começar.',
          en: 'It depends on the number of pages and how much content is already written. After a short scoping conversation I give you an estimated timeline before starting.',
        },
      },
      {
        question: {
          pt: 'O site vem com hospedagem e domínio?',
          en: 'Does the website come with hosting and a domain?',
        },
        answer: {
          pt: 'Eu configuro a hospedagem e o domínio para você, mas a assinatura fica no seu nome — assim você tem controle total sobre o site mesmo se decidir trocar de desenvolvedor no futuro.',
          en: "I set up hosting and the domain for you, but the subscription stays in your name — that way you keep full control of the site even if you decide to switch developers later.",
        },
      },
      {
        question: {
          pt: 'Vocês fazem site para qualquer tipo de empresa?',
          en: 'Do you build websites for any type of company?',
        },
        answer: {
          pt: 'Sim. Já trabalhei em projetos de edtech, mídia, agências de marketing e ONGs. O processo é o mesmo: entender o negócio, definir a estrutura das páginas e construir com performance e SEO desde o início.',
          en: "Yes. I've worked on projects for edtech, media, marketing agencies and nonprofits. The process is the same: understand the business, define the page structure and build with performance and SEO from the start.",
        },
      },
      {
        question: {
          pt: 'Preciso mandar o conteúdo pronto ou vocês ajudam a escrever?',
          en: 'Do I need to send finished content, or do you help write it?',
        },
        answer: {
          pt: 'O ideal é você trazer as informações principais sobre a empresa e eu ajudo a organizar em textos claros e diretos para cada página, sem clichê de propaganda.',
          en: 'Ideally you bring the key information about the company and I help organize it into clear, direct copy for each page, no marketing fluff.',
        },
      },
    ],
  },
  {
    slug: 'sistemas-web',
    title: {
      pt: 'Sistemas web e APIs sob medida',
      en: 'Custom web systems and APIs',
    },
    body: {
      pt: 'Plataformas, áreas administrativas e APIs REST feitas para o seu processo, não para um template genérico. Backend, frontend e banco de dados.',
      en: 'Platforms, admin panels and REST APIs built around your process, not a generic template. Backend, frontend and database.',
    },
    proof: {
      pt: 'Reconstruí uma plataforma edtech do zero em 6 semanas. Hoje tem 4.854 usuários e 6.415 matrículas. Também desenhei mais de 30 endpoints REST para tráfego alto.',
      en: 'Rebuilt an edtech platform from scratch in 6 weeks. It now has 4,854 users and 6,415 enrollments. Also designed 30+ REST endpoints for high-volume traffic.',
    },
    metaTitle: {
      pt: 'Sistema Web Sob Medida com NestJS | Filipe Cavalcante',
      en: 'Custom Web System Development | Filipe Cavalcante Dev',
    },
    metaDescription: {
      pt: 'Desenvolvedor NestJS para sistema web sob medida: backend, frontend e banco de dados feitos para o seu processo, não um template genérico. Atendimento remoto.',
      en: 'Custom web system development: backend, frontend and database built around your process, not a generic template. Remote work for clients in Brazil and abroad.',
    },
    heading: {
      pt: 'Sistema Web Sob Medida (Desenvolvedor NestJS)',
      en: 'Custom Web System Development',
    },
    intro: {
      pt: 'Construo sistemas web sob medida quando uma planilha, um ERP genérico ou um sistema legado já não dão conta do seu processo. Trabalho como desenvolvedor NestJS e React/TypeScript, cuidando de backend, frontend, banco de dados e painel administrativo — sozinho ou junto com o seu time.',
      en: "I build custom web systems when a spreadsheet, a generic ERP or a legacy system can no longer keep up with your process. I work as a NestJS and React/TypeScript developer, handling backend, frontend, database and admin panel — solo or alongside your team.",
    },
    problems: {
      pt: [
        'Sua empresa ainda controla processos importantes em planilha, e já tem gente errando dado ou perdendo versão.',
        'O sistema atual é legado, difícil de mexer, e ninguém mais sabe explicar como ele funciona por dentro.',
        'Você precisa de um painel administrativo para o time gerenciar clientes, pedidos ou conteúdo sem depender da engenharia.',
        'Um sistema pronto do mercado quase resolve, mas força seu processo a se adaptar a ele, e não o contrário.',
      ],
      en: [
        "Your company still runs important processes in a spreadsheet, and people are already making data entry mistakes or losing track of versions.",
        "The current system is legacy, hard to change, and nobody can fully explain how it works internally anymore.",
        'You need an admin panel so the team can manage customers, orders or content without depending on engineering.',
        'An off-the-shelf system almost fits, but forces your process to adapt to it instead of the other way around.',
      ],
    },
    deliverables: {
      pt: [
        'Backend em NestJS com API REST documentada',
        'Frontend em React/TypeScript integrado à API',
        'Modelagem de banco de dados pensada para o seu processo',
        'Painel administrativo para o time operar sem depender de você',
        'Migração de dados do sistema antigo, quando aplicável',
      ],
      en: [
        'NestJS backend with a documented REST API',
        'React/TypeScript frontend integrated with the API',
        'Database schema designed around your process',
        'Admin panel so the team can operate without depending on you',
        'Data migration from the legacy system, when applicable',
      ],
    },
    faq: [
      {
        question: {
          pt: 'Por que NestJS e não outro framework?',
          en: 'Why NestJS instead of another framework?',
        },
        answer: {
          pt: 'NestJS organiza o backend em módulos com uma estrutura clara desde o início, o que facilita manter o sistema depois que ele cresce e outras pessoas passam a mexer no código.',
          en: 'NestJS organizes the backend into modules with a clear structure from the start, which makes it easier to maintain once the system grows and other people start working on the code.',
        },
      },
      {
        question: {
          pt: 'Vocês migram dados de um sistema legado?',
          en: 'Do you migrate data from a legacy system?',
        },
        answer: {
          pt: 'Sim. Já reconstruí uma plataforma inteira substituindo um sistema legado em PHP, incluindo a migração de todos os dados de usuários e cadastros para a nova estrutura.',
          en: "Yes. I've rebuilt an entire platform replacing a legacy PHP system, including migrating all user and record data over to the new structure.",
        },
      },
      {
        question: {
          pt: 'O sistema fica hospedado onde?',
          en: 'Where does the system get hosted?',
        },
        answer: {
          pt: 'Normalmente uso AWS (Lambda, S3, bancos gerenciados), mas a escolha depende do volume esperado e do orçamento. Defino isso junto com você antes de começar.',
          en: "I typically use AWS (Lambda, S3, managed databases), but the choice depends on expected volume and budget. We define that together before starting.",
        },
      },
      {
        question: {
          pt: 'Consigo pedir mudanças depois que o sistema estiver pronto?',
          en: 'Can I request changes after the system is done?',
        },
        answer: {
          pt: 'Sim, sistema web sob medida é para isso: o código é seu e a arquitetura fica documentada para que novas features sejam adicionadas sem reescrever tudo.',
          en: 'Yes, that\'s the point of a custom web system: the code is yours and the architecture is documented so new features can be added without rewriting everything.',
        },
      },
    ],
  },
  {
    slug: 'landing-pages-seo',
    title: {
      pt: 'Landing pages e otimização de SEO',
      en: 'Landing pages and SEO optimization',
    },
    body: {
      pt: 'Páginas de campanha que carregam rápido e convertem. Também conserto site lento, erro de indexação e página que não aparece na busca.',
      en: 'Campaign pages that load fast and convert. I also fix slow sites, indexing errors and pages that never show up in search.',
    },
    proof: {
      pt: 'Páginas de Black Friday que ajudaram a chegar a R$10 milhões em vendas. No Grupo Estado, reduzi em mais de 50% os erros do Google Search Console.',
      en: 'Black Friday campaign pages that helped reach R$10 million in sales. At Grupo Estado, cut Google Search Console errors by more than 50%.',
    },
    metaTitle: {
      pt: 'Otimizar Site Lento: Consultoria SEO Técnico | Filipe',
      en: 'Site Speed and Technical SEO Consulting | Filipe Dev',
    },
    metaDescription: {
      pt: 'Consultoria de SEO técnico para otimizar site lento, corrigir erro de indexação e melhorar posição no Google. Landing pages rápidas que convertem.',
      en: 'Technical SEO consulting to speed up a slow site, fix indexing errors and improve Google rankings. Fast landing pages built to convert.',
    },
    heading: {
      pt: 'Otimizar Site Lento e Consultoria de SEO Técnico',
      en: 'Site Speed and Technical SEO Consulting',
    },
    intro: {
      pt: 'Se o seu site demora para carregar ou some do Google de um dia para o outro, o problema quase sempre está na parte técnica, não no conteúdo. Faço consultoria de SEO técnico para achar a causa raiz — performance, indexação, dados estruturados — e também construo landing pages novas já otimizadas desde o início.',
      en: "If your site takes too long to load or drops out of Google overnight, the problem is almost always technical, not content. I do technical SEO consulting to find the root cause — performance, indexing, structured data — and also build new landing pages optimized from day one.",
    },
    problems: {
      pt: [
        'Seu site demora para carregar e as pessoas saem antes da página terminar de abrir.',
        'O Google Search Console mostra um monte de erro e ninguém sabe de onde eles vêm.',
        'Uma página que antes aparecia na busca simplesmente sumiu dos resultados.',
        'A landing page da campanha converte pouco, mesmo com tráfego pago chegando nela.',
      ],
      en: [
        "Your site takes too long to load and people leave before the page finishes opening.",
        "Google Search Console is full of errors and nobody knows where they're coming from.",
        'A page that used to show up in search results has simply disappeared from them.',
        'The campaign landing page converts poorly, even with paid traffic reaching it.',
      ],
    },
    deliverables: {
      pt: [
        'Diagnóstico técnico com Lighthouse e Search Console',
        'Correção de erros de indexação, rastreamento e sitemap',
        'Otimização de performance (imagens, fontes, JavaScript)',
        'Landing page nova, rápida e com dados estruturados',
        'Relatório com o que foi corrigido e o antes/depois',
      ],
      en: [
        'Technical diagnostic with Lighthouse and Search Console',
        'Fixes for indexing, crawling and sitemap errors',
        'Performance optimization (images, fonts, JavaScript)',
        'New landing page, fast and with structured data',
        'Report showing what was fixed and the before/after',
      ],
    },
    faq: [
      {
        question: {
          pt: 'Como sei se meu site tem problema de SEO técnico?',
          en: 'How do I know if my site has a technical SEO problem?',
        },
        answer: {
          pt: 'Os sinais mais comuns são: nota baixa no Lighthouse, erros acumulando no Google Search Console, ou páginas que pararam de aparecer na busca sem nenhuma mudança de conteúdo. Faço um diagnóstico inicial para confirmar a causa.',
          en: "The most common signs are: a low Lighthouse score, errors piling up in Google Search Console, or pages that stopped showing up in search with no content changes. I run an initial diagnostic to confirm the cause.",
        },
      },
      {
        question: {
          pt: 'Quanto tempo leva para o site voltar a aparecer no Google?',
          en: 'How long until the site shows up in Google again?',
        },
        answer: {
          pt: 'A correção técnica costuma ser rápida, mas o Google leva tempo para re-rastrear e reindexar as páginas. No Grupo Estado, reduzir os erros do Search Console em mais de 50% foi um trabalho de rastrear cada erro e corrigir um por um no código.',
          en: 'The technical fix itself is usually quick, but Google takes time to recrawl and reindex pages. At Grupo Estado, cutting Search Console errors by more than 50% meant tracing each error and fixing the underlying code one by one.',
        },
      },
      {
        question: {
          pt: 'Vocês mexem em site que já existe ou só fazem página nova?',
          en: 'Do you work on an existing site or only build new pages?',
        },
        answer: {
          pt: 'Os dois. Boa parte do trabalho de SEO técnico é justamente diagnosticar e corrigir um site que já está no ar, sem precisar reconstruir do zero.',
          en: "Both. A good part of technical SEO work is exactly diagnosing and fixing a site that's already live, without needing a full rebuild.",
        },
      },
    ],
  },
  {
    slug: 'automacao-ia',
    title: {
      pt: 'Automação e integração com IA',
      en: 'Automation and AI integration',
    },
    body: {
      pt: 'Transcrição automática, resumo de conteúdo, busca inteligente e automação de tarefas repetitivas que hoje consomem horas da sua equipe.',
      en: 'Automatic transcription, content summarization, smart search and automation for repetitive work that eats your team hours.',
    },
    proof: {
      pt: 'Transcrição com OpenAI Whisper em português, inglês e espanhol, busca por transcrição, resumo automático de aulas e gerador de questões.',
      en: 'OpenAI Whisper transcription in Portuguese, English and Spanish, transcript-based search, auto-generated lesson summaries and a question generator.',
    },
    metaTitle: {
      pt: 'Automação com IA e Transcrição Automática | Filipe',
      en: 'AI Automation and Transcription | Filipe Cavalcante',
    },
    metaDescription: {
      pt: 'Automação com IA para transcrição automática, busca inteligente e resumo de conteúdo. Recursos de IA em produção, integrados ao seu sistema atual.',
      en: 'AI automation for automatic transcription, smart search and content summarization. AI features shipped to production, integrated with your existing system.',
    },
    heading: {
      pt: 'Automação com IA e Transcrição Automática',
      en: 'AI Automation and Transcription',
    },
    intro: {
      pt: 'Coloco IA para resolver trabalho repetitivo de verdade: transcrever áudio e vídeo automaticamente, resumir conteúdo longo, buscar dentro de transcrições e gerar rascunhos que antes exigiam horas de uma pessoa. O foco é sempre integrar isso ao sistema que você já usa, não entregar um protótipo solto.',
      en: "I put AI to work on real repetitive tasks: transcribing audio and video automatically, summarizing long content, searching inside transcripts and generating drafts that used to take a person hours. The focus is always integrating this into the system you already use, not shipping a standalone prototype.",
    },
    problems: {
      pt: [
        'Alguém do seu time gasta horas transcrevendo reunião, aula ou entrevista na mão.',
        'Você tem muito conteúdo em vídeo ou áudio, mas ninguém consegue buscar dentro dele.',
        'Resumir relatórios, aulas ou documentos longos toma tempo demais do time.',
        'Você já ouviu falar de automação com IA, mas não sabe como isso se encaixaria no seu sistema.',
      ],
      en: [
        'Someone on your team spends hours manually transcribing meetings, lessons or interviews.',
        "You have a lot of video or audio content, but nobody can search inside it.",
        'Summarizing long reports, lessons or documents takes too much of the team\'s time.',
        "You've heard about AI automation, but don't know how it would fit into your system.",
      ],
    },
    deliverables: {
      pt: [
        'Transcrição automática de áudio e vídeo com OpenAI Whisper',
        'Busca por conteúdo dentro das transcrições',
        'Resumo automático com marcação do minuto exato de cada tópico',
        'Gerador de questões ou rascunhos assistido por IA',
        'Integração direta com o sistema que você já usa',
      ],
      en: [
        'Automatic audio and video transcription with OpenAI Whisper',
        'Content search inside transcripts',
        'Automatic summaries with exact video timestamps per topic',
        'AI-assisted question or draft generator',
        'Direct integration with the system you already use',
      ],
    },
    faq: [
      {
        question: {
          pt: 'A transcrição automática funciona em português?',
          en: 'Does automatic transcription work in Portuguese?',
        },
        answer: {
          pt: 'Sim. Já coloquei em produção transcrição com OpenAI Whisper em português, inglês e espanhol, incluindo busca de conteúdo pelo texto transcrito.',
          en: "Yes. I've shipped OpenAI Whisper transcription to production in Portuguese, English and Spanish, including content search over the transcribed text.",
        },
      },
      {
        question: {
          pt: 'Preciso trocar de sistema para usar automação com IA?',
          en: 'Do I need to switch systems to use AI automation?',
        },
        answer: {
          pt: 'Não necessariamente. O objetivo é integrar os recursos de IA ao que você já tem, do jeito que fiz numa plataforma edtech: transcrição, busca e resumo automático rodando dentro do sistema existente.',
          en: "Not necessarily. The goal is integrating AI features into what you already have, the way I did on an edtech platform: transcription, search and automatic summaries running inside the existing system.",
        },
      },
      {
        question: {
          pt: 'Isso substitui a minha equipe?',
          en: 'Does this replace my team?',
        },
        answer: {
          pt: 'Não é o objetivo. A ideia é tirar o trabalho repetitivo (transcrever, resumir, buscar) das mãos das pessoas para que elas foquem no que exige julgamento humano.',
          en: "That's not the goal. The idea is to take repetitive work (transcribing, summarizing, searching) off people's hands so they can focus on what actually needs human judgment.",
        },
      },
    ],
  },
  {
    slug: 'integracoes',
    title: {
      pt: 'Integrações com marketplaces, redes sociais e pagamentos',
      en: 'Marketplace, social and payment integrations',
    },
    body: {
      pt: 'Conecto seu sistema a quem você já usa: meios de pagamento, marketplaces, Instagram, TikTok e APIs de terceiros.',
      en: 'I connect your system to what you already use: payment providers, marketplaces, Instagram, TikTok and third-party APIs.',
    },
    proof: {
      pt: 'Integrações com Stripe, Instagram Graph API, TikTok API e Google APIs. Numa integração antifraude, os estornos caíram 40%.',
      en: 'Integrations with Stripe, Instagram Graph API, TikTok API and Google APIs. On one anti-fraud integration, chargebacks dropped 40%.',
    },
    metaTitle: {
      pt: 'Integração com API: Instagram e Pagamentos | Filipe',
      en: 'Third-Party API Integration | Filipe Cavalcante Dev',
    },
    metaDescription: {
      pt: 'Integração com API de pagamentos, Instagram, TikTok e marketplaces. Conecto seu sistema às ferramentas que você já usa, com dados sincronizados de verdade.',
      en: 'Third-party API integration for payments, Instagram, TikTok and marketplaces. I connect your system to the tools you already use, data actually in sync.',
    },
    heading: {
      pt: 'Integração com API: Pagamentos, Instagram e Marketplaces',
      en: 'Third-Party API Integration',
    },
    intro: {
      pt: 'Faço a integração com API entre o seu sistema e as ferramentas que a sua empresa já usa: gateway de pagamento, Instagram, TikTok, marketplaces ou qualquer serviço de terceiros com API. O objetivo é sempre dado sincronizado de verdade, sem planilha exportada na mão nem retrabalho manual.',
      en: "I integrate your system with the tools your company already uses via third-party API: payment gateways, Instagram, TikTok, marketplaces or any service with an API. The goal is always data that actually stays in sync, no manually exported spreadsheets, no duplicated manual work.",
    },
    problems: {
      pt: [
        'Seu time exporta dado de um sistema e importa manualmente em outro toda semana.',
        'Você precisa aceitar pagamento online mas o sistema atual não conversa com nenhum gateway.',
        'A equipe de marketing posta manualmente no Instagram e no TikTok porque nada está automatizado.',
        'Você já tentou uma integração antes e ela quebrou ou nunca funcionou direito.',
      ],
      en: [
        'Your team exports data from one system and manually imports it into another every week.',
        "You need to accept online payments but the current system doesn't talk to any gateway.",
        "The marketing team posts manually to Instagram and TikTok because nothing is automated.",
        "You've tried an integration before and it broke or never worked properly.",
      ],
    },
    deliverables: {
      pt: [
        'Integração com gateway de pagamento (ex.: Stripe)',
        'Integração com Instagram Graph API ou TikTok API',
        'Sincronização de dados entre sistemas sem intervenção manual',
        'Tratamento de erro e retentativa para chamadas de API que falham',
        'Documentação de como a integração funciona',
      ],
      en: [
        'Payment gateway integration (e.g. Stripe)',
        'Instagram Graph API or TikTok API integration',
        'Data sync between systems with no manual intervention',
        'Error handling and retry logic for failed API calls',
        'Documentation of how the integration works',
      ],
    },
    faq: [
      {
        question: {
          pt: 'Com quais APIs vocês já trabalharam?',
          en: 'Which APIs have you worked with?',
        },
        answer: {
          pt: 'Já integrei Stripe, Instagram Graph API, TikTok API e Google APIs, entre outras. Cada integração é diferente, mas o processo de autenticação, sincronização e tratamento de erro segue o mesmo cuidado.',
          en: "I've integrated Stripe, Instagram Graph API, TikTok API and Google APIs, among others. Each integration is different, but the process of authentication, syncing and error handling gets the same level of care.",
        },
      },
      {
        question: {
          pt: 'Integração com pagamento é segura?',
          en: 'Is a payment integration secure?',
        },
        answer: {
          pt: 'Sim, sigo as práticas recomendadas pelo próprio provedor (como Stripe) e nunca guardo dado sensível de cartão no seu sistema — isso fica sempre do lado do gateway.',
          en: "Yes, I follow the practices recommended by the provider itself (like Stripe) and never store sensitive card data in your system — that always stays on the gateway's side.",
        },
      },
      {
        question: {
          pt: 'O que acontece se a API de terceiro cair ou mudar?',
          en: 'What happens if the third-party API goes down or changes?',
        },
        answer: {
          pt: 'A integração é construída com tratamento de erro e retentativa, então uma falha temporária não derruba o seu sistema. Numa integração antifraude que fiz, esse cuidado ajudou a derrubar os estornos em 40%.',
          en: "The integration is built with error handling and retry logic, so a temporary failure doesn't take down your system. On an anti-fraud integration I built, that care helped cut chargebacks by 40%.",
        },
      },
      {
        question: {
          pt: 'Conseguem integrar com um marketplace que vocês nunca usaram?',
          en: "Can you integrate with a marketplace you've never used before?",
        },
        answer: {
          pt: 'Na maioria dos casos sim. O trabalho de ler a documentação de uma API nova e mapear os dados é parte normal do processo.',
          en: "In most cases, yes. Reading a new API's documentation and mapping the data is a normal part of the process.",
        },
      },
    ],
  },
];
