"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }
        @keyframes fadeInBlur {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(4px);
          }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        .animate-fadeInBlur {
          animation: fadeInBlur 0.3s ease-out forwards;
        }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.jpeg"
                alt="Accrosignes logo"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
              <span className="font-bold text-base sm:text-lg text-gray-900">Accrosignes</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex gap-8 text-sm text-gray-600 font-medium">
              <button className="cursor-pointer hover:text-teal-600 transition duration-200">Accueil</button>
              <button className="cursor-pointer hover:text-teal-600 transition duration-200">Actualités</button>
              <button className="cursor-pointer hover:text-teal-600 transition duration-200">Agenda</button>
              <button className="cursor-pointer hover:text-teal-600 transition duration-200">Membres</button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="sm:hidden cursor-pointer p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-gray-900 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-gray-900 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-gray-900 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 sm:hidden animate-fadeInBlur"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 sm:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 cursor-pointer p-2"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <div className="w-6 h-6 relative">
            <span className="absolute block h-0.5 w-full bg-gray-900 rotate-45 top-1/2"></span>
            <span className="absolute block h-0.5 w-full bg-gray-900 -rotate-45 top-1/2"></span>
          </div>
        </button>

        <div className="flex flex-col p-6 space-y-6 mt-16">
          <button className="cursor-pointer text-left text-lg text-gray-900 hover:text-teal-600 transition duration-200" onClick={() => setMenuOpen(false)}>Accueil</button>
          <button className="cursor-pointer text-left text-lg text-gray-900 hover:text-teal-600 transition duration-200" onClick={() => setMenuOpen(false)}>Actualités</button>
          <button className="cursor-pointer text-left text-lg text-gray-900 hover:text-teal-600 transition duration-200" onClick={() => setMenuOpen(false)}>Agenda</button>
          <button className="cursor-pointer text-left text-lg text-gray-900 hover:text-teal-600 transition duration-200" onClick={() => setMenuOpen(false)}>Membres</button>
        </div>
      </div>

      {/* Hero Section - Photo Primary */}
      <section className="relative pt-12 pb-0 px-6 bg-linear-to-b from-gray-50 to-white">
        {/* Subtle background elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-teal-100 rounded-full opacity-10 animate-shimmer blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-amber-100 rounded-full opacity-5 animate-shimmer blur-3xl" style={{ animationDelay: "1s" }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Photo - Left on Desktop */}
            <div className="flex justify-center md:order-1 md:pb-0">
              <div className="relative w-full">
                <Image
                  src="/photo-des-goat.png"
                  alt="Communauté Accrosignes - cours de LSF"
                  width={600}
                  height={700}
                  className="w-full h-auto drop-shadow-lg"
                  priority
                />
              </div>
            </div>

            {/* Content - Right on Desktop */}
            <div className="space-y-6 md:order-2 pb-20">
              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Apprenez la LSF
                </h1>
                <p className="text-2xl text-teal-600 font-semibold">Ensemble à Grenoble</p>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                Cours de Langue des Signes Française et rencontres authentiques entre sourds et entendants
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button className="cursor-pointer px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 hover:shadow-md transition-all duration-200">
                  Découvrir les cours
                </button>
                <button className="cursor-pointer px-8 py-3 border-2 border-teal-600 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-all duration-200">
                  Voir l&apos;agenda
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="px-6 py-20 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Ce que nous proposons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 space-y-3 hover:bg-gray-50 rounded-lg transition duration-200">
              <p className="text-3xl">👐</p>
              <h3 className="text-lg font-semibold text-gray-900">Cours de LSF</h3>
              <p className="text-gray-600">
                Apprenez la Langue des Signes Française avec nos instructeurs sourds expérimentés
              </p>
            </div>
            <div className="p-6 space-y-3 hover:bg-gray-50 rounded-lg transition duration-200">
              <p className="text-3xl">🤝</p>
              <h3 className="text-lg font-semibold text-gray-900">Rencontres</h3>
              <p className="text-gray-600">
                Cafés signés, ateliers et événements communautaires inclusifs
              </p>
            </div>
            <div className="p-6 space-y-3 hover:bg-gray-50 rounded-lg transition duration-200">
              <p className="text-3xl">📚</p>
              <h3 className="text-lg font-semibold text-gray-900">Ressources</h3>
              <p className="text-gray-600">
                Documents, vidéos et supports pédagogiques pour nos membres
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="px-6 py-20 bg-teal-50">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold text-gray-900">Soutenir notre association</h2>
            <p className="text-lg text-gray-600">
              Vos dons nous permettent de développer nos activités et d&apos;accueillir tous les niveaux
            </p>
          </div>
          <button className="cursor-pointer px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-200">
            Faire un don
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-gray-400">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-4">Navigation</h4>
              <div className="space-y-2">
                <button className="cursor-pointer block hover:text-white transition">Actualités</button>
                <button className="cursor-pointer block hover:text-white transition">Agenda</button>
                <button className="cursor-pointer block hover:text-white transition">Espace membres</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Infos</h4>
              <div className="space-y-2">
                <button className="cursor-pointer block hover:text-white transition">Nous contacter</button>
                <button className="cursor-pointer block hover:text-white transition">Tarifs</button>
                <button className="cursor-pointer block hover:text-white transition">FAQ</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Légal</h4>
              <div className="space-y-2">
                <button className="cursor-pointer block hover:text-white transition">Mentions légales</button>
                <button className="cursor-pointer block hover:text-white transition">Politique de confidentialité</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 Accrosignes. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
