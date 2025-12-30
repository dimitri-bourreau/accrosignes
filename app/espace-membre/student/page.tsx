"use client";

import { useAuth } from "@/contexts/AuthContext";
import Title from "@/components/atoms/title";
import Typography from "@/components/atoms/typography";
import Link from "next/link";

export default function StudentDashboard() {
  const { user, role, loading, signOut } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <Typography className="text-gray-600 dark:text-gray-300">Vérification des permissions...</Typography>
      </main>
    );
  }

  if (role !== "Élève") {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Title level="h1" className="text-gray-900 dark:text-gray-100">
            Accès refusé
          </Title>
          <Typography variant="body-lg" className="text-gray-600 dark:text-gray-300">
            Vous n&apos;avez pas les permissions pour accéder à cette page.
          </Typography>
          <Link
            href="/espace-membre"
            className="inline-block px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
          >
            Retour à l&apos;espace membres
          </Link>
        </div>
      </main>
    );
  }

  const resources = [
    {
      id: 1,
      title: "Guide d'initiation LSF",
      description: "Guide complet pour débuter en Langue des Signes Française",
      category: "Initiation",
    },
    {
      id: 2,
      title: "Vocabulaire niveau 1",
      description: "Vocabulaire de base pour le niveau 1",
      category: "Niveau 1",
    },
    {
      id: 3,
      title: "Vocabulaire niveau 2",
      description: "Vocabulaire intermédiaire pour le niveau 2",
      category: "Niveau 2",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between items-start mb-12">
          <div>
            <Title level="h1" className="text-gray-900 dark:text-gray-100 mb-2">
              Bienvenue, {user?.email?.split("@")[0] || "Élève"}!
            </Title>
            <Typography variant="body-lg" className="text-gray-600 dark:text-gray-300">
              Accédez à vos ressources pédagogiques
            </Typography>
          </div>
          <button
            onClick={() => signOut()}
            className="cursor-pointer px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
          >
            Déconnexion
          </button>
        </div>

        <div className="space-y-8">
          {/* Resources Section */}
          <section className="space-y-6">
            <div>
              <Title level="h2" className="text-gray-900 dark:text-gray-100 mb-2">
                Ressources disponibles
              </Title>
              <Typography variant="body-lg" className="text-gray-600 dark:text-gray-300">
                Téléchargez les documents et supports pédagogiques
              </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-md transition duration-200"
                >
                  <div className="space-y-3">
                    <div className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 rounded-full text-sm font-semibold">
                      {resource.category}
                    </div>
                    <Title level="h4" className="text-gray-900 dark:text-gray-100">
                      {resource.title}
                    </Title>
                    <Typography variant="caption" className="text-gray-600 dark:text-gray-300">
                      {resource.description}
                    </Typography>
                    <button className="cursor-pointer mt-4 flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold hover:underline">
                      <span>Télécharger</span>
                      <span>📥</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Info Section */}
          <section className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-6 space-y-3">
            <Typography className="font-semibold text-teal-900 dark:text-teal-100">
              ℹ️ Besoin d&apos;aide?
            </Typography>
            <Typography variant="body-sm" className="text-teal-800 dark:text-teal-200">
              Consultez notre{" "}
              <Link href="/faq" className="underline font-semibold">
                FAQ
              </Link>{" "}
              ou{" "}
              <Link href="/nous-contacter" className="underline font-semibold">
                contactez-nous
              </Link>
              .
            </Typography>
          </section>
        </div>
      </div>
    </main>
  );
}
