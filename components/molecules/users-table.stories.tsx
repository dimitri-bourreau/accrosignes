import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UsersTable } from "./users-table";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof UsersTable> = {
  title: "molecules/UsersTable",
  component: UsersTable,
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
        url: "/api/users",
        method: "GET",
        status: 200,
        response: [
          {
            uid: "1",
            email: "admin@accrosignes.fr",
            role: "Administrateur",
          },
          {
            uid: "2",
            email: "eleve1@example.com",
            role: "Élève",
          },
          {
            uid: "3",
            email: "eleve2@example.com",
            role: "Élève",
          },
        ],
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof UsersTable>;

export const Default: Story = {
  args: {
    adminId: "admin-123",
  },
};
