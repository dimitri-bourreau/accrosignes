"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Title from "@/components/title";
import Typography from "@/components/typography";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push("/espace-membre");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Typography className="text-gray-600">Chargement...</Typography>
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
