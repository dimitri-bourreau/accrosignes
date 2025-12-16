import Title from "./title";
import Typography from "./typography";

export default function Footer() {
  return (
    <footer className="px-6 py-12 bg-gray-900 text-gray-400">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Title level="h4" className="text-white mb-4">
              Navigation
            </Title>
            <div className="space-y-2">
              <button className="cursor-pointer block hover:text-white transition">
                <Typography variant="body-sm">Actualités</Typography>
              </button>
              <button className="cursor-pointer block hover:text-white transition">
                <Typography variant="body-sm">Agenda</Typography>
              </button>
              <button className="cursor-pointer block hover:text-white transition">
                <Typography variant="body-sm">Espace membres</Typography>
              </button>
            </div>
          </div>
          <div>
            <Title level="h4" className="text-white mb-4">
              Infos
            </Title>
            <div className="space-y-2">
              <button className="cursor-pointer block hover:text-white transition">
                <Typography variant="body-sm">Nous contacter</Typography>
              </button>
              <button className="cursor-pointer block hover:text-white transition">
                <Typography variant="body-sm">Tarifs</Typography>
              </button>
              <button className="cursor-pointer block hover:text-white transition">
                <Typography variant="body-sm">FAQ</Typography>
              </button>
            </div>
          </div>
          <div>
            <Title level="h4" className="text-white mb-4">
              Légal
            </Title>
            <div className="space-y-2">
              <button className="cursor-pointer block hover:text-white transition">
                <Typography variant="body-sm">Mentions légales</Typography>
              </button>
              <button className="cursor-pointer block hover:text-white transition">
                <Typography variant="body-sm">
                  Politique de confidentialité
                </Typography>
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <Typography variant="body-sm">
            &copy; 2025 Accrosignes. Tous droits réservés.
          </Typography>
        </div>
      </div>
    </footer>
  );
}
