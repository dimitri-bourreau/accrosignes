import Image from "next/image";
import Title from "@/components/title";
import Typography from "@/components/typography";

export default function PresentationPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-12">
          {/* Logo Section */}
          <div className="flex justify-center">
            <Image
              src="/logo.jpeg"
              alt="Accrosignes Logo"
              width={200}
              height={200}
              className="rounded-full object-cover shadow-lg"
            />
          </div>

          {/* Presentation */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Title level="h1" className="text-gray-900 text-center">
                Accrosignes
              </Title>
              <Typography
                variant="subtitle"
                className="text-teal-600 text-center"
              >
                Apprendre la Langue des Signes Française à Grenoble
              </Typography>
            </div>

            <div className="space-y-6 text-gray-600">
              <Typography variant="body-lg">
                Accrosignes est une association basée à Grenoble dédiée à
                l&apos;enseignement et la promotion de la Langue des Signes
                Française (LSF). Notre mission est de créer un pont authentique
                entre les communautés sourdes et entendantes.
              </Typography>

              <div className="space-y-4">
                <Title level="h2" className="text-gray-900">
                  Nos Valeurs
                </Title>

                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <Typography variant="body-lg">
                      Inclusivité et accessibilité pour tous
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body-lg">
                      Respect de la culture sourde
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body-lg">
                      Apprentissage authentique avec des instructeurs sourds
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body-lg">
                      Création d&apos;une communauté bienveillante
                    </Typography>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <Title level="h2" className="text-gray-900">
                  Nos Cours
                </Title>
                <Typography variant="body-lg">
                  Nous proposons des cours de LSF adaptés à tous les niveaux, du
                  débutant à l&apos;avancé. Chaque cours est conçu pour
                  développer vos compétences linguistiques tout en découvrant la
                  riche culture de la communauté sourde.
                </Typography>
              </div>

              <div className="space-y-4">
                <Title level="h2" className="text-gray-900">
                  Notre Communauté
                </Title>
                <Typography variant="body-lg">
                  Au-delà de l&apos;apprentissage, Accrosignes organise
                  régulièrement des rencontres, événements sociaux et ateliers
                  pour favoriser les échanges authentiques entre sourds et
                  entendants. Rejoignez-nous pour être partie d&apos;une
                  communauté dynamique et accueillante.
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
