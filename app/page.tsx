import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 animate-float">
              <Image
                src="/logo.jpeg"
                alt="Accrosignes logo"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </div>
            <span className="font-bold text-lg text-emerald-900">
              Accrosignes
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <button className="text-emerald-700 hover:text-teal-600 transition relative group">
              Accueil
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button className="text-emerald-700 hover:text-teal-600 transition relative group">
              Actualités
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button className="text-emerald-700 hover:text-teal-600 transition relative group">
              Agenda
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button className="text-emerald-700 hover:text-teal-600 transition relative group">
              Membres
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Photo */}
      <section className="relative px-6 py-20 overflow-hidden">
        <div className="absolute top-10 right-5 w-56 h-56 bg-teal-200 rounded-full opacity-20 animate-pulse-subtle"></div>
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-100 rounded-full opacity-30 animate-pulse-subtle"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Photo */}
            <div className="animate-slideIn flex justify-center md:justify-end">
              <Image
                src="/photo-des-goat.png"
                alt="Communauté Accrosignes"
                width={450}
                height={500}
                className="w-full max-w-sm h-auto drop-shadow-2xl"
                priority
              />
            </div>

            {/* Right: Content */}
            <div className="text-left space-y-8 animate-slideIn" style={{ animationDelay: "0.2s" }}>
              <div>
                <h1 className="text-5xl md:text-6xl font-black text-emerald-900 leading-tight mb-4">
                  Apprenez la LSF
                  <br />
                  <span className="text-teal-600">Ensemble</span>
                </h1>
                <p className="text-lg text-emerald-700 leading-relaxed">
                  Accrosignes : cours de Langue des Signes Française et rencontres authentiques entre sourds et entendants à Grenoble
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-teal-600 text-white rounded-full font-bold hover:bg-teal-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Découvrir les cours
                </button>
                <button className="px-8 py-4 border-2 border-teal-600 text-teal-600 rounded-full font-bold hover:bg-teal-50 transition-all duration-300">
                  Voir l&apos;agenda
                </button>
              </div>

              <div className="pt-4 space-y-3 text-sm text-emerald-700">
                <p className="font-semibold flex items-center gap-2">👐 Cours de LSF</p>
                <p className="font-semibold flex items-center gap-2">🤝 Rencontres & cafés signés</p>
                <p className="font-semibold flex items-center gap-2">📚 Ressources membres</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black text-emerald-900 text-center mb-16">
            Pourquoi nous rejoindre
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 border border-emerald-100">
              <div className="text-5xl mb-6 group-hover:animate-float">👐</div>
              <h3 className="text-xl font-bold text-emerald-900 mb-3">
                Cours de LSF
              </h3>
              <p className="text-emerald-700 leading-relaxed">
                Apprenez la Langue des Signes Française avec nos instructeurs
                sourds expérimentés et bienveillants
              </p>
            </div>
            <div className="group p-8 rounded-2xl bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 border border-emerald-100">
              <div
                className="text-5xl mb-6 group-hover:animate-float"
                style={{ animationDelay: "0.3s" }}
              >
                🤝
              </div>
              <h3 className="text-xl font-bold text-emerald-900 mb-3">
                Rencontres
              </h3>
              <p className="text-emerald-700 leading-relaxed">
                Participez à nos cafés signés, ateliers et événements
                communautaires inclusifs
              </p>
            </div>
            <div className="group p-8 rounded-2xl bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 border border-emerald-100">
              <div
                className="text-5xl mb-6 group-hover:animate-float"
                style={{ animationDelay: "0.6s" }}
              >
                📚
              </div>
              <h3 className="text-xl font-bold text-emerald-900 mb-3">
                Ressources
              </h3>
              <p className="text-emerald-700 leading-relaxed">
                Accédez à des documents, vidéos et supports pédagogiques
                exclusifs pour nos membres
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20 bg-linear-to-r from-teal-600 to-emerald-600 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
        <div className="max-w-3xl mx-auto relative z-10 text-center space-y-6">
          <h2 className="text-4xl font-black">Soutenir Accrosignes</h2>
          <p className="text-lg text-teal-100 leading-relaxed">
            Vos dons nous permettent de développer nos activités, de former nos
            instructeurs et d'accueillir tous les niveaux dans un espace
            bienveillant
          </p>
          <button className="px-8 py-4 bg-white text-teal-600 rounded-full font-bold hover:bg-teal-50 transition-all duration-300 hover:shadow-lg hover:scale-105">
            Faire un don
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-emerald-900 text-emerald-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-sm">
            <div>
              <h4 className="font-bold text-white mb-3">Navigation</h4>
              <div className="space-y-2">
                <button className="block hover:text-white transition">
                  Actualités
                </button>
                <button className="block hover:text-white transition">
                  Agenda
                </button>
                <button className="block hover:text-white transition">
                  Espace membres
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Infos</h4>
              <div className="space-y-2">
                <button className="block hover:text-white transition">
                  Nous contacter
                </button>
                <button className="block hover:text-white transition">
                  Tarifs
                </button>
                <button className="block hover:text-white transition">
                  FAQ
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Légal</h4>
              <div className="space-y-2">
                <button className="block hover:text-white transition">
                  Mentions légales
                </button>
                <button className="block hover:text-white transition">
                  Politique de confidentialité
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-emerald-800 pt-8 text-center">
            <p>&copy; 2025 Accrosignes. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
