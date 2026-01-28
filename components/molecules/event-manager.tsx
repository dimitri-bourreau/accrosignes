"use client";

import { useState } from "react";
import Typography from "@/components/atoms/typography";
import { useEvents, useDeleteEvent } from "@/features/events/hooks/use-events";
import { EventForm } from "./event-form";
import { EventListItem } from "./event-list-item";
import { EventOccurrence } from "@/features/events/types/event.type";

interface EventManagerProps {
  userId: string;
}

type ScopeDialogState = {
  type: "edit" | "delete";
  event: EventOccurrence;
} | null;

export default function EventManager({ userId }: EventManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventOccurrence | null>(null);
  const [editScope, setEditScope] = useState<"this" | "all" | undefined>();
  const [scopeDialog, setScopeDialog] = useState<ScopeDialogState>(null);
  const { data: events = [], isLoading } = useEvents();
  const deleteEvent = useDeleteEvent();

  const handleEditClick = (item: EventOccurrence) => {
    if (item.isRecurrenceInstance) {
      setScopeDialog({ type: "edit", event: item });
    } else {
      setEditingEvent(item);
      setEditScope(undefined);
      setShowForm(true);
    }
  };

  const handleDeleteClick = (item: EventOccurrence) => {
    if (item.isRecurrenceInstance) {
      setScopeDialog({ type: "delete", event: item });
    } else {
      if (confirm("Supprimer cet événement ?")) {
        deleteEvent.mutate({ id: item.id, adminId: userId });
      }
    }
  };

  const handleScopeChoice = (scope: "this" | "all") => {
    if (!scopeDialog) return;

    if (scopeDialog.type === "edit") {
      setEditingEvent(scopeDialog.event);
      setEditScope(scope);
      setShowForm(true);
    } else {
      const event = scopeDialog.event;
      deleteEvent.mutate({
        id: event.id,
        adminId: userId,
        scope,
        originalDate: new Date(event.date).toISOString(),
        seriesId: event.seriesId,
      });
    }
    setScopeDialog(null);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingEvent(null);
    setEditScope(undefined);
  };

  return (
    <>
      {scopeDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 space-y-4">
            <Typography className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
              {scopeDialog.type === "edit"
                ? "Modifier l'événement"
                : "Supprimer l'événement"}
            </Typography>
            <Typography className="text-gray-600 dark:text-gray-300">
              Cet événement fait partie d&apos;une série récurrente. Que
              souhaitez-vous faire ?
            </Typography>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleScopeChoice("this")}
                className="cursor-pointer w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                {scopeDialog.type === "edit"
                  ? "Modifier cette occurrence uniquement"
                  : "Supprimer cette occurrence uniquement"}
              </button>
              <button
                onClick={() => handleScopeChoice("all")}
                className="cursor-pointer w-full px-4 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                {scopeDialog.type === "edit"
                  ? "Modifier toutes les occurrences"
                  : "Supprimer toutes les occurrences"}
              </button>
              <button
                onClick={() => setScopeDialog(null)}
                className="cursor-pointer w-full px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => {
            setEditingEvent(null);
            setEditScope(undefined);
            setShowForm(!showForm);
          }}
          className="cursor-pointer px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
        >
          {showForm ? "Annuler" : "Ajouter un événement"}
        </button>
      </div>

      {showForm && (
        <EventForm
          userId={userId}
          editingEvent={editingEvent}
          scope={editScope}
          onSuccess={resetForm}
          onCancel={resetForm}
        />
      )}

      <div className="space-y-4">
        {isLoading ? (
          <Typography className="text-gray-600 dark:text-gray-300">
            Chargement...
          </Typography>
        ) : events.length === 0 ? (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Typography className="font-semibold text-gray-900 dark:text-gray-100">
              Aucun événement
            </Typography>
            <Typography variant="caption" className="text-gray-600 dark:text-gray-300">
              Ajoutez votre premier événement
            </Typography>
          </div>
        ) : (
          events.map((item) => (
            <EventListItem
              key={item.id}
              event={item}
              onEdit={() => handleEditClick(item)}
              onDelete={() => handleDeleteClick(item)}
            />
          ))
        )}
      </div>
    </>
  );
}
