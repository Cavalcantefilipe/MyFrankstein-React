# filipelab.com

Portfólio e site de serviços de Filipe Alves Cavalcante. Next.js (App Router), bilíngue, hospedado na AWS Amplify.

## Comandos

```bash
npm run dev        # servidor de desenvolvimento
npm run build      # build de produção
npm start          # serve o build de produção
npm test           # testes unitários (Vitest)
npm run test:seo   # verificação de SEO end-to-end (Playwright)
npm run lint       # ESLint
```

`npm run test:seo` builda e sobe o servidor sozinho. Se já houver um servidor na porta 3000, ele o reaproveita — use `CI=1 npm run test:seo` para forçar um build limpo.

## URLs

Inglês na raiz, português sob `/pt`.

| Inglês | Português |
|---|---|
| `/` | `/pt` |
| `/services` | `/pt/servicos` |
| `/lab` | `/pt/lab` |
| `/random-quote` | `/pt/random-quote` |
| `/pokemon-battle` | `/pt/pokemon-battle` |

`/en` e `/en/*` redirecionam (308) para a versão sem prefixo. Caminhos cruzados entre idiomas (`/servicos`, `/pt/services`) retornam 404 de propósito, para não criar URLs duplicadas.

`/pt/servicos` é a página comercial: é ela que responde às buscas por "criação de sites" e "desenvolvedor web".

## Estrutura

```
src/
├── app/[lang]/          # rotas (locale como segmento dinâmico)
│   ├── page.tsx         # portfólio
│   ├── servicos/        # serviços (só PT)
│   ├── services/        # serviços (só EN)
│   └── lab/ …           # projetos
├── app/sitemap.ts       # sitemap gerado, com hreflang
├── app/robots.ts
├── i18n/                # locales e dicionários en/pt
├── seo/                 # constantes do site, metadata, JSON-LD
├── components/          # layout, ui, services, seo, lab
└── data/                # experiência, serviços
```

As rotas ficam em `src/app/`, não em `app/` — ambos são suportados pelo Next.js.

## Regras que os testes garantem

- **O HTML servido ao crawler contém o conteúdo.** O site anterior entregava `<div id="root"></div>` (685 bytes) e nada era indexável. `e2e/seo.spec.ts` falha se isso voltar a acontecer.
- **Nenhuma métrica inventada.** Todo número no texto de marketing precisa corresponder a uma frase real em `src/data/experience.ts`. `src/data/services-claim-guard.ts` faz essa checagem, e o teste rejeita afirmações fabricadas.
- **Toda URL do sitemap responde 200.** Sitemap não deve apontar o crawler para página morta.
- **Um `<h1>` por página, com texto.** H1 vazio desperdiça o principal sinal de SEO.
- **Sem `LocalBusiness` no JSON-LD.** O atendimento é remoto; o schema reflete a realidade.

## Configuração

`.env` precisa de:

```
NEXT_PUBLIC_API_URL=https://…/api
```

É usada pelas páginas do Lab (quotes, pokémon), que chamam a API no navegador. O `connect-src` do CSP em `next.config.ts` precisa permitir esse host.

## Deploy

AWS Amplify Hosting, com `amplify.yml` na raiz (`baseDirectory: .next`, conforme a documentação da AWS para Next.js SSR).

**A versão do Next.js importa:** o Amplify documenta suporte às versões 12–15. O projeto está fixado na 15.x de propósito. Subir para a 16 antes de a AWS anunciar suporte pode quebrar o deploy.

Após o deploy, no Google Search Console: verificar o domínio (registro TXT no DNS), enviar `https://filipelab.com/sitemap.xml` e pedir indexação de `/pt/servicos`.
