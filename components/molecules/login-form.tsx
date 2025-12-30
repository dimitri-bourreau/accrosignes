"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Typography from "@/components/atoms/typography";
import { useCheckEmail } from "@/features/auth/hooks/use-check-email";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [localError, setLocalError] = useState("");
  const { sendSignInLink, error, clearError } = useAuth();
  const checkEmail = useCheckEmail();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError("");

    try {
      await checkEmail.mutateAsync(email);
      await sendSignInLink(email);
      setLinkSent(true);
      setEmail("");
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  if (linkSent) {
    return (
      <div className="space-y-4 text-center">
        <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-700 rounded-lg">
          <Typography className="text-green-700 dark:text-green-300 font-semibold">
            Vérifiez votre email
          </Typography>
          <Typography className="text-green-600 dark:text-green-400 text-sm mt-2">
            Un lien de connexion a été envoyé à votre adresse email. Cliquez sur le lien pour vous connecter.
          </Typography>
        </div>
        <button
          onClick={() => setLinkSent(false)}
          className="cursor-pointer text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 text-sm font-semibold transition"
        >
          Retour
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {(error || localError) && (
        <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-700 rounded-lg">
          <Typography className="text-red-700 dark:text-red-300 text-sm">{error || localError}</Typography>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="votre@email.com"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        disabled={checkEmail.isPending}
        className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400 transition duration-200 cursor-pointer"
      >
        {checkEmail.isPending ? "Envoi en cours..." : "Envoyer le lien"}
      </button>
    </form>
  );
}
