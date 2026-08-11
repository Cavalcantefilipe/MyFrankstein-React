# Migração para Next.js bilíngue com foco em SEO — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fazer o site entregar HTML completo ao Google e adicionar conteúdo comercial em português, para ranquear em buscas por "criação de sites" e "desenvolvedor web".

**Architecture:** Migração do SPA React+Vite para Next.js App Router com locale como segmento dinâmico (`app/[lang]/`). Inglês na raiz (URLs atuais preservadas), português em `/pt`. Hospedagem AWS Amplify com SSR. Componentes e dados existentes são preservados, não recriados.

**Tech Stack:** Next.js 16.3.0, React 19.2.8, Tailwind CSS 4.3.3, Vitest 4.1.10 (unit), Playwright 1.62.1 (E2E/SEO), Node 24.12.0

**Spec:** `docs/superpowers/specs/2026-08-11-seo-nextjs-bilingue-design.md` (commit `15ba216`)

---

## Global Constraints

Estas regras valem para **todas** as tarefas. Os requisitos de cada tarefa incluem implicitamente esta seção.

- **Domínio:** `https://filipelab.com` (sem `www`)
- **WhatsApp:** `5511985346164` — link sempre `https://wa.me/5511985346164`
- **E-mail:** `filipe.alvescavalcante@gmail.com`
- **LinkedIn:** `https://www.linkedin.com/in/cavalcante-filipe/`
- **Locales:** `en` (padrão, servido na raiz sem prefixo) e `pt` (servido em `/pt`)
- **Limites de metadata:** `title` 50–60 caracteres; `description` 120–160 caracteres. Contar antes de commitar.
- **Nenhuma métrica inventada.** Todo número em texto de marketing deve existir em `src/data/experience.js`. Se não estiver lá, não escreva.
- **Sem `LocalBusiness` no JSON-LD.** O atendimento é remoto; schema deve refletir a realidade.
- **Middleware nunca bloqueia crawler.** Ambos os idiomas devem ser acessíveis diretamente, sem redirect, em qualquer User-Agent.
- **Preservar arquivos existentes:** `src/data/experience.js`, `src/data/languages.js`, `src/assets/*`, `src/api/*` são copiados, não reescritos.
- **Idioma do código:** nomes de variáveis, funções e componentes em inglês (segue o padrão atual do repositório). Apenas o conteúdo visível ao usuário é bilíngue.
- **Commits:** formato conventional commits (`feat:`, `fix:`, `test:`, `chore:`), como no histórico atual.
- **Caminho do App Router:** todas as rotas ficam em **`src/app/`**, não em `app/`. O Next.js exige que `pages` e `app` tenham o mesmo diretório-pai, e o app Vite legado ocupa `src/pages/` até a Task 11. Onde este plano escrever `app/layout.tsx`, `app/sitemap.ts`, `app/[lang]/…`, leia `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/[lang]/…`. (Estabelecido na Task 1; ver `next.config.ts`.)

---

## Estrutura de arquivos

Arquivos criados ou modificados, e a responsabilidade de cada um.

### Configuração
| Arquivo | Responsabilidade |
|---|---|
| `package.json` | Dependências e scripts (modificado) |
| `next.config.ts` | Rewrites de locale, redirect `www`, headers CSP |
| `tsconfig.json` | Config TypeScript |
| `amplify.yml` | Build da Amplify |
| `vitest.config.ts` | Runner de testes unitários |
| `playwright.config.ts` | Runner de testes E2E/SEO |

### Domínio i18n
| Arquivo | Responsabilidade |
|---|---|
| `src/i18n/config.ts` | Lista de locales e tipo `Locale` — fonte única da verdade |
| `src/i18n/dictionaries/en.ts` | Todo o texto em inglês |
| `src/i18n/dictionaries/pt.ts` | Todo o texto em português |
| `src/i18n/get-dictionary.ts` | Carrega o dicionário por locale |

### SEO
| Arquivo | Responsabilidade |
|---|---|
| `src/seo/site.ts` | Constantes do site (URL, contatos) — fonte única |
| `src/seo/metadata.ts` | Builder de `Metadata` com canonical e hreflang |
| `src/seo/json-ld.ts` | Geradores de JSON-LD (`Person`, `ProfessionalService`) |
| `app/sitemap.ts` | Sitemap com alternates |
| `app/robots.ts` | robots.txt |

### Rotas
| Arquivo | Responsabilidade |
|---|---|
| `app/layout.tsx` | Layout raiz, `metadataBase` |
| `app/[lang]/layout.tsx` | `<html lang>`, `generateStaticParams`, JSON-LD `Person` |
| `app/[lang]/page.tsx` | Portfólio (home) |
| `app/[lang]/servicos/page.tsx` | Serviços PT — **página-alvo de busca** |
| `app/[lang]/services/page.tsx` | Serviços EN |
| `app/not-found.tsx` | 404 com status HTTP correto |

### Componentes (portados do repositório atual)
| Arquivo | Responsabilidade |
|---|---|
| `src/components/layout/Header.tsx` | Navegação + seletor de idioma |
| `src/components/layout/Footer.tsx` | Rodapé |
| `src/components/ui/AnimatedSection.tsx` | Animação de scroll (client) |
| `src/components/services/ServiceCard.tsx` | Card de serviço |
| `src/components/services/WhatsAppCta.tsx` | CTA de WhatsApp |
| `src/data/services.ts` | Os 5 serviços, bilíngues, com provas reais |

---

## Ordem das tarefas

1. Scaffold Next.js + arredores de teste
2. Domínio i18n (dicionários, locales)
3. Constantes SEO + builder de metadata
4. Layouts e roteamento por locale
5. Portar componentes e página de portfólio
6. Dados de serviços + página `/pt/servicos` (a que ranqueia)
7. JSON-LD
8. Sitemap, robots, 404
9. Config Amplify + redirect `www` + CSP
10. Suíte de verificação SEO
11. Cleanup do código Vite antigo

---

### Task 1: Scaffold Next.js e infraestrutura de testes

**Files:**
- Modify: `package.json`
- Create: `tsconfig.json`, `next.config.ts`, `vitest.config.ts`, `app/layout.tsx`, `app/page.tsx`, `src/app.css`

**Interfaces:**
- Consumes: nada (primeira tarefa)
- Produces: projeto Next.js que builda; `npm test` roda Vitest; `npm run build` gera `.next/`

- [ ] **Step 1: Instalar dependências**

```bash
npm install next@16.3.0 react@19.2.8 react-dom@19.2.8
npm install -D typescript@5 @types/react@19 @types/node@24 vitest@4.1.10 @vitejs/plugin-react
```

- [ ] **Step 2: Substituir os scripts em `package.json`**

Trocar o bloco `"scripts"` inteiro por:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest"
  },
```

- [ ] **Step 3: Criar `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Criar `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
})
```

- [ ] **Step 5: Criar `next.config.ts` mínimo**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

export default nextConfig
```

- [ ] **Step 6: Criar `src/app.css`**

Copiar o conteúdo integral de `src/index.css` para `src/app.css`. O arquivo já usa `@import 'tailwindcss'` (Tailwind 4), compatível com Next.js.

- [ ] **Step 7: Criar `app/layout.tsx` provisório**

```tsx
import type { Metadata } from 'next'
import '../src/app.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://filipelab.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
```

- [ ] **Step 8: Criar `app/page.tsx` provisório**

```tsx
export default function Page() {
  return <h1>Filipe Lab</h1>
}
```

- [ ] **Step 9: Verificar que o build passa**

Run: `npm run build`
Expected: build conclui sem erro, gera `.next/`

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts vitest.config.ts app/ src/app.css
git commit -m "chore: scaffold Next.js 16 com Vitest"
```

---

### Task 2: Domínio i18n

**Files:**
- Create: `src/i18n/config.ts`, `src/i18n/dictionaries/en.ts`, `src/i18n/dictionaries/pt.ts`, `src/i18n/get-dictionary.ts`, `src/i18n/get-dictionary.test.ts`

**Interfaces:**
- Consumes: Task 1 (Vitest configurado)
- Produces:
  - `locales: readonly ['en', 'pt']`, `defaultLocale: 'en'`, `type Locale = 'en' | 'pt'`
  - `isLocale(value: string): value is Locale`
  - `getDictionary(locale: Locale): Dictionary`
  - `type Dictionary` com as chaves `nav`, `home`, `services`, `common`

- [ ] **Step 1: Escrever o teste que falha**

Criar `src/i18n/get-dictionary.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { getDictionary } from './get-dictionary'
import { isLocale, locales, defaultLocale } from './config'

describe('locale config', () => {
  it('lista en e pt, com en como padrão', () => {
    expect(locales).toEqual(['en', 'pt'])
    expect(defaultLocale).toBe('en')
  })

  it('isLocale aceita locales válidos e rejeita o resto', () => {
    expect(isLocale('en')).toBe(true)
    expect(isLocale('pt')).toBe(true)
    expect(isLocale('fr')).toBe(false)
    expect(isLocale('')).toBe(false)
  })
})

describe('getDictionary', () => {
  it('retorna textos em português para pt', () => {
    const dict = getDictionary('pt')
    expect(dict.nav.services).toBe('Serviços')
    expect(dict.common.whatsappCta).toBe('Fale comigo no WhatsApp')
  })

  it('retorna textos em inglês para en', () => {
    const dict = getDictionary('en')
    expect(dict.nav.services).toBe('Services')
  })

  it('en e pt têm exatamente as mesmas chaves', () => {
    const flatten = (obj: object, prefix = ''): string[] =>
      Object.entries(obj).flatMap(([k, v]) =>
        typeof v === 'object' && v !== null
          ? flatten(v, `${prefix}${k}.`)
          : [`${prefix}${k}`],
      )
    expect(flatten(getDictionary('en')).sort()).toEqual(
      flatten(getDictionary('pt')).sort(),
    )
  })
})
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test -- src/i18n/get-dictionary.test.ts`
Expected: FAIL — não consegue resolver `./get-dictionary`

- [ ] **Step 3: Criar `src/i18n/config.ts`**

```ts
export const locales = ['en', 'pt'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
```

- [ ] **Step 4: Criar `src/i18n/dictionaries/en.ts`**

```ts
export const en = {
  nav: {
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    services: 'Services',
    lab: 'Lab',
    downloadCv: 'Download CV',
  },
  home: {
    role: 'Software Engineer',
    aboutTitle: 'About me',
    skillsTitle: 'Skills',
    experienceTitle: 'Work experience',
    email: 'Email',
    resume: 'Resume',
  },
  services: {
    heading: 'Web Developer for Custom Sites, Systems and Integrations',
    intro:
      'I build websites, web systems and integrations for companies that need software that actually works. Over 6 years of experience, remote, across Brazil.',
    whatIDo: 'What I do',
    contactHeading: 'Tell me about your project',
    contactBody:
      'Send me a message describing what you need. I reply with an assessment and an estimated timeline.',
  },
  common: {
    whatsappCta: 'Message me on WhatsApp',
    emailCta: 'Send an email',
    switchLanguage: 'Português',
  },
} as const
```

- [ ] **Step 5: Criar `src/i18n/dictionaries/pt.ts`**

Mesmas chaves, texto em português. As frases de `services` são material de SEO — contêm as palavras-chave alvo.

```ts
export const pt = {
  nav: {
    about: 'Sobre',
    skills: 'Tecnologias',
    experience: 'Experiência',
    services: 'Serviços',
    lab: 'Lab',
    downloadCv: 'Baixar CV',
  },
  home: {
    role: 'Desenvolvedor Web',
    aboutTitle: 'Sobre mim',
    skillsTitle: 'Tecnologias',
    experienceTitle: 'Experiência profissional',
    email: 'E-mail',
    resume: 'Currículo',
  },
  services: {
    heading: 'Desenvolvedor Web para Criação de Sites, Sistemas e Integrações',
    intro:
      'Faço criação de sites, sistemas web sob medida e integrações para empresas que precisam de software que funciona. Mais de 6 anos de experiência, atendimento remoto para todo o Brasil.',
    whatIDo: 'O que eu faço',
    contactHeading: 'Me conte sobre seu projeto',
    contactBody:
      'Me mande uma mensagem descrevendo o que você precisa. Respondo com uma avaliação e um prazo estimado.',
  },
  common: {
    whatsappCta: 'Fale comigo no WhatsApp',
    emailCta: 'Mandar um e-mail',
    switchLanguage: 'English',
  },
} as const
```

- [ ] **Step 6: Criar `src/i18n/get-dictionary.ts`**

```ts
import type { Locale } from './config'
import { en } from './dictionaries/en'
import { pt } from './dictionaries/pt'

export type Dictionary = typeof en

const dictionaries: Record<Locale, Dictionary> = { en, pt }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
```

- [ ] **Step 7: Rodar o teste e confirmar que passa**

Run: `npm test -- src/i18n/get-dictionary.test.ts`
Expected: PASS (5 testes)

- [ ] **Step 8: Commit**

```bash
git add src/i18n/
git commit -m "feat: adiciona dicionários i18n para en e pt"
```

---

### Task 3: Constantes SEO e builder de metadata

**Files:**
- Create: `src/seo/site.ts`, `src/seo/metadata.ts`, `src/seo/metadata.test.ts`

**Interfaces:**
- Consumes: Task 2 (`Locale`, `defaultLocale`)
- Produces:
  - `site` — objeto com `url`, `name`, `authorName`, `email`, `linkedin`, `whatsapp`, `whatsappUrl`
  - `buildMetadata(input: BuildMetadataInput): Metadata`
  - `type BuildMetadataInput = { locale: Locale; title: string; description: string; pathByLocale: Record<Locale, string> }`

- [ ] **Step 1: Escrever o teste que falha**

Criar `src/seo/metadata.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { buildMetadata } from './metadata'
import { site } from './site'

const paths = { en: '/services', pt: '/pt/servicos' }

describe('site constants', () => {
  it('usa o domínio apex sem www', () => {
    expect(site.url).toBe('https://filipelab.com')
  })

  it('monta a URL do WhatsApp a partir do número', () => {
    expect(site.whatsappUrl).toBe('https://wa.me/5511985346164')
  })
})

describe('buildMetadata', () => {
  it('define o canonical para o caminho do locale atual', () => {
    const meta = buildMetadata({
      locale: 'pt',
      title: 'Título',
      description: 'Descrição',
      pathByLocale: paths,
    })
    expect(meta.alternates?.canonical).toBe('/pt/servicos')
  })

  it('inclui hreflang para os dois locales mais x-default', () => {
    const meta = buildMetadata({
      locale: 'en',
      title: 'Title',
      description: 'Description',
      pathByLocale: paths,
    })
    expect(meta.alternates?.languages).toEqual({
      'en': '/services',
      'pt-BR': '/pt/servicos',
      'x-default': '/services',
    })
  })

  it('x-default sempre aponta para o locale padrão, mesmo em páginas pt', () => {
    const meta = buildMetadata({
      locale: 'pt',
      title: 'Título',
      description: 'Descrição',
      pathByLocale: paths,
    })
    expect(meta.alternates?.languages?.['x-default']).toBe('/services')
  })

  it('define openGraph com a URL absoluta e o locale correto', () => {
    const meta = buildMetadata({
      locale: 'pt',
      title: 'Título',
      description: 'Descrição',
      pathByLocale: paths,
    })
    expect(meta.openGraph?.url).toBe('https://filipelab.com/pt/servicos')
    expect(meta.openGraph?.locale).toBe('pt_BR')
  })
})
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test -- src/seo/metadata.test.ts`
Expected: FAIL — não consegue resolver `./metadata`

- [ ] **Step 3: Criar `src/seo/site.ts`**

```ts
const whatsappNumber = '5511985346164'

export const site = {
  url: 'https://filipelab.com',
  name: 'Filipe Lab',
  authorName: 'Filipe Alves Cavalcante',
  email: 'filipe.alvescavalcante@gmail.com',
  linkedin: 'https://www.linkedin.com/in/cavalcante-filipe/',
  whatsapp: whatsappNumber,
  whatsappUrl: `https://wa.me/${whatsappNumber}`,
} as const
```

- [ ] **Step 4: Criar `src/seo/metadata.ts`**

```ts
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { defaultLocale } from '@/i18n/config'
import { site } from './site'

export type BuildMetadataInput = {
  locale: Locale
  title: string
  description: string
  pathByLocale: Record<Locale, string>
}

const ogLocale: Record<Locale, string> = {
  en: 'en_US',
  pt: 'pt_BR',
}

const hreflang: Record<Locale, string> = {
  en: 'en',
  pt: 'pt-BR',
}

export function buildMetadata({
  locale,
  title,
  description,
  pathByLocale,
}: BuildMetadataInput): Metadata {
  const canonical = pathByLocale[locale]

  const languages: Record<string, string> = {
    'x-default': pathByLocale[defaultLocale],
  }
  for (const [loc, path] of Object.entries(pathByLocale) as [Locale, string][]) {
    languages[hreflang[loc]] = path
  }

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: `${site.url}${canonical}`,
      siteName: site.name,
      locale: ogLocale[locale],
      type: 'website',
    },
    robots: { index: true, follow: true },
  }
}
```

- [ ] **Step 5: Rodar o teste e confirmar que passa**

Run: `npm test -- src/seo/metadata.test.ts`
Expected: PASS (6 testes)

- [ ] **Step 6: Commit**

```bash
git add src/seo/
git commit -m "feat: adiciona constantes do site e builder de metadata com hreflang"
```

---

### Task 4: Layouts e roteamento por locale

**Files:**
- Create: `app/[lang]/layout.tsx`, `app/[lang]/page.tsx`
- Modify: `app/layout.tsx`, `next.config.ts`
- Delete: `app/page.tsx` (provisório da Task 1)

**Interfaces:**
- Consumes: Tasks 2, 3
- Produces: rotas `/` e `/pt` funcionando; `params.lang` disponível às páginas; locale inválido retorna 404

- [ ] **Step 1: Substituir `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import '../src/app.css'
import { site } from '@/seo/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
```

Nota: o `<html>` fica em `app/[lang]/layout.tsx`, porque o atributo `lang` depende do locale.

- [ ] **Step 2: Criar `app/[lang]/layout.tsx`**

```tsx
import { notFound } from 'next/navigation'
import { isLocale, locales } from '@/i18n/config'

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return (
    <html lang={lang === 'pt' ? 'pt-BR' : 'en'}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Apagar a página provisória**

```bash
rm app/page.tsx
```

- [ ] **Step 4: Criar `app/[lang]/page.tsx` provisório**

```tsx
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'

export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = getDictionary(lang)
  return <h1>{dict.home.role}</h1>
}
```

- [ ] **Step 5: Adicionar rewrites em `next.config.ts`**

O inglês é servido na raiz sem prefixo. `/en` redireciona para a raiz, evitando URL duplicada.

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      // /en/* é duplicata da raiz — consolidar
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
    ]
  },

  async rewrites() {
    return {
      beforeFiles: [
        // Raiz serve inglês internamente, sem mudar a URL
        { source: '/', destination: '/en' },
      ],
      afterFiles: [
        // Caminhos sem prefixo de locale servem inglês
        { source: '/:path((?!pt|_next|api|.*\\..*).*)', destination: '/en/:path' },
      ],
      fallback: [],
    }
  },
}

export default nextConfig
```

- [ ] **Step 6: Verificar as rotas**

Run: `npm run build && npm start`

Em outro terminal:

```bash
curl -s -o /dev/null -w "raiz:%{http_code}\n" http://localhost:3000/
curl -s -o /dev/null -w "pt:%{http_code}\n" http://localhost:3000/pt
curl -s -o /dev/null -w "en-redirect:%{http_code}\n" http://localhost:3000/en
```

Expected: `raiz:200`, `pt:200`, `en-redirect:308` (Next.js usa 308 para `permanent: true`; equivale a 301 para o Google)

- [ ] **Step 7: Confirmar que o HTML da raiz contém texto renderizado**

Run: `curl -s http://localhost:3000/ | grep -c "Software Engineer"`
Expected: `1` — este é o problema original sendo resolvido

- [ ] **Step 8: Commit**

```bash
git add app/ next.config.ts
git commit -m "feat: roteamento por locale com en na raiz e pt em /pt"
```

---

### Task 5: Portar componentes e a página de portfólio

**Files:**
- Create: `src/components/ui/AnimatedSection.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`
- Modify: `app/[lang]/page.tsx`
- Rename: `src/data/experience.js` → `src/data/experience.ts`

**Interfaces:**
- Consumes: Tasks 2, 3, 4
- Produces:
  - `<AnimatedSection className id>` — client component
  - `<Header locale dict alternatePath>`, `<Footer />`
  - `experiences: Experience[]` tipado

- [ ] **Step 1: Instalar as dependências de UI**

```bash
npm install framer-motion@12.23.12 react-icons@5.5.0
```

- [ ] **Step 2: Criar `src/components/ui/AnimatedSection.tsx`**

Porta direta de `src/components/AnimatedSection.jsx`, com `'use client'` (usa `useRef` e `useInView`) e tipos.

```tsx
'use client'

import { useRef, type ReactNode } from 'react'
import { useInView } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  id?: string
}

export function AnimatedSection({ children, className = '', id }: Props) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  return (
    <section ref={ref} className={className} id={id}>
      <span
        style={{
          transform: isInView ? 'none' : 'translateY(24px)',
          opacity: isInView ? 1 : 0,
          transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.15s',
          display: 'block',
        }}
      >
        {children}
      </span>
    </section>
  )
}
```

**Atenção de SEO:** a animação começa com `opacity: 0`, mas o texto **está** no HTML. Crawlers leem o markup, não o estilo computado — isso é seguro. Não trocar por renderização condicional, que removeria o texto do HTML.

- [ ] **Step 3: Converter `src/data/experience.js` para TypeScript**

```bash
git mv src/data/experience.js src/data/experience.ts
```

Adicionar o tipo no topo do arquivo e anotar o array. O conteúdo do array não muda.

```ts
export type Experience = {
  title: string
  company: string
  location: string
  period: string
  responsibilities: string[]
  tech: string[]
}

export const experiences: Experience[] = [
  // ...conteúdo existente, sem alteração
]
```

- [ ] **Step 4: Criar `src/components/layout/Header.tsx`**

Porta de `src/components/Header.jsx`. Mudanças: `'use client'` (usa `useState`/`useEffect`), textos do dicionário, links com prefixo de locale, troca de idioma e link para a página de serviços — este link interno é o que passa autoridade para a página-alvo.

```tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'

type Props = {
  locale: Locale
  dict: Dictionary
  alternatePath: string
}

export function Header({ locale, dict, alternatePath }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 0)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const base = locale === 'pt' ? '/pt' : ''
  const servicesPath = locale === 'pt' ? '/pt/servicos' : '/services'

  const links = [
    { href: `${base}/#about`, label: dict.nav.about },
    { href: `${base}/#skills`, label: dict.nav.skills },
    { href: `${base}/#experience`, label: dict.nav.experience },
    { href: servicesPath, label: dict.nav.services },
  ]

  return (
    <header className={`fixed top-0 left-0 w-full z-50 bg-white ${hasScrolled ? 'shadow-sm' : ''}`}>
      <div className="page-container pt-5">
        <nav aria-label={dict.nav.services}>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
            <Link
              className="text-[15px] font-medium italic sm:text-base md:text-[24px] lg:font-bold"
              href={base || '/'}
            >
              &lt;Filipe
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Lab/&gt;
              </span>
            </Link>

            <button
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-label="Menu"
              className="size-6 cursor-pointer md:size-8 lg:hidden"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
              </svg>
            </button>

            <div className="hidden gap-6 font-medium lg:flex xl:gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  className="my-5 transition-opacity duration-75 hover:opacity-50"
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
              <a
                className="my-5 transition-opacity duration-75 hover:opacity-50"
                href="/filipe-cavalcante-en.pdf"
                download="Filipe_Cavalcante_CV.pdf"
              >
                {dict.nav.downloadCv}
              </a>
              <Link
                href={alternatePath}
                hrefLang={locale === 'en' ? 'pt-BR' : 'en'}
                className="my-5 transition-opacity duration-75 hover:opacity-50"
              >
                {dict.common.switchLanguage}
              </Link>
            </div>
          </div>

          <div
            className={`absolute left-0 top-14 w-full bg-white shadow-lg transition-all duration-300 lg:hidden ${
              isMobileMenuOpen ? 'opacity-100 z-10 p-5' : 'opacity-0 -z-10 p-0 overflow-hidden'
            }`}
            style={{ height: isMobileMenuOpen ? 'auto' : '0px' }}
          >
            <div className="page-container flex flex-col font-medium">
              {links.map((link) => (
                <Link
                  key={link.href}
                  className="my-5 transition-opacity duration-75 hover:opacity-50"
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                className="my-5 transition-opacity duration-75 hover:opacity-50"
                href="/filipe-cavalcante-en.pdf"
                download="Filipe_Cavalcante_CV.pdf"
              >
                {dict.nav.downloadCv}
              </a>
              <Link
                href={alternatePath}
                hrefLang={locale === 'en' ? 'pt-BR' : 'en'}
                className="my-5 transition-opacity duration-75 hover:opacity-50"
              >
                {dict.common.switchLanguage}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
```

Nota: o link `/lab` foi removido da navegação porque a rota não é portada neste plano (ver Pendências, item 1). Reintroduzir junto com a rota.

- [ ] **Step 5: Criar `src/components/layout/Footer.tsx`**

Porta de `src/components/Footer.jsx`, como server component (não usa estado). Adiciona WhatsApp e corrige `rel="noreferrer"` para `rel="noopener noreferrer"`.

```tsx
import { FaEnvelope, FaGlobe, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { site } from '@/seo/site'

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="page-container py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-center">
          <p className="text-sm text-black/80 w-full sm:w-auto">
            © {new Date().getFullYear()} {site.authorName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-black/80 mx-auto sm:mx-0">
            <a href={`mailto:${site.email}`} aria-label="Email" className="hover:text-black">
              <FaEnvelope />
            </a>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-black"
            >
              <FaWhatsapp />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-black"
            >
              <FaLinkedin />
            </a>
            <a href={site.url} aria-label="Website" className="hover:text-black">
              <FaGlobe />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 6: Reescrever `app/[lang]/page.tsx` com o conteúdo do portfólio**

Porta de `src/pages/Index.jsx`. O parágrafo "About me" e a lista de skills devem ser copiados do arquivo original (linhas 100–103 e 129–164), tipando `skill: string`. O texto de seção vem do dicionário.

```tsx
import Image from 'next/image'
import { FaEnvelope, FaFilePdf, FaLinkedin } from 'react-icons/fa'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { buildMetadata } from '@/seo/metadata'
import { site } from '@/seo/site'
import { getDictionary } from '@/i18n/get-dictionary'
import { experiences } from '@/data/experience'
import type { Locale } from '@/i18n/config'
import filipe from '@/assets/filipe.webp'

const paths = { en: '/', pt: '/pt' } as const

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const isPt = lang === 'pt'
  return buildMetadata({
    locale: lang,
    title: isPt
      ? 'Filipe Cavalcante — Desenvolvedor Web e Criação de Sites'
      : 'Filipe Cavalcante — Software Engineer Portfolio',
    description: isPt
      ? 'Desenvolvedor web com mais de 6 anos de experiência em criação de sites, sistemas sob medida e integrações. Atendimento remoto para todo o Brasil.'
      : 'Software engineer with 6+ years building reliable web products with Node.js, TypeScript, Laravel and React. Available for remote work worldwide.',
    pathByLocale: paths,
  })
}

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = getDictionary(lang)
  const alternatePath = lang === 'en' ? paths.pt : paths.en
  const servicesPath = lang === 'pt' ? '/pt/servicos' : '/services'

  return (
    <>
      <Header locale={lang} dict={dict} alternatePath={alternatePath} />
      <div className="with-header-offset bg-white text-black">
        <AnimatedSection className="page-container grid min-h-[calc(100dvh-var(--header-height))] w-full place-content-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-12">
            <div className="order-2 lg:order-1 justify-self-center lg:justify-self-start max-w-2xl text-center lg:text-left">
              <h1 className="mb-2 lg:text-6xl !leading-tight text-4xl">{site.authorName}</h1>
              <p className="mb-3 text-xl lg:text-2xl text-gray-700">{dict.home.role}</p>
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

      <AnimatedSection id="about" className="bg-gradient-to-r from-indigo-500 to-purple-500">
        <div className="page-container py-16 min-h-screen flex flex-col justify-center items-center text-center text-white">
          <h2 className="text-4xl font-semibold mb-4">{dict.home.aboutTitle}</h2>
          {/* Copiar o parágrafo "About me" de src/pages/Index.jsx:100-103 */}
        </div>
      </AnimatedSection>

      <AnimatedSection id="skills" className="bg-gradient-to-r from-emerald-500 to-teal-500">
        <div className="page-container py-16 min-h-screen flex flex-col justify-center items-center text-white">
          <h2 className="text-4xl font-semibold mb-6">{dict.home.skillsTitle}</h2>
          {/* Copiar a lista de skills de src/pages/Index.jsx:129-164 */}
        </div>
      </AnimatedSection>

      <AnimatedSection id="experience" className="bg-gradient-to-r from-fuchsia-500 to-rose-500">
        <div className="page-container py-16 min-h-screen flex flex-col justify-center items-center text-white">
          <h2 className="text-4xl font-semibold mb-6">{dict.home.experienceTitle}</h2>
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
  )
}
```

**Correção de hierarquia:** o original usava `<h2>` para o cargo e `<h3>` para títulos de seção, sem nenhum `<h2>` de seção. Aqui o cargo virou `<p>` e as seções são `<h2>` — um `<h1>`, seções em `<h2>`, itens em `<h3>`.

- [ ] **Step 7: Verificar o build e o conteúdo renderizado**

Run: `npm run build && npm start`

```bash
curl -s http://localhost:3000/pt | grep -c "Desenvolvedor Web"
curl -s http://localhost:3000/ | grep -c "Software Engineer"
```

Expected: ambos ≥ `1`

- [ ] **Step 8: Commit**

```bash
git add src/components/ src/data/experience.ts app/ package.json package-lock.json
git commit -m "feat: porta componentes e página de portfólio para o App Router"
```

---

### Task 6: Dados de serviços e a página que ranqueia

**Files:**
- Create: `src/data/services.ts`, `src/data/services.test.ts`, `src/components/services/WhatsAppCta.tsx`, `src/components/services/ServiceCard.tsx`, `app/[lang]/servicos/page.tsx`, `app/[lang]/services/page.tsx`

**Interfaces:**
- Consumes: Tasks 2, 3, 5
- Produces:
  - `services: Service[]` — 5 serviços com `slug`, `title`, `body`, `proof` por locale
  - `<WhatsAppCta locale>`, `<ServiceCard service locale>`

**Esta é a tarefa central do objetivo do usuário.** A página `/pt/servicos` é a que responde às buscas comerciais.

- [ ] **Step 1: Escrever o teste que falha**

Criar `src/data/services.test.ts`. O teste trava a regra de "nada inventado".

```ts
import { describe, expect, it } from 'vitest'
import { services } from './services'
import { experiences } from './experience'

describe('services data', () => {
  it('tem exatamente os 5 serviços acordados', () => {
    expect(services).toHaveLength(5)
    expect(services.map((s) => s.slug)).toEqual([
      'sites-institucionais',
      'sistemas-web',
      'landing-pages-seo',
      'automacao-ia',
      'integracoes',
    ])
  })

  it('todo serviço tem conteúdo nos dois idiomas', () => {
    for (const service of services) {
      for (const locale of ['en', 'pt'] as const) {
        expect(service.title[locale].length).toBeGreaterThan(0)
        expect(service.body[locale].length).toBeGreaterThan(0)
        expect(service.proof[locale].length).toBeGreaterThan(0)
      }
    }
  })

  it('cada prova cita apenas números que existem no histórico real', () => {
    const cv = JSON.stringify(experiences)
    const numbersIn = (text: string) => text.match(/\d[\d.,]*/g) ?? []

    for (const service of services) {
      for (const n of numbersIn(service.proof.pt)) {
        // Normaliza separadores para comparar com o CV (4.854 vs 4,854)
        const variants = [n, n.replace(/\./g, ','), n.replace(/,/g, '.')]
        expect(
          variants.some((v) => cv.includes(v)),
          `número "${n}" em "${service.slug}" não existe em experience.ts`,
        ).toBe(true)
      }
    }
  })
})
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test -- src/data/services.test.ts`
Expected: FAIL — não consegue resolver `./services`

- [ ] **Step 3: Criar `src/data/services.ts`**

Cada `proof` cita apenas números presentes em `experience.ts`.

```ts
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
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npm test -- src/data/services.test.ts`
Expected: PASS (3 testes)

- [ ] **Step 5: Criar `src/components/services/WhatsAppCta.tsx`**

```tsx
import { FaWhatsapp } from 'react-icons/fa'
import { site } from '@/seo/site'
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'

export function WhatsAppCta({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  return (
    <a
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-md bg-black px-6 py-3 text-white hover:bg-black/80"
    >
      <FaWhatsapp aria-hidden="true" /> {dict.common.whatsappCta}
    </a>
  )
}
```

- [ ] **Step 6: Criar `src/components/services/ServiceCard.tsx`**

```tsx
import type { Service } from '@/data/services'
import type { Locale } from '@/i18n/config'

export function ServiceCard({ service, locale }: { service: Service; locale: Locale }) {
  return (
    <article id={service.slug} className="rounded-lg border border-black/15 p-6">
      <h3 className="text-xl font-semibold">{service.title[locale]}</h3>
      <p className="mt-3 text-black/80">{service.body[locale]}</p>
      <p className="mt-3 text-sm text-black/60">{service.proof[locale]}</p>
    </article>
  )
}
```

- [ ] **Step 7: Criar `app/[lang]/servicos/page.tsx` (PT)**

```tsx
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ServiceCard } from '@/components/services/ServiceCard'
import { WhatsAppCta } from '@/components/services/WhatsAppCta'
import { buildMetadata } from '@/seo/metadata'
import { getDictionary } from '@/i18n/get-dictionary'
import { services } from '@/data/services'
import type { Locale } from '@/i18n/config'

const paths = { en: '/services', pt: '/pt/servicos' } as const

export async function generateMetadata() {
  return buildMetadata({
    locale: 'pt',
    // 56 caracteres
    title: 'Desenvolvedor Web e Criação de Sites | Filipe Cavalcante',
    // 146 caracteres
    description:
      'Criação de sites, sistemas web sob medida, integrações e automação com IA. Mais de 6 anos de experiência. Atendimento remoto para todo o Brasil.',
    pathByLocale: paths,
  })
}

export default async function ServicosPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  // Esta rota existe apenas em português
  if (lang !== 'pt') notFound()

  const dict = getDictionary('pt')

  return (
    <>
      <Header locale="pt" dict={dict} alternatePath={paths.en} />
      <main className="bg-white text-black with-header-offset">
        <div className="page-container py-16">
          <h1 className="text-4xl lg:text-5xl !leading-tight max-w-4xl">
            {dict.services.heading}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-black/80">{dict.services.intro}</p>
          <div className="mt-8">
            <WhatsAppCta locale="pt" />
          </div>

          <h2 className="mt-16 text-3xl font-semibold">{dict.services.whatIDo}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} locale="pt" />
            ))}
          </div>

          <section className="mt-16 rounded-lg bg-black/5 p-8">
            <h2 className="text-3xl font-semibold">{dict.services.contactHeading}</h2>
            <p className="mt-3 max-w-2xl text-black/80">{dict.services.contactBody}</p>
            <div className="mt-6">
              <WhatsAppCta locale="pt" />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 8: Criar `app/[lang]/services/page.tsx` (EN)**

Mesma estrutura, em inglês.

```tsx
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ServiceCard } from '@/components/services/ServiceCard'
import { WhatsAppCta } from '@/components/services/WhatsAppCta'
import { buildMetadata } from '@/seo/metadata'
import { getDictionary } from '@/i18n/get-dictionary'
import { services } from '@/data/services'
import type { Locale } from '@/i18n/config'

const paths = { en: '/services', pt: '/pt/servicos' } as const

export async function generateMetadata() {
  return buildMetadata({
    locale: 'en',
    // 51 caracteres
    title: 'Web Developer for Custom Sites and Systems | Filipe',
    // 142 caracteres
    description:
      'Custom websites, web systems, third-party integrations and AI automation. 6+ years of experience. Remote work for clients in Brazil and abroad.',
    pathByLocale: paths,
  })
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  // Esta rota existe apenas em inglês
  if (lang !== 'en') notFound()

  const dict = getDictionary('en')

  return (
    <>
      <Header locale="en" dict={dict} alternatePath={paths.pt} />
      <main className="bg-white text-black with-header-offset">
        <div className="page-container py-16">
          <h1 className="text-4xl lg:text-5xl !leading-tight max-w-4xl">
            {dict.services.heading}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-black/80">{dict.services.intro}</p>
          <div className="mt-8">
            <WhatsAppCta locale="en" />
          </div>

          <h2 className="mt-16 text-3xl font-semibold">{dict.services.whatIDo}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} locale="en" />
            ))}
          </div>

          <section className="mt-16 rounded-lg bg-black/5 p-8">
            <h2 className="text-3xl font-semibold">{dict.services.contactHeading}</h2>
            <p className="mt-3 max-w-2xl text-black/80">{dict.services.contactBody}</p>
            <div className="mt-6">
              <WhatsAppCta locale="en" />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 9: Verificar que o HTML renderizado contém o conteúdo comercial**

Run: `npm run build && npm start`

```bash
curl -s http://localhost:3000/pt/servicos | grep -c "Criação de Sites"
curl -s http://localhost:3000/pt/servicos | grep -c "wa.me/5511985346164"
curl -s -o /dev/null -w "servicos-em-en:%{http_code}\n" http://localhost:3000/servicos
```

Expected: primeiros dois ≥ `1`; `servicos-em-en:404` (rota PT não existe em inglês)

- [ ] **Step 10: Commit**

```bash
git add src/data/services.ts src/data/services.test.ts src/components/services/ app/
git commit -m "feat: adiciona página de serviços em pt e en com CTA de WhatsApp"
```

---

### Task 7: JSON-LD

**Files:**
- Create: `src/seo/json-ld.ts`, `src/seo/json-ld.test.ts`, `src/components/seo/JsonLd.tsx`
- Modify: `app/[lang]/layout.tsx`, `app/[lang]/servicos/page.tsx`, `app/[lang]/services/page.tsx`

**Interfaces:**
- Consumes: Tasks 3, 6
- Produces:
  - `buildPersonJsonLd(): object`
  - `buildProfessionalServiceJsonLd(locale: Locale): object`
  - `<JsonLd data={object} />`

- [ ] **Step 1: Escrever o teste que falha**

Criar `src/seo/json-ld.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { buildPersonJsonLd, buildProfessionalServiceJsonLd } from './json-ld'

describe('buildPersonJsonLd', () => {
  it('descreve a pessoa com url e perfis', () => {
    const data = buildPersonJsonLd() as Record<string, unknown>
    expect(data['@type']).toBe('Person')
    expect(data.name).toBe('Filipe Alves Cavalcante')
    expect(data.url).toBe('https://filipelab.com')
    expect(data.sameAs).toContain('https://www.linkedin.com/in/cavalcante-filipe/')
  })
})

describe('buildProfessionalServiceJsonLd', () => {
  it('lista os 5 serviços no catálogo', () => {
    const data = buildProfessionalServiceJsonLd('pt') as {
      '@type': string
      hasOfferCatalog: { itemListElement: unknown[] }
    }
    expect(data['@type']).toBe('ProfessionalService')
    expect(data.hasOfferCatalog.itemListElement).toHaveLength(5)
  })

  it('nunca usa LocalBusiness, porque o atendimento é remoto', () => {
    const json = JSON.stringify(buildProfessionalServiceJsonLd('pt'))
    expect(json).not.toContain('LocalBusiness')
    expect(json).not.toContain('PostalAddress')
  })

  it('declara área de atendimento como Brasil', () => {
    const data = buildProfessionalServiceJsonLd('pt') as { areaServed: { name: string } }
    expect(data.areaServed.name).toBe('Brasil')
  })
})
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test -- src/seo/json-ld.test.ts`
Expected: FAIL — não consegue resolver `./json-ld`

- [ ] **Step 3: Criar `src/seo/json-ld.ts`**

```ts
import type { Locale } from '@/i18n/config'
import { services } from '@/data/services'
import { site } from './site'

export function buildPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.authorName,
    url: site.url,
    jobTitle: 'Software Engineer',
    email: `mailto:${site.email}`,
    sameAs: [site.linkedin],
  }
}

export function buildProfessionalServiceJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.authorName,
    url: `${site.url}${locale === 'pt' ? '/pt/servicos' : '/services'}`,
    telephone: `+${site.whatsapp}`,
    email: `mailto:${site.email}`,
    // Atendimento remoto: área de serviço, sem endereço físico
    areaServed: { '@type': 'Country', name: 'Brasil' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'pt' ? 'Serviços de desenvolvimento web' : 'Web development services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title[locale],
          description: service.body[locale],
        },
      })),
    },
  }
}
```

- [ ] **Step 4: Criar `src/components/seo/JsonLd.tsx`**

O `replace` escapa `<` para a sequência Unicode, impedindo que um `</script>` nos dados feche a tag e injete markup.

```tsx
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\u003c'),
      }}
    />
  )
}
```

**Atenção:** o segundo argumento do `replace` é a sequência de escape `'\u003c'`, que produz o caractere `<` na saída JSON. Se o editor transformar isso num `<` literal, o `replace` vira no-op e a proteção some — conferir o arquivo depois de salvar.

- [ ] **Step 5: Adicionar o `Person` ao layout de locale**

Em `app/[lang]/layout.tsx`, adicionar os imports e inserir dentro do `<body>`, antes de `{children}`:

```tsx
import { JsonLd } from '@/components/seo/JsonLd'
import { buildPersonJsonLd } from '@/seo/json-ld'

// dentro do <body>:
<JsonLd data={buildPersonJsonLd()} />
```

- [ ] **Step 6: Adicionar o `ProfessionalService` às páginas de serviços**

Em `app/[lang]/servicos/page.tsx`, logo após a abertura do fragmento `<>`:

```tsx
<JsonLd data={buildProfessionalServiceJsonLd('pt')} />
```

Em `app/[lang]/services/page.tsx`, o mesmo com `'en'`.

- [ ] **Step 7: Rodar os testes e confirmar que passam**

Run: `npm test -- src/seo/json-ld.test.ts`
Expected: PASS (4 testes)

- [ ] **Step 8: Verificar que os dois blocos aparecem no HTML**

Run: `npm run build && npm start`

```bash
curl -s http://localhost:3000/pt/servicos | grep -c 'application/ld+json'
```

Expected: `2` (Person + ProfessionalService)

- [ ] **Step 9: Commit**

```bash
git add src/seo/json-ld.ts src/seo/json-ld.test.ts src/components/seo/ app/
git commit -m "feat: adiciona structured data Person e ProfessionalService"
```

---

### Task 8: Sitemap, robots e 404

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`
- Delete: `public/sitemap.xml`, `public/robots.txt`

**Interfaces:**
- Consumes: Task 3 (`site`)
- Produces: `/sitemap.xml` e `/robots.txt` gerados; 404 com status HTTP correto

- [ ] **Step 1: Criar `app/sitemap.ts`**

Corrige os dois defeitos do sitemap atual: listava `/404` e omitia páginas reais. Lista apenas rotas que existem após esta migração.

```ts
import type { MetadataRoute } from 'next'
import { site } from '@/seo/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { en: '/', pt: '/pt', priority: 1.0 },
    { en: '/services', pt: '/pt/servicos', priority: 0.9 },
  ]

  return pages.flatMap(({ en, pt, priority }) =>
    [en, pt].map((path) => ({
      url: `${site.url}${path}`,
      changeFrequency: 'weekly' as const,
      priority,
      alternates: {
        languages: {
          en: `${site.url}${en}`,
          'pt-BR': `${site.url}${pt}`,
        },
      },
    })),
  )
}
```

Nota: as rotas do Lab (`/lab`, `/random-quote`, `/pokemon-battle`) ficam fora até serem portadas. Sitemap não deve listar URL que retorna 404 — ver Pendências, item 1.

- [ ] **Step 2: Criar `app/robots.ts`**

```ts
import type { MetadataRoute } from 'next'
import { site } from '@/seo/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
```

- [ ] **Step 3: Adicionar a verificação do Google Search Console**

Token fornecido pelo usuário: `MBeTK8nVT5YUAK-uM6Ht57jF6yNDYjLNuyy6VkMN_44`

Sem isso, não é possível enviar o sitemap nem pedir indexação. Instalar por dois caminhos, porque o método exato selecionado no Search Console não foi confirmado e uma verificação falha bloqueia todo o resto.

**3a — Meta tag (funciona para o método "Tag HTML"):**

Em `app/layout.tsx`, adicionar ao objeto `metadata`:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  verification: {
    google: 'MBeTK8nVT5YUAK-uM6Ht57jF6yNDYjLNuyy6VkMN_44',
  },
}
```

Renderiza `<meta name="google-site-verification" content="..." />` no `<head>`.

**3b — Arquivo estático (funciona para o método "Arquivo HTML"):**

Criar `public/googleMBeTK8nVT5YUAK-uM6Ht57jF6yNDYjLNuyy6VkMN_44.html` com exatamente esta linha e nada mais:

```
google-site-verification: MBeTK8nVT5YUAK-uM6Ht57jF6yNDYjLNuyy6VkMN_44
```

**Atenção ao nome do arquivo:** o Google verifica um nome exato, que aparece no botão de download do Search Console. O nome acima é o padrão (`google` + token + `.html`). Se a verificação falhar, conferir o nome real no Search Console e renomear — o conteúdo permanece o mesmo.

**Atenção ao separador:** dentro do arquivo o Google usa `:` (dois-pontos), enquanto o valor colado pelo usuário usava `=`. Se a verificação por arquivo falhar, tentar com `=`.

- [ ] **Step 4: Criar `app/not-found.tsx`**

Next.js retorna status 404 automaticamente para este arquivo — corrige o soft 404 atual. Como o `<html>` normalmente vem de `app/[lang]/layout.tsx`, e o 404 global fica fora desse segmento, ele precisa declarar o próprio.

```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="page-container py-24 text-center">
          <h1 className="text-4xl font-semibold">404</h1>
          <p className="mt-4 text-black/80">
            This page does not exist. / Esta página não existe.
          </p>
          <Link href="/" className="mt-6 inline-block underline">
            Back to home / Voltar ao início
          </Link>
        </main>
      </body>
    </html>
  )
}
```

- [ ] **Step 5: Remover os arquivos estáticos antigos**

Se ficarem em `public/`, sobrescrevem as rotas geradas.

```bash
git rm public/sitemap.xml public/robots.txt
```

- [ ] **Step 6: Verificar**

Run: `npm run build && npm start`

```bash
curl -s http://localhost:3000/sitemap.xml | grep -c "pt/servicos"
curl -s http://localhost:3000/sitemap.xml | grep -c "/404"
curl -s -o /dev/null -w "404-status:%{http_code}\n" http://localhost:3000/pagina-que-nao-existe-123
curl -s http://localhost:3000/robots.txt
curl -s http://localhost:3000/ | grep -c "google-site-verification"
curl -s -o /dev/null -w "arquivo-verificacao:%{http_code}\n" \
  http://localhost:3000/googleMBeTK8nVT5YUAK-uM6Ht57jF6yNDYjLNuyy6VkMN_44.html
```

Expected: `1`, `0`, `404-status:404`, robots citando o sitemap, `1` para a meta tag e `arquivo-verificacao:200`

- [ ] **Step 7: Commit**

```bash
git add app/sitemap.ts app/robots.ts app/not-found.tsx app/layout.tsx public/google*.html
git commit -m "feat: gera sitemap e robots, corrige soft 404 e adiciona verificação do Search Console"
```

---

### Task 9: Deploy Amplify, redirect www e CSP

**Files:**
- Create: `amplify.yml`
- Modify: `next.config.ts`
- Delete: `customHttp.yml`

**Interfaces:**
- Consumes: Tasks 1–8
- Produces: build da Amplify configurado; headers de segurança; `www` redirecionando

- [ ] **Step 1: Criar `amplify.yml`**

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

- [ ] **Step 2: Migrar os headers do `customHttp.yml` para `next.config.ts`**

O CSP existente é preservado. `'unsafe-inline'` em `script-src` continua necessário para a hidratação do Next.js. `connect-src` mantém o backend Railway usado por `src/api/`.

Adicionar ao `nextConfig`:

```ts
  async headers() {
    const csp = [
      "default-src 'self'",
      "connect-src 'self' https://myfranksteinbackend-production.up.railway.app",
      "img-src 'self' data: blob: https://raw.githubusercontent.com",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
      "font-src 'self' data:",
      "object-src 'self'",
      "frame-src 'self' blob:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
    ].join('; ')

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
      {
        source: '/filipe-cavalcante-en.pdf',
        headers: [
          { key: 'Content-Type', value: 'application/pdf' },
          { key: 'Content-Disposition', value: 'attachment' },
        ],
      },
    ]
  },
```

- [ ] **Step 3: Adicionar o redirect de `www` em `next.config.ts`**

No `redirects()` criado na Task 4, inserir como **primeiro** item do array (precisa vir antes das regras de locale):

```ts
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.filipelab.com' }],
        destination: 'https://filipelab.com/:path*',
        permanent: true,
      },
```

- [ ] **Step 4: Remover o `customHttp.yml`**

```bash
git rm customHttp.yml
```

- [ ] **Step 5: Verificar os headers**

Run: `npm run build && npm start`

```bash
curl -sI http://localhost:3000/ | grep -i "content-security-policy"
curl -sI http://localhost:3000/ | grep -i "x-content-type-options"
```

Expected: ambos presentes

- [ ] **Step 6: Verificar que o site funciona sob o CSP**

Abrir `http://localhost:3000/pt/servicos` no navegador, abrir o console e confirmar: **zero erros de CSP**. Um CSP quebrado derruba a página inteira em produção — esta verificação manual é obrigatória.

- [ ] **Step 7: Commit**

```bash
git add amplify.yml next.config.ts
git commit -m "chore: configura build Amplify, headers de segurança e redirect www"
```

---

### Task 10: Suíte de verificação SEO

**Files:**
- Create: `playwright.config.ts`, `e2e/seo.spec.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: Tasks 1–9
- Produces: `npm run test:seo` verificando as garantias de SEO contra o build de produção

Esta suíte é a rede de segurança do problema original: falha se o HTML voltar a ser servido vazio.

- [ ] **Step 1: Instalar o Playwright**

```bash
npm install -D @playwright/test@1.62.1
npx playwright install chromium
```

- [ ] **Step 2: Criar `playwright.config.ts`**

```ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://localhost:3000' },
  webServer: {
    command: 'npm run build && npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
```

- [ ] **Step 3: Adicionar o script em `package.json`**

Dentro de `"scripts"`:

```json
    "test:seo": "playwright test",
```

- [ ] **Step 4: Escrever `e2e/seo.spec.ts`**

Usa `request` (HTTP puro, sem executar JavaScript) — é exatamente o que o crawler vê.

```ts
import { expect, test } from '@playwright/test'

test.describe('HTML servido ao crawler', () => {
  test('a home em pt tem conteúdo sem executar JavaScript', async ({ request }) => {
    const res = await request.get('/pt')
    expect(res.status()).toBe(200)
    const html = await res.text()
    // A regressão original: body vazio com apenas <div id="root">
    expect(html).toContain('Desenvolvedor Web')
    expect(html.length).toBeGreaterThan(5000)
  })

  test('a página de serviços tem h1, serviços e CTA', async ({ request }) => {
    const html = await (await request.get('/pt/servicos')).text()
    expect(html).toContain('Criação de Sites')
    expect(html).toContain('Sistemas web e APIs sob medida')
    expect(html).toContain('wa.me/5511985346164')
  })

  test('a home em inglês tem conteúdo', async ({ request }) => {
    const html = await (await request.get('/')).text()
    expect(html).toContain('Software Engineer')
  })
})

test.describe('sinais de SEO', () => {
  test('a página de serviços tem canonical e hreflang recíprocos', async ({ page }) => {
    await page.goto('/pt/servicos')

    const canonical = await page.locator('link[rel=canonical]').getAttribute('href')
    expect(canonical).toBe('https://filipelab.com/pt/servicos')

    const pt = await page.locator('link[hreflang="pt-BR"]').getAttribute('href')
    const en = await page.locator('link[hreflang="en"]').getAttribute('href')
    const xDefault = await page.locator('link[hreflang="x-default"]').getAttribute('href')
    expect(pt).toBe('https://filipelab.com/pt/servicos')
    expect(en).toBe('https://filipelab.com/services')
    expect(xDefault).toBe('https://filipelab.com/services')
  })

  test('title e description respeitam os limites de tamanho', async ({ page }) => {
    for (const path of ['/', '/pt', '/services', '/pt/servicos']) {
      await page.goto(path)
      const title = await page.title()
      expect(title.length, `title de ${path}`).toBeGreaterThanOrEqual(30)
      expect(title.length, `title de ${path}`).toBeLessThanOrEqual(65)

      const desc = await page.locator('meta[name=description]').getAttribute('content')
      expect(desc, `description de ${path}`).not.toBeNull()
      expect(desc!.length, `description de ${path}`).toBeGreaterThanOrEqual(110)
      expect(desc!.length, `description de ${path}`).toBeLessThanOrEqual(165)
    }
  })

  test('existe exatamente um h1 por página', async ({ page }) => {
    for (const path of ['/', '/pt', '/pt/servicos']) {
      await page.goto(path)
      await expect(page.locator('h1'), `h1 de ${path}`).toHaveCount(1)
    }
  })

  test('o JSON-LD é válido e não declara LocalBusiness', async ({ page }) => {
    await page.goto('/pt/servicos')
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents()
    expect(blocks.length).toBeGreaterThanOrEqual(2)

    const types = blocks.map((b) => JSON.parse(b)['@type'])
    expect(types).toContain('Person')
    expect(types).toContain('ProfessionalService')
    expect(types).not.toContain('LocalBusiness')
  })

  test('a página de serviços é alcançável a partir da home', async ({ page }) => {
    await page.goto('/pt')
    await expect(page.locator('a[href="/pt/servicos"]').first()).toBeAttached()
  })
})

test.describe('crawlabilidade', () => {
  test('URL inexistente retorna 404, não 200', async ({ request }) => {
    const res = await request.get('/pagina-que-nao-existe-123', { maxRedirects: 0 })
    expect(res.status()).toBe(404)
  })

  test('/en redireciona para a raiz', async ({ request }) => {
    const res = await request.get('/en', { maxRedirects: 0 })
    expect([301, 308]).toContain(res.status())
  })

  test('o sitemap lista as duas línguas e omite /404', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()
    expect(xml).toContain('https://filipelab.com/pt/servicos')
    expect(xml).toContain('https://filipelab.com/services')
    expect(xml).not.toContain('/404')
  })

  test('o robots.txt aponta para o sitemap', async ({ request }) => {
    const txt = await (await request.get('/robots.txt')).text()
    expect(txt).toContain('Sitemap: https://filipelab.com/sitemap.xml')
  })
})
```

- [ ] **Step 5: Rodar a suíte**

Run: `npm run test:seo`
Expected: todos os testes passam

- [ ] **Step 6: Commit**

```bash
git add playwright.config.ts e2e/ package.json package-lock.json
git commit -m "test: adiciona suíte de verificação de SEO com Playwright"
```

---

### Task 11: Remover o código Vite antigo

**Files:**
- Delete: `src/main.jsx`, `src/pages/Index.jsx`, `src/components/Header.jsx`, `src/components/Footer.jsx`, `src/components/AnimatedSection.jsx`, `src/index.css`, `index.html`, `vite.config.js`, `dist/`
- Modify: `.gitignore`, `README.md`

**Interfaces:**
- Consumes: Tasks 1–10 (tudo portado e verificado)
- Produces: repositório sem código morto

Última tarefa de propósito: os arquivos antigos servem de referência durante a portabilidade (Task 5 copia trechos deles).

- [ ] **Step 1: Confirmar que nada ainda importa os arquivos antigos**

Run:
```bash
grep -rn "Index.jsx\|main.jsx\|index.css" app/ src/ --include=*.ts --include=*.tsx
```
Expected: sem resultados

- [ ] **Step 2: Remover os arquivos do Vite**

As páginas `Lab.jsx`, `RandomQuote.jsx`, `PokemonBattle.jsx`, `NotFound.jsx` e `BattleArena.jsx` **não** entram aqui — suas rotas ainda não foram portadas (ver Pendências, item 1).

```bash
git rm index.html vite.config.js src/main.jsx src/index.css \
  src/pages/Index.jsx src/components/Header.jsx \
  src/components/Footer.jsx src/components/AnimatedSection.jsx
```

- [ ] **Step 3: Reverter os dois desvios da Task 1 (obrigatório, falha em silêncio)**

A Task 1 precisou de dois ajustes para conviver com o Vite. Com o Vite removido,
ambos devem sair. Nenhum dos dois gera erro se for esquecido — por isso são
passos obrigatórios, não faxina opcional.

**3a — Remover `pageExtensions` do `next.config.ts`:**

Existia só para impedir que `src/pages/*.jsx` virasse rota. Sem os `.jsx`, ele
apenas restringe o projeto sem motivo (bloquearia `.md`/`.mdx` no futuro).
Apagar a linha `pageExtensions: ['ts', 'tsx'],` e o comentário acima dela.

**3b — Decidir sobre `src/app/`:**

A Task 1 colocou o App Router em `src/app/` porque `app/` na raiz conflitava com
`src/pages/`. Com `src/pages/` removido, `src/app/` continua sendo um layout
oficialmente suportado pelo Next.js. **Manter como está** é válido e evita um
diff grande de movimentação. Não mover sem motivo.

- [ ] **Step 4: Desinstalar as dependências do Vite**

`@vitejs/plugin-react` **permanece**, porque `vitest.config.ts` depende dele.

```bash
npm uninstall vite @tailwindcss/vite react-router react-router-dom
```

- [ ] **Step 5: Atualizar o `.gitignore`**

Substituir a entrada `dist` por:

```
.next/
out/
```

- [ ] **Step 6: Remover o `dist/` versionado**

```bash
git rm -r --cached dist 2>/dev/null || true
rm -rf dist
```

- [ ] **Step 7: Atualizar o `README.md`**

Substituir as instruções do Vite pelas do Next.js: `npm run dev`, `npm run build`, `npm start`, `npm test`, `npm run test:seo`. Documentar a estrutura de URL: `/` serve inglês, `/pt` serve português.

- [ ] **Step 8: Verificar que tudo ainda passa**

Run: `npm run build && npm test && npm run test:seo`
Expected: build OK, todos os testes passam

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: remove código Vite após migração para Next.js"
```

---

## Pendências para o usuário

Itens que exigem decisão ou acesso que só o usuário tem.

1. **Rotas do Lab não portadas.** `/lab`, `/random-quote` e `/pokemon-battle` seguem em JSX do react-router e não foram migradas neste plano — elas não afetam o objetivo de SEO. Consequência: essas URLs **deixam de existir** após o deploy. Como hoje `/lab` está no sitemap e é linkada no menu, decidir antes de publicar: portar as rotas, ou aceitar a remoção. O plano já as removeu do sitemap (Task 8) e do menu (Task 5) para não apontar para 404.

2. **Google Search Console.** A Task 8 já instala o token de verificação (`MBeTK8nV…`) por meta tag e por arquivo estático. O que resta, e só você pode fazer, é **depois do deploy**: clicar em "Verificar" no Search Console, enviar `https://filipelab.com/sitemap.xml` e pedir indexação de `/pt/servicos`. A verificação só funciona contra o site publicado — rodando local ela falha, porque o Google precisa alcançar `filipelab.com`.

   Se a verificação por arquivo falhar, conferir no Search Console o nome exato do arquivo a baixar e renomear `public/google*.html` para bater. O meta tag serve de segundo caminho independente.

3. **Domínio na Amplify.** Apontar `filipelab.com` para a app da Amplify e configurar `www`. O redirect no `next.config.ts` cobre o nível de aplicação, mas o registro DNS de `www` precisa existir para que a requisição chegue.

4. **Imagem de Open Graph.** Não existe imagem de compartilhamento. Vale criar uma (1200×630) em `public/og.png` e adicioná-la em `buildMetadata`.

5. **Expectativa de prazo.** Nada aqui produz resultado imediato em busca. Indexação leva dias; ranquear leva semanas a meses.

---

## Auto-revisão

**Cobertura do spec:**

| Item do spec | Onde é implementado |
|---|---|
| 1.1 HTML vazio | Tasks 1, 4, 5 — verificado em 4/Step 7 e 10 |
| 1.2 Conteúdo comercial PT | Tasks 2, 6 |
| 1.3 soft 404 | Task 8 |
| 1.3 `www` sem redirect | Task 9 |
| 1.3 sitemap desatualizado | Task 8 |
| 1.3 canonical / Open Graph | Task 3 |
| 2 Amplify | Task 9 |
| 2 EN na raiz, PT em /pt | Task 4 |
| 2 CTA WhatsApp | Tasks 3, 6 |
| 2 Sem SEO local | Task 7 (teste explícito) |
| 2.1 Links internos p/ mitigar EN na raiz | Task 5 (Header + link na home) |
| 3.1/3.2 Rotas e `generateStaticParams` | Task 4 |
| 4 Keywords e conteúdo | Tasks 2, 6 |
| 5.1 Metadata | Task 3 |
| 5.2 JSON-LD | Task 7 |
| 5.3 Infra | Tasks 8, 9 |
| 6 Testes (todos os 6 itens) | Task 10 |
| 8 Riscos (preservar dados, CSP) | Tasks 5, 9 |

**Desvio consciente:** o spec (3.3) previa um middleware opcional de detecção de idioma. Não implementado. O próprio spec autoriza a omissão ("se introduzir qualquer risco de bloqueio ao crawler, deve ser removido"); sem middleware não há risco algum, e a troca de idioma no `Header` (Task 5) cobre a necessidade do usuário. Menos código, menos risco.

**Consistência de tipos:** `Locale` e `defaultLocale` (Task 2) usados nas Tasks 3, 5, 6, 7. `Dictionary` (Task 2) nas Tasks 5, 6. `site` (Task 3) nas Tasks 5, 6, 7, 8. `buildMetadata` (Task 3) nas Tasks 5, 6. `Service` (Task 6) na Task 7. `AnimatedSection`, `Header`, `Footer` (Task 5) na Task 6. Nomes conferidos entre cada definição e uso.

**Placeholders:** nenhum "TBD"/"TODO". As três referências a "copiar do original" (Task 1 Step 6, Task 5 Steps 3 e 6) apontam para arquivos e linhas concretas que existem no repositório e permanecem até a Task 11.
