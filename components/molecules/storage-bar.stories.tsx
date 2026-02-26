import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StorageBar } from "./storage-bar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof StorageBar> = {
  title: "molecules/StorageBar",
  component: StorageBar,
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
type Story = StoryObj<typeof StorageBar>;

export const LowUsage: Story = {
  parameters: {
    mockData: [
      {
        url: "/api/resources/storage",
        method: "GET",
        status: 200,
        response: { usedBytes: 512 * 1024 * 1024 },
      },
    ],
  },
};

export const HighUsage: Story = {
  parameters: {
    mockData: [
      {
        url: "/api/resources/storage",
        method: "GET",
        status: 200,
        response: { usedBytes: 4.5 * 1024 * 1024 * 1024 },
      },
    ],
  },
};
