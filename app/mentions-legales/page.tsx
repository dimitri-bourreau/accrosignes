import Title from "@/components/title";
import Typography from "@/components/typography";

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-8">
          <Title level="h1" className="text-gray-900">
            Mentions Légales
          </Title>

          <div className="space-y-8 text-gray-600">
            {/* Éditeur du site */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900">
                1. Éditeur du site
              </Title>
              <Typography variant="body-lg">
                <strong>Accrosignes</strong><br />
                Statut: Association loi 1901<br />
                Siège social: 123 Rue de la LSF, 38000 Grenoble, France<br />
                E-mail: contact@accrosignes.fr<br />
                Téléphone: +33 4 76 XX XX XX<br />
                Numéro SIRET: (À compléter)<br />
                Numéro de TVA intracommunautaire: (À compléter)
              </Typography>
            </section>

            {/* Responsable de publication */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900">
                2. Responsable de publication
              </Title>
              <Typography variant="body-lg">
                Le responsable de publication est le président de l&apos;association Accrosignes.
              </Typography>
            </section>

            {/* Conception et développement */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900">
                3. Conception et développement
              </Title>
              <Typography variant="body-lg">
                Site développé en utilisant Next.js, React et Tailwind CSS.<br />
                Hébergement: (À compléter)
              </Typography>
            </section>

            {/* Propriété intellectuelle */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900">
                4. Propriété intellectuelle
              </Title>
              <Typography variant="body-lg">
                Tous les contenus présents sur ce site (textes, images, vidéos, logos) sont la propriété d&apos;Accrosignes ou de ses contributeurs.
                Toute reproduction ou utilisation sans autorisation préalable est strictement interdite.
              </Typography>
            </section>

            {/* Responsabilité */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900">
                5. Limitation de responsabilité
              </Title>
              <Typography variant="body-lg">
                Accrosignes décline toute responsabilité en cas d&apos;erreur, d&apos;omission ou d&apos;interruption du service.
                Les informations fournies sur ce site sont à titre informatif et ne constituent pas un engagement contractuel.
              </Typography>
            </section>

            {/* Liens externes */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900">
                6. Liens externes
              </Title>
              <Typography variant="body-lg">
                Ce site peut contenir des liens vers d&apos;autres sites tiers. Accrosignes n&apos;est pas responsable du contenu de ces sites externes.
                L&apos;accès à ces liens se fait aux risques et périls de l&apos;utilisateur.
              </Typography>
            </section>

            {/* Gestion des données personnelles */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900">
                7. Protection des données personnelles
              </Title>
              <Typography variant="body-lg">
                Les données personnelles collectées sur ce site sont traitées conformément au Règlement Général sur la Protection des Données (RGPD).
                Pour plus d&apos;informations, veuillez consulter notre Politique de Confidentialité.
              </Typography>
            </section>

            {/* Cookies */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900">
                8. Utilisation des cookies
              </Title>
              <Typography variant="body-lg">
                Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur.
                En continuant à naviguer, vous acceptez l&apos;utilisation de cookies.
              </Typography>
            </section>

            {/* Signalement de contenu illicite */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900">
                9. Signalement de contenu illicite
              </Title>
              <Typography variant="body-lg">
                Si vous avez connaissance de contenu illicite sur ce site,
                veuillez nous contacter immédiatement à contact@accrosignes.fr
              </Typography>
            </section>

            {/* Droit applicable */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900">
                10. Droit applicable
              </Title>
              <Typography variant="body-lg">
                Ces mentions légales sont régies par la loi française.
                Tout différend sera soumis aux tribunaux compétents de Grenoble.
              </Typography>
            </section>

            {/* Mise à jour */}
            <section className="space-y-3">
              <Title level="h2" className="text-gray-900">
                11. Mise à jour
              </Title>
              <Typography variant="body-lg">
                Ces mentions légales ont été mises à jour le 17 décembre 2025.
                Accrosignes se réserve le droit de les modifier à tout moment sans préavis.
              </Typography>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
