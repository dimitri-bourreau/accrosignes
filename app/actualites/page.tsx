import Title from "@/components/atoms/title";
import Typography from "@/components/atoms/typography";
import Link from "next/link";
import Image from "next/image";
import { getAllNews } from "@/features/news/services/get-all-news.service";

export const revalidate = 300;

export default async function ActualitesPage() {
  const news = await getAllNews();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <Title level="h1" className="text-gray-900 dark:text-gray-100 mb-4">
          Actualités
        </Title>
        <Typography variant="body-lg" className="text-gray-600 dark:text-gray-300 mb-12">
          Restez informé des dernières nouvelles de l&apos;association
        </Typography>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.length === 0 ? (
            <div className="col-span-full p-8 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
              <Typography className="text-gray-600 dark:text-gray-300">
                Aucune actualité pour le moment
              </Typography>
            </div>
          ) : (
            news.map((item) => (
              <Link
                key={item.id}
                href={`/actualites/${item.slug}`}
                className="group block bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition duration-200"
              >
                {item.imageUrl && (
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                    />
                  </div>
                )}
                <div className="p-6">
                  <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mb-2">
                    {new Date(item.publishedAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                  <Title
                    level="h3"
                    className="text-gray-900 dark:text-gray-100 mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition"
                  >
                    {item.title}
                  </Title>
                  <Typography
                    variant="caption"
                    className="text-gray-700 dark:text-gray-200 line-clamp-3"
                  >
                    {item.content.substring(0, 120)}...
                  </Typography>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
