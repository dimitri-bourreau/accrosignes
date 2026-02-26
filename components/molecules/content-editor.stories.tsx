import type { Meta, StoryObj } from "@storybook/react";
import ContentEditor from "./content-editor";

const meta: Meta<typeof ContentEditor> = {
  title: "molecules/ContentEditor",
  component: ContentEditor,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ContentEditor>;

export const Empty: Story = {
  args: {
    content: "",
    onChange: (html: string) => console.log("Content changed:", html),
  },
};

export const WithContent: Story = {
  args: {
    content: `
      <h2>Présentation de l&apos;association</h2>
      <p>AccroSignes est une <strong>association grenobloise</strong> qui a pour mission de promouvoir la <em>Langue des Signes Française</em> et de faciliter les échanges entre sourds et entendants.</p>
      <h3>Nos activités</h3>
      <ul>
        <li>Cours de LSF pour tous niveaux</li>
        <li>Ateliers de conversation</li>
        <li>Événements communautaires</li>
      </ul>
      <p>Rejoignez-nous pour découvrir une langue riche et une communauté accueillante.</p>
    `,
    onChange: (html: string) => console.log("Content changed:", html),
    onUploadImage: async () => "https://picsum.photos/600/400",
  },
};
