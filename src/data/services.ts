import type { Locale } from '@/i18n/config'

export type Service = {
  slug: string
  title: Record<Locale, string>
  body: Record<Locale, string>
  proof: Record<Locale, string>
}

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
  },
]
