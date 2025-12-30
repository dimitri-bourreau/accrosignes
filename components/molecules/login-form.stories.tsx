import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginForm from "./login-form";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

const meta: Meta<typeof LoginForm> = {
  title: "molecules/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
            <Story />
          </div>
        </AuthProvider>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
};
