# Design: Migração para Next.js bilíngue com foco em SEO

**Data:** 2026-08-11
**Projeto:** filipelab.com (MyFrankstein-React)
**Objetivo:** Fazer o site aparecer nas buscas por "portfólio de desenvolvedor", "desenvolvedor para criar site" e termos comerciais equivalentes.

---

## 1. Problema

O site não aparece nas buscas por dois motivos independentes. Ambos precisam ser resolvidos — corrigir só um não produz resultado.

### 1.1 O Google recebe uma página vazia (bloqueador técnico)

Verificado ao vivo em 2026-08-05:

```
$ curl -A "Googlebot/2.1" https://filipelab.com
HTTP:200 SIZE:685
body: '\n  <div id="root"></div>\n'
```

O site é um SPA React + Vite servido por S3/CloudFront. Todo o conteúdo é renderizado por JavaScript no cliente. O HTML entregue ao crawler tem 685 bytes e nenhum texto indexável.

### 1.2 O conteúdo não corresponde à intenção de busca (bloqueador de conteúdo)

O site é um currículo em inglês: "Software Engineer", "About me", "Work experience". Quem busca contratar um desenvolvedor no Brasil digita "criação de sites", "desenvolvedor web", "sistema web sob medida". Não existe página que responda a essa intenção.

Mesmo com o problema técnico resolvido, um CV em inglês não ranqueia para "preciso de um desenvolvedor".

### 1.3 Problemas adicionais encontrados na auditoria

| Problema | Evidência | Impacto |
|---|---|---|
| 404 responde HTTP 200 | `/pagina-que-nao-existe-123` → `200` | Google indexa páginas inexistentes como válidas (soft 404) |
| `www` não redireciona | `www.filipelab.com` → `200`, sem `Location` | Conteúdo duplicado em dois hostnames, dilui sinais |
| Sitemap desatualizado | Lista `/404`; omite `/pokemon-battle` | Aponta o crawler para lixo e esconde página real |
| Sem canonical | Ausente no `index.html` | Sem controle de duplicidade |
| Sem Open Graph | Ausente | Compartilhamentos sem preview |

---

## 2. Decisões tomadas

Decisões do usuário, registradas para rastreabilidade:

| Decisão | Escolha | Observação |
|---|---|---|
| Renderização | Migrar para Next.js | Resolve o HTML vazio via SSR/SSG |
| Hospedagem | AWS Amplify Hosting | Suporta SSR; mantém ecossistema AWS; `customHttp.yml` já é formato Amplify |
| Estrutura de URL | EN na raiz, PT em `/pt` | Preserva URLs atuais; ver trade-off em 2.1 |
| Conteúdo | Bilíngue completo PT + EN | Cobertura máxima, manutenção dobrada |
| CTA | WhatsApp `5511985346164` | Padrão no Brasil, maior conversão |
| SEO local | Não (só remoto) | Sem `LocalBusiness`, sem menções a cidade |

### 2.1 Trade-off aceito: EN na raiz

A página-alvo de busca (`/pt/servicos`) fica um nível abaixo da raiz, que concentra mais autoridade. Mitigações:

- Links internos de `/` e `/pt` apontando para `/pt/servicos` com âncora descritiva
- `hreflang` correto entre os pares, sinalizando ao Google qual versão servir a cada região
- Sitemap com ambas as versões e `alternates`

Isso não anula a desvantagem, apenas a reduz. Decisão consciente do usuário.

---

## 3. Arquitetura

### 3.1 Estrutura de rotas

```
app/
├── layout.tsx                      # metadataBase, JSON-LD Person
├── [lang]/
│   ├── layout.tsx                  # <html lang>, generateStaticParams
│   ├── page.tsx                    # portfólio (home)
│   ├── servicos/page.tsx           # PT: oferta comercial  ← página-alvo
│   ├── services/page.tsx           # EN: equivalente
│   ├── lab/page.tsx
│   ├── random-quote/page.tsx
│   └── pokemon-battle/page.tsx
├── sitemap.ts                      # gerado em código
├── robots.ts
└── not-found.tsx                   # 404 com status HTTP correto
```

URLs resultantes:

```
/                  → EN  portfólio (URL atual preservada)
/services          → EN  serviços
/lab               → EN  projetos
/pt                → PT  portfólio
/pt/servicos       → PT  serviços  ← alvo de busca comercial
/pt/lab            → PT  projetos
```

### 3.2 Locale como segmento dinâmico

Padrão oficial do App Router, confirmado na documentação do Next.js:

```tsx
// app/[lang]/layout.tsx
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'pt' }]
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params
  return <html lang={lang}><body>{children}</body></html>
}
```

Para servir EN na raiz (sem prefixo `/en`), a raiz reescreve internamente para `lang=en`. O prefixo `/en` redireciona 301 para a raiz, evitando duplicidade.

### 3.3 Middleware: apenas sugestão, nunca bloqueio

Middleware pode detectar `Accept-Language` e sugerir a versão PT a visitantes brasileiros. Regras obrigatórias:

- **Nunca redirecionar crawlers.** Ambas as versões devem ser acessíveis diretamente, sem redirect, em qualquer User-Agent.
- **Nunca redirecionar a raiz por idioma.** Redirect na raiz enfraquece o sinal de SEO.
- Preferência do usuário (cookie) tem precedência sobre detecção automática.

Se o middleware introduzir qualquer risco de bloqueio ao crawler, ele deve ser removido — a navegação manual entre idiomas é suficiente.

---

## 4. Conteúdo

### 4.1 Mapeamento palavra-chave → URL

Uma página, uma intenção. Evita canibalização.

| URL | Intenção | H1 | Palavras-chave primárias |
|---|---|---|---|
| `/pt/servicos` | Comercial (contratar) | Desenvolvedor Web para Criação de Sites, Sistemas e Integrações | criação de sites, desenvolvedor web, sistema web sob medida |
| `/pt` | Marca / quem é | Filipe Alves Cavalcante — Desenvolvedor Web | portfólio desenvolvedor, Filipe Cavalcante |
| `/` | Recrutador internacional | Filipe Alves Cavalcante — Software Engineer | software engineer portfolio, backend developer |
| `/services` | Comercial (EN) | Web Developer for Custom Sites, Systems and Integrations | hire web developer, custom web systems |

### 4.2 Serviços em `/pt/servicos`

Cinco serviços, cada um com seção própria e prova concreta extraída do CV real. Nenhuma afirmação inventada.

| # | Serviço | Prova (do histórico real) |
|---|---|---|
| 1 | Criação de sites institucionais | Lighthouse 7 → 76 (performance), 28 → 95 (SEO) na Gran Cursos |
| 2 | Sistemas web e APIs sob medida | 30+ endpoints REST; plataforma edtech com 4.854 usuários e 6.415 matrículas |
| 3 | Landing pages e otimização SEO/performance | Campanhas Black Friday com R$10M em vendas; −50% erros no Search Console |
| 4 | Automação e integração com IA | Transcrição Whisper em 3 idiomas, resumos automáticos com timestamps, gerador de questões |
| 5 | Integrações com terceiros | Stripe, Instagram Graph API, TikTok API, Google APIs, marketplaces |

**Princípio:** números concretos convertem e ranqueiam melhor que adjetivos ("sites modernos e profissionais"). Toda métrica citada existe em `src/data/experience.js`.

### 4.3 CTA

WhatsApp como ação principal: `https://wa.me/5511985346164`

- Repetido ao longo da página (início, após serviços, rodapé)
- Texto descritivo: "Fale comigo no WhatsApp" — não "clique aqui"
- E-mail mantido como alternativa secundária

**Risco aceito:** o número fica público no HTML e será coletado por bots de spam. É o custo normal desse CTA; concorrentes que ranqueiam fazem o mesmo.

---

## 5. SEO técnico

### 5.1 Metadata

`generateMetadata` por página. Limites: title 50–60 caracteres, description 120–160.

```tsx
export const metadata = {
  metadataBase: new URL('https://filipelab.com'),
  alternates: {
    canonical: '/pt/servicos',
    languages: {
      'pt-BR': '/pt/servicos',
      'en': '/services',
      'x-default': '/services',
    },
  },
}
```

### 5.2 Structured data (JSON-LD)

- `Person` — identidade profissional, no layout raiz
- `ProfessionalService` — serviços oferecidos, em `/pt/servicos` e `/services`
- `BreadcrumbList` — páginas internas

**Sem `LocalBusiness`** — o atendimento é só remoto, e schema deve refletir a realidade. Schema falso é penalizado.

Escape obrigatório contra XSS ao serializar:

```tsx
// Escapa "<" para a sequência Unicode, impedindo que um "</script>"
// dentro dos dados feche a tag e injete markup.
// Escapa "<" para a sequencia Unicode, impedindo que um "</script>"
// dentro dos dados feche a tag e injete markup.
JSON.stringify(jsonLd).replace(/</g, '\u003c')
```

### 5.3 Correções de infraestrutura

| Item | Ação |
|---|---|
| `www` | 301 → `https://filipelab.com` (regra de redirect na Amplify) |
| 404 | `not-found.tsx` retornando status HTTP 404 real |
| Sitemap | Gerado por `sitemap.ts`, com `alternates.languages`; remover `/404` |
| `robots.txt` | Gerado por `robots.ts`, apontando o sitemap |
| CSP | Preservar o `customHttp.yml` atual, ajustado para Next.js |

**Atenção ao CSP:** `script-src 'unsafe-inline'` continua necessário para a hidratação do Next.js. `connect-src` deve manter o backend Railway. Uma quebra no CSP derruba a página inteira — validar após o deploy.

---

## 6. Testes

Verificação pós-build, focada no bug que originou o trabalho:

1. **Conteúdo renderizado** — o HTML de `/pt/servicos` contém o H1 e o texto dos serviços sem executar JavaScript. Este é o teste que teria pegado o problema original.
2. **hreflang** — cada par PT/EN se referencia mutuamente, sem loop.
3. **Status 404** — URL inexistente retorna 404, não 200.
4. **Canonical** — presente, absoluto e autorreferente.
5. **Redirect `www`** — retorna 301 para o domínio raiz.
6. **Core Web Vitals** — LCP < 2.5s, CLS < 0.1 via Lighthouse.

---

## 7. Fora de escopo

SEO não termina no código. Estes itens são responsabilidade do usuário e afetam o resultado:

- **Google Search Console** — registrar o domínio e enviar o sitemap. Sem isso, a indexação demora muito mais.
- **Prazo** — ranquear leva de semanas a meses. Nada aqui produz efeito imediato.
- **Backlinks** — links de outros sites continuam sendo um dos maiores fatores de ranqueamento e não são tarefa de código.
- **Conteúdo recorrente** — artigos técnicos em PT atrairiam busca de cauda longa; não incluído nesta entrega.

## 8. Riscos

| Risco | Mitigação |
|---|---|
| Migração é reescrita ampla | Preservar componentes e dados existentes (`experience.js`, `Header`, `Footer`, assets) em vez de recriar |
| Amplify custa mais que S3 puro | Aceito pelo usuário ao escolher SSR |
| CSP mal configurado derruba o site | Validar CSP em preview antes de apontar o domínio |
| Middleware bloqueando crawler | Middleware só sugere; nunca redireciona por User-Agent |
| URLs atuais quebrarem | EN permanece na raiz; `/lab`, `/random-quote`, `/pokemon-battle` preservadas |

---

## 9. Pendências

- [ ] Confirmar se as URLs `/random-quote` e `/pokemon-battle` devem existir nas duas línguas ou só em EN
