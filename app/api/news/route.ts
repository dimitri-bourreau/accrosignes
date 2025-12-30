import { NextRequest, NextResponse } from "next/server";
import { getAllNews, createNews, verifyAdminRole } from "@/features/news/news";
import { CreateNewsData } from "@/features/news/news.type";

export async function GET() {
  try {
    const news = await getAllNews();
    return NextResponse.json(news);
  } catch (error) {
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

    const isAdmin = await verifyAdminRole(authorId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const newsData: CreateNewsData = { title, content, imageUrl, authorId };
    const id = await createNews(newsData);

    return NextResponse.json({ id, success: true });
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}
