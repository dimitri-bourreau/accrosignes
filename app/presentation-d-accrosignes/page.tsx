import Image from "next/image";
import Title from "@/components/atoms/title";
import HtmlContent from "@/components/atoms/html-content";
import { getContentByKey } from "@/features/content/services/get-content.service";

export const revalidate = 300;

const DEFAULT_CONTENT = `
<p>Accrosignes est une association basée à Grenoble dédiée à l'enseignement et la promotion de la Langue des Signes Française (LSF). Notre mission est de créer un pont authentique entre les communautés sourdes et entendantes.</p>

<h2>Nos Valeurs</h2>
<ul>
  <li>Inclusivité et accessibilité pour tous</li>
  <li>Respect de la culture sourde</li>
  <li>Apprentissage authentique avec des instructeurs sourds</li>
  <li>Création d'une communauté bienveillante</li>
</ul>

<h2>Nos Cours</h2>
<p>Nous proposons des cours de LSF adaptés à tous les niveaux, du débutant à l'avancé. Chaque cours est conçu pour développer vos compétences linguistiques tout en découvrant la riche culture de la communauté sourde.</p>

<h2>Notre Communauté</h2>
<p>Au-delà de l'apprentissage, Accrosignes organise régulièrement des rencontres, événements sociaux et ateliers pour favoriser les échanges authentiques entre sourds et entendants. Rejoignez-nous pour être partie d'une communauté dynamique et accueillante.</p>
`;

export default async function PresentationPage() {
  const content = await getContentByKey("about");

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-12">
          <div className="flex justify-center">
            <Image
              src="/logo.jpeg"
              alt="Accrosignes Logo"
              width={200}
              height={200}
              className="rounded-full object-cover shadow-lg"
            />
          </div>

          <div className="space-y-8">
            <Title level="h1" className="text-gray-900 dark:text-gray-100 text-center">
              Accrosignes
            </Title>
            <HtmlContent
              html={content ?? DEFAULT_CONTENT}
              className="text-gray-600 dark:text-gray-300"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
