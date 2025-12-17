"use client";

import { useState } from "react";
import Title from "@/components/title";
import Typography from "@/components/typography";

export default function EspaceMemberPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-6 py-20">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <Title level="h1" className="text-gray-900">
              {isLogin ? "Connexion" : "Inscription"}
            </Title>
            <Typography variant="body-lg" className="text-gray-600">
              {isLogin
                ? "Accédez à votre espace personnel"
                : "Rejoignez notre communauté"}
            </Typography>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse e-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                required
              />
            </div>

            {/* Additional Fields for Registration */}
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                    Nom complet
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    placeholder="Jean Dupont"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="cursor-pointer w-full px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
            >
              {isLogin ? "Se connecter" : "S&apos;inscrire"}
            </button>
          </form>

          {/* Toggle Form Type */}
          <div className="text-center">
            <Typography variant="body-sm" className="text-gray-600">
              {isLogin ? "Pas encore de compte? " : "Vous avez un compte? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="cursor-pointer text-teal-600 font-semibold hover:underline"
              >
                {isLogin ? "S&apos;inscrire" : "Se connecter"}
              </button>
            </Typography>
          </div>

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
