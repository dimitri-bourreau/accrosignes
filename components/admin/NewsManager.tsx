"use client";

import { useState, useEffect } from "react";
import { News } from "@/features/news/news.type";
import Typography from "@/components/typography";
import Image from "next/image";

interface NewsManagerProps {
  userId: string;
}

export default function NewsManager({ userId }: NewsManagerProps) {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });
  const [_, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/news");
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);

      const response = await fetch("/api/upload-news-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const { imageUrl } = await response.json();
        setFormData((prev) => ({ ...prev, imageUrl }));
      } else {
        const errorData = await response.json();
        alert(`Erreur d'upload: ${errorData.error || "Erreur inconnue"}`);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Erreur lors de l'upload de l'image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        const response = await fetch(`/api/news/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, adminId: userId }),
        });
        if (response.ok) {
          fetchNews();
          resetForm();
        }
      } else {
        const response = await fetch("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, authorId: userId }),
        });
        if (response.ok) {
          fetchNews();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error saving news:", error);
    }
  };

  const handleEdit = (item: News) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      content: item.content,
      imageUrl: item.imageUrl,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette actualité ?")) return;

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId: userId }),
      });
      if (response.ok) {
        fetchNews();
      }
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", imageUrl: "" });
    setImageFile(null);
    setEditingId(null);
    setShowForm(false);
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
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white border border-gray-300 rounded-lg space-y-6 mb-8 shadow-sm"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Titre de l&apos;actualité
            </label>
            <input
              type="text"
              placeholder="Titre de l'actualité"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Contenu complet
            </label>
            <textarea
              placeholder="Rédigez le contenu de votre actualité..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
              rows={12}
              className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Image de couverture
            </label>

            {uploading ? (
              <div className="w-full px-6 py-8 border-2 border-dashed border-teal-500 bg-teal-50 rounded-lg text-center">
                <div className="space-y-3">
                  <div className="text-4xl animate-pulse">⏳</div>
                  <div className="text-sm font-semibold text-teal-900">
                    Upload en cours...
                  </div>
                  <div className="w-32 h-2 bg-teal-200 rounded-full mx-auto overflow-hidden">
                    <div className="h-full bg-teal-600 rounded-full animate-pulse w-full"></div>
                  </div>
                </div>
              </div>
            ) : formData.imageUrl ? (
              <div className="space-y-3">
                <Image
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full max-w-md rounded-lg border border-gray-300 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imageUrl: "" })}
                  className="cursor-pointer px-4 py-2 text-sm bg-red-50 text-red-700 border border-red-200 rounded-lg font-semibold hover:bg-red-100 transition duration-200"
                >
                  Supprimer l&apos;image
                </button>
              </div>
            ) : (
              <div>
                <label className="cursor-pointer block w-full px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-teal-500 hover:bg-teal-50 transition duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="space-y-2">
                    <div className="text-4xl">📸</div>
                    <div className="text-sm font-semibold text-gray-900">
                      Cliquez pour ajouter une image
                    </div>
                    <div className="text-xs text-gray-500">
                      JPG, PNG ou GIF (max 5MB)
                    </div>
                  </div>
                </label>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={uploading}
              className="cursor-pointer px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
            >
              {editingId ? "Mettre à jour" : "Créer l'actualité"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="cursor-pointer px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition duration-200"
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {loading ? (
          <Typography className="text-gray-600">Chargement...</Typography>
        ) : news.length === 0 ? (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <Typography className="font-semibold text-gray-900">
              Aucune actualité
            </Typography>
            <Typography variant="caption" className="text-gray-600">
              Ajoutez votre première actualité
            </Typography>
          </div>
        ) : (
          news.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
            >
              <div className="flex gap-4">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <Typography className="font-semibold text-gray-900 mb-2">
                    {item.title}
                  </Typography>
                  <Typography variant="caption" className="text-gray-600 mb-3">
                    {new Date(item.publishedAt).toLocaleDateString("fr-FR")}
                  </Typography>
                  <Typography
                    variant="caption"
                    className="text-gray-700 line-clamp-2"
                  >
                    {item.content.substring(0, 150)}...
                  </Typography>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition duration-200"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
