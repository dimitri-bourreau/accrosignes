import Link from 'next/link';
import Title from '@/components/atoms/title';
import HtmlContent from '@/components/atoms/html-content';
import { getContentByKey } from '@/features/content/services/get-content.service';

export const revalidate = 300;

const DEFAULT_INTRO = `
<p>Accrosignes propose des cours de Langue des Signes Française (LSF) adaptés à tous les niveaux, du débutant au niveau 4. Tous les niveaux bénéficient de <strong>40 heures de cours</strong> par an.</p>
`;

const DEFAULT_COURSES = `
<h2>Tarifs des cours</h2>
<p>L&apos;adhésion à l&apos;Association des Sourds de Grenoble est comprise dans le tarif.</p>
<table>
  <thead>
    <tr>
      <th>Formule</th>
      <th>Tarif</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Classique</td>
      <td><strong>330 €</strong></td>
    </tr>
    <tr>
      <td>Réduit (étudiant(e), moins de 18 ans, parent d&apos;enfants Sourd, quotient familial &lt;750, RSA, AAH, ASS)</td>
      <td><strong>250 €</strong></td>
    </tr>
  </tbody>
</table>

<h2>Cours proposés</h2>
<table>
  <thead>
    <tr>
      <th>Jour</th>
      <th>Formateur</th>
      <th>Lieu</th>
      <th>Horaire</th>
      <th>Niveau</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Lundi</td>
      <td>Gilles</td>
      <td>Seyssinet</td>
      <td>18h30/20h</td>
      <td>Niveau 3</td>
    </tr>
    <tr>
      <td>Lundi</td>
      <td>Emilie</td>
      <td>Seyssinet</td>
      <td>18h/19h30</td>
      <td>Niveau 2</td>
    </tr>
    <tr>
      <td>Mardi</td>
      <td>Jean</td>
      <td>Grenoble MVAC</td>
      <td>18h30/20h</td>
      <td>Niveau 2</td>
    </tr>
    <tr>
      <td>Mardi</td>
      <td>Mariana</td>
      <td>Seyssinet</td>
      <td>18h/19h30</td>
      <td>Niveau 3</td>
    </tr>
    <tr>
      <td>Mardi</td>
      <td>Emilie</td>
      <td>Seyssinet</td>
      <td>18h/19h30</td>
      <td>Débutants</td>
    </tr>
    <tr>
      <td>Jeudi</td>
      <td>Jean</td>
      <td>Grenoble MVAC</td>
      <td>18h30/20h</td>
      <td>Débutants</td>
    </tr>
    <tr>
      <td>Jeudi</td>
      <td>Gilles</td>
      <td>Grenoble MVAC</td>
      <td>18h30/20h</td>
      <td>Niveau 4</td>
    </tr>
  </tbody>
</table>
`;

const DEFAULT_ADDITIONAL = `
<h2>Conditions générales</h2>
<ul>
  <li>12 élèves au maximum par cours. En cas de nombre insuffisant de stagiaires, la session concernée pourra être supprimée ou proposée en fusion avec un groupe du même niveau.</li>
  <li>En cas de surnombre, seront prises en priorité les inscriptions de parents d&apos;enfants Sourd, des personnes Sourdes ou malentendantes puis les premiers inscrits.</li>
  <li>La totalité du règlement devra être effectué 15 jours avant le début des cours (possibilité d&apos;étaler les encaissements jusqu&apos;à 10 mois, nous contacter).</li>
  <li>En cas de désistement à moins de 48h du début de la formation, 25% du montant de la formation sera retenue à titre de dédommagement.</li>
</ul>

<p>Pour toute question concernant les tarifs, n&apos;hésitez pas à <a href="/nous-contacter">nous contacter</a>.</p>
`;

export default async function TarifsPage() {
  const [introContent, coursesContent, additionalContent] = await Promise.all([
    getContentByKey('pricing.intro'),
    getContentByKey('pricing.courses'),
    getContentByKey('pricing.additional'),
  ]);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-12">
          <Title
            level="h1"
            className="text-gray-900 dark:text-gray-100 text-center"
          >
            Tarifs
          </Title>

          <HtmlContent
            html={introContent ?? DEFAULT_INTRO}
            className="text-gray-600 dark:text-gray-300"
          />

          <HtmlContent
            html={coursesContent ?? DEFAULT_COURSES}
            className="text-gray-600 dark:text-gray-300"
          />

          <HtmlContent
            html={additionalContent ?? DEFAULT_ADDITIONAL}
            className="text-gray-600 dark:text-gray-300"
          />

          <div className="flex justify-center">
            <Link
              href="/fiche-inscription.pdf"
              target="_blank"
              className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Télécharger la fiche d&apos;inscription
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
