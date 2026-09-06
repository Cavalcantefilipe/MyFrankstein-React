import { services } from '@/data/services';
import { site } from '@/seo/site';

/**
 * llms.txt — convenção (llmstxt.org) que descreve o site para agentes de IA
 * em Markdown, em vez de fazê-los inferir a estrutura a partir do HTML.
 *
 * Não é sinal de ranqueamento: o Google declarou em 15/06/2026 que o arquivo
 * "não é necessário para a Busca, incluindo os recursos de IA generativa", e
 * que mantê-lo não afeta a visibilidade. Existe aqui para os agentes que de
 * fato o leem (Claude, ChatGPT, Perplexity), não para SEO.
 *
 * Gerado em código, e não como arquivo estático, para que a lista de serviços
 * não possa divergir de src/data/services.ts.
 */
export const dynamic = 'force-static';

function buildLlmsTxt(): string {
  const serviceLinks = services
    .map(
      (service) =>
        `- [${service.title.pt}](${site.url}/pt/servicos/${service.slug}): ${service.body.pt}`
    )
    .join('\n');

  const serviceLinksEn = services
    .map(
      (service) =>
        `- [${service.title.en}](${site.url}/services/${service.slug}): ${service.body.en}`
    )
    .join('\n');

  return `# ${site.authorName}

> Engenheiro de software full-stack com mais de 6 anos de experiência, atendendo remotamente de todo o Brasil. Trabalha com PHP/Laravel, Node.js, TypeScript, NestJS, React, Next.js, Vue.js e AWS. Este site é ao mesmo tempo portfólio profissional e página de contratação de serviços.

O site é bilíngue: o português fica sob /pt e o inglês na raiz. Cada par de páginas
se referencia por hreflang. Contato por WhatsApp (${site.whatsappUrl}) ou
e-mail (${site.email}).

## Páginas principais

- [Portfólio (PT)](${site.url}/pt): experiência profissional, tecnologias e trajetória.
- [Portfolio (EN)](${site.url}): the same content in English, for international recruiters.
- [Serviços (PT)](${site.url}/pt/servicos): o que ele faz para clientes, com provas do histórico real.
- [Services (EN)](${site.url}/services): the English version of the services page.

## Serviços (PT)

${serviceLinks}

## Services (EN)

${serviceLinksEn}

## Lab

- [Lab](${site.url}/lab): projetos experimentais.
- [Random Quote](${site.url}/random-quote): gerador de citações com tradução automática.
- [Pokémon Battle](${site.url}/pokemon-battle): simulador de batalha usando a PokéAPI.

## Opcional

- [Currículo em PDF (PT)](${site.url}/filipe-cavalcante-pt.pdf): versão em português, para download.
- [Currículo em PDF (EN)](${site.url}/filipe-cavalcante-en.pdf): versão em inglês, para download.
- [LinkedIn](${site.linkedin}): perfil profissional.
- [GitHub](${site.github}): repositórios e projetos open source.
- [Sitemap](${site.url}/sitemap.xml): todas as URLs públicas, com alternates por idioma.
`;
}

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
