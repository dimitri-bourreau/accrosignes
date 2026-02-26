'use client';

import {
  EventOccurrence,
  EVENT_COLORS,
} from '@/features/events/types/event.type';
import Typography from '@/components/atoms/typography';
import Title from '@/components/atoms/title';

interface EventDetailModalProps {
  event: EventOccurrence;
  onClose: () => void;
}

const formatTime = (startTime: string, endTime?: string): string => {
  if (endTime) return `${startTime} - ${endTime}`;
  return startTime;
};

const getCategoryLabel = (category?: string): string => {
  if (category === 'course') return 'Cours';
  if (category === 'public-event') return 'Événement public';
  return '';
};

export default function EventDetailModal({
  event,
  onClose,
}: EventDetailModalProps) {
  const colorBg = EVENT_COLORS[event.color || 'teal'].bg;
  const categoryLabel = getCategoryLabel(event.category);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${colorBg} p-6 text-white`}>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <Title level="h2" className="text-white mb-2">
                {event.title}
              </Title>
              <Typography variant="body-sm" className="text-white/90">
                {new Date(event.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Typography>
              <Typography variant="body-sm" className="text-white/90">
                {formatTime(event.startTime, event.endTime)}
              </Typography>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer text-white hover:bg-white/20 rounded-full p-2 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {categoryLabel && (
            <div>
              <Typography
                variant="body-sm"
                className="text-gray-500 dark:text-gray-400 mb-1"
              >
                Catégorie
              </Typography>
              <Typography className="text-gray-900 dark:text-gray-100 font-medium">
                {categoryLabel}
              </Typography>
            </div>
          )}

          {event.description && (
            <div>
              <Typography
                variant="body-sm"
                className="text-gray-500 dark:text-gray-400 mb-1"
              >
                Description
              </Typography>
              <Typography className="text-gray-900 dark:text-gray-100">
                {event.description}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
