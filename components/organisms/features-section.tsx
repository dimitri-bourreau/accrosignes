import Title from "../atoms/title";
import Typography from "../atoms/typography";

export default function FeaturesSection() {
  return (
    <section className="px-6 py-20 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto">
        <Title
          level="h2"
          className="text-gray-900 dark:text-gray-100 text-center mb-16"
        >
          Ce que nous proposons
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 space-y-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition duration-200">
            <Typography className="text-3xl!">👐</Typography>
            <Title level="h4" className="text-gray-900 dark:text-gray-100">
              Cours de LSF
            </Title>
            <Typography variant="caption">
              Apprenez la Langue des Signes Française avec nos instructeurs
              sourds expérimentés
            </Typography>
          </div>
          <div className="p-6 space-y-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition duration-200">
            <Typography className="text-3xl!">🤝</Typography>
            <Title level="h4" className="text-gray-900 dark:text-gray-100">
              Rencontres
            </Title>
            <Typography variant="caption">
              Cafés signés, ateliers et événements communautaires inclusifs
            </Typography>
          </div>
          <div className="p-6 space-y-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition duration-200">
            <Typography className="text-3xl!">📚</Typography>
            <Title level="h4" className="text-gray-900 dark:text-gray-100">
              Ressources
            </Title>
            <Typography variant="caption">
              Documents, vidéos et supports pédagogiques pour nos membres
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}
