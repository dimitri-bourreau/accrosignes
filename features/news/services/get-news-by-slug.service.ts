import { News } from "../news.type";
import { getAllNews } from "./get-all-news.service";

export const getNewsBySlug = async (slug: string): Promise<News | null> => {
  const allNews = await getAllNews();
  return allNews.find((n) => n.slug === slug) || null;
};
