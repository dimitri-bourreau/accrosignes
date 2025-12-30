"use client";

import { useState } from "react";
import Title from "@/components/title";
import Typography from "@/components/typography";

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1));

  const events = [
    { date: 4, title: "Cours Débutant - Groupe 1", time: "19h00-20h30" },
    { date: 6, title: "Atelier Culturel: Cinéma Sourd", time: "14h00-16h00" },
    { date: 8, title: "Cours Intermédiaire", time: "19h00-20h30" },
    { date: 11, title: "Conférence: Langue des Signes en Entreprise", time: "18h00-19h30" },
    { date: 13, title: "Cours Avancé", time: "19h00-20h30" },
    { date: 15, title: "Rencontre Communautaire", time: "18h00-20h00" },
    { date: 18, title: "Cours Intensif - Jour 1", time: "18h00-19h30" },
    { date: 19, title: "Cours Intensif - Jour 2", time: "18h00-19h30" },
    { date: 20, title: "Café des Signes", time: "20h00-22h00" },
    { date: 25, title: "Fête de fin d&apos;année", time: "18h00-22h00" },
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForDay = (day: number) => {
    return events.filter((event) => event.date === day);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

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
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                const dayEvents = day ? getEventsForDay(day) : [];
                const hasEvents = dayEvents.length > 0;

                return (
                  <div
                    key={index}
                    className={`min-h-32 p-2 rounded border ${
                      day === null
                        ? "bg-gray-50 dark:bg-gray-800"
                        : hasEvents
                          ? "bg-teal-50 dark:bg-teal-950 border-teal-300 dark:border-teal-700"
                          : "bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    } transition`}
                  >
                    {day && (
                      <div className="space-y-1">
                        <div className="font-semibold text-gray-900 dark:text-gray-100">{day}</div>
                        {dayEvents.map((event, idx) => (
                          <div key={idx} className="text-xs space-y-1">
                            <div className="bg-teal-600 text-white rounded px-2 py-1 truncate">
                              {event.title}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 text-xs">{event.time}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events List */}
          <div className="space-y-4">
            <Title level="h2" className="text-gray-900 dark:text-gray-100">
              Prochains Événements
            </Title>
            <div className="space-y-3">
              {events.slice(0, 5).map((event, idx) => (
                <div key={idx} className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow transition">
                  <div className="w-16 h-16 bg-teal-100 dark:bg-teal-950 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-teal-600 dark:text-teal-400 text-lg">{event.date}</span>
                  </div>
                  <div className="flex-1">
                    <Typography variant="body-lg" className="font-semibold text-gray-900 dark:text-gray-100">
                      {event.title}
                    </Typography>
                    <Typography variant="body-sm" className="text-gray-600 dark:text-gray-300">
                      {event.time}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
