import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/organisms/navigation";
import Footer from "@/components/organisms/footer";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Accrosignes - Cours de LSF à Grenoble",
  description:
    "Association dédiée à l'apprentissage de la Langue des Signes Française et aux rencontres entre sourds et entendants",
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
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
    <html lang="en" className="bg-white dark:bg-gray-950">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <Navigation />
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
