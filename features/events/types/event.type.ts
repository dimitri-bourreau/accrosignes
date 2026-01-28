export type RecurrenceType = "weekly" | "monthly";

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
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  recurrence?: Recurrence;
  parentEventId?: string;
  originalDate?: Date;
  isDeleted?: boolean;
}

export interface EventOccurrence extends Omit<Event, "date"> {
  date: Date;
  isRecurrenceInstance?: boolean;
  seriesId?: string;
}
