import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/features/auth/admin";
import {
  getResourcesByParent,
  getResourcePath,
} from "@/features/resources/services/get-resources.service";
import { userIsAdmin } from "@/features/auth/services/user-is-admin.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parentId = searchParams.get("parentId");
    const includePath = searchParams.get("includePath") === "true";

    const resources = await getResourcesByParent(parentId);
    const path = includePath ? await getResourcePath(parentId) : [];

    return NextResponse.json({ resources, path });
  } catch (error: unknown) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, type, parentId, linkUrl, authorId } = await req.json();

    if (!name || !type || !authorId) {
      return NextResponse.json(
        { error: "name, type et authorId sont requis" },
        { status: 400 }
      );
    }

    const isAdmin = await userIsAdmin(authorId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const now = new Date();
    const resourceDoc: Record<string, unknown> = {
      name,
      type,
      parentId: parentId || null,
      authorId,
      createdAt: now,
      updatedAt: now,
    };

    if (type === "link" && linkUrl) {
      resourceDoc.linkUrl = linkUrl;
    }

    const docRef = await adminDb.collection("resources").add(resourceDoc);
    return NextResponse.json({ id: docRef.id, success: true });
  } catch (error: unknown) {
    console.error("Error creating resource:", error);
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}
