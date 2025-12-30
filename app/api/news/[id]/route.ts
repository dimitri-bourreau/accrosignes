import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/features/auth/admin";
import { generateSlug } from "@/features/news/services/generate-slug.service";
import { userIsAdmin } from "@/features/auth/services/user-is-admin.service";
import { News } from "@/features/news/types/news.type";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const newsSnap = await adminDb.collection("news").doc(id).get();
    if (!newsSnap.exists) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    const data = newsSnap.data();
    const news = {
      id: newsSnap.id,
      ...data,
      publishedAt: data?.publishedAt?.toDate(),
      createdAt: data?.createdAt?.toDate(),
      updatedAt: data?.updatedAt?.toDate(),
    } as News;
    return NextResponse.json(news);
  } catch (error: unknown) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
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
    const { title, content, imageUrl, adminId } = await req.json();

    if (!title || typeof title !== "string" || !content || typeof content !== "string" || !adminId || typeof adminId !== "string") {
      return NextResponse.json(
        { error: "Title, content et adminId sont requis" },
        { status: 400 }
      );
    }

    const isAdmin = await userIsAdmin(adminId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await adminDb.collection("news").doc(id).update({
      content,
      imageUrl,
      title,
      updatedAt: new Date(),
      slug: generateSlug(title),
    });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { error: "Failed to update news" },
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
    const { adminId } = await req.json();

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

    await adminDb.collection("news").doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}
