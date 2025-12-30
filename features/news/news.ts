import { db } from "@/features/auth/config";
import { adminDb } from "@/features/auth/admin";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { News } from "@/features/news/news.type";

const COLLECTION = "news";

export async function deleteNews(id: string): Promise<void> {
  const newsRef = doc(db, COLLECTION, id);
  await deleteDoc(newsRef);
}

export async function getNews(id: string): Promise<News | null> {
  const newsRef = doc(db, COLLECTION, id);
  const newsSnap = await getDoc(newsRef);

  if (!newsSnap.exists()) return null;

  const data = newsSnap.data();
  return {
    id: newsSnap.id,
    ...data,
    publishedAt: data.publishedAt.toDate(),
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  } as News;
}

export async function getAllNews(): Promise<News[]> {
  const querySnapshot = await adminDb
    .collection(COLLECTION)
    .orderBy("publishedAt", "desc")
    .get();

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      publishedAt: data.publishedAt.toDate(),
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as News;
  });
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  const allNews = await getAllNews();
  return allNews.find((n) => n.slug === slug) || null;
}

export async function verifyAdminRole(uid: string): Promise<boolean> {
  const userDoc = await adminDb.collection("users").doc(uid).get();
  return userDoc.exists && userDoc.data()?.role === "Administrateur";
}
