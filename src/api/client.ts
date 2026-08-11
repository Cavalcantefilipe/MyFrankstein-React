// O Next.js inlina variáveis NEXT_PUBLIC_* em tempo de BUILD. Se ela faltar,
// o valor não some só em runtime: ele nunca chega ao bundle. Antes, um
// console.warn deixava o build passar com exit 0 e as páginas do Lab
// (/random-quote, /pokemon-battle) iam para produção chamando o próprio
// domínio — 4 das 10 URLs do sitemap quebradas, sem nenhum sinal.
// Falhar o build é o único momento em que isso ainda é barato de corrigir.
// VITE_API_URL é aceita porque é o nome já configurado na Amplify, herdado do
// setup do Vite. Ambas precisam ser lidas como acessos literais e completos a
// process.env — o Next.js substitui a expressão inteira no build, então
// process.env[algumaVariavel] NÃO funcionaria aqui.
const RAW_BASE = process.env.NEXT_PUBLIC_API_URL;
if (!RAW_BASE) {
  throw new Error(
    'Nem NEXT_PUBLIC_API_URL nem VITE_API_URL estão definidas. O Next.js as ' +
      'inlina no build, então precisam existir no ambiente de BUILD (na ' +
      'Amplify: variáveis de ambiente da app). Sem elas, as páginas do Lab ' +
      'chamam o próprio domínio e falham.'
  );
}
const API_BASE = RAW_BASE.replace(/\/$/, '');

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = `Request failed: ${response.status}`;
    try {
      const body = await response.json();
      if (body?.message) message = body.message;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  return response.json();
}
