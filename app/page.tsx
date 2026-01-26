import HomeIntroduction from "@/components/organisms/home-introduction";
import FeaturesSection from "@/components/organisms/features-section";
import { getContentByKey } from "@/features/content/services/get-content.service";

export const revalidate = 300;

export default async function Home() {
  const [
    title,
    subtitle,
    description,
    featuresTitle,
    feature1Emoji,
    feature1Title,
    feature1Text,
    feature2Emoji,
    feature2Title,
    feature2Text,
    feature3Emoji,
    feature3Title,
    feature3Text,
  ] = await Promise.all([
    getContentByKey("home.title"),
    getContentByKey("home.subtitle"),
    getContentByKey("home.description"),
    getContentByKey("home.features.title"),
    getContentByKey("home.feature1.emoji"),
    getContentByKey("home.feature1.title"),
    getContentByKey("home.feature1.text"),
    getContentByKey("home.feature2.emoji"),
    getContentByKey("home.feature2.title"),
    getContentByKey("home.feature2.text"),
    getContentByKey("home.feature3.emoji"),
    getContentByKey("home.feature3.title"),
    getContentByKey("home.feature3.text"),
  ]);

  const features = [
    {
      emoji: feature1Emoji ?? "👐",
      title: feature1Title ?? "Cours de LSF",
      text: feature1Text ?? "Apprenez la Langue des Signes Française avec nos instructeurs sourds expérimentés",
    },
    {
      emoji: feature2Emoji ?? "🤝",
      title: feature2Title ?? "Rencontres",
      text: feature2Text ?? "Cafés signés, ateliers et événements communautaires inclusifs",
    },
    {
      emoji: feature3Emoji ?? "📚",
      title: feature3Title ?? "Ressources",
      text: feature3Text ?? "Documents, vidéos et supports pédagogiques pour nos membres",
    },
  ];

  return (
    <>
      <HomeIntroduction
        title={title ?? "Apprenez la LSF"}
        subtitle={subtitle ?? "Ensemble à Grenoble"}
        description={description ?? "Cours de Langue des Signes Française et rencontres authentiques entre sourds et entendants"}
      />
      <FeaturesSection
        title={featuresTitle ?? "Ce que nous proposons"}
        features={features}
      />
    </>
  );
}
