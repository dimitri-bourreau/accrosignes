export default function FeaturesSection() {
  return (
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
              Apprenez la Langue des Signes Française avec nos instructeurs
              sourds expérimentés
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
  );
}
