import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EventForm } from './event-form';

const queryClient = new QueryClient();

const meta: Meta<typeof EventForm> = {
  title: 'molecules/EventForm',
  component: EventForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof EventForm>;

export const Create: Story = {
  args: {
    userId: 'admin-123',
    editingEvent: null,
    onSuccess: () => console.log('Success'),
    onCancel: () => console.log('Cancel'),
  },
};

export const Edit: Story = {
  args: {
    userId: 'admin-123',
    editingEvent: {
      id: 'event-1',
      title: 'Cours de LSF débutant',
      description: 'Apprentissage des bases de la langue des signes française',
      date: '2026-03-10',
      startTime: '18:00',
      endTime: '19:30',
      color: 'teal',
      category: 'course',
      recurrence: {
        type: 'weekly',
        endDate: '2026-06-30',
      },
    },
    scope: 'all',
    onSuccess: () => console.log('Success'),
    onCancel: () => console.log('Cancel'),
  },
};
