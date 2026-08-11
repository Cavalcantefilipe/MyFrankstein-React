import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Durante a migração, o app Vite legado ainda vive em src/pages/*.jsx.
  // O Next.js trata src/pages como Pages Router e publicaria cada arquivo
  // como rota real (/Index, /Lab, /PokemonBattle...), criando URLs
  // duplicadas e indexáveis — o oposto do objetivo desta migração.
  // Restringir as extensões a .ts/.tsx deixa os .jsx legados fora do
  // roteamento. Remover na Task 11, junto com o Vite.
  pageExtensions: ['ts', 'tsx'],

  async redirects() {
    return [
      // www é duplicata do apex — consolidar em https://filipelab.com.
      // Precisa vir antes das regras de /en abaixo.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.filipelab.com' }],
        destination: 'https://filipelab.com/:path*',
        permanent: true,
      },
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
        // Caminhos sem prefixo de locale servem inglês. Exclui também "en":
        // a raiz já foi reescrita para /en pela regra beforeFiles acima, e o
        // Next.js reavalia afterFiles sobre o destino reescrito — sem essa
        // exclusão, /en cairia de novo aqui e viraria /en/en (404).
        { source: '/:path((?!pt|en|_next|api|.*\\..*).*)', destination: '/en/:path' },
      ],
      fallback: [],
    }
  },

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
}

export default nextConfig
