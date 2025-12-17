import Title from "@/components/title";
import Typography from "@/components/typography";

export default function ActualitesPage() {
  const articles = [
    {
      id: 1,
      date: "2025-12-15",
      title: "Nouvel atelier cultural : Découverte du cinéma sourd",
      excerpt: "Nous organisons un atelier spécial où nous explorerons les films et la production audiovisuelle créée par et pour la communauté sourde.",
      category: "Événement",
    },
    {
      id: 2,
      date: "2025-12-10",
      title: "Session d'automne : Résultats et témoignages",
      excerpt: "Félicitations à tous nos participants! Découvrez les retours inspirants de ceux qui ont complété nos cours ce semestre.",
      category: "Succès",
    },
    {
      id: 3,
      date: "2025-12-01",
      title: "Partenariat avec l'école primaire Jean-Jaurès",
      excerpt: "Accrosignes s'est associée avec une école locale pour sensibiliser les enfants à la LSF dès le plus jeune âge.",
      category: "Partenariat",
    },
    {
      id: 4,
      date: "2025-11-25",
      title: "Conférence : La culture sourde en France",
      excerpt: "Un intervenant spécialiste nous parle de l'histoire, des traditions et de l'impact de la culture sourde en France.",
      category: "Conférence",
    },
    {
      id: 5,
      date: "2025-11-18",
      title: "Inscriptions ouvertes pour les cours d'hiver",
      excerpt: "Les places sont limitées! Inscrivez-vous dès maintenant pour les cours d'hiver qui débutent en janvier.",
      category: "Inscription",
    },
    {
      id: 6,
      date: "2025-11-10",
      title: "Bilan : 200 membres rejoignent notre communauté!",
      excerpt: "Merci à vous tous! Nous avons atteint le cap des 200 adhérents. Ensemble, nous construisons une belle communauté inclusive.",
      category: "Annonce",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-12">
          <div className="space-y-4">
            <Title level="h1" className="text-gray-900">
              Actualités
            </Title>
            <Typography variant="subtitle" className="text-teal-600">
              Restez informé de nos dernières nouvelles et événements
            </Typography>
          </div>

          <div className="space-y-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="border-b border-gray-200 pb-6 hover:bg-gray-50 p-4 rounded transition"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(article.date).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <Title level="h3" className="text-gray-900">
                      {article.title}
                    </Title>
                    <Typography variant="body-lg" className="text-gray-600">
                      {article.excerpt}
                    </Typography>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
