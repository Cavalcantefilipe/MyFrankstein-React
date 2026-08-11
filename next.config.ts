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
}

export default nextConfig
