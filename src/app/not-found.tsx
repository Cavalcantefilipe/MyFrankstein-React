import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="page-container py-24 text-center">
          <h1 className="text-4xl font-semibold">404</h1>
          <p className="mt-4 text-black/80">
            This page does not exist. / Esta página não existe.
          </p>
          <Link href="/" className="mt-6 inline-block underline">
            Back to home / Voltar ao início
          </Link>
        </main>
      </body>
    </html>
  )
}
