import type { Metadata } from 'next';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';

// Este 404 fica fora de /[lang], então não herda o LangLayout — precisa
// declarar as fontes por conta própria para não cair no fallback do sistema.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '404 · Page not found / Página não encontrada',
  robots: { index: false, follow: true },
};

const DESTINOS = [
  { href: '/en', comando: 'cd ~/', rotulo: 'Home', idioma: 'EN' },
  { href: '/pt', comando: 'cd ~/', rotulo: 'Início', idioma: 'PT' },
  { href: '/en/services', comando: 'ls services/', rotulo: 'Services', idioma: 'EN' },
  { href: '/pt/servicos', comando: 'ls servicos/', rotulo: 'Serviços', idioma: 'PT' },
  { href: '/en/lab', comando: 'run lab/', rotulo: 'Lab', idioma: 'EN' },
];

export default function NotFound() {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-ink text-fg font-display antialiased">
        <main className="bg-grid flex min-h-screen items-center py-24">
          <div className="page-container">
            <p className="text-accent font-mono text-xs">~/filipelab/404</p>

            <h1 className="mt-4 text-6xl font-bold tracking-tight sm:text-8xl">404</h1>

            <p className="text-fg-strong mt-5 max-w-xl text-lg">
              This page does not exist.
              <span className="text-muted block">Esta página não existe.</span>
            </p>

            <p className="text-faint mt-3 max-w-xl font-mono text-sm">
              The link may be outdated, or the address has a typo.
              <span className="block">
                O link pode estar desatualizado, ou o endereço tem um erro de digitação.
              </span>
            </p>

            <nav aria-label="Suggested pages / Páginas sugeridas" className="mt-10">
              <ul className="flex flex-col gap-px">
                {DESTINOS.map((destino) => (
                  <li key={destino.href}>
                    <Link
                      href={destino.href}
                      className="group border-faint/15 hover:border-accent/40 hover:bg-raised flex items-center gap-4 border-b py-4 transition-colors"
                    >
                      <span className="text-accent/70 group-hover:text-accent font-mono text-xs transition-colors">
                        {destino.comando}
                      </span>
                      <span className="group-hover:text-accent font-medium transition-colors">
                        {destino.rotulo}
                      </span>
                      <span className="text-faint ml-auto font-mono text-[0.7rem] tracking-widest">
                        {destino.idioma}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </main>
      </body>
    </html>
  );
}
