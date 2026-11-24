import type { Locale } from '@/i18n/config';

// Alinhado ao LinkedIn em 2026-11-24. Métricas de validação são explicitamente separadas de produção.
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
    "company": "BrasilTec",
    "title": {
      "pt": "Engenheiro de Software Full-Stack Sênior",
      "en": "Senior Full-Stack Software Engineer"
    },
    "period": {
      "pt": "Jul 2025 – Presente",
      "en": "Jul 2025 – Present"
    },
    "location": {
      "pt": "Remoto",
      "en": "Remote"
    },
    "context": {
      "pt": "Atuação no ERP multi-tenant e marketplace B2B, em integrações com o Mercado Livre e na plataforma de cursos da empresa.",
      "en": "Work on the multi-tenant ERP and B2B marketplace, Mercado Livre integrations, and the company’s learning platform."
    },
    "responsibilities": {
      "pt": [
        "Reconstruí a plataforma de cursos com NestJS, React e TypeScript, incluindo APIs, interface, painel administrativo e migração de dados.",
        "Em produção, reescrevi uma consulta legada em PHP de aproximadamente 470 ms para 0,18 ms e corrigi uma vulnerabilidade de SQL injection no mesmo fluxo, sem mudança de schema.",
        "Otimizei configurações e índices de PostgreSQL em produção: a consulta de polling mais lenta passou de 653 ms para 1,9 ms, com cache hit ratio de 98,92%.",
        "Recuperei 82 GB de disco e eliminei cerca de 3% de perda de pacotes em um host de produção com 147 containers, sem interrupção de serviço.",
        "Em testes de validação, removi padrões N+1: até 99,7% menos consultas e um fluxo de 1,21 s para 47 ms, sem divergências em 65 mil produtos. Esses resultados não representam uma medição confirmada em produção."
      ],
      "en": [
        "Rebuilt the learning platform with NestJS, React, and TypeScript, including APIs, UI, administration, and data migration.",
        "In production, rewrote a legacy PHP query from approximately 470 ms to 0.18 ms and remediated a SQL injection vulnerability in the same flow, without a schema change.",
        "Optimized PostgreSQL settings and indexes in production: the slowest polling query went from 653 ms to 1.9 ms, with a 98.92% cache hit ratio.",
        "Recovered 82 GB of disk space and eliminated roughly 3% packet loss on a production host with 147 containers, without service interruption.",
        "In validation tests, removed N+1 patterns: up to 99.7% fewer queries and one flow from 1.21 s to 47 ms, with no discrepancies across 65,000 products. These results are not confirmed production measurements."
      ]
    },
    "tech": [
      "Node.js",
      "NestJS",
      "React",
      "TypeScript",
      "PHP",
      "PostgreSQL",
      "AWS",
      "Docker"
    ]
  },
  {
    "company": "F A Cavalcante",
    "title": {
      "pt": "Fundador e Engenheiro de Software",
      "en": "Founder and Software Engineer"
    },
    "period": {
      "pt": "Dez 2018 – Presente",
      "en": "Dec 2018 – Present"
    },
    "location": {
      "pt": "Remoto",
      "en": "Remote"
    },
    "context": {
      "pt": "Consultoria independente, do desenho do banco ao deploy, para educação, mídia, comércio eletrônico e marketing. Atuação pausada de dezembro de 2021 a junho de 2025 durante o vínculo integral com o Gran Cursos.",
      "en": "Independent consultancy, from database design to deployment, for education, media, e-commerce, and marketing. Consultancy work was paused from December 2021 to June 2025 during full-time employment at Gran Cursos."
    },
    "responsibilities": {
      "pt": [
        "Os contratos com BrasilTec, Grupo Estado, Olivas Digital e Gênesis estão detalhados nas experiências correspondentes.",
        "Construí ferramentas e integrações para fluxos de conteúdo, além de produtos próprios com backend, interface e operação."
      ],
      "en": [
        "Contracts with BrasilTec, Grupo Estado, Olivas Digital, and Gênesis are detailed in their respective experience entries.",
        "Built tools and integrations for content workflows, as well as personal products spanning backend, UI, and operations."
      ]
    },
    "tech": [
      "Node.js",
      "TypeScript",
      "React",
      "PHP",
      "Laravel",
      "PostgreSQL",
      "AWS"
    ]
  },
  {
    "company": "Gran Cursos Online",
    "title": {
      "pt": "Engenheiro de Software Sênior",
      "en": "Senior Software Engineer"
    },
    "period": {
      "pt": "Dez 2021 – Jun 2025",
      "en": "Dec 2021 – Jun 2025"
    },
    "location": {
      "pt": "Remoto",
      "en": "Remote"
    },
    "context": {
      "pt": "Produto de educação digital, conectando engenharia, marketing e produto em iniciativas de plataforma e experiência dos alunos.",
      "en": "Digital education product, connecting engineering, marketing, and product on platform and learner-experience initiatives."
    },
    "responsibilities": {
      "pt": [
        "Conduzi uma migração de MySQL para PostgreSQL com reescrita de consultas e revisão de índices.",
        "Publiquei uma biblioteca compartilhada de componentes React no NPM e apoiei sua adoção entre repositórios, reduzindo duplicação de código.",
        "Atuei na campanha de Black Friday e construí uma camada reutilizável de temas para novas páginas e banners.",
        "Reconstruí o site institucional e criei um CMS para dar autonomia de publicação ao marketing. Instrumentei a jornada com Amplitude e Google Tag Manager.",
        "Investiguei e corrigi um problema recorrente de ordenação de questões identificando, com o time responsável pelo cadastro, uma regra de negócio não documentada."
      ],
      "en": [
        "Led a MySQL-to-PostgreSQL migration with query rewrites and index review.",
        "Published a shared React component library on NPM and supported adoption across repositories, reducing duplicated code.",
        "Contributed to the Black Friday campaign and built a reusable theming layer for new pages and banners.",
        "Rebuilt the corporate website and created a CMS to let marketing publish independently. Instrumented the journey with Amplitude and Google Tag Manager.",
        "Investigated and fixed a recurring question-ordering issue by identifying an undocumented business rule with the team responsible for content entry."
      ]
    },
    "tech": [
      "PHP",
      "Laravel",
      "Node.js",
      "TypeScript",
      "React",
      "PostgreSQL",
      "MySQL",
      "AWS"
    ]
  },
  {
    "company": "Grupo Estado",
    "title": {
      "pt": "Engenheiro de Software",
      "en": "Software Engineer"
    },
    "period": {
      "pt": "Jul 2021 – Dez 2021",
      "en": "Jul 2021 – Dec 2021"
    },
    "location": {
      "pt": "Remoto",
      "en": "Remote"
    },
    "context": {
      "pt": "Contrato de manutenção e evolução de plataformas de mídia, por meio da F A Cavalcante.",
      "en": "Contract role maintaining and improving media platforms through F A Cavalcante."
    },
    "responsibilities": {
      "pt": [
        "Estruturei logs, rastreei problemas apontados pelo Google Search Console e corrigi falhas incrementalmente.",
        "Automatizei testes de pagamentos após deploy, com alertas e evidências para os times responsáveis.",
        "Construí monitoramento de indexação em Node.js e TypeScript com Google APIs para identificar links quebrados em três plataformas.",
        "Apoiei os times de suporte N1 e N2 na investigação de falhas recorrentes e revisão de correções."
      ],
      "en": [
        "Structured logs, traced issues reported by Google Search Console, and fixed failures incrementally.",
        "Automated post-deployment payment tests with alerts and evidence for the responsible teams.",
        "Built indexing monitoring in Node.js and TypeScript using Google APIs to identify broken links across three platforms.",
        "Supported L1 and L2 teams in investigating recurring issues and reviewing fixes."
      ]
    },
    "tech": [
      "PHP",
      "Laravel",
      "Node.js",
      "TypeScript",
      "React",
      "Google APIs"
    ]
  },
  {
    "company": "Olivas Digital",
    "title": {
      "pt": "Engenheiro de Software",
      "en": "Software Engineer"
    },
    "period": {
      "pt": "Jul 2020 – Jul 2021",
      "en": "Jul 2020 – Jul 2021"
    },
    "location": {
      "pt": "Remoto",
      "en": "Remote"
    },
    "context": {
      "pt": "Desenvolvimento full stack para clientes de agência digital.",
      "en": "Full-stack development for digital agency clients."
    },
    "responsibilities": {
      "pt": [
        "Substituí deploys por FTP por pipelines de CI/CD, com releases mais previsíveis e caminho de recuperação.",
        "Integrei APIs antifraude em uma plataforma de doações para melhorar a confiabilidade das transações.",
        "Construí uma API REST multi-moeda para pedidos, comissões e relatórios, além de landing pages."
      ],
      "en": [
        "Replaced FTP releases with CI/CD pipelines, making deployments more predictable and providing a recovery path.",
        "Integrated anti-fraud APIs into a donations platform to improve transaction reliability.",
        "Built a multi-currency REST API for orders, commissions, and reporting, as well as landing pages."
      ]
    },
    "tech": [
      "Node.js",
      "PHP",
      "Laravel",
      "React",
      "TypeScript",
      "MySQL"
    ]
  },
  {
    "company": "Gênesis Tecnologia e Inovação",
    "title": {
      "pt": "Engenheiro de Software",
      "en": "Software Engineer"
    },
    "period": {
      "pt": "Dez 2018 – Jun 2020",
      "en": "Dec 2018 – Jun 2020"
    },
    "location": {
      "pt": "Remoto",
      "en": "Remote"
    },
    "context": {
      "pt": "Modernização de sistema corporativo legado.",
      "en": "Legacy enterprise system modernization."
    },
    "responsibilities": {
      "pt": [
        "Modernizei um sistema legado em Java e PHP com Laravel, analisando o código existente e redesenhando o banco e o backend.",
        "Implementei testes com PHPUnit e integração contínua para executar a suíte a cada push.",
        "Substituí relatórios manuais em planilhas por relatórios gerados pelo backend sob demanda."
      ],
      "en": [
        "Modernized a legacy Java and PHP system with Laravel by analyzing the existing code and redesigning the database and backend.",
        "Implemented PHPUnit tests and continuous integration to run the suite on each push.",
        "Replaced manual spreadsheet reports with backend-generated reports available on demand."
      ]
    },
    "tech": [
      "PHP",
      "Laravel",
      "PHPUnit",
      "Java",
      "PostgreSQL"
    ]
  }
];
