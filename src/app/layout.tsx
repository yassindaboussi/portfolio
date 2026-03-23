// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { SITE } from '@/data/config';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    images: [SITE.ogImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <head>
        <script
          defer
          src={SITE.analytics.umamiSrc}
          data-website-id={SITE.analytics.umamiId}
        />
        <meta name="umami" content="disable-ip" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
