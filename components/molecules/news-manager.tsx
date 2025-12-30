"use client";

import { useState } from "react";
import Typography from "@/components/atoms/typography";
import { useNews, useDeleteNews } from "@/features/news/hooks/use-news";
import { NewsForm } from "./news-form";
import { NewsListItem } from "./news-list-item";
import { News } from "@/features/news/types/news.type";

interface NewsManagerProps {
  userId: string;
}

export default function NewsManager({ userId }: NewsManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const { data: news = [], isLoading } = useNews();
  const deleteNews = useDeleteNews();

  const handleEdit = (item: News) => {
    setEditingNews(item);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Supprimer cette actualité ?")) {
      deleteNews.mutate({ id, adminId: userId });
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingNews(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => setShowForm(!showForm)}
          className="cursor-pointer px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
        >
          {showForm ? "Annuler" : "Ajouter une actualité"}
        </button>
      </div>

      {showForm && (
        <NewsForm
          userId={userId}
          editingNews={editingNews}
          onSuccess={resetForm}
          onCancel={resetForm}
        />
      )}

      <div className="space-y-4">
        {isLoading ? (
          <Typography className="text-gray-600 dark:text-gray-300">
            Chargement...
          </Typography>
        ) : news.length === 0 ? (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Typography className="font-semibold text-gray-900 dark:text-gray-100">
              Aucune actualité
            </Typography>
            <Typography
              variant="caption"
              className="text-gray-600 dark:text-gray-300"
            >
              Ajoutez votre première actualité
            </Typography>
          </div>
        ) : (
          news.map((item) => (
            <NewsListItem
              key={item.id}
              news={item}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            />
          ))
        )}
      </div>
    </>
  );
}
