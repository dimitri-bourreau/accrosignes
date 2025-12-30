import Title from "@/components/atoms/title";
import Typography from "@/components/atoms/typography";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllNews } from "@/features/news/services/get-all-news.service";
import { getNewsBySlug } from "@/features/news/services/get-news-by-slug.service";

export const revalidate = 300;

export async function generateStaticParams() {
  const news = await getAllNews();
  return news.map((item) => ({ slug: item.slug }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const newsItem = await getNewsBySlug(slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 py-12">
      <article className="max-w-4xl mx-auto px-6">
        <Link
          href="/actualites"
          className="inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-500 mb-8 transition"
        >
          ← Retour aux actualités
        </Link>

        <div className="space-y-6">
          <div>
            <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mb-4">
              {new Date(newsItem.publishedAt).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
            <Title level="h1" className="text-gray-900 dark:text-gray-100 mb-6">
              {newsItem.title}
            </Title>
          </div>

          {newsItem.imageUrl && (
            <div className="aspect-video overflow-hidden rounded-lg">
              <Image
                src={newsItem.imageUrl}
                alt={newsItem.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <Typography
              variant="body-lg"
              className="text-gray-800 dark:text-gray-200 whitespace-pre-line"
            >
              {newsItem.content}
            </Typography>
          </div>
        </div>
      </article>
    </main>
  );
}
