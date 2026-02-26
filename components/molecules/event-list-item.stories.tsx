import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EventListItem } from './event-list-item';
import { EventOccurrence } from '@/features/events/types/event.type';

const meta: Meta<typeof EventListItem> = {
  title: 'molecules/EventListItem',
  component: EventListItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof EventListItem>;

const baseMockEvent: EventOccurrence = {
  id: 'event-1',
  title: 'Cours de LSF débutant',
  description: 'Apprentissage des bases de la langue des signes française',
  date: new Date('2026-03-10'),
  startTime: '18:00',
  endTime: '19:30',
  color: 'teal',
  category: 'course',
  authorId: 'admin-1',
  createdAt: new Date('2026-01-15'),
  updatedAt: new Date('2026-01-15'),
};

export const Course: Story = {
  args: {
    event: baseMockEvent,
    onEdit: () => console.log('Edit clicked'),
    onDelete: () => console.log('Delete clicked'),
  },
};

export const PublicEvent: Story = {
  args: {
    event: {
      ...baseMockEvent,
      id: 'event-2',
      title: 'Rencontre sourds-entendants',
      description: 'Échange convivial autour d\u0027un café',
      color: 'purple',
      category: 'public-event',
      startTime: '14:00',
      endTime: '17:00',
      date: new Date('2026-03-15'),
    },
    onEdit: () => console.log('Edit clicked'),
    onDelete: () => console.log('Delete clicked'),
  },
};

export const WithRecurrence: Story = {
  args: {
    event: {
      ...baseMockEvent,
      id: 'event-3',
      recurrence: {
        type: 'weekly',
        endDate: new Date('2026-06-30'),
      },
    },
    onEdit: () => console.log('Edit clicked'),
    onDelete: () => console.log('Delete clicked'),
  },
};
