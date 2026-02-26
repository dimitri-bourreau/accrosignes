import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import EventDetailModal from './event-detail-modal';
import { EventOccurrence } from '@/features/events/types/event.type';

const meta: Meta<typeof EventDetailModal> = {
  title: 'molecules/EventDetailModal',
  component: EventDetailModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof EventDetailModal>;

export const Course: Story = {
  args: {
    event: {
      id: 'event-1',
      title: 'Cours intensif LSF - Débutants',
      description:
        'Immersion complète dans la langue des signes française. Les participants apprendront les bases de la LSF au travers de jeux et exercices pratiques.',
      date: new Date('2026-03-10'),
      startTime: '18:00',
      endTime: '19:30',
      color: 'teal',
      category: 'course',
      authorId: 'admin-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as EventOccurrence,
    onClose: () => console.log('Modal closed'),
  },
};

export const PublicEvent: Story = {
  args: {
    event: {
      id: 'event-2',
      title: 'Soirée jeux en LSF',
      description:
        'Venez passer une soirée conviviale autour de jeux de société adaptés en langue des signes. Ouvert à tous les niveaux, sourds et entendants.',
      date: new Date('2026-03-15'),
      startTime: '19:00',
      endTime: '22:00',
      color: 'purple',
      category: 'public-event',
      authorId: 'admin-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as EventOccurrence,
    onClose: () => console.log('Modal closed'),
  },
};
