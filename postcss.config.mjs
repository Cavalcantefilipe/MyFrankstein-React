// O Tailwind 4 era processado pelo plugin @tailwindcss/vite, removido junto
// com o Vite. No Next.js o caminho é o plugin PostCSS: sem este arquivo o
// build gera só o CSS escrito à mão, e nenhuma classe utilitária do Tailwind
// (bg-black, grid, rounded-md...) chega ao bundle — o site sobe sem estilo.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
