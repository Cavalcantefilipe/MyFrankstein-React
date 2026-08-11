import type { Metadata } from 'next'
import '../app.css'
import { site } from '@/seo/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
