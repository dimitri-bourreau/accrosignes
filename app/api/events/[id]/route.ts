import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/features/auth/admin";
import { userIsAdmin } from "@/features/auth/services/user-is-admin.service";
import { getEventById } from "@/features/events/services/get-all-events.service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const event = await getEventById(id);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (error: unknown) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const {
      title,
      description,
      date,
      startTime,
      endTime,
      color,
      adminId,
      recurrence,
      scope,
      originalDate,
      seriesId,
    } = await req.json();

    if (
      !title ||
      typeof title !== "string" ||
      !date ||
      !startTime ||
      typeof startTime !== "string" ||
      !adminId ||
      typeof adminId !== "string"
    ) {
      return NextResponse.json(
        { error: "Title, date, startTime et adminId sont requis" },
        { status: 400 }
      );
    }

    const isAdmin = await userIsAdmin(adminId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (scope === "this" && seriesId && originalDate) {
      const now = new Date();
      const exceptionDoc = {
        title,
        description: description || null,
        date: new Date(date),
        startTime,
        endTime: endTime || null,
        color: color || null,
        authorId: adminId,
        createdAt: now,
        updatedAt: now,
        parentEventId: seriesId,
        originalDate: new Date(originalDate),
        isDeleted: false,
      };
      const docRef = await adminDb.collection("events").add(exceptionDoc);
      return NextResponse.json({ id: docRef.id, success: true });
    }

    const updateData: Record<string, unknown> = {
      title,
      description: description || null,
      date: new Date(date),
      startTime,
      endTime: endTime || null,
      color: color || null,
      updatedAt: new Date(),
    };

    if (recurrence && recurrence.type && recurrence.endDate) {
      updateData.recurrence = {
        type: recurrence.type,
        endDate: new Date(recurrence.endDate),
      };
    } else if (recurrence === null) {
      updateData.recurrence = null;
    }

    await adminDb.collection("events").doc(id).update(updateData);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { adminId, scope, originalDate, seriesId } = await req.json();

    if (!adminId || typeof adminId !== "string") {
      return NextResponse.json(
        { error: "adminId est requis" },
        { status: 400 }
      );
    }

    const isAdmin = await userIsAdmin(adminId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (scope === "this" && seriesId && originalDate) {
      const now = new Date();
      const parentEvent = await getEventById(seriesId);
      if (!parentEvent) {
        return NextResponse.json(
          { error: "Parent event not found" },
          { status: 404 }
        );
      }

      const exceptionDoc = {
        title: parentEvent.title,
        description: parentEvent.description || null,
        date: new Date(originalDate),
        startTime: parentEvent.startTime,
        endTime: parentEvent.endTime || null,
        authorId: adminId,
        createdAt: now,
        updatedAt: now,
        parentEventId: seriesId,
        originalDate: new Date(originalDate),
        isDeleted: true,
      };
      await adminDb.collection("events").add(exceptionDoc);
      return NextResponse.json({ success: true });
    }

    const realId = id.includes("_") ? id.split("_")[0] : id;

    const exceptionsSnapshot = await adminDb
      .collection("events")
      .where("parentEventId", "==", realId)
      .get();

    const batch = adminDb.batch();
    exceptionsSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    batch.delete(adminDb.collection("events").doc(realId));
    await batch.commit();

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
