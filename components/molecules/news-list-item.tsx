"use client";

import Image from "next/image";
import Typography from "@/components/atoms/typography";
import { News } from "@/features/news/types/news.type";

interface NewsListItemProps {
  news: News;
  onEdit: () => void;
  onDelete: () => void;
}

export function NewsListItem({ news, onEdit, onDelete }: NewsListItemProps) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="flex gap-4">
        {news.imageUrl && (
          <Image src={news.imageUrl} alt={news.title} width={128} height={128} className="w-32 h-32 object-cover rounded-lg" />
        )}
        <div className="flex-1">
          <Typography className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{news.title}</Typography>
          <Typography variant="caption" className="text-gray-600 dark:text-gray-300 mb-3">
            {new Date(news.publishedAt).toLocaleDateString("fr-FR")}
          </Typography>
          <Typography variant="caption" className="text-gray-700 dark:text-gray-200 line-clamp-2">
            {news.content.substring(0, 150)}...
          </Typography>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Modifier
          </button>
          <button
            onClick={onDelete}
            className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition duration-200"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
