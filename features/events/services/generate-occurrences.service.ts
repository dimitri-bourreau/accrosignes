import { Event, EventOccurrence } from '../types/event.type';

function addWeeks(date: Date, weeks: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + weeks * 7);
  return result;
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function generateOccurrences(
  event: Event,
  exceptions: Event[],
): EventOccurrence[] {
  if (!event.recurrence) {
    return [{ ...event, isRecurrenceInstance: false }];
  }

  const occurrences: EventOccurrence[] = [
    { ...event, isRecurrenceInstance: false },
  ];
  const { type, endDate } = event.recurrence;
  let currentDate = new Date(event.date);
  const end = new Date(endDate);

  // Move to the next occurrence (skip the first date as it's already added above)
  if (type === 'weekly') {
    currentDate = addWeeks(currentDate, 1);
  } else {
    currentDate = addMonths(currentDate, 1);
  }

  while (currentDate <= end) {
    const dateKey = currentDate.toISOString().split('T')[0];
    const exception = exceptions.find((e) => {
      if (e.parentEventId !== event.id || !e.originalDate) return false;
      const origKey = new Date(e.originalDate).toISOString().split('T')[0];
      return origKey === dateKey;
    });

    if (exception) {
      if (!exception.isDeleted) {
        occurrences.push({
          ...exception,
          date: new Date(exception.date),
          isRecurrenceInstance: true,
          seriesId: event.id,
        });
      }
    } else {
      occurrences.push({
        ...event,
        id: `${event.id}_${dateKey}`,
        date: new Date(currentDate),
        isRecurrenceInstance: true,
        seriesId: event.id,
      });
    }

    if (type === 'weekly') {
      currentDate = addWeeks(currentDate, 1);
    } else {
      currentDate = addMonths(currentDate, 1);
    }
  }

  return occurrences;
}
