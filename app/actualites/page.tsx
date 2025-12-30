import { getAllNews } from "@/lib/firebase/news";
import Title from "@/components/title";
import Typography from "@/components/typography";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function ActualitesPage() {
  const news = await getAllNews();

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="max-w-5xl mx-auto px-6">
        <Title level="h1" className="text-gray-900 mb-4">
          Actualités
        </Title>
        <Typography variant="body-lg" className="text-gray-600 mb-12">
          Restez informé des dernières nouvelles de l&apos;association
        </Typography>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.length === 0 ? (
            <div className="col-span-full p-8 bg-gray-50 border border-gray-200 rounded-lg text-center">
              <Typography className="text-gray-600">
                Aucune actualité pour le moment
              </Typography>
            </div>
          ) : (
            news.map((item) => (
              <Link
                key={item.id}
                href={`/actualites/${item.slug}`}
                className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-200"
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
                  <Typography variant="caption" className="text-gray-500 mb-2">
                    {new Date(item.publishedAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                  <Title
                    level="h3"
                    className="text-gray-900 mb-3 group-hover:text-teal-600 transition"
                  >
                    {item.title}
                  </Title>
                  <Typography
                    variant="caption"
                    className="text-gray-700 line-clamp-3"
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
