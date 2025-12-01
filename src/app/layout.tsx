// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yassin Daboussi",
  description: "Portfolio Full-Stack Developer",
  openGraph: {
    title: "Yassin Daboussi",
    description: "Ingénieur Full-Stack • React • Symfony • Flutter • AWS",
    url: "https://yassindaboussi.netlify.app",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Umami Analytics – Ton tracking secret */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="01c6be30-6922-4c07-8d87-64236b89cfa9"
        ></script>

        {/* Optionnel : si tu veux voir les IPs exactes (sinon elles sont masquées) */}
        <meta name="umami" content="disable-ip" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}