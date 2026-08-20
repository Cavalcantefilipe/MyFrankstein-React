import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-ink text-fg antialiased">
        <main className="page-container bg-grid py-24 text-center">
          <p className="font-mono text-xs text-accent">~/filipelab/404</p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">404</h1>
          <p className="mt-4 font-mono text-sm text-muted">
            This page does not exist. / Esta página não existe.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded border border-accent/35 px-5 py-3 font-mono text-sm text-accent transition-colors hover:bg-accent/10"
          >
            ← Back to home / Voltar ao início
          </Link>
        </main>
      </body>
    </html>
  );
}
