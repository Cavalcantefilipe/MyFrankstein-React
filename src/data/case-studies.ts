import type { Locale } from '@/i18n/config';

export type CaseStudy = {
  slug: string; title: Record<Locale, string>; summary: Record<Locale, string>;
  kind: Record<Locale, string>; stack: string[];
  sections: { heading: Record<Locale, string>; paragraphs: Record<Locale, string[]> }[];
  code?: string; links: { label: string; url: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    "slug": "third-party-integrations",
    "title": {
      "pt": "Tecnologia atualizada não basta para uma integração segura",
      "en": "Up-to-date technology is not enough for a secure integration"
    },
    "summary": {
      "pt": "Um cenário didático sobre confiança em componentes terceiros, renderização de conteúdo e testes que vão além do caminho feliz.",
      "en": "An educational scenario about trust in third-party components, content rendering, and testing beyond the happy path."
    },
    "kind": {
      "pt": "Cenário sintético de desenvolvimento seguro",
      "en": "Synthetic secure-development scenario"
    },
    "stack": [
      "TypeScript",
      "DOM",
      "AppSec",
      "Threat modeling"
    ],
    "sections": [
      {
        "heading": {
          "pt": "O problema de engenharia",
          "en": "The engineering problem"
        },
        "paragraphs": {
          "pt": [
            "Uma aplicação usa um framework atual e dependências atualizadas. Para exibir avisos, integra um componente de um fornecedor. A API responde e a interface funciona: o teste funcional passa. Ainda assim, um campo externo pode atravessar a integração e ser interpretado como HTML em vez de texto.",
            "Atualizar dependências continua sendo necessário. A atualização, porém, não decide quais dados são confiáveis, quais permissões uma integração recebe ou como um valor será renderizado. Essas decisões pertencem ao desenho e à implementação da aplicação.",
            "Este cenário é fictício, inspirado em aprendizados de pesquisa autorizada. Não reproduz código de fornecedor, ativos, parâmetros, credenciais ou a sequência de exploração de um sistema real."
          ],
          "en": [
            "An application uses a current framework and updated dependencies. It integrates a vendor component to display notices. The API responds and the UI works: the functional test passes. Yet an external field can cross the integration boundary and be interpreted as HTML instead of text.",
            "Keeping dependencies updated remains necessary. An update does not decide which data is trusted, which permissions an integration receives, or how a value is rendered. Those are application design and implementation decisions.",
            "This fictional scenario draws on lessons from authorized research. It does not reproduce vendor code, assets, parameters, credentials, or an exploitation sequence from a real system."
          ]
        }
      },
      {
        "heading": {
          "pt": "Onde a confiança muda",
          "en": "Where trust changes"
        },
        "paragraphs": {
          "pt": [
            "O fluxo didático é: resposta de um serviço de avisos → validação do contrato → componente visual → DOM. Um campo message é texto para o produto; não precisa aceitar formatação livre. Interpretá-lo como HTML cria uma capacidade que o requisito não pediu.",
            "A revisão precisa seguir o valor até quem realmente o renderiza. O componente principal pode usar interpolação segura enquanto um SDK, wrapper ou plugin faz outra coisa. O nome do framework, sozinho, não comprova a segurança desse caminho."
          ],
          "en": [
            "The educational flow is: notice-service response → contract validation → UI component → DOM. A message field is product text; it does not need arbitrary formatting. Interpreting it as HTML adds a capability the requirement did not request.",
            "Review must follow the value to the code that actually renders it. The main component may use safe interpolation while an SDK, wrapper, or plugin does something else. The framework name alone does not establish that this path is safe."
          ]
        }
      },
      {
        "heading": {
          "pt": "Decisão e exemplo mínimo",
          "en": "Decision and minimal example"
        },
        "paragraphs": {
          "pt": [
            "Neste exemplo, o contrato aceita apenas uma mensagem textual com tamanho limitado. O renderer usa textContent. O objeto recebido não é mesclado em configurações privilegiadas. A validação de tipo organiza o contrato; é a escolha de renderização que impede interpretar o conteúdo como markup.",
            "Se o requisito exigir HTML, isso passa a ser outra decisão de produto e segurança: definir um subconjunto permitido e usar sanitização apropriada. O exemplo abaixo deliberadamente aceita apenas texto."
          ],
          "en": [
            "In this example, the contract accepts only a bounded text message. The renderer uses textContent. The received object is not merged into privileged configuration. Type validation enforces the contract; the rendering choice prevents interpreting the content as markup.",
            "If HTML is required, that becomes a separate product and security decision: define an allowed subset and use appropriate sanitization. The example below intentionally accepts only text."
          ]
        }
      },
      {
        "heading": {
          "pt": "O que testar antes de integrar",
          "en": "What to test before integrating"
        },
        "paragraphs": {
          "pt": [
            "Controle positivo: uma mensagem comum deve aparecer. Entrada com marcação deve aparecer literalmente, sem criar elementos. Objeto malformado, campo ausente e mensagem acima do limite devem produzir erro controlado, mantendo intacto o conteúdo já exibido.",
            "Além do renderer, a integração precisa de testes para indisponibilidade, resposta inesperada, configuração de produção e atualizações do fornecedor. Um status HTTP de sucesso não demonstra que o conteúdo recebido é seguro.",
            "O exemplo executável e seus testes de contrato estão no repositório do perfil. Eles cobrem o exemplo sintético, não certificam uma aplicação real nem demonstram a correção de um fornecedor."
          ],
          "en": [
            "Positive control: an ordinary message must appear. Markup must appear literally without creating elements. A malformed object, missing field, or oversized message must produce a controlled error while preserving the displayed content.",
            "Beyond the renderer, the integration needs tests for outages, unexpected responses, production configuration, and vendor updates. A successful HTTP status does not establish that received content is safe.",
            "The runnable example and its contract tests are in the profile repository. They cover the synthetic example; they do not certify a real application or demonstrate a vendor fix."
          ]
        }
      },
      {
        "heading": {
          "pt": "Escolhas para a operação",
          "en": "Operational choices"
        },
        "paragraphs": {
          "pt": [
            "Inventarie scripts e seus responsáveis. Avalie se a integração precisa executar dentro da página principal ou pode funcionar isolada, com permissões limitadas. Tenha uma forma de desativá-la e uma rotina para revisar mudanças.",
            "SRI verifica se o recurso corresponde ao hash esperado; não corrige a lógica de uma versão vulnerável. CSP é uma camada adicional e precisa ser compatível com os fluxos da aplicação. Nenhuma das duas substitui a revisão do caminho dos dados."
          ],
          "en": [
            "Inventory scripts and their owners. Assess whether the integration needs to execute inside the main page or can run in isolation with limited permissions. Keep a way to disable it and a process for reviewing changes.",
            "SRI checks whether a resource matches the expected hash; it does not fix a vulnerable version’s logic. CSP is an additional layer and must fit application flows. Neither replaces reviewing the data path."
          ]
        }
      }
    ],
    "code": "export function parseNotice(input: unknown): string {\n  if (typeof input !== 'object' || input === null || Array.isArray(input)) {\n    throw new TypeError('Invalid notice');\n  }\n  const message = (input as Record<string, unknown>).message;\n  if (typeof message !== 'string' || message.length > 500) {\n    throw new TypeError('Invalid message');\n  }\n  return message;\n}\n\nexport function renderNotice(target: HTMLElement, input: unknown): void {\n  target.textContent = parseNotice(input);\n}",
    "links": [
      {
        "label": "OWASP: Third Party JavaScript Management",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_Javascript_Management_Cheat_Sheet.html"
      },
      {
        "label": "OWASP: DOM based XSS Prevention",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html"
      },
      {
        "label": "MDN: Subresource Integrity",
        "url": "https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity"
      },
      {
        "label": "Runnable example / Exemplo executável",
        "url": "https://github.com/Cavalcantefilipe/Cavalcantefilipe/tree/main/examples/third-party-notice"
      }
    ]
  },
  {
    "slug": "postgresql-performance",
    "title": {
      "pt": "Performance e segurança em um sistema legado",
      "en": "Performance and security in a legacy system"
    },
    "summary": {
      "pt": "Consultas PostgreSQL, correção de SQL injection e separação explícita entre resultados de produção e testes de validação.",
      "en": "PostgreSQL queries, SQL injection remediation, and an explicit distinction between production results and validation tests."
    },
    "kind": {
      "pt": "Experiência profissional na BrasilTec",
      "en": "Professional experience at BrasilTec"
    },
    "stack": [
      "PHP",
      "PostgreSQL",
      "SQL",
      "AppSec"
    ],
    "sections": [
      {
        "heading": {
          "pt": "Contexto e contribuição",
          "en": "Context and contribution"
        },
        "paragraphs": {
          "pt": [
            "Na BrasilTec, atuei em um ERP multi-tenant e marketplace B2B com consultas legadas, integrações e necessidades de sustentação. Meu trabalho incluiu análise e reescrita de SQL, revisão de índices e configurações, e correção de uma falha de segurança em um fluxo PHP.",
            "Este relato apresenta resultados agregados e decisões técnicas. Os nomes de tabelas, dados de clientes e detalhes operacionais internos não são necessários para explicar a contribuição."
          ],
          "en": [
            "At BrasilTec, I worked on a multi-tenant ERP and B2B marketplace with legacy queries, integrations, and production-support needs. My work included SQL analysis and rewrites, index and configuration review, and remediation of a security flaw in a PHP flow.",
            "This account presents aggregate results and technical decisions. Table names, customer data, and internal operational details are not needed to explain the contribution."
          ]
        }
      },
      {
        "heading": {
          "pt": "Mudança aplicada em produção",
          "en": "Change applied in production"
        },
        "paragraphs": {
          "pt": [
            "Uma consulta legada combinava subconsultas e geração de sequências. Reorganizei o cálculo com uma função de janela, preservando o schema. O tempo registrado para essa consulta passou de aproximadamente 470 ms para 0,18 ms.",
            "No mesmo fluxo PHP, corrigi o tratamento de um identificador numérico que permitia SQL injection. Performance e segurança foram tratadas no mesmo trabalho de manutenção. O resultado não significa que o sistema inteiro ficou esse número de vezes mais rápido ou que toda a aplicação foi auditada.",
            "Em outra frente de produção, o tuning de PostgreSQL levou uma consulta de polling de 653 ms para 1,9 ms. O cache hit ratio registrado foi de 98,92%. São observações de caminhos específicos, não um SLA geral."
          ],
          "en": [
            "A legacy query combined subqueries and sequence generation. I reorganized the calculation with a window function while preserving the schema. The recorded time for that query went from approximately 470 ms to 0.18 ms.",
            "In the same PHP flow, I fixed the handling of a numeric identifier that allowed SQL injection. Performance and security were addressed within the same maintenance work. This does not mean the entire system became that many times faster or that the whole application was audited.",
            "In a separate production task, PostgreSQL tuning took a polling query from 653 ms to 1.9 ms. The recorded cache hit ratio was 98.92%. These are observations of specific paths, not an overall SLA."
          ]
        }
      },
      {
        "heading": {
          "pt": "O que ficou em validação",
          "en": "What remained in validation"
        },
        "paragraphs": {
          "pt": [
            "Em testes para remover padrões N+1, observei até 99,7% menos consultas. Um fluxo passou de 1,21 s para 47 ms, com zero divergências na comparação de 65 mil produtos.",
            "Esses valores pertencem à validação. Não há confirmação suficiente para apresentá-los como resultado medido em produção. A comparação de saída ajuda a verificar a equivalência naquele conjunto; não substitui validação de concorrência, casos extremos ou observação após o deploy."
          ],
          "en": [
            "In tests aimed at removing N+1 patterns, I observed up to 99.7% fewer queries. One flow went from 1.21 s to 47 ms, with zero discrepancies in a comparison of 65,000 products.",
            "These values belong to validation. There is insufficient confirmation to present them as measured production results. Output comparison helps check equivalence on that dataset; it does not replace concurrency testing, edge cases, or post-deployment observation."
          ]
        }
      },
      {
        "heading": {
          "pt": "Como defender o resultado em uma revisão",
          "en": "How to explain the result in review"
        },
        "paragraphs": {
          "pt": [
            "Separo tempo da consulta, quantidade de consultas e latência da requisição: são métricas diferentes. Para repetir uma comparação, registro parâmetros, volume de dados, plano de execução, estado do cache e repetições. Esse é o protocolo recomendado para novas medições; os registros históricos disponíveis não incluem uma distribuição completa de percentis.",
            "A lição é otimizar um caminho preservando seu comportamento e explicando o alcance da evidência. Não extrapolo economia financeira, aumento de receita ou melhora da experiência de todos os usuários a partir de uma consulta isolada."
          ],
          "en": [
            "I distinguish query time, query count, and request latency: they are different metrics. For a repeatable comparison, I record parameters, dataset size, execution plan, cache state, and repeated runs. This is the recommended protocol for new measurements; the available historical records do not include a complete percentile distribution.",
            "The lesson is to optimize a path while preserving its behavior and explaining what the evidence supports. I do not extrapolate financial savings, revenue growth, or improvements for every user from a single query."
          ]
        }
      }
    ],
    "links": [
      {
        "label": "LinkedIn",
        "url": "https://www.linkedin.com/in/cavalcante-filipe/"
      }
    ]
  },
  {
    "slug": "temaqui-secure-development",
    "title": {
      "pt": "TEM AQUI com autenticação e sessão no desenho do produto",
      "en": "TEM AQUI with authentication and sessions built into the product"
    },
    "summary": {
      "pt": "Uma loja de afiliados com Go, Next.js e PostgreSQL: controles concretos no backend e na integração com o navegador.",
      "en": "An affiliate storefront with Go, Next.js, and PostgreSQL: concrete controls in the backend and browser integration."
    },
    "kind": {
      "pt": "Produto próprio em produção",
      "en": "Personal product in production"
    },
    "stack": [
      "Go",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Argon2id"
    ],
    "sections": [
      {
        "heading": {
          "pt": "Produto e responsabilidade",
          "en": "Product and responsibility"
        },
        "paragraphs": {
          "pt": [
            "Construí uma vitrine de afiliados com painel administrativo e encurtador de links próprio. O backend usa Go, chi, pgx e sqlc; o frontend usa Next.js e TypeScript. O projeto reúne produto, persistência, autenticação e operação.",
            "A vitrine é pública. A administração tem uma fronteira diferente: publicar e editar conteúdo exige uma sessão válida. Descrever essa separação é mais útil do que afirmar que o produto é seguro apenas por usar uma stack moderna."
          ],
          "en": [
            "I built an affiliate storefront with an administration panel and a custom link shortener. The backend uses Go, chi, pgx, and sqlc; the frontend uses Next.js and TypeScript. The project brings together product development, persistence, authentication, and operations.",
            "The storefront is public. Administration has a different boundary: publishing and editing content requires a valid session. Explaining this separation is more useful than claiming the product is secure simply because it uses a modern stack."
          ]
        }
      },
      {
        "heading": {
          "pt": "Decisões implementadas",
          "en": "Implemented decisions"
        },
        "paragraphs": {
          "pt": [
            "Usei Argon2id para hashing de senhas, com salt e parâmetros incorporados ao hash. Senhas e tokens de sessão têm tratamentos distintos: o token da sessão é aleatório e o banco recebe seu hash, não o valor apresentado pelo navegador.",
            "As sessões têm expiração e revogação. O backend valida a sessão nas operações protegidas. A integração usa uma origem pública compartilhada entre frontend e API, com cookies same-origin, verificações de CSRF e uma Content Security Policy.",
            "Usei consultas com pgx e sqlc e logs estruturados. Esses controles têm funções específicas; nenhum deles, isoladamente, comprova ausência de vulnerabilidades."
          ],
          "en": [
            "I used Argon2id for password hashing, with salt and parameters embedded in the hash. Passwords and session tokens receive different treatment: the session token is random, and the database receives its hash rather than the value presented by the browser.",
            "Sessions support expiration and revocation. The backend validates the session on protected operations. The integration uses a shared public origin for the frontend and API, same-origin cookies, CSRF checks, and a Content Security Policy.",
            "I used pgx and sqlc for database queries and structured logging. These controls have specific roles; none alone establishes the absence of vulnerabilities."
          ]
        }
      },
      {
        "heading": {
          "pt": "Evidência e testes existentes",
          "en": "Evidence and existing tests"
        },
        "paragraphs": {
          "pt": [
            "O repositório contém testes para hash e verificação de senha, armazenamento do hash do token, expiração e destruição de sessão. Há cenários para sessão ausente ou inválida e para requisições de alteração sem o cabeçalho esperado de CSRF ou com origem incorreta.",
            "Também existem testes de limites por IP e reposição de capacidade. Essa descrição resulta da leitura do código e dos testes; não representa uma execução nova de toda a suíte nem uma auditoria independente do ambiente em produção."
          ],
          "en": [
            "The repository contains tests for password hashing and verification, storage of the token hash, and session expiration and destruction. Scenarios cover missing or invalid sessions and mutation requests without the expected CSRF header or with an incorrect origin.",
            "There are also tests for per-IP limits and capacity refill. This description comes from reviewing code and tests; it is not a fresh execution of the full suite or an independent production audit."
          ]
        }
      },
      {
        "heading": {
          "pt": "Limites e evolução",
          "en": "Limits and evolution"
        },
        "paragraphs": {
          "pt": [
            "O código do produto permanece privado. Este caso publica decisões e comportamento em alto nível, sem dados de clientes, segredos ou configuração operacional. Não atribuo ganhos de conversão ou receita sem medição.",
            "O próximo passo técnico é acompanhar esses controles a cada mudança no fluxo de autenticação e nas integrações. Cookies, CSRF, autorização e renderização continuam exigindo revisão mesmo quando framework e dependências estão atualizados."
          ],
          "en": [
            "The product source remains private. This case publishes high-level decisions and behavior without customer data, secrets, or operational configuration. I do not claim conversion or revenue gains without measurement.",
            "The next technical step is to keep checking these controls whenever authentication flows or integrations change. Cookies, CSRF, authorization, and rendering still need review even when the framework and dependencies are current."
          ]
        }
      }
    ],
    "links": [
      {
        "label": "TEM AQUI Achadinhos",
        "url": "https://temaquiachadinhos.com.br"
      }
    ]
  },
  {
    "slug": "pokemon-service-architecture",
    "title": {
      "pt": "Um simulador Pokémon dividido por responsabilidades",
      "en": "A Pokémon simulator split by responsibility"
    },
    "summary": {
      "pt": "Next.js na interface, Laravel na API e um serviço Node.js para simulação, com código público para examinar as decisões.",
      "en": "Next.js for the UI, Laravel for the API, and a Node.js simulation service, with public code to inspect the decisions."
    },
    "kind": {
      "pt": "Projeto de laboratório com código público",
      "en": "Lab project with public source"
    },
    "stack": [
      "Next.js",
      "TypeScript",
      "Laravel",
      "Node.js",
      "PostgreSQL"
    ],
    "sections": [
      {
        "heading": {
          "pt": "Objetivo e contribuição",
          "en": "Goal and contribution"
        },
        "paragraphs": {
          "pt": [
            "Construí a interface, a API e a integração com um motor de batalhas existente para explorar fronteiras entre serviços. A PokéAPI fornece os dados dos Pokémon; o motor de simulação é @pkmn/sim, do ecossistema Pokémon Showdown. Minha contribuição está na aplicação e na integração, não na autoria desse motor.",
            "O projeto é um laboratório. Ele permite discutir contratos HTTP, persistência, tratamento de falhas e custo operacional sem apresentá-lo como uma plataforma de grande escala."
          ],
          "en": [
            "I built the UI, API, and integration with an existing battle engine to explore service boundaries. PokéAPI supplies Pokémon data; the simulation engine is @pkmn/sim from the Pokémon Showdown ecosystem. My contribution is the application and integration, not authorship of that engine.",
            "This is a lab project. It supports discussion of HTTP contracts, persistence, failure handling, and operational cost without presenting it as a large-scale platform."
          ]
        }
      },
      {
        "heading": {
          "pt": "Fluxo da aplicação",
          "en": "Application flow"
        },
        "paragraphs": {
          "pt": [
            "O navegador usa Next.js, React e TypeScript para selecionar times e apresentar a batalha. A API Laravel valida as entradas, consulta dados, orquestra a chamada ao simulador e persiste resultados em PostgreSQL.",
            "O serviço Node.js executa o motor de batalha e devolve o resultado e os eventos. Assim, o navegador apresenta o estado, enquanto a lógica principal de simulação fica no serviço dedicado. A descrição anterior de lógica toda no cliente não representava essa arquitetura."
          ],
          "en": [
            "The browser uses Next.js, React, and TypeScript to select teams and present the battle. The Laravel API validates input, retrieves data, orchestrates the simulator call, and persists results in PostgreSQL.",
            "The Node.js service runs the battle engine and returns results and events. The browser presents the state while the main simulation logic lives in the dedicated service. Describing all logic as client-side did not represent this architecture."
          ]
        }
      },
      {
        "heading": {
          "pt": "Decisões e custo da separação",
          "en": "Decisions and cost of separation"
        },
        "paragraphs": {
          "pt": [
            "A separação permite reutilizar um motor do ecossistema Node.js mantendo a persistência e a API em Laravel. O custo é ter mais de um deploy, contratos entre serviços e falhas de rede para tratar. Para um produto menor, um único serviço poderia ser uma escolha mais simples.",
            "O código contém validação do tamanho dos times, timeouts nas chamadas HTTP e autenticação interna condicionada à configuração de um token. A existência do middleware não prova que a variável está configurada em todos os ambientes.",
            "Os testes de integração que merecem atenção são: time vazio ou inválido, simulador indisponível, resposta inesperada, repetição de uma escolha e perda de estado após reinício. São cenários de revisão, não uma afirmação de que todos já têm cobertura automatizada."
          ],
          "en": [
            "The split lets me reuse a Node.js ecosystem engine while keeping persistence and the API in Laravel. The cost is multiple deployments, service contracts, and network failures to handle. For a smaller product, a single service could be simpler.",
            "The code includes team-size validation, HTTP timeouts, and internal authentication conditional on a configured token. The presence of middleware does not prove that the variable is configured in every environment.",
            "Integration scenarios worth reviewing include empty or invalid teams, an unavailable simulator, unexpected responses, repeated choices, and state loss after restart. These are review scenarios, not a claim that every one already has automated coverage."
          ]
        }
      },
      {
        "heading": {
          "pt": "Evidência pública",
          "en": "Public evidence"
        },
        "paragraphs": {
          "pt": [
            "Os três repositórios abaixo permitem acompanhar a implementação da interface, da orquestração e da simulação. O projeto demonstra integração entre tecnologias, sem alegações de redução de custo, escala ou disponibilidade que não tenham sido medidas."
          ],
          "en": [
            "The three repositories below let readers follow the UI, orchestration, and simulation implementation. The project demonstrates integration across technologies without unmeasured claims about cost reduction, scale, or availability."
          ]
        }
      }
    ],
    "links": [
      {
        "label": "Frontend: Next.js / TypeScript",
        "url": "https://github.com/Cavalcantefilipe/MyFrankstein-React"
      },
      {
        "label": "API: Laravel",
        "url": "https://github.com/Cavalcantefilipe/myFranksteinBackEnd"
      },
      {
        "label": "Simulation: Node.js",
        "url": "https://github.com/Cavalcantefilipe/MyPokemonBattleSimulate"
      },
      {
        "label": "Demo",
        "url": "https://filipelab.com/pokemon-battle"
      }
    ]
  }
];
