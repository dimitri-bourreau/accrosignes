import Title from "@/components/atoms/title";
import Typography from "@/components/atoms/typography";

export const revalidate = 86400;

export default function CoursPage() {
  const courses = [
    {
      level: "Débutant",
      duration: "8 semaines",
      schedule: "Lundi et mercredi 19h00-20h30",
      description: "Découvrez les bases de la LSF, l&apos;alphabet signé, et les conversations simples du quotidien.",
      price: "120€",
    },
    {
      level: "Intermédiaire",
      duration: "10 semaines",
      schedule: "Mardi et jeudi 19h00-20h30",
      description: "Approfondissez votre compréhension, augmentez votre vocabulaire et pratiquez des conversations plus complexes.",
      price: "150€",
    },
    {
      level: "Avancé",
      duration: "12 semaines",
      schedule: "Samedi 10h00-12h00",
      description: "Maîtrisez les nuances de la LSF, participez à des discussions, et explorez la culture sourde en profondeur.",
      price: "180€",
    },
    {
      level: "Intensif",
      duration: "4 semaines",
      schedule: "Tous les jours 18h00-19h30",
      description: "Un programme intensif pour les apprenants motivés cherchant à progresser rapidement.",
      price: "250€",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="space-y-12">
          <div className="space-y-4">
            <Title level="h1" className="text-gray-900 dark:text-gray-100">
              Nos Cours de LSF
            </Title>
            <Typography variant="subtitle" className="text-teal-600 dark:text-teal-400">
              Trouvez le cours adapté à votre niveau
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div
                key={course.level}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <Title level="h3" className="text-gray-900 dark:text-gray-100 mb-4">
                  {course.level}
                </Title>

                <div className="space-y-4">
                  <div>
                    <Typography variant="body-sm" className="text-gray-500 dark:text-gray-400">
                      Durée
                    </Typography>
                    <Typography variant="body-lg" className="text-gray-700 dark:text-gray-200">
                      {course.duration}
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="body-sm" className="text-gray-500 dark:text-gray-400">
                      Horaire
                    </Typography>
                    <Typography variant="body-lg" className="text-gray-700 dark:text-gray-200">
                      {course.schedule}
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="body-lg" className="text-gray-600 dark:text-gray-300">
                      {course.description}
                    </Typography>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Typography variant="body-lg" className="font-semibold text-teal-600 dark:text-teal-400">
                      {course.price}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-teal-50 dark:bg-teal-950 rounded-lg p-8 space-y-4">
            <Title level="h2" className="text-gray-900 dark:text-gray-100">
              Rejoins-nous!
            </Title>
            <Typography variant="body-lg" className="text-gray-600 dark:text-gray-300">
              Les inscriptions sont ouvertes toute l&apos;année. Contacte-nous pour plus d&apos;informations ou pour t&apos;inscrire à un cours.
            </Typography>
          </div>
        </div>
      </div>
    </main>
  );
}
