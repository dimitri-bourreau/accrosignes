import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EventManager from "./event-manager";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof EventManager> = {
  title: "molecules/EventManager",
  component: EventManager,
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
        url: "/api/events",
        method: "GET",
        status: 200,
        response: [
          {
            id: "event-1",
            title: "Cours de LSF débutant",
            description: "Apprentissage des bases de la langue des signes",
            date: new Date("2026-03-10"),
            startTime: "18:00",
            endTime: "19:30",
            color: "teal",
            category: "course",
            authorId: "admin-1",
            createdAt: new Date("2026-01-15"),
            updatedAt: new Date("2026-01-15"),
            recurrence: {
              type: "weekly",
              endDate: new Date("2026-06-30"),
            },
          },
          {
            id: "event-2",
            title: "Soirée jeux en LSF",
            description: "Jeux de société adaptés en langue des signes",
            date: new Date("2026-03-15"),
            startTime: "19:00",
            endTime: "22:00",
            color: "purple",
            category: "public-event",
            authorId: "admin-1",
            createdAt: new Date("2026-02-01"),
            updatedAt: new Date("2026-02-01"),
          },
        ],
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof EventManager>;

export const Default: Story = {
  args: {
    userId: "admin-123",
  },
};

export const Empty: Story = {
  args: {
    userId: "admin-123",
  },
  parameters: {
    mockData: [
      {
        url: "/api/events",
        method: "GET",
        status: 200,
        response: [],
      },
    ],
  },
};
