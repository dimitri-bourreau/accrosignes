import Link from 'next/link';
import Title from '../atoms/title';
import Typography from '../atoms/typography';

interface Feature {
  emoji: string;
  title: string;
  text: string;
}

interface HomeIntroductionProps {
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
}

export default function HomeIntroduction({
  title,
  subtitle,
  description,
  features,
}: HomeIntroductionProps) {
  return (
    <section className="relative px-6 pt-6 pb-12 md:pt-8 md:pb-16 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="absolute top-20 right-10 w-72 h-72 bg-teal-500/10 rounded-full opacity-10 animate-shimmer blur-3xl" />
      <div
        className="absolute -bottom-40 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full opacity-5 animate-shimmer blur-3xl"
        style={{ animationDelay: '1s' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-10 items-center">
          <div className="rounded-2xl overflow-clip shadow-xl mx-auto lg:mx-0 max-w-[280px] lg:max-w-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-auto"
            >
              <source src="/home-video.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="flex flex-col gap-5">
            <div className="space-y-2">
              <Title level="h1" className="text-gray-900 dark:text-gray-100">
                {title}
              </Title>
              <Typography
                variant="subtitle"
                className="text-teal-600 dark:text-teal-400"
              >
                {subtitle}
              </Typography>
            </div>

            <Typography
              variant="body-lg"
              className="text-gray-600 dark:text-gray-300"
            >
              {description}
            </Typography>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/presentation-d-accrosignes"
                className="cursor-pointer px-8 py-3 bg-teal-600 dark:bg-teal-500 text-white rounded-lg font-semibold hover:opacity-90 hover:shadow-md transition-all duration-200 flex items-center justify-center"
              >
                L&apos;association
              </Link>
              <Link
                href="/agenda"
                className="cursor-pointer px-8 py-3 border-2 border-teal-600 dark:border-teal-500 text-teal-600 dark:text-teal-400 rounded-lg font-semibold hover:bg-teal-50 dark:hover:bg-teal-950 hover:shadow-md transition-all duration-200 flex items-center justify-center"
              >
                Voir l&apos;agenda
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-gray-200 dark:border-gray-800">
              {features.map((feature, index) => (
                <div key={index} className="space-y-1">
                  <Typography className="text-2xl!">{feature.emoji}</Typography>
                  <Title
                    level="h4"
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {feature.title}
                  </Title>
                  <Typography variant="caption" className="line-clamp-2">
                    {feature.text}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
