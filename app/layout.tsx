import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/organisms/navigation';
import Footer from '@/components/organisms/footer';
import { Providers } from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://accrosignes.fr',
  ),
  title: 'AccroSignes - Cours de LSF à Grenoble',
  description:
    "Association dédiée à l'apprentissage de la Langue des Signes Française et aux rencontres entre sourds et entendants à Grenoble.",
  icons: {
    icon: '/icon-192.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'AccroSignes - Cours de LSF à Grenoble',
    description:
      "Association dédiée à l'apprentissage de la Langue des Signes Française et aux rencontres entre sourds et entendants à Grenoble.",
    images: [
      { url: '/logo.jpeg', width: 512, height: 512, alt: 'Logo AccroSignes' },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AccroSignes - Cours de LSF à Grenoble',
    description:
      "Association dédiée à l'apprentissage de la Langue des Signes Française et aux rencontres entre sourds et entendants à Grenoble.",
    images: ['/logo.jpeg'],
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="bg-white dark:bg-gray-950">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <Navigation />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
