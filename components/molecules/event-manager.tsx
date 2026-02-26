'use client';

import { useState, useRef } from 'react';
import Typography from '@/components/atoms/typography';
import { useEvents, useDeleteEvent } from '@/features/events/hooks/use-events';
import { EventForm } from './event-form';
import { EventListItem } from './event-list-item';
import { EventOccurrence } from '@/features/events/types/event.type';

interface EventManagerProps {
  userId: string;
}

export default function EventManager({ userId }: EventManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventOccurrence | null>(
    null,
  );
  const [editScope, setEditScope] = useState<'this' | 'all' | undefined>();
  const { data: allEvents = [], isLoading } = useEvents();
  const deleteEvent = useDeleteEvent();
  const formRef = useRef<HTMLDivElement>(null);

  const uniqueEvents = allEvents.filter((event) => !event.isRecurrenceInstance);

  const handleEditClick = (item: EventOccurrence) => {
    setEditingEvent(item);
    setEditScope(item.recurrence ? 'all' : undefined);
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleDeleteClick = (item: EventOccurrence) => {
    const message = item.recurrence
      ? 'Supprimer cet événement et toutes ses occurrences ?'
      : 'Supprimer cet événement ?';

    if (confirm(message)) {
      deleteEvent.mutate({
        id: item.id,
        adminId: userId,
      });
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingEvent(null);
    setEditScope(undefined);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => {
            setEditingEvent(null);
            setEditScope(undefined);
            setShowForm(!showForm);
          }}
          className="cursor-pointer px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
        >
          {showForm ? 'Annuler' : 'Ajouter un événement'}
        </button>
      </div>

      {showForm && (
        <div ref={formRef}>
          <EventForm
            key={editingEvent?.id ?? 'new'}
            userId={userId}
            editingEvent={editingEvent}
            scope={editScope}
            onSuccess={resetForm}
            onCancel={resetForm}
          />
        </div>
      )}

      <div className="space-y-4">
        {isLoading ? (
          <Typography className="text-gray-600 dark:text-gray-300">
            Chargement...
          </Typography>
        ) : uniqueEvents.length === 0 ? (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Typography className="font-semibold text-gray-900 dark:text-gray-100">
              Aucun événement
            </Typography>
            <Typography
              variant="caption"
              className="text-gray-600 dark:text-gray-300"
            >
              Ajoutez votre premier événement
            </Typography>
          </div>
        ) : (
          uniqueEvents.map((item) => (
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
