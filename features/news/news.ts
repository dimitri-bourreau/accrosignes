import { adminDb } from "@/features/auth/admin";
import { News } from "@/features/news/news.type";
import { getAllNews } from "./services/get-all-news.service";

export async function getNewsBySlug(slug: string): Promise<News | null> {
  const allNews = await getAllNews();
  return allNews.find((n) => n.slug === slug) || null;
}

export async function verifyAdminRole(uid: string): Promise<boolean> {
  const userDoc = await adminDb.collection("users").doc(uid).get();
  return userDoc.exists && userDoc.data()?.role === "Administrateur";
}
