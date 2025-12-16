export default function Footer() {
  return (
    <footer className="px-6 py-12 bg-gray-900 text-gray-400">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-sm">
          <div>
            <h4 className="font-semibold text-white mb-4">Navigation</h4>
            <div className="space-y-2">
              <button className="cursor-pointer block hover:text-white transition">
                Actualités
              </button>
              <button className="cursor-pointer block hover:text-white transition">
                Agenda
              </button>
              <button className="cursor-pointer block hover:text-white transition">
                Espace membres
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Infos</h4>
            <div className="space-y-2">
              <button className="cursor-pointer block hover:text-white transition">
                Nous contacter
              </button>
              <button className="cursor-pointer block hover:text-white transition">
                Tarifs
              </button>
              <button className="cursor-pointer block hover:text-white transition">
                FAQ
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Légal</h4>
            <div className="space-y-2">
              <button className="cursor-pointer block hover:text-white transition">
                Mentions légales
              </button>
              <button className="cursor-pointer block hover:text-white transition">
                Politique de confidentialité
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2025 Accrosignes. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
