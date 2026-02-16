import { adminDb } from "@/features/auth/admin";
import { Event, EventOccurrence } from "../types/event.type";
import { generateOccurrences } from "./generate-occurrences.service";

function parseEvent(doc: FirebaseFirestore.DocumentSnapshot): Event {
  const data = doc.data();
  if (!data) throw new Error("Event data is undefined");

  return {
    id: doc.id,
    title: data.title,
    description: data.description,
    date: data.date.toDate(),
    startTime: data.startTime,
    endTime: data.endTime,
    color: data.color,
    category: data.category,
    authorId: data.authorId,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
    recurrence: data.recurrence
      ? {
          type: data.recurrence.type,
          endDate: data.recurrence.endDate.toDate(),
        }
      : undefined,
    parentEventId: data.parentEventId,
    originalDate: data.originalDate?.toDate(),
    isDeleted: data.isDeleted,
  };
}

export const getAllEvents = async (): Promise<EventOccurrence[]> => {
  const querySnapshot = await adminDb.collection("events").get();

  const allDocs = querySnapshot.docs.map(parseEvent);

  const mainEvents = allDocs.filter((e) => !e.parentEventId);
  const exceptions = allDocs.filter((e) => e.parentEventId);

  const occurrences: EventOccurrence[] = [];

  for (const event of mainEvents) {
    const eventExceptions = exceptions.filter(
      (e) => e.parentEventId === event.id
    );
    const generated = generateOccurrences(event, eventExceptions);
    occurrences.push(...generated);
  }

  occurrences.sort((a, b) => a.date.getTime() - b.date.getTime());

  return occurrences;
};

export const getEventById = async (id: string): Promise<Event | null> => {
  const doc = await adminDb.collection("events").doc(id).get();
  if (!doc.exists) return null;
  return parseEvent(doc);
};

export const getMainEvents = async (): Promise<Event[]> => {
  const querySnapshot = await adminDb
    .collection("events")
    .where("parentEventId", "==", null)
    .orderBy("date", "asc")
    .get();

  return querySnapshot.docs.map(parseEvent);
};
