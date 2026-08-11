// O Next.js inlina variáveis NEXT_PUBLIC_* em tempo de BUILD. Se ela faltar,
// o valor não some só em runtime: ele nunca chega ao bundle. Antes, um
// console.warn deixava o build passar com exit 0 e as páginas do Lab
// (/random-quote, /pokemon-battle) iam para produção chamando o próprio
// domínio — 4 das 10 URLs do sitemap quebradas, sem nenhum sinal.
// Falhar o build é o único momento em que isso ainda é barato de corrigir.
const RAW_BASE = process.env.NEXT_PUBLIC_API_URL;
if (!RAW_BASE) {
  throw new Error(
    'NEXT_PUBLIC_API_URL não está definida. O Next.js a inlina no build, ' +
      'então ela precisa existir no ambiente de build (na Amplify: variáveis ' +
      'de ambiente da app, não só em runtime). Sem ela, as páginas do Lab ' +
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
