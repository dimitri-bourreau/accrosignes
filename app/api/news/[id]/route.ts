import { NextRequest, NextResponse } from "next/server";
import { getNews, deleteNews, verifyAdminRole } from "@/features/news/news";
import { UpdateNewsData } from "@/features/news/news.type";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "@/features/auth/config";
import { generateSlug } from "@/features/news/services/generate-slug.service";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const news = await getNews(params.id);
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
    const isAdmin = await verifyAdminRole(adminId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const updateData: UpdateNewsData = {
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

    const isAdmin = await verifyAdminRole(adminId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await deleteNews(params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}
