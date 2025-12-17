import Image from "next/image";
import Link from "next/link";
import Title from "@/components/title";
import Typography from "@/components/typography";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.jpeg"
              alt="Accrosignes Logo"
              width={120}
              height={120}
              className="rounded-full object-cover shadow-lg"
            />
          </div>

          {/* 404 Text */}
          <div className="space-y-4">
            <div className="text-6xl font-bold text-teal-600">404</div>
            <Title level="h1" className="text-gray-900">
              Page non trouvée
            </Title>
            <Typography variant="body-lg" className="text-gray-600">
              Oups! La page que vous recherchez n&apos;existe pas ou a été supprimée.
            </Typography>
          </div>

          {/* Illustration */}
          <div className="py-8">
            <div className="text-6xl">🤷</div>
          </div>

          {/* Description */}
          <Typography variant="body-lg" className="text-gray-600 max-w-md mx-auto">
            Nous n&apos;avons pas trouvé ce que vous cherchez. Peut-être souhaitez-vous retourner à la page d&apos;accueil ou explorer nos autres pages?
          </Typography>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              href="/"
              className="cursor-pointer px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-200 flex items-center justify-center"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/presentation-d-accrosignes"
              className="cursor-pointer px-8 py-3 border-2 border-teal-600 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition duration-200 flex items-center justify-center"
            >
              Découvrir Accrosignes
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <Typography variant="body-sm" className="font-semibold text-gray-900">
              Pages populaires:
            </Typography>
            <div className="space-y-2">
              <Link
                href="/cours-de-lsf"
                className="cursor-pointer block text-teal-600 hover:underline"
              >
                Nos cours de LSF
              </Link>
              <Link
                href="/agenda"
                className="cursor-pointer block text-teal-600 hover:underline"
              >
                Agenda et événements
              </Link>
              <Link
                href="/nous-contacter"
                className="cursor-pointer block text-teal-600 hover:underline"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
