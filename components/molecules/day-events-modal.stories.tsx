import type { Meta, StoryObj } from "@storybook/react";
import DayEventsModal from "./day-events-modal";
import { EventOccurrence } from "@/features/events/types/event.type";

const meta: Meta<typeof DayEventsModal> = {
  title: "molecules/DayEventsModal",
  component: DayEventsModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DayEventsModal>;

const mockDate = new Date("2026-03-10");

const mockEvents: EventOccurrence[] = [
  {
    id: "event-1",
    title: "Cours de LSF débutant",
    description: "Apprentissage de l\u0027alphabet et des salutations",
    date: mockDate,
    startTime: "18:00",
    endTime: "19:30",
    color: "teal",
    category: "course",
    authorId: "admin-1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "event-2",
    title: "Atelier de conversation",
    description: "Pratique libre en petits groupes",
    date: mockDate,
    startTime: "20:00",
    endTime: "21:30",
    color: "blue",
    category: "course",
    authorId: "admin-1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "event-3",
    title: "Rencontre communautaire",
    description: "Échange entre sourds et entendants autour d\u0027un verre",
    date: mockDate,
    startTime: "19:00",
    endTime: "21:00",
    color: "purple",
    category: "public-event",
    authorId: "admin-2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const SingleEvent: Story = {
  args: {
    date: mockDate,
    events: [mockEvents[0]],
    onClose: () => console.log("Modal closed"),
  },
};

export const MultipleEvents: Story = {
  args: {
    date: mockDate,
    events: mockEvents,
    onClose: () => console.log("Modal closed"),
  },
};
