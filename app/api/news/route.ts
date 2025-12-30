import { NextRequest, NextResponse } from "next/server";
import { generateSlug } from "@/features/news/services/generate-slug.service";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/features/auth/config";
import { getAllNews } from "@/features/news/services/get-all-news.service";
import { userIsAdmin } from "@/features/auth/services/user-is-admin.service";

export async function GET() {
  try {
    const news = await getAllNews();
    return NextResponse.json(news);
  } catch (error: unknown) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, content, imageUrl, authorId } = await req.json();

    if (!title || typeof title !== "string" || !content || typeof content !== "string" || !authorId || typeof authorId !== "string") {
      return NextResponse.json(
        { error: "Title, content et authorId sont requis" },
        { status: 400 }
      );
    }

    const isAdmin = await userIsAdmin(authorId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const slug = generateSlug(title);
    const now = new Date();
    const newsDocument = {
      title,
      content,
      imageUrl,
      authorId,
      slug,
      publishedAt: Timestamp.fromDate(now),
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now),
    };
    const { id } = await addDoc(collection(db, "news"), newsDocument);
    return NextResponse.json({ id, success: true });
  } catch (error: unknown) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}
