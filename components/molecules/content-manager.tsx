"use client";

import { useState } from "react";
import {
  useContent,
  useUpdateContent,
  useUploadContentImage,
} from "@/features/content/hooks/use-content";
import { useUploadEditorImage } from "@/features/editor/hooks/use-upload-editor-image";
import {
  CONTENT_KEYS,
  CONTENT_SECTIONS,
  ContentKey,
  isRichTextKey,
  isImageKey,
} from "@/features/content/types/content.type";
import Typography from "@/components/atoms/typography";
import Title from "@/components/atoms/title";
import ContentEditor from "./content-editor";
import { ImageUpload } from "./image-upload";
import Image from "next/image";

interface ContentManagerProps {
  userId: string;
}

export default function ContentManager({ userId }: ContentManagerProps) {
  const { data: content, isLoading } = useContent();
  const updateContent = useUpdateContent();
  const uploadImage = useUploadContentImage();
  const uploadEditorImage = useUploadEditorImage();
  const [editingKey, setEditingKey] = useState<ContentKey | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (key: ContentKey) => {
    const existing = content?.find((c) => c.key === key);
    setEditValue(existing?.value ?? "");
    setEditingKey(key);
  };

  const handleSave = async () => {
    if (!editingKey) return;
    await updateContent.mutateAsync({
      key: editingKey,
      value: editValue,
      adminId: userId,
    });
    setEditingKey(null);
    setEditValue("");
  };

  const handleCancel = () => {
    setEditingKey(null);
    setEditValue("");
  };

  const handleDeleteImage = async (key: ContentKey) => {
    await updateContent.mutateAsync({
      key,
      value: "",
      adminId: userId,
    });
  };

  if (isLoading) {
    return (
      <Typography className="text-gray-600 dark:text-gray-300">
        Chargement...
      </Typography>
    );
  }

  const handleImageUpload = async (file: File) => {
    if (!editingKey) return;
    const url = await uploadImage.mutateAsync({
      file,
      userId,
      contentKey: editingKey,
    });
    setEditValue(url);
  };

  const handleEditorImageUpload = async (file: File) => {
    return uploadEditorImage.mutateAsync({ file, userId });
  };

  if (editingKey) {
    const isRichText = isRichTextKey(editingKey);
    const isImage = isImageKey(editingKey);

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Typography className="font-semibold text-gray-900 dark:text-gray-100">
            {CONTENT_KEYS[editingKey]}
          </Typography>
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={updateContent.isPending || uploadImage.isPending}
              className="cursor-pointer px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-50"
            >
              {updateContent.isPending ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </div>

        {isImage ? (
          <ImageUpload
            imageUrl={editValue}
            uploading={uploadImage.isPending}
            onUpload={handleImageUpload}
            onRemove={() => setEditValue("")}
          />
        ) : isRichText ? (
          <ContentEditor content={editValue} onChange={setEditValue} onUploadImage={handleEditorImageUpload} />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg"
            placeholder="Entrez le texte..."
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {CONTENT_SECTIONS.map((section) => (
        <div key={section.title} className="space-y-3">
          <Title level="h3" className="text-gray-900 dark:text-gray-100">
            {section.title}
          </Title>
          <div className="space-y-2">
            {section.keys.map((key) => {
              const existing = content?.find((c) => c.key === key);
              const isImage = isImageKey(key);
              const preview = isImage ? null : getPreview(existing?.value);
              return (
                <div
                  key={key}
                  className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex justify-between items-center gap-4"
                >
                  {isImage && existing?.value && (
                    <Image
                      src={existing.value}
                      alt="Aperçu"
                      width={80}
                      height={60}
                      className="rounded border border-gray-300 dark:border-gray-600 object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <Typography className="font-semibold text-gray-900 dark:text-gray-100">
                      {CONTENT_KEYS[key]}
                    </Typography>
                    {preview && (
                      <Typography
                        variant="body-sm"
                        className="text-gray-700 dark:text-gray-200 truncate"
                      >
                        {preview}
                      </Typography>
                    )}
                    <Typography
                      variant="caption"
                      className="text-gray-500 dark:text-gray-400"
                    >
                      {existing
                        ? "Modifié le " + formatDate(existing.updatedAt)
                        : "Non configuré"}
                    </Typography>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleEdit(key)}
                      className="cursor-pointer px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
                    >
                      Modifier
                    </button>
                    {isImage && existing?.value && (
                      <button
                        onClick={() => handleDeleteImage(key)}
                        disabled={updateContent.isPending}
                        className="cursor-pointer px-4 py-2 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700 rounded-lg font-semibold hover:bg-red-100 dark:hover:bg-red-900 transition disabled:opacity-50"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getPreview(value?: string): string {
  if (!value) return "";
  const text = value.replace(/<[^>]*>/g, "").trim();
  if (text.length <= 60) return text;
  return text.slice(0, 60) + "...";
}
