import { adminDb } from "@/features/auth/admin";
import { News } from "../types/news.type";

export const getAllNews = async (): Promise<News[]> => {
  const querySnapshot = await adminDb
    .collection("news")
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
};
