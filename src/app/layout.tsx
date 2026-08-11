import type { Metadata } from 'next'
import '../app.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://filipelab.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
