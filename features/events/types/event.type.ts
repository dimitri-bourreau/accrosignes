export type RecurrenceType = 'weekly' | 'monthly';

export type EventCategory = 'course' | 'public-event';

export const EVENT_COLORS = {
  teal: { label: 'Turquoise', bg: 'bg-teal-600', hex: '#0d9488' },
  blue: { label: 'Bleu', bg: 'bg-blue-600', hex: '#2563eb' },
  purple: { label: 'Violet', bg: 'bg-purple-600', hex: '#9333ea' },
  pink: { label: 'Rose', bg: 'bg-pink-600', hex: '#db2777' },
  orange: { label: 'Orange', bg: 'bg-orange-600', hex: '#ea580c' },
  green: { label: 'Vert', bg: 'bg-green-600', hex: '#16a34a' },
  red: { label: 'Rouge', bg: 'bg-red-600', hex: '#dc2626' },
  slate: { label: 'Gris', bg: 'bg-slate-600', hex: '#475569' },
} as const;

export type EventColor = keyof typeof EVENT_COLORS;

export interface Recurrence {
  type: RecurrenceType;
  endDate: Date;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime: string;
  endTime?: string;
  color?: EventColor;
  category?: EventCategory;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  recurrence?: Recurrence;
  parentEventId?: string;
  originalDate?: Date;
  isDeleted?: boolean;
}

export interface EventOccurrence extends Omit<Event, 'date'> {
  date: Date;
  isRecurrenceInstance?: boolean;
  seriesId?: string;
}
