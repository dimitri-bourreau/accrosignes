import Title from '@/components/atoms/title';
import HtmlContent from '@/components/atoms/html-content';
import { getContentByKey } from '@/features/content/services/get-content.service';

export const revalidate = 300;

const DEFAULT_CONTENT = `
<h2>1. Éditeur du site</h2>
<p><strong>Accrosignes</strong><br />
Statut: Association loi 1901<br />
Siège social: 123 Rue de la LSF, 38000 Grenoble, France<br />
E-mail: contact@accrosignes.fr<br />
Téléphone: +33 4 76 XX XX XX<br />
Numéro SIRET: (À compléter)<br />
Numéro de TVA intracommunautaire: (À compléter)</p>

<h2>2. Responsable de publication</h2>
<p>Le responsable de publication est le président de l'association Accrosignes.</p>

<h2>3. Conception et développement</h2>
<p>Site développé en utilisant Next.js, React et Tailwind CSS.<br />
Hébergement: (À compléter)</p>

<h2>4. Propriété intellectuelle</h2>
<p>Tous les contenus présents sur ce site (textes, images, vidéos, logos) sont la propriété d'Accrosignes ou de ses contributeurs. Toute reproduction ou utilisation sans autorisation préalable est strictement interdite.</p>

<h2>5. Limitation de responsabilité</h2>
<p>Accrosignes décline toute responsabilité en cas d'erreur, d'omission ou d'interruption du service. Les informations fournies sur ce site sont à titre informatif et ne constituent pas un engagement contractuel.</p>

<h2>6. Liens externes</h2>
<p>Ce site peut contenir des liens vers d'autres sites tiers. Accrosignes n'est pas responsable du contenu de ces sites externes. L'accès à ces liens se fait aux risques et périls de l'utilisateur.</p>

<h2>7. Protection des données personnelles</h2>
<p>Les données personnelles collectées sur ce site sont traitées conformément au Règlement Général sur la Protection des Données (RGPD). Pour plus d'informations, veuillez consulter notre Politique de Confidentialité.</p>

<h2>8. Utilisation des cookies</h2>
<p>Ce site utilise des cookies pour améliorer l'expérience utilisateur. En continuant à naviguer, vous acceptez l'utilisation de cookies.</p>

<h2>9. Signalement de contenu illicite</h2>
<p>Si vous avez connaissance de contenu illicite sur ce site, veuillez nous contacter immédiatement à contact@accrosignes.fr</p>

<h2>10. Droit applicable</h2>
<p>Ces mentions légales sont régies par la loi française. Tout différend sera soumis aux tribunaux compétents de Grenoble.</p>

<h2>11. Mise à jour</h2>
<p>Ces mentions légales ont été mises à jour le 17 décembre 2025. Accrosignes se réserve le droit de les modifier à tout moment sans préavis.</p>
`;

export default async function MentionsLegalesPage() {
  const content = await getContentByKey('legal');

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-8">
          <Title level="h1" className="text-gray-900 dark:text-gray-100">
            Mentions Légales
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
