import SocialLinksSection from '@/components/organisms/social-links-section';
import Title from '@/components/atoms/title';
import Typography from '@/components/atoms/typography';

export default function NousContacterPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-16">
        {/* Hero */}
        <div className="text-center space-y-4">
          <Title level="h1" className="text-gray-900 dark:text-gray-100">
            Nous Contacter
          </Title>
          <Typography
            variant="body-lg"
            className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto"
          >
            Une question sur nos cours de LSF, nos événements ou
            l&apos;association ? N&apos;hésitez pas à nous écrire, nous vous
            répondrons rapidement.
          </Typography>
        </div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Email card */}
          <a
            href="mailto:accrosignes@asg38.fr"
            className="group flex flex-col items-center gap-4 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-teal-300 dark:hover:border-teal-700 bg-gray-50 dark:bg-gray-900 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition duration-300">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <div className="text-center space-y-1">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Email
              </p>
              <p className="text-teal-600 dark:text-teal-400 font-medium">
                accrosignes@asg38.fr
              </p>
            </div>
          </a>

          {/* Location card */}
          <div className="flex flex-col items-center gap-4 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <div className="text-center space-y-1">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Localisation
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Grenoble, Isère
              </p>
            </div>
          </div>
        </div>

        {/* Social links */}
        <SocialLinksSection embedded />
      </div>
    </main>
  );
}
