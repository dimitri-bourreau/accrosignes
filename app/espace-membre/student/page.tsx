"use client";

import { useAuth } from "@/contexts/AuthContext";
import Title from "@/components/atoms/title";
import Typography from "@/components/atoms/typography";
import Link from "next/link";
import ResourceViewer from "@/components/molecules/resource-viewer";

export default function StudentDashboard() {
  const { user, role, loading, signOut } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <Typography className="text-gray-600 dark:text-gray-300">
          Vérification des permissions...
        </Typography>
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
          <Typography
            variant="body-lg"
            className="text-gray-600 dark:text-gray-300"
          >
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

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between items-start mb-12">
          <div>
            <Title level="h1" className="text-gray-900 dark:text-gray-100 mb-2">
              Bienvenue, {user?.email?.split("@")[0] || "Élève"}!
            </Title>
            <Typography
              variant="body-lg"
              className="text-gray-600 dark:text-gray-300"
            >
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
              <Title
                level="h2"
                className="text-gray-900 dark:text-gray-100 mb-2"
              >
                Ressources disponibles
              </Title>
              <Typography
                variant="body-lg"
                className="text-gray-600 dark:text-gray-300"
              >
                Téléchargez les documents et supports pédagogiques
              </Typography>
            </div>

            <ResourceViewer />
          </section>
        </div>
      </div>
    </main>
  );
}
