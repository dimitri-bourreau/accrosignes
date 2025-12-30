import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NewsForm } from "./news-form";

const queryClient = new QueryClient();

const meta: Meta<typeof NewsForm> = {
  title: "molecules/NewsForm",
  component: NewsForm,
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
  },
};

export default meta;
type Story = StoryObj<typeof NewsForm>;

export const Create: Story = {
  args: {
    userId: "user-123",
    editingNews: null,
    onSuccess: () => console.log("Success"),
    onCancel: () => console.log("Cancel"),
  },
};

export const Edit: Story = {
  args: {
    userId: "user-123",
    editingNews: {
      id: "news-1",
      title: "Nouvelle actualité",
      content: "Contenu de l'actualité...",
      imageUrl: "https://picsum.photos/400/300",
    },
    onSuccess: () => console.log("Success"),
    onCancel: () => console.log("Cancel"),
  },
};
