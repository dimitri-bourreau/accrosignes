"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Title from "@/components/title";
import Typography from "@/components/typography";
import LoginForm from "@/components/auth/LoginForm";

export default function EspaceMemberPage() {
  const router = useRouter();
  const { user, role, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      if (role === "Administrateur") {
        router.push("/espace-membre/admin");
      } else if (role === "Élève") {
        router.push("/espace-membre/student");
      }
    }
  }, [user, role, loading, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Typography className="text-gray-600">Chargement...</Typography>
      </main>
    );
  }

  // Show message if user is logged in but has no role
  if (user && !role) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 text-center space-y-6">
          <div className="space-y-2">
            <Title level="h1" className="text-gray-900">
              Compte en attente
            </Title>
            <Typography variant="body-lg" className="text-gray-600">
              Votre compte a été créé, mais un administrateur doit vous assigner un rôle.
            </Typography>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
            <Typography className="font-semibold text-blue-900">
              📝 Votre email
            </Typography>
            <Typography className="text-blue-800 font-mono text-sm break-all">
              {user.email}
            </Typography>
          </div>
          <button
            onClick={() => {
              signOut();
            }}
            className="cursor-pointer w-full px-6 py-2 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
          >
            Déconnexion
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-6 py-20">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <Title level="h1" className="text-gray-900">
              Connexion
            </Title>
            <Typography variant="body-lg" className="text-gray-600">
              Accédez à votre espace personnel
            </Typography>
          </div>

          <LoginForm />

          {/* Info Box */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 space-y-2">
            <Typography variant="body-sm" className="font-semibold text-teal-900">
              ℹ️ Espace Membres
            </Typography>
            <Typography variant="body-sm" className="text-teal-800">
              Accédez à votre espace personnel pour consulter vos cours, télécharger des ressources pédagogiques et rester informé de nos événements.
            </Typography>
          </div>
        </div>
      </div>
    </main>
  );
}
