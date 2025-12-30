import Title from "@/components/atoms/title";
import Typography from "@/components/atoms/typography";

export default function InscriptionPage() {
  const steps = [
    {
      number: 1,
      title: "Choisir votre cours",
      description: "Explorez nos différents niveaux et trouvez le cours qui vous convient.",
    },
    {
      number: 2,
      title: "Remplir le formulaire",
      description: "Complétez vos informations personnelles et préférences de calendrier.",
    },
    {
      number: 3,
      title: "Effectuer le paiement",
      description: "Payez en ligne de manière sécurisée via notre plateforme.",
    },
    {
      number: 4,
      title: "Confirmation",
      description: "Recevez une confirmation par e-mail avec tous les détails du cours.",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <Title level="h1" className="text-gray-900 dark:text-gray-100">
              S&apos;inscrire à nos Cours
            </Title>
            <Typography variant="subtitle" className="text-teal-600 dark:text-teal-400">
              Rejoignez notre communauté d&apos;apprenants
            </Typography>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="space-y-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-600 text-white font-bold text-lg mx-auto">
                  {step.number}
                </div>
                <div className="space-y-2 text-center">
                  <Title level="h3" className="text-gray-900 dark:text-gray-100">
                    {step.title}
                  </Title>
                  <Typography variant="body-sm" className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </Typography>
                </div>
              </div>
            ))}
          </div>

          {/* Course Selection */}
          <div className="space-y-6">
            <Title level="h2" className="text-gray-900 dark:text-gray-100">
              Nos Cours Disponibles
            </Title>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  level: "Débutant",
                  description: "Parfait pour commencer votre voyage dans la LSF",
                  price: "120€",
                  duration: "8 semaines",
                },
                {
                  level: "Intermédiaire",
                  description: "Pour approfondir vos connaissances",
                  price: "150€",
                  duration: "10 semaines",
                },
                {
                  level: "Avancé",
                  description: "Maîtrisez les nuances de la LSF",
                  price: "180€",
                  duration: "12 semaines",
                },
                {
                  level: "Intensif",
                  description: "Progression rapide et intensive",
                  price: "250€",
                  duration: "4 semaines",
                },
              ].map((course) => (
                <div
                  key={course.level}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition space-y-4"
                >
                  <div className="space-y-2">
                    <Title level="h3" className="text-gray-900 dark:text-gray-100">
                      {course.level}
                    </Title>
                    <Typography variant="body-lg" className="text-gray-600 dark:text-gray-300">
                      {course.description}
                    </Typography>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <Typography variant="body-sm" className="text-gray-500 dark:text-gray-400">
                        Durée
                      </Typography>
                      <Typography variant="body-lg" className="font-semibold text-gray-900 dark:text-gray-100">
                        {course.duration}
                      </Typography>
                    </div>
                    <div className="text-right">
                      <Typography variant="body-sm" className="text-gray-500 dark:text-gray-400">
                        Prix
                      </Typography>
                      <Typography variant="body-lg" className="font-semibold text-teal-600 dark:text-teal-400">
                        {course.price}
                      </Typography>
                    </div>
                  </div>
                  <button className="cursor-pointer w-full px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition">
                    S&apos;inscrire
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-teal-50 dark:bg-teal-950 rounded-lg p-8 space-y-4">
            <Title level="h2" className="text-gray-900 dark:text-gray-100">
              Conditions d&apos;inscription
            </Title>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex gap-3">
                <span className="text-teal-600 dark:text-teal-400">✓</span>
                <span>Être âgé de 16 ans minimum</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600 dark:text-teal-400">✓</span>
                <span>Avoir une connexion internet stable (pour les cours en ligne)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600 dark:text-teal-400">✓</span>
                <span>Engagez-vous à participer régulièrement</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600 dark:text-teal-400">✓</span>
                <span>Respecter notre code de conduite communautaire</span>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="space-y-6">
            <Title level="h2" className="text-gray-900 dark:text-gray-100">
              Questions Fréquentes
            </Title>
            <div className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-2">
                <Typography variant="body-lg" className="font-semibold text-gray-900 dark:text-gray-100">
                  Puis-je changer de cours après m&apos;être inscrit?
                </Typography>
                <Typography variant="body-sm" className="text-gray-600 dark:text-gray-300">
                  Oui, vous pouvez changer de cours avant le début du cours. Contactez-nous pour modifier votre inscription.
                </Typography>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-2">
                <Typography variant="body-lg" className="font-semibold text-gray-900 dark:text-gray-100">
                  Avez-vous une politique de remboursement?
                </Typography>
                <Typography variant="body-sm" className="text-gray-600 dark:text-gray-300">
                  Oui, remboursement complet si annulation 7 jours avant le début du cours.
                </Typography>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-2">
                <Typography variant="body-lg" className="font-semibold text-gray-900 dark:text-gray-100">
                  Les cours sont-ils en ligne ou en personne?
                </Typography>
                <Typography variant="body-sm" className="text-gray-600 dark:text-gray-300">
                  Nous proposons les deux! Vérifiez les détails de chaque cours lors de l&apos;inscription.
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
