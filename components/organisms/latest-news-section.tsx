import Image from 'next/image';
import Link from 'next/link';
import Title from '../atoms/title';
import Typography from '../atoms/typography';
import { News } from '@/features/news/types/news.type';

interface LatestNewsSectionProps {
  news: News[];
}

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const NewsCard = ({ article }: { article: News }) => (
  <Link
    href={`/actualites/${article.slug}`}
    className="group block bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition duration-200"
  >
    {article.imageUrl && (
      <div className="aspect-video overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          width={800}
          height={450}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
        />
      </div>
    )}
    <div className="p-6">
      <Typography
        variant="caption"
        className="text-gray-500 dark:text-gray-400 mb-2"
      >
        {formatDate(article.publishedAt)}
      </Typography>
      <Title
        level="h3"
        className="text-gray-900 dark:text-gray-100 mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition"
      >
        {article.title}
      </Title>
      <Typography
        variant="caption"
        className="text-gray-700 dark:text-gray-200 line-clamp-3"
      >
        {stripHtml(article.content).substring(0, 120)}...
      </Typography>
    </div>
  </Link>
);

export default function LatestNewsSection({ news }: LatestNewsSectionProps) {
  if (news.length === 0) return null;

  return (
    <section className="px-6 py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Title level="h2" className="text-gray-900 dark:text-gray-100">
            Dernières actualités
          </Title>
          <Link
            href="/actualites"
            className="cursor-pointer text-teal-600 dark:text-teal-400 font-semibold hover:underline transition"
          >
            Tout voir &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
