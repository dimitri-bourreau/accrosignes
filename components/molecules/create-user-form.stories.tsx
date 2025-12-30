import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateUserForm } from "./create-user-form";

const queryClient = new QueryClient();

const meta: Meta<typeof CreateUserForm> = {
  title: "molecules/CreateUserForm",
  component: CreateUserForm,
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
type Story = StoryObj<typeof CreateUserForm>;

export const Default: Story = {
  args: {
    adminId: "admin-123",
    onSuccess: () => console.log("User created"),
    onCancel: () => console.log("Cancel"),
  },
};
