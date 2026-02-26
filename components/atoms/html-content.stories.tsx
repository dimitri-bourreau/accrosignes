import type { Meta, StoryObj } from "@storybook/react";
import HtmlContent from "./html-content";

const meta: Meta<typeof HtmlContent> = {
  title: "atoms/HtmlContent",
  component: HtmlContent,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof HtmlContent>;

export const WithParagraphs: Story = {
  args: {
    html: `
      <h2>Apprendre la LSF</h2>
      <p>La <strong>Langue des Signes Française</strong> est une langue visuelle et gestuelle utilisée par les personnes sourdes et malentendantes en France.</p>
      <p>Nos cours s&apos;adressent à tous, <em>débutants comme confirmés</em>, et permettent de découvrir cette langue riche et expressive.</p>
    `,
  },
};

export const WithLists: Story = {
  args: {
    html: `
      <h2>Nos formations</h2>
      <ul>
        <li>Cours de LSF débutant</li>
        <li>Cours de LSF intermédiaire</li>
        <li>Ateliers de conversation</li>
      </ul>
      <h3>Inscriptions</h3>
      <ol>
        <li>Remplir le formulaire en ligne</li>
        <li>Régler les frais d&apos;inscription</li>
        <li>Recevoir la confirmation par email</li>
      </ol>
    `,
  },
};

export const WithTable: Story = {
  args: {
    html: `
      <h2>Tarifs 2025-2026</h2>
      <table>
        <thead>
          <tr>
            <th>Formule</th>
            <th>Durée</th>
            <th>Tarif</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cours hebdomadaire</td>
            <td>1h30 / semaine</td>
            <td>250 &euro;</td>
          </tr>
          <tr>
            <td>Stage intensif</td>
            <td>5 jours</td>
            <td>350 &euro;</td>
          </tr>
        </tbody>
      </table>
    `,
  },
};

export const WithAllElements: Story = {
  args: {
    html: `
      <h2>Bienvenue chez AccroSignes</h2>
      <p>AccroSignes est une association grenobloise qui propose des <strong>cours de Langue des Signes Française</strong> et facilite les <em>rencontres entre sourds et entendants</em>.</p>
      <h3>Ce que nous proposons</h3>
      <ul>
        <li>Des cours adaptés à votre niveau</li>
        <li>Des événements communautaires</li>
        <li>Des ressources pédagogiques</li>
      </ul>
      <p>Pour en savoir plus, consultez <a href="https://example.com" target="_blank" rel="noopener noreferrer">notre page de présentation</a>.</p>
      <table>
        <thead>
          <tr><th>Jour</th><th>Horaire</th><th>Niveau</th></tr>
        </thead>
        <tbody>
          <tr><td>Mardi</td><td>18h - 19h30</td><td>Débutant</td></tr>
          <tr><td>Jeudi</td><td>18h - 19h30</td><td>Intermédiaire</td></tr>
        </tbody>
      </table>
    `,
  },
};
