import type { Meta, StoryObj } from "@storybook/react";
import { NewsListItem } from "./news-list-item";

const meta: Meta<typeof NewsListItem> = {
  title: "molecules/NewsListItem",
  component: NewsListItem,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof NewsListItem>;

export const WithImage: Story = {
  args: {
    news: {
      id: "1",
      title: "Nouvelle actualité sur la LSF",
      content:
        "Nous sommes ravis d'annoncer le lancement de nouveaux cours de LSF pour débutants. Ces cours sont conçus pour vous permettre d'apprendre les bases de la langue des signes française dans un environnement convivial et encourageant.",
      imageUrl: "https://picsum.photos/400/300",
      publishedAt: new Date("2025-01-15"),
      createdAt: new Date("2025-01-15"),
      updatedAt: new Date("2025-01-15"),
      authorId: "author-1",
      slug: "nouvelle-actualite-sur-la-lsf",
    },
    onEdit: () => console.log("Edit"),
    onDelete: () => console.log("Delete"),
  },
};

export const WithoutImage: Story = {
  args: {
    news: {
      id: "2",
      title: "Atelier de conversation en LSF",
      content:
        "Rejoignez-nous pour un atelier de conversation en LSF ce samedi. C'est l'occasion parfaite de pratiquer vos compétences et de rencontrer d'autres apprenants.",
      imageUrl: "",
      publishedAt: new Date("2025-01-10"),
      createdAt: new Date("2025-01-10"),
      updatedAt: new Date("2025-01-10"),
      authorId: "author-2",
      slug: "atelier-de-conversation-en-lsf",
    },
    onEdit: () => console.log("Edit"),
    onDelete: () => console.log("Delete"),
  },
};
