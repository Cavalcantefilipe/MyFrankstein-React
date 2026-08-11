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
}

export default nextConfig
