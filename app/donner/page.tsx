import Title from "@/components/title";
import Typography from "@/components/typography";

export default function DonnerPage() {
  const donationOptions = [
    {
      amount: 10,
      description: "Soutien ponctuel",
      impact: "Permet l'achat de ressources pédagogiques",
    },
    {
      amount: 25,
      description: "Contributeur régulier",
      impact: "Aide à financer une session de cours",
    },
    {
      amount: 50,
      description: "Soutien significatif",
      impact: "Contribue à l'organisation d'un événement communautaire",
    },
    {
      amount: 100,
      description: "Bienfaiteur",
      impact: "Soutient directement nos instructeurs sourds",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center">
            <Title level="h1" className="text-gray-900">
              Soutenir Accrosignes
            </Title>
            <Typography variant="subtitle" className="text-teal-600">
              Votre don fait une vraie différence
            </Typography>
          </div>

          {/* Impact Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-teal-50 rounded-lg p-6 space-y-3 text-center">
              <Title level="h3" className="text-gray-900">
                +200
              </Title>
              <Typography variant="body-lg" className="text-gray-600">
                Membres actifs dans notre communauté
              </Typography>
            </div>
            <div className="bg-teal-50 rounded-lg p-6 space-y-3 text-center">
              <Title level="h3" className="text-gray-900">
                12
              </Title>
              <Typography variant="body-lg" className="text-gray-600">
                Cours proposés chaque mois
              </Typography>
            </div>
            <div className="bg-teal-50 rounded-lg p-6 space-y-3 text-center">
              <Title level="h3" className="text-gray-900">
                30+
              </Title>
              <Typography variant="body-lg" className="text-gray-600">
                Événements organisés par an
              </Typography>
            </div>
          </div>

          {/* Why Donate */}
          <div className="space-y-4">
            <Title level="h2" className="text-gray-900">
              Pourquoi donner?
            </Title>
            <Typography variant="body-lg" className="text-gray-600">
              Accrosignes est une association à but non-lucratif. Chaque don nous aide à:
            </Typography>
            <ul className="space-y-2 text-gray-600">
              <li className="flex gap-3">
                <span className="text-teal-600">✓</span>
                <span>Rémunérer équitablement nos instructeurs sourds</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600">✓</span>
                <span>Développer des ressources pédagogiques inclusives</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600">✓</span>
                <span>Organiser des événements communautaires</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600">✓</span>
                <span>Rendre l'apprentissage de la LSF accessible à tous</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600">✓</span>
                <span>Promouvoir la culture sourde et l'inclusion</span>
              </li>
            </ul>
          </div>

          {/* Donation Options */}
          <div className="space-y-4">
            <Title level="h2" className="text-gray-900">
              Choisissez votre montant
            </Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {donationOptions.map((option) => (
                <button
                  key={option.amount}
                  className="cursor-pointer text-left border-2 border-gray-200 rounded-lg p-6 hover:border-teal-600 hover:bg-teal-50 transition space-y-3"
                >
                  <Title level="h3" className="text-teal-600">
                    {option.amount}€
                  </Title>
                  <Typography variant="body-lg" className="font-semibold text-gray-900">
                    {option.description}
                  </Typography>
                  <Typography variant="body-sm" className="text-gray-600">
                    {option.impact}
                  </Typography>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="bg-gray-50 rounded-lg p-8 space-y-4">
            <Title level="h2" className="text-gray-900">
              Autre montant
            </Title>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Montant en €"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
                min="1"
              />
              <button className="cursor-pointer px-8 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition">
                Donner
              </button>
            </div>
          </div>

          {/* Other Ways to Help */}
          <div className="border-t border-gray-200 pt-12 space-y-4">
            <Title level="h2" className="text-gray-900">
              Autres façons de nous soutenir
            </Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Typography variant="body-lg" className="font-semibold text-gray-900">
                  Devenir bénévole
                </Typography>
                <Typography variant="body-sm" className="text-gray-600">
                  Aidez-nous à organiser des événements et ateliers
                </Typography>
              </div>
              <div className="space-y-2">
                <Typography variant="body-lg" className="font-semibold text-gray-900">
                  Partager nos ressources
                </Typography>
                <Typography variant="body-sm" className="text-gray-600">
                  Parlez de nous dans votre réseau et sur les réseaux sociaux
                </Typography>
              </div>
              <div className="space-y-2">
                <Typography variant="body-lg" className="font-semibold text-gray-900">
                  Partenariat professionnel
                </Typography>
                <Typography variant="body-sm" className="text-gray-600">
                  Collaborez avec nous pour des projets communs
                </Typography>
              </div>
              <div className="space-y-2">
                <Typography variant="body-lg" className="font-semibold text-gray-900">
                  Adhésion annuelle
                </Typography>
                <Typography variant="body-sm" className="text-gray-600">
                  Devenez membre et bénéficiez de tarifs préférentiels
                </Typography>
              </div>
            </div>
          </div>

          {/* Tax Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-2">
            <Typography variant="body-sm" className="font-semibold text-blue-900">
              💙 Déduction fiscale
            </Typography>
            <Typography variant="body-sm" className="text-blue-800">
              Accrosignes est une association loi 1901. Vos dons ouvrent droit à une réduction d&apos;impôt sur le revenu de 66% (dans la limite de 20% de votre revenu imposable).
            </Typography>
          </div>
        </div>
      </div>
    </main>
  );
}
