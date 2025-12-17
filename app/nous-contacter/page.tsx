"use client";

import { useState } from "react";
import Title from "@/components/title";
import Typography from "@/components/typography";

export default function NousContacterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <Title level="h1" className="text-gray-900">
              Nous Contacter
            </Title>
            <Typography variant="subtitle" className="text-teal-600">
              Une question? Nous serions heureux de vous entendre
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-3">
                <Title level="h3" className="text-gray-900">
                  Informations de Contact
                </Title>
                <Typography variant="body-lg" className="text-gray-600">
                  Vous pouvez nous joindre via plusieurs canaux:
                </Typography>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Typography variant="body-sm" className="font-semibold text-gray-700">
                    📍 Adresse
                  </Typography>
                  <Typography variant="body-lg" className="text-gray-600">
                    Accrosignes<br />
                    123 Rue de la LSF<br />
                    38000 Grenoble<br />
                    France
                  </Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="body-sm" className="font-semibold text-gray-700">
                    📞 Téléphone
                  </Typography>
                  <Typography variant="body-lg" className="text-gray-600">
                    +33 4 76 XX XX XX
                  </Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="body-sm" className="font-semibold text-gray-700">
                    📧 E-mail
                  </Typography>
                  <Typography variant="body-lg" className="text-gray-600">
                    contact@accrosignes.fr
                  </Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="body-sm" className="font-semibold text-gray-700">
                    🕐 Horaires
                  </Typography>
                  <Typography variant="body-lg" className="text-gray-600">
                    Lundi - Vendredi: 10h00 - 18h00<br />
                    Samedi: 14h00 - 18h00<br />
                    Dimanche: Fermé
                  </Typography>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Sujet
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="cursor-pointer w-full px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
