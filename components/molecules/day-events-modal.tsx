import { EventOccurrence } from "@/features/events/types/event.type";
import Title from "@/components/atoms/title";
import Typography from "@/components/atoms/typography";

interface DayEventsModalProps {
  date: Date;
  events: EventOccurrence[];
  onClose: () => void;
}

function formatTime(startTime: string, endTime?: string): string {
  if (endTime) return `${startTime} - ${endTime}`;
  return startTime;
}

export default function DayEventsModal({
  date,
  events,
  onClose,
}: DayEventsModalProps) {
  const formattedDate = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-lg w-full mx-4 max-h-[80vh] overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <Title level="h3" className="text-gray-900 dark:text-gray-100 capitalize">
            {formattedDate}
          </Title>
          <button
            onClick={onClose}
            className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            aria-label="Fermer"
          >
            <svg
              className="w-5 h-5 text-gray-500"
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

        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
          {events.length === 0 ? (
            <Typography className="text-gray-600 dark:text-gray-300 text-center py-4">
              Aucun événement ce jour
            </Typography>
          ) : (
            events.map((eventItem) => (
              <div
                key={eventItem.id}
                className="p-4 bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg"
              >
                <Typography
                  variant="body-lg"
                  className="font-semibold text-gray-900 dark:text-gray-100 mb-2"
                >
                  {eventItem.title}
                </Typography>
                <Typography
                  variant="body-sm"
                  className="text-teal-700 dark:text-teal-300 font-medium"
                >
                  {formatTime(eventItem.startTime, eventItem.endTime)}
                </Typography>
                {eventItem.description && (
                  <Typography
                    variant="body-sm"
                    className="text-gray-700 dark:text-gray-300 mt-2"
                  >
                    {eventItem.description}
                  </Typography>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
