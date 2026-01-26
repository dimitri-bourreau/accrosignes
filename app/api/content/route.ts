import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/features/auth/admin";
import { getAllContent } from "@/features/content/services/get-content.service";
import { userIsAdmin } from "@/features/auth/services/user-is-admin.service";
import { CONTENT_KEYS, ContentKey } from "@/features/content/types/content.type";

export async function GET() {
  try {
    const content = await getAllContent();
    return NextResponse.json(content);
  } catch (error: unknown) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { key, value, adminId } = await req.json();

    if (!key || !adminId) {
      return NextResponse.json(
        { error: "Key et adminId sont requis" },
        { status: 400 }
      );
    }

    const isAdmin = await userIsAdmin(adminId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const now = new Date();
    await adminDb.collection("content").doc(key).set({
      value: value ?? "",
      label: CONTENT_KEYS[key as ContentKey] ?? key,
      updatedAt: now,
      updatedBy: adminId,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}
