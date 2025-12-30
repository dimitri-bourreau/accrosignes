"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Title from "@/components/atoms/title";
import Typography from "@/components/atoms/typography";
import LoginForm from "@/components/molecules/LoginForm";

function LoginPageContent() {
  const router = useRouter();
  const { user, loading, signInWithLink, error, clearError } = useAuth();
  const [isProcessingLink, setIsProcessingLink] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push("/espace-membre");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const processEmailLink = async () => {
      const link = window.location.href;
      const storedEmail = window.localStorage.getItem("emailForSignIn");

      // Check if this is a sign-in link (Firebase adds oobCode parameter)
      if (link.includes("oobCode") && storedEmail && !isProcessingLink) {
        setIsProcessingLink(true);
        try {
          clearError();
          await signInWithLink(storedEmail, link);
        } catch (err) {
          console.error("Error processing sign-in link:", err);
        } finally {
          setIsProcessingLink(false);
        }
      }
    };

    processEmailLink();
  }, [signInWithLink, clearError, isProcessingLink]);

  const link = typeof window !== "undefined" ? window.location.href : "";
  const hasEmailLink = link.includes("oobCode");

  if (loading || (hasEmailLink && isProcessingLink)) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <Typography className="text-gray-600 dark:text-gray-300">Connexion en cours...</Typography>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-md mx-auto px-6 py-20">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <Title level="h1" className="text-gray-900 dark:text-gray-100">
              Connexion
            </Title>
            <Typography variant="body-lg" className="text-gray-600 dark:text-gray-300">
              Accédez à votre espace personnel
            </Typography>
          </div>

          <LoginForm />

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <Typography className="text-red-700 dark:text-red-300 text-sm">{error}</Typography>
            </div>
          )}

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 space-y-2">
            <Typography variant="body-sm" className="font-semibold text-teal-900 dark:text-teal-100">
              ℹ️ Espace Membres
            </Typography>
            <Typography variant="body-sm" className="text-teal-800 dark:text-teal-200">
              Accédez à votre espace personnel pour consulter vos cours, télécharger des ressources pédagogiques et rester informé de nos événements.
            </Typography>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
          <Typography className="text-gray-600 dark:text-gray-300">Chargement...</Typography>
        </main>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
