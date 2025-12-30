"use client";

import { useState } from "react";
import Title from "@/components/atoms/title";
import Typography from "@/components/atoms/typography";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: "Cours",
      questions: [
        {
          q: "Quel est le meilleur cours pour un complet débutant?",
          a: "Nous recommandons de commencer par notre cours Débutant. Il couvre les bases de la LSF, l'alphabet signé, et les conversations simples du quotidien. Aucune expérience préalable n'est nécessaire.",
        },
        {
          q: "Combien de temps faut-il pour devenir compétent en LSF?",
          a: "Cela dépend de votre engagement. Avec nos cours réguliers et une pratique régulière, vous pouvez atteindre une compétence conversationnelle en 6-12 mois.",
        },
        {
          q: "Pouvez-vous proposer des cours privés?",
          a: "Oui! Nous proposons des cours privés adaptés à vos besoins spécifiques. Contactez-nous pour discuter des options et des tarifs.",
        },
      ],
    },
    {
      category: "Inscription et Paiement",
      questions: [
        {
          q: "Comment puis-je m'inscrire?",
          a: "Visitez notre page d'inscription, choisissez votre cours, remplissez le formulaire et effectuez le paiement. Vous recevrez une confirmation par e-mail immédiatement.",
        },
        {
          q: "Quels modes de paiement acceptez-vous?",
          a: "Nous acceptons les cartes de crédit, PayPal, et les virements bancaires. Tous les paiements sont traités de manière sécurisée.",
        },
        {
          q: "Y a-t-il des réductions de groupe?",
          a: "Oui! Pour les groupes de 5 personnes ou plus, des réductions spéciales sont disponibles. Contactez-nous pour plus d'informations.",
        },
      ],
    },
    {
      category: "Pratique et Apprentissage",
      questions: [
        {
          q: "Puis-je suivre les cours en ligne?",
          a: "Certains de nos cours sont disponibles en ligne via vidéoconférence. Vérifiez la description du cours pour voir si cette option est disponible.",
        },
        {
          q: "Que se passe-t-il si je manque un cours?",
          a: "Nous fournissons des enregistrements vidéo de nos cours en ligne. Pour les cours en personne, des rattrapage privés peuvent être organisés moyennant des frais supplémentaires.",
        },
        {
          q: "Y a-t-il des ressources pour pratiquer entre les cours?",
          a: "Oui! Nos membres ont accès à une plateforme en ligne avec exercices, vidéos tutoriels, et guides pédagogiques.",
        },
      ],
    },
    {
      category: "Communauté",
      questions: [
        {
          q: "Organiser-vous des événements sociaux?",
          a: "Absolument! Nous organisons régulièrement des rencontres communautaires, ateliers, et événements spéciaux où vous pouvez pratiquer dans un environnement social.",
        },
        {
          q: "Comment rejoindre le groupe WhatsApp/Discord?",
          a: "Après votre inscription, vous recevrez un lien d'invitation pour rejoindre notre communauté en ligne.",
        },
        {
          q: "Puis-je devenir bénévole?",
          a: "Nous serions ravi d'avoir votre aide! Envoyez-nous un e-mail à contact@accrosignes.fr pour en savoir plus sur les opportunités de bénévolat.",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <Title level="h1" className="text-gray-900 dark:text-gray-100">
              Foire aux Questions
            </Title>
            <Typography variant="subtitle" className="text-teal-600 dark:text-teal-400">
              Trouvez les réponses à vos questions
            </Typography>
          </div>

          <div className="space-y-8">
            {faqs.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <Title level="h2" className="text-gray-900 dark:text-gray-100">
                  {section.category}
                </Title>

                <div className="space-y-3">
                  {section.questions.map((item, itemIndex) => {
                    const globalIndex = sectionIndex * 100 + itemIndex;
                    const isOpen = openIndex === globalIndex;

                    return (
                      <div
                        key={itemIndex}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                          className="cursor-pointer w-full px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center justify-between"
                        >
                          <Typography variant="body-lg" className="font-semibold text-gray-900 dark:text-gray-100 text-left">
                            {item.q}
                          </Typography>
                          <span
                            className={`text-teal-600 dark:text-teal-400 text-xl transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          >
                            ▼
                          </span>
                        </button>

                        {isOpen && (
                          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                            <Typography variant="body-lg" className="text-gray-600 dark:text-gray-300">
                              {item.a}
                            </Typography>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="bg-teal-50 dark:bg-teal-950 rounded-lg p-8 space-y-4 text-center">
            <Title level="h2" className="text-gray-900 dark:text-gray-100">
              Vous n&apos;avez pas trouvé votre réponse?
            </Title>
            <Typography variant="body-lg" className="text-gray-600 dark:text-gray-300">
              N&apos;hésitez pas à nous contacter directement. Notre équipe sera heureuse de vous aider.
            </Typography>
            <Typography variant="body-lg" className="text-gray-600 dark:text-gray-300">
              📧 contact@accrosignes.fr<br />
              📞 +33 4 76 XX XX XX
            </Typography>
          </div>
        </div>
      </div>
    </main>
  );
}
