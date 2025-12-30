"use client";

import { useForm } from "react-hook-form";
import {
  useCreateNews,
  useUpdateNews,
  useUploadImage,
} from "@/features/news/hooks/use-news";
import { ImageUpload } from "./image-upload";

type NewsFormData = {
  title: string;
  content: string;
  imageUrl: string;
};

interface NewsFormProps {
  userId: string;
  editingNews?: {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
  } | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function NewsForm({
  userId,
  editingNews,
  onSuccess,
  onCancel,
}: NewsFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm<NewsFormData>({
    defaultValues: editingNews || { title: "", content: "", imageUrl: "" },
  });

  const createNews = useCreateNews();
  const updateNews = useUpdateNews();
  const uploadImage = useUploadImage();

  const imageUrl = watch("imageUrl");

  const onSubmit = (data: NewsFormData) => {
    if (editingNews) {
      updateNews.mutate(
        { id: editingNews.id, data: { ...data, adminId: userId } },
        { onSuccess }
      );
    } else {
      createNews.mutate({ ...data, authorId: userId }, { onSuccess });
    }
  };

  const handleImageUpload = async (file: File) => {
    const url = await uploadImage.mutateAsync({ file, userId });
    setValue("imageUrl", url);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg space-y-6 mb-8 shadow-sm"
    >
      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Titre de l&apos;actualité
        </label>
        <input
          {...register("title", { required: true })}
          className="w-full px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Contenu complet
        </label>
        <textarea
          {...register("content", { required: true })}
          rows={12}
          className="w-full px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-sm"
        />
      </div>

      <ImageUpload
        imageUrl={imageUrl}
        uploading={uploadImage.isPending}
        onUpload={handleImageUpload}
        onRemove={() => setValue("imageUrl", "")}
      />

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={uploadImage.isPending}
          className="cursor-pointer px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
        >
          {editingNews ? "Mettre à jour" : "Créer l'actualité"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
