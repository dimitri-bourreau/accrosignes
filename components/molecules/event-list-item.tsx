"use client";

import Typography from "@/components/atoms/typography";
import { EventOccurrence } from "@/features/events/types/event.type";

interface EventListItemProps {
  event: EventOccurrence;
  onEdit: () => void;
  onDelete: () => void;
}

function formatTime(startTime: string, endTime?: string): string {
  if (endTime) return `${startTime} - ${endTime}`;
  return startTime;
}

function formatRecurrence(event: EventOccurrence): string | null {
  if (!event.recurrence) return null;
  const endDate = new Date(event.recurrence.endDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
  if (event.recurrence.type === "weekly") {
    return `Chaque semaine jusqu'au ${endDate}`;
  }
  return `Chaque mois jusqu'au ${endDate}`;
}

export function EventListItem({ event, onEdit, onDelete }: EventListItemProps) {
  const recurrenceLabel = formatRecurrence(event);

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 bg-teal-100 dark:bg-teal-950 rounded-lg flex items-center justify-center shrink-0">
          <span className="font-bold text-teal-600 dark:text-teal-400 text-lg">
            {new Date(event.date).getDate()}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Typography className="font-semibold text-gray-900 dark:text-gray-100">
              {event.title}
            </Typography>
            {event.isRecurrenceInstance && (
              <span className="px-2 py-0.5 text-xs font-medium bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded">
                Récurrent
              </span>
            )}
          </div>
          <Typography variant="caption" className="text-gray-600 dark:text-gray-300">
            {new Date(event.date).toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            • {formatTime(event.startTime, event.endTime)}
          </Typography>
          {recurrenceLabel && (
            <Typography variant="caption" className="text-teal-600 dark:text-teal-400 block">
              {recurrenceLabel}
            </Typography>
          )}
          {event.description && (
            <Typography variant="caption" className="text-gray-700 dark:text-gray-200 mt-1 line-clamp-1">
              {event.description}
            </Typography>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Modifier
          </button>
          <button
            onClick={onDelete}
            className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition duration-200"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
