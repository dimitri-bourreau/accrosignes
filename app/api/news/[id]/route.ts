import { NextRequest, NextResponse } from "next/server";
import {
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/features/auth/config";
import { generateSlug } from "@/features/news/services/generate-slug.service";
import { userIsAdmin } from "@/features/auth/services/user-is-admin.service";
import { News } from "@/features/news/types/news.type";
import { UpdateNews } from "@/features/news/types/update-news.type";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const newsRef = doc(db, "news", params.id);
    const newsSnap = await getDoc(newsRef);
    if (!newsSnap.exists()) return null;

    const data = newsSnap.data();
    const news = {
      id: newsSnap.id,
      ...data,
      publishedAt: data.publishedAt.toDate(),
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as News;
    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }
    return NextResponse.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content, imageUrl, adminId } = await req.json();
    const isAdmin = await userIsAdmin(adminId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const updateData: UpdateNews = {
      content,
      imageUrl,
      title,
      updatedAt: Timestamp.fromDate(new Date()),
      slug: generateSlug(title),
    };
    const newsRef = doc(db, "news", params.id);
    await updateDoc(newsRef, updateData as Record<string, unknown>);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { error: "Failed to update news" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { adminId } = await req.json();

    const isAdmin = await userIsAdmin(adminId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const newsRef = doc(db, "news", params.id);
    await deleteDoc(newsRef);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}
