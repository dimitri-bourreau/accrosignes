import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NewsManager from "./news-manager";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof NewsManager> = {
  title: "molecules/NewsManager",
  component: NewsManager,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: "padded",
    mockData: [
      {
        url: "/api/news",
        method: "GET",
        status: 200,
        response: [
          {
            id: "1",
            title: "Première actualité",
            content: "Contenu de la première actualité",
            imageUrl: "https://picsum.photos/400/300",
            publishedAt: new Date("2025-01-15"),
            createdAt: new Date("2025-01-15"),
            updatedAt: new Date("2025-01-15"),
            authorId: "author-1",
            slug: "premiere-actualite",
          },
        ],
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof NewsManager>;

export const Default: Story = {
  args: {
    userId: "user-123",
  },
};

export const Empty: Story = {
  args: {
    userId: "user-123",
  },
  parameters: {
    mockData: [
      {
        url: "/api/news",
        method: "GET",
        status: 200,
        response: [],
      },
    ],
  },
};

export const WithMultipleNews: Story = {
  args: {
    userId: "user-123",
  },
  parameters: {
    mockData: [
      {
        url: "/api/news",
        method: "GET",
        status: 200,
        response: [
          {
            id: "1",
            title: "Nouveaux cours de LSF débutant",
            content:
              "Nous sommes ravis d'annoncer le lancement de nouveaux cours de LSF pour débutants. Ces cours sont conçus pour vous permettre d'apprendre les bases de la langue des signes française.",
            imageUrl: "https://picsum.photos/400/300",
            publishedAt: new Date("2025-01-15"),
            createdAt: new Date("2025-01-15"),
            updatedAt: new Date("2025-01-15"),
            authorId: "author-1",
            slug: "nouveaux-cours-de-lsf-debutant",
          },
          {
            id: "2",
            title: "Atelier de conversation en LSF",
            content:
              "Rejoignez-nous pour un atelier de conversation en LSF ce samedi. C'est l'occasion parfaite de pratiquer vos compétences.",
            imageUrl: "https://picsum.photos/400/301",
            publishedAt: new Date("2025-01-10"),
            createdAt: new Date("2025-01-10"),
            updatedAt: new Date("2025-01-10"),
            authorId: "author-2",
            slug: "atelier-de-conversation-en-lsf",
          },
          {
            id: "3",
            title: "Événement communautaire",
            content:
              "Participez à notre événement communautaire mensuel pour rencontrer d'autres membres de la communauté sourde et entendante.",
            imageUrl: "",
            publishedAt: new Date("2025-01-05"),
            createdAt: new Date("2025-01-05"),
            updatedAt: new Date("2025-01-05"),
            authorId: "author-1",
            slug: "evenement-communautaire",
          },
        ],
      },
    ],
  },
};
