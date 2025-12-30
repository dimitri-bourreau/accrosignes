"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Title from "@/components/atoms/title";
import Typography from "@/components/atoms/typography";

export default function PendingPage() {
  const router = useRouter();
  const { user, role, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/espace-membre/login");
    } else if (!loading && role) {
      router.push("/espace-membre");
    }
  }, [user, role, loading, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <Typography className="text-gray-600 dark:text-gray-300">Chargement...</Typography>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center space-y-6">
        <div className="space-y-2">
          <Title level="h1" className="text-gray-900 dark:text-gray-100">
            Compte en attente
          </Title>
          <Typography variant="body-lg" className="text-gray-600 dark:text-gray-300">
            Votre compte a été créé, mais un administrateur doit vous assigner un rôle.
          </Typography>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2">
          <Typography className="font-semibold text-blue-900 dark:text-blue-100">
            📝 Votre email
          </Typography>
          <Typography className="text-blue-800 dark:text-blue-200 font-mono text-sm break-all">
            {user?.email}
          </Typography>
        </div>
        <button
          onClick={() => {
            signOut();
          }}
          className="cursor-pointer w-full px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
        >
          Déconnexion
        </button>
      </div>
    </main>
  );
}
