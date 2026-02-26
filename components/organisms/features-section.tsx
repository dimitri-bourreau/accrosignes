import Title from '../atoms/title';
import Typography from '../atoms/typography';

interface Feature {
  emoji: string;
  title: string;
  text: string;
}

interface FeaturesSectionProps {
  title: string;
  features: Feature[];
}

export default function FeaturesSection({
  title,
  features,
}: FeaturesSectionProps) {
  return (
    <section className="px-6 py-20 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto">
        <Title
          level="h2"
          className="text-gray-900 dark:text-gray-100 text-center mb-16"
        >
          {title}
        </Title>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 space-y-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition duration-200"
            >
              <Typography className="text-3xl!">{feature.emoji}</Typography>
              <Title level="h4" className="text-gray-900 dark:text-gray-100">
                {feature.title}
              </Title>
              <Typography variant="caption">{feature.text}</Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
