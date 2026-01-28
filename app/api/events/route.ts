import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/features/auth/admin";
import { getAllEvents } from "@/features/events/services/get-all-events.service";
import { userIsAdmin } from "@/features/auth/services/user-is-admin.service";

export async function GET() {
  try {
    const events = await getAllEvents();
    return NextResponse.json(events);
  } catch (error: unknown) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      title,
      description,
      date,
      startTime,
      endTime,
      authorId,
      recurrence,
    } = await req.json();

    if (
      !title ||
      typeof title !== "string" ||
      !date ||
      !startTime ||
      typeof startTime !== "string" ||
      !authorId ||
      typeof authorId !== "string"
    ) {
      return NextResponse.json(
        { error: "Title, date, startTime et authorId sont requis" },
        { status: 400 }
      );
    }

    const isAdmin = await userIsAdmin(authorId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const now = new Date();
    const eventDocument: Record<string, unknown> = {
      title,
      description: description || null,
      date: new Date(date),
      startTime,
      endTime: endTime || null,
      authorId,
      createdAt: now,
      updatedAt: now,
      parentEventId: null,
    };

    if (recurrence && recurrence.type && recurrence.endDate) {
      eventDocument.recurrence = {
        type: recurrence.type,
        endDate: new Date(recurrence.endDate),
      };
    }

    const docRef = await adminDb.collection("events").add(eventDocument);
    return NextResponse.json({ id: docRef.id, success: true });
  } catch (error: unknown) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
