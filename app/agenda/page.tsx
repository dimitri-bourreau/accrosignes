"use client";

import { useState } from "react";
import { useQueryState, parseAsIsoDate, parseAsString } from "nuqs";
import Title from "@/components/atoms/title";
import Typography from "@/components/atoms/typography";
import DayEventsModal from "@/components/molecules/day-events-modal";
import EventDetailModal from "@/components/molecules/event-detail-modal";
import { useEvents } from "@/features/events/hooks/use-events";
import { EventOccurrence, EVENT_COLORS } from "@/features/events/types/event.type";

function formatTime(startTime: string, endTime?: string): string {
  if (endTime) return `${startTime}-${endTime}`;
  return startTime;
}

interface SelectedDay {
  date: Date;
  events: EventOccurrence[];
}

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<SelectedDay | null>(null);
  const [showCourses, setShowCourses] = useState(false);
  const [selectedDate, setSelectedDate] = useQueryState("date", parseAsIsoDate);
  const [selectedEventId, setSelectedEventId] = useQueryState("event", parseAsString);
  const { data: events = [], isLoading } = useEvents();

  const selectedEvent = selectedEventId
    ? events.find((e) => e.id === selectedEventId)
    : undefined;

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForDay = (day: number): EventOccurrence[] => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const getUpcomingEvents = (): EventOccurrence[] => {
    const now = new Date();
    return events.filter((event) => {
      const isFuture = new Date(event.date) >= now;
      const isCourse = event.category === "course";
      return showCourses ? isFuture : isFuture && !isCourse;
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const upcomingEvents = getUpcomingEvents();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="space-y-12">
          <div className="space-y-4">
            <Title level="h1" className="text-gray-900 dark:text-gray-100">
              Agenda
            </Title>
            <Typography variant="subtitle" className="text-teal-600 dark:text-teal-400">
              Découvrez tous nos événements et cours
            </Typography>
          </div>

          {/* Calendar */}
          <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={previousMonth}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
              >
                ← Mois précédent
              </button>
              <Title level="h2" className="text-gray-900 dark:text-gray-100 capitalize">
                {monthName}
              </Title>
              <button
                onClick={nextMonth}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
              >
                Mois suivant →
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-300 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            {isLoading ? (
              <Typography className="text-center text-gray-600 dark:text-gray-300 py-8">
                Chargement...
              </Typography>
            ) : (
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  const dayEvents = day ? getEventsForDay(day) : [];
                  const hasEvents = dayEvents.length > 0;

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        if (day && hasEvents) {
                          const clickedDate = new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            day
                          );
                          setSelectedDay({ date: clickedDate, events: dayEvents });
                          setSelectedDate(clickedDate);
                        }
                      }}
                      className={`min-h-32 p-2 rounded border ${
                        day === null
                          ? "bg-gray-50 dark:bg-gray-800 border-transparent"
                          : hasEvents
                            ? "bg-teal-50 dark:bg-teal-950 border-teal-300 dark:border-teal-700 cursor-pointer hover:shadow-md"
                            : "bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700"
                      } transition`}
                    >
                      {day && (
                        <div className="space-y-1">
                          <div className="font-semibold text-gray-900 dark:text-gray-100">{day}</div>
                          {dayEvents.slice(0, 2).map((eventItem) => {
                            const colorBg = EVENT_COLORS[eventItem.color || "teal"].bg;
                            return (
                              <div
                                key={eventItem.id}
                                className={`${colorBg} text-white rounded px-2 py-1 text-xs`}
                              >
                                <div className="font-medium truncate">{eventItem.title}</div>
                                <div className="text-white/70 text-[10px]">
                                  {formatTime(eventItem.startTime, eventItem.endTime)}
                                </div>
                              </div>
                            );
                          })}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-teal-600 dark:text-teal-400 font-medium text-center">
                              +{dayEvents.length - 2} autre{dayEvents.length > 3 ? "s" : ""}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Upcoming Events List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Title level="h2" className="text-gray-900 dark:text-gray-100">
                Prochains Événements
              </Title>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCourses}
                  onChange={(event) => setShowCourses(event.target.checked)}
                  className="w-4 h-4 cursor-pointer"
                />
                <Typography variant="body-sm" className="text-gray-700 dark:text-gray-200">
                  Afficher les cours
                </Typography>
              </label>
            </div>
            <div className="space-y-3">
              {isLoading ? (
                <Typography className="text-gray-600 dark:text-gray-300">
                  Chargement...
                </Typography>
              ) : upcomingEvents.length === 0 ? (
                <Typography className="text-gray-600 dark:text-gray-300">
                  Aucun événement à venir
                </Typography>
              ) : (
                upcomingEvents.map((event) => {
                  const colorBg = EVENT_COLORS[event.color || "teal"].bg;
                  return (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEventId(event.id)}
                      className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow transition cursor-pointer"
                    >
                      <div
                        className={`w-16 h-16 ${colorBg} rounded-lg flex items-center justify-center shrink-0`}
                      >
                        <span className="font-bold text-white text-lg">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Typography variant="body-lg" className="font-semibold text-gray-900 dark:text-gray-100">
                            {event.title}
                          </Typography>
                          {event.category === "course" && (
                            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded">
                              Cours
                            </span>
                          )}
                          {event.category === "public-event" && (
                            <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-medium rounded">
                              Événement public
                            </span>
                          )}
                        </div>
                        <Typography variant="body-sm" className="text-gray-600 dark:text-gray-300">
                          {new Date(event.date).toLocaleDateString("fr-FR", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                          })}{" "}
                          • {formatTime(event.startTime, event.endTime)}
                        </Typography>
                        {event.description && (
                          <Typography variant="body-sm" className="text-gray-700 dark:text-gray-200 mt-1">
                            {event.description}
                          </Typography>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedDay && (
        <DayEventsModal
          date={selectedDay.date}
          events={selectedDay.events}
          onClose={() => setSelectedDay(null)}
        />
      )}

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEventId(null)}
        />
      )}
    </main>
  );
}
