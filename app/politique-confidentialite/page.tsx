import Title from "@/components/atoms/title";
import Typography from "@/components/atoms/typography";

export const revalidate = 86400;

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-8">
          <Title level="h1" className="text-gray-900 dark:text-gray-100">
            Politique de Confidentialité
          </Title>

          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            {/* Introduction */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900 dark:text-gray-100">
                Introduction
              </Title>
              <Typography variant="body-lg">
                Accrosignes s&apos;engage à protéger votre vie privée et à assurer la transparence
                concernant le traitement de vos données personnelles. Cette politique de confidentialité
                explique comment nous collectons, utilisons et protégeons vos données.
              </Typography>
            </section>

            {/* Données collectées */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900 dark:text-gray-100">
                1. Données collectées
              </Title>
              <Typography variant="body-lg">
                Nous collectons les types de données suivants:
              </Typography>
              <ul className="list-disc list-inside space-y-2 ml-2 text-gray-600 dark:text-gray-300">
                <li><strong>Données d&apos;identification:</strong> Nom, prénom, adresse e-mail, numéro de téléphone</li>
                <li><strong>Données d&apos;inscription:</strong> Cours choisis, niveau de compétence, préférences d&apos;horaire</li>
                <li><strong>Données de paiement:</strong> Informations de facturation (non conservées directement)</li>
                <li><strong>Données de navigation:</strong> Adresse IP, historique de consultation, cookies</li>
                <li><strong>Données de communication:</strong> Messages via formulaires de contact</li>
              </ul>
            </section>

            {/* Finalités du traitement */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900 dark:text-gray-100">
                2. Finalités du traitement
              </Title>
              <Typography variant="body-lg">
                Vos données sont utilisées pour:
              </Typography>
              <ul className="list-disc list-inside space-y-2 ml-2 text-gray-600 dark:text-gray-300">
                <li>Gérer votre inscription et votre participation aux cours</li>
                <li>Traiter les paiements</li>
                <li>Vous envoyer des confirmations et des mises à jour</li>
                <li>Améliorer nos services</li>
                <li>Respecter nos obligations légales</li>
                <li>Analyser l&apos;utilisation du site (données anonymisées)</li>
              </ul>
            </section>

            {/* Fondement légal */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900 dark:text-gray-100">
                3. Fondement légal
              </Title>
              <Typography variant="body-lg">
                Le traitement de vos données est basé sur:
              </Typography>
              <ul className="list-disc list-inside space-y-2 ml-2 text-gray-600 dark:text-gray-300">
                <li>Votre consentement explicite</li>
                <li>L&apos;exécution d&apos;un contrat</li>
                <li>Nos obligations légales</li>
                <li>Nos intérêts légitimes</li>
              </ul>
            </section>

            {/* Partage des données */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900 dark:text-gray-100">
                4. Partage des données
              </Title>
              <Typography variant="body-lg">
                Nous ne partageons vos données personnelles qu&apos;avec:
              </Typography>
              <ul className="list-disc list-inside space-y-2 ml-2 text-gray-600 dark:text-gray-300">
                <li>Nos prestataires (hébergement, paiement) sous contrat de confidentialité</li>
                <li>Les autorités compétentes si légalement requis</li>
              </ul>
              <Typography variant="body-lg">
                Nous ne vendons jamais vos données à des tiers.
              </Typography>
            </section>

            {/* Durée de conservation */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900 dark:text-gray-100">
                5. Durée de conservation
              </Title>
              <Typography variant="body-lg">
                Vos données sont conservées pour la durée nécessaire à la finalité du traitement, sauf obligation légale contraire.
                Généralement:
              </Typography>
              <ul className="list-disc list-inside space-y-2 ml-2 text-gray-600 dark:text-gray-300">
                <li>Données d&apos;inscription: 3 ans après la fin du cours</li>
                <li>Données de paiement: Selon les obligations fiscales (6 ans)</li>
                <li>Messages de contact: 2 ans après traitement</li>
              </ul>
            </section>

            {/* Droits des utilisateurs */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900 dark:text-gray-100">
                6. Vos droits
              </Title>
              <Typography variant="body-lg">
                Vous avez le droit de:
              </Typography>
              <ul className="list-disc list-inside space-y-2 ml-2 text-gray-600 dark:text-gray-300">
                <li><strong>Accès:</strong> Obtenir une copie de vos données</li>
                <li><strong>Rectification:</strong> Corriger vos données inexactes</li>
                <li><strong>Suppression:</strong> Demander l&apos;effacement (droit à l&apos;oubli)</li>
                <li><strong>Limitation:</strong> Limiter l&apos;utilisation de vos données</li>
                <li><strong>Portabilité:</strong> Recevoir vos données dans un format structuré</li>
                <li><strong>Opposition:</strong> Vous opposer au traitement</li>
              </ul>
              <Typography variant="body-lg" className="mt-4">
                Pour exercer ces droits, contactez-nous à contact@accrosignes.fr
              </Typography>
            </section>

            {/* Sécurité */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900 dark:text-gray-100">
                7. Sécurité des données
              </Title>
              <Typography variant="body-lg">
                Nous avons mis en place des mesures de sécurité appropriées pour protéger vos données:
              </Typography>
              <ul className="list-disc list-inside space-y-2 ml-2 text-gray-600 dark:text-gray-300">
                <li>Chiffrement SSL/TLS pour les connexions sécurisées</li>
                <li>Sauvegarde régulière des données</li>
                <li>Accès limité aux données autorisées</li>
                <li>Conformité RGPD</li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900 dark:text-gray-100">
                8. Cookies et traceurs
              </Title>
              <Typography variant="body-lg">
                Ce site utilise des cookies pour:
              </Typography>
              <ul className="list-disc list-inside space-y-2 ml-2 text-gray-600 dark:text-gray-300">
                <li>Améliorer votre expérience utilisateur</li>
                <li>Analyser l&apos;utilisation du site</li>
                <li>Mémoriser vos préférences</li>
              </ul>
              <Typography variant="body-lg" className="mt-4">
                Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
              </Typography>
            </section>

            {/* Contact */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900 dark:text-gray-100">
                9. Nous contacter
              </Title>
              <Typography variant="body-lg">
                Pour toute question concernant vos données:
              </Typography>
              <Typography variant="body-lg">
                📧 contact@accrosignes.fr<br />
                📞 +33 4 76 XX XX XX<br />
                📍 123 Rue de la LSF, 38000 Grenoble
              </Typography>
            </section>

            {/* Modifications */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900 dark:text-gray-100">
                10. Modifications de cette politique
              </Title>
              <Typography variant="body-lg">
                Cette politique peut être modifiée à tout moment. Les modifications seront publiées sur cette page
                avec une date de mise à jour. Votre utilisation continue du site après les modifications constitue
                votre acceptation de la politique mise à jour.
              </Typography>
              <Typography variant="body-sm" className="text-gray-500 dark:text-gray-400 mt-4">
                Dernière mise à jour: 17 décembre 2025
              </Typography>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
