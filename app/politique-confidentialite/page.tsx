import type { Metadata } from 'next';
import Title from '@/components/atoms/title';
import HtmlContent from '@/components/atoms/html-content';
import { getContentByKey } from '@/features/content/services/get-content.service';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    "Politique de confidentialité et traitement des données personnelles d'AccroSignes, conforme au RGPD.",
  alternates: {
    canonical: '/politique-confidentialite',
  },
};

export const revalidate = 300;

const DEFAULT_CONTENT = `
<h2>Introduction</h2>
<p>Accrosignes s'engage à protéger votre vie privée et à assurer la transparence concernant le traitement de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données.</p>

<h2>1. Données collectées</h2>
<p>Nous collectons les types de données suivants:</p>
<ul>
<li><strong>Données d'identification:</strong> Nom, prénom, adresse e-mail, numéro de téléphone</li>
<li><strong>Données d'inscription:</strong> Cours choisis, niveau de compétence, préférences d'horaire</li>
<li><strong>Données de paiement:</strong> Informations de facturation (non conservées directement)</li>
<li><strong>Données de navigation:</strong> Adresse IP, historique de consultation, cookies</li>
<li><strong>Données de communication:</strong> Messages via formulaires de contact</li>
</ul>

<h2>2. Finalités du traitement</h2>
<p>Vos données sont utilisées pour:</p>
<ul>
<li>Gérer votre inscription et votre participation aux cours</li>
<li>Traiter les paiements</li>
<li>Vous envoyer des confirmations et des mises à jour</li>
<li>Améliorer nos services</li>
<li>Respecter nos obligations légales</li>
<li>Analyser l'utilisation du site (données anonymisées)</li>
</ul>

<h2>3. Fondement légal</h2>
<p>Le traitement de vos données est basé sur:</p>
<ul>
<li>Votre consentement explicite</li>
<li>L'exécution d'un contrat</li>
<li>Nos obligations légales</li>
<li>Nos intérêts légitimes</li>
</ul>

<h2>4. Partage des données</h2>
<p>Nous ne partageons vos données personnelles qu'avec:</p>
<ul>
<li>Nos prestataires (hébergement, paiement) sous contrat de confidentialité</li>
<li>Les autorités compétentes si légalement requis</li>
</ul>
<p>Nous ne vendons jamais vos données à des tiers.</p>

<h2>5. Durée de conservation</h2>
<p>Vos données sont conservées pour la durée nécessaire à la finalité du traitement, sauf obligation légale contraire. Généralement:</p>
<ul>
<li>Données d'inscription: 3 ans après la fin du cours</li>
<li>Données de paiement: Selon les obligations fiscales (6 ans)</li>
<li>Messages de contact: 2 ans après traitement</li>
</ul>

<h2>6. Vos droits</h2>
<p>Vous avez le droit de:</p>
<ul>
<li><strong>Accès:</strong> Obtenir une copie de vos données</li>
<li><strong>Rectification:</strong> Corriger vos données inexactes</li>
<li><strong>Suppression:</strong> Demander l'effacement (droit à l'oubli)</li>
<li><strong>Limitation:</strong> Limiter l'utilisation de vos données</li>
<li><strong>Portabilité:</strong> Recevoir vos données dans un format structuré</li>
<li><strong>Opposition:</strong> Vous opposer au traitement</li>
</ul>
<p>Pour exercer ces droits, contactez-nous à contact@accrosignes.fr</p>

<h2>7. Sécurité des données</h2>
<p>Nous avons mis en place des mesures de sécurité appropriées pour protéger vos données:</p>
<ul>
<li>Chiffrement SSL/TLS pour les connexions sécurisées</li>
<li>Sauvegarde régulière des données</li>
<li>Accès limité aux données autorisées</li>
<li>Conformité RGPD</li>
</ul>

<h2>8. Cookies et traceurs</h2>
<p>Ce site utilise des cookies pour:</p>
<ul>
<li>Améliorer votre expérience utilisateur</li>
<li>Analyser l'utilisation du site</li>
<li>Mémoriser vos préférences</li>
</ul>
<p>Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.</p>

<h2>9. Nous contacter</h2>
<p>Pour toute question concernant vos données:<br />
📧 contact@accrosignes.fr<br />
📞 +33 4 76 XX XX XX<br />
📍 123 Rue de la LSF, 38000 Grenoble</p>

<h2>10. Modifications de cette politique</h2>
<p>Cette politique peut être modifiée à tout moment. Les modifications seront publiées sur cette page avec une date de mise à jour. Votre utilisation continue du site après les modifications constitue votre acceptation de la politique mise à jour.</p>
<p><em>Dernière mise à jour: 17 décembre 2025</em></p>
`;

export default async function PolitiqueConfidentialitePage() {
  const content = await getContentByKey('privacy');

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-8">
          <Title level="h1" className="text-gray-900 dark:text-gray-100">
            Politique de Confidentialité
          </Title>
          <HtmlContent
            html={content ?? DEFAULT_CONTENT}
            className="text-gray-600 dark:text-gray-300"
          />
        </div>
      </div>
    </main>
  );
}
