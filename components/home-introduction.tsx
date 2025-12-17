import Image from "next/image";
import Link from "next/link";
import Title from "./title";
import Typography from "./typography";

export default function HomeIntroduction() {
  return (
    <section className="relative pt-12 pb-0 px-6 bg-linear-to-b from-gray-50 to-white overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-teal-100 rounded-full opacity-10 animate-shimmer blur-3xl"></div>
      <div
        className="absolute -bottom-40 left-1/4 w-96 h-96 bg-amber-100 rounded-full opacity-5 animate-shimmer blur-3xl"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Photo - Left on Desktop */}
          <div className="flex justify-center md:order-1 md:pb-0">
            <div className="relative w-full">
              <Image
                src="/photo-des-goat.png"
                alt="Communauté Accrosignes - cours de LSF"
                width={600}
                height={700}
                className="w-full h-auto drop-shadow-lg"
                priority
              />
            </div>
          </div>

          {/* Content - Right on Desktop */}
          <div className="space-y-6 md:order-2 pb-20">
            <div className="space-y-3">
              <Title level="h1" className="text-gray-900">
                Apprenez la LSF
              </Title>
              <Typography variant="subtitle" className="text-teal-600">
                Ensemble à Grenoble
              </Typography>
            </div>

            <Typography variant="body-lg" className="text-gray-600">
              Cours de Langue des Signes Française et rencontres authentiques
              entre sourds et entendants
            </Typography>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href="/presentation-d-accrosignes"
                className="cursor-pointer px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 hover:shadow-md transition-all duration-200 flex items-center justify-center"
              >
                L&apos;association
              </Link>
              <Link
                href="/agenda"
                className="cursor-pointer px-8 py-3 border-2 border-teal-600 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 hover:shadow-md transition-all duration-200 flex items-center justify-center"
              >
                Voir l&apos;agenda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
