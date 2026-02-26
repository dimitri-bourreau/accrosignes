'use client';

import { useForm } from 'react-hook-form';
import {
  useCreateEvent,
  useUpdateEvent,
} from '@/features/events/hooks/use-events';
import {
  RecurrenceType,
  EventColor,
  EventCategory,
  EVENT_COLORS,
} from '@/features/events/types/event.type';

type EventFormData = {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  color: EventColor;
  category: EventCategory | '';
  isRecurrent: boolean;
  recurrenceType: RecurrenceType;
  recurrenceEndDate: string;
};

interface EventFormProps {
  userId: string;
  editingEvent?: {
    id: string;
    title: string;
    description?: string;
    date: Date | string;
    startTime: string;
    endTime?: string;
    color?: EventColor;
    category?: EventCategory;
    recurrence?: {
      type: RecurrenceType;
      endDate: Date | string;
    };
    isRecurrenceInstance?: boolean;
    seriesId?: string;
  } | null;
  scope?: 'this' | 'all';
  onSuccess: () => void;
  onCancel: () => void;
}

function formatDateForInput(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().split('T')[0];
}

export function EventForm({
  userId,
  editingEvent,
  scope,
  onSuccess,
  onCancel,
}: EventFormProps) {
  const { register, handleSubmit, watch, setValue } = useForm<EventFormData>({
    defaultValues: editingEvent
      ? {
          title: editingEvent.title,
          description: editingEvent.description || '',
          date: formatDateForInput(editingEvent.date),
          startTime: editingEvent.startTime,
          endTime: editingEvent.endTime || '',
          color: editingEvent.color || 'teal',
          category: editingEvent.category || '',
          isRecurrent: !!editingEvent.recurrence,
          recurrenceType: editingEvent.recurrence?.type || 'weekly',
          recurrenceEndDate: editingEvent.recurrence
            ? formatDateForInput(editingEvent.recurrence.endDate)
            : '',
        }
      : {
          title: '',
          description: '',
          date: '',
          startTime: '',
          endTime: '',
          color: 'teal',
          category: '',
          isRecurrent: false,
          recurrenceType: 'weekly',
          recurrenceEndDate: '',
        },
  });

  const selectedColor = watch('color');

  const isRecurrent = watch('isRecurrent');
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();

  const onSubmit = (data: EventFormData) => {
    const recurrence =
      data.isRecurrent && data.recurrenceEndDate
        ? { type: data.recurrenceType, endDate: data.recurrenceEndDate }
        : undefined;
    const category = data.category === '' ? undefined : data.category;

    if (editingEvent) {
      const eventId =
        scope === 'all' && editingEvent.seriesId
          ? editingEvent.seriesId
          : editingEvent.id;
      updateEvent.mutate(
        {
          id: eventId,
          data: {
            title: data.title,
            description: data.description,
            date: data.date,
            startTime: data.startTime,
            endTime: data.endTime,
            color: data.color,
            category,
            adminId: userId,
            recurrence,
            scope,
            originalDate: new Date(editingEvent.date).toISOString(),
            seriesId: editingEvent.seriesId,
          },
        },
        { onSuccess },
      );
    } else {
      createEvent.mutate(
        {
          title: data.title,
          description: data.description,
          date: data.date,
          startTime: data.startTime,
          endTime: data.endTime,
          color: data.color,
          category,
          authorId: userId,
          recurrence,
        },
        { onSuccess },
      );
    }
  };

  const showRecurrenceFields = !editingEvent || scope === 'all';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg space-y-6 mb-8 shadow-sm"
    >
      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Titre de l&apos;événement
        </label>
        <input
          {...register('title', { required: true })}
          className="w-full px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Description (optionnel)
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Catégorie
        </label>
        <select
          {...register('category', { required: true })}
          className="w-full px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        >
          <option value="">Sélectionner une catégorie</option>
          <option value="course">Cours</option>
          <option value="public-event">Événement public</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Couleur
        </label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(EVENT_COLORS) as EventColor[]).map((colorKey) => {
            const colorConfig = EVENT_COLORS[colorKey];
            const isSelected = selectedColor === colorKey;
            return (
              <button
                key={colorKey}
                type="button"
                onClick={() => setValue('color', colorKey)}
                className={`cursor-pointer w-10 h-10 rounded-lg ${colorConfig.bg} transition ${
                  isSelected
                    ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white'
                    : 'hover:opacity-80'
                }`}
                title={colorConfig.label}
              />
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Date
          </label>
          <input
            type="date"
            {...register('date', { required: true })}
            className="w-full px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Heure de début
          </label>
          <input
            type="time"
            {...register('startTime', { required: true })}
            className="w-full px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Heure de fin (optionnel)
          </label>
          <input
            type="time"
            {...register('endTime')}
            className="w-full px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>

      {showRecurrenceFields && (
        <>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isRecurrent"
              {...register('isRecurrent')}
              className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label
              htmlFor="isRecurrent"
              className="text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              Événement récurrent
            </label>
          </div>

          {isRecurrent && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Récurrence
                </label>
                <select
                  {...register('recurrenceType')}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="weekly">Toutes les semaines</option>
                  <option value="monthly">Tous les mois</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Jusqu&apos;au
                </label>
                <input
                  type="date"
                  {...register('recurrenceEndDate', {
                    required: isRecurrent,
                  })}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
          )}
        </>
      )}

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="cursor-pointer px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
        >
          {editingEvent ? 'Mettre à jour' : "Créer l'événement"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
