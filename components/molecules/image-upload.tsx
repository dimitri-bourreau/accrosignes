"use client";

import Image from "next/image";

interface ImageUploadProps {
  imageUrl: string;
  uploading: boolean;
  onUpload: (file: File) => void;
  onRemove: () => void;
}

export function ImageUpload({ imageUrl, uploading, onUpload, onRemove }: ImageUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  if (uploading) {
    return (
      <div className="w-full px-6 py-8 border-2 border-dashed border-teal-500 dark:border-teal-600 bg-teal-50 dark:bg-teal-950 rounded-lg text-center">
        <div className="space-y-3">
          <div className="text-4xl animate-pulse">⏳</div>
          <div className="text-sm font-semibold text-teal-900 dark:text-teal-200">Upload en cours...</div>
        </div>
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className="space-y-3">
        <Image src={imageUrl} alt="Preview" width={400} height={300} className="w-full max-w-md rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm" />
        <button
          type="button"
          onClick={onRemove}
          className="cursor-pointer px-4 py-2 text-sm bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700 rounded-lg font-semibold hover:bg-red-100 dark:hover:bg-red-900 transition duration-200"
        >
          Supprimer l&apos;image
        </button>
      </div>
    );
  }

  return (
    <label className="cursor-pointer block w-full px-6 py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950 transition duration-200">
      <input type="file" accept="image/*" onChange={handleChange} className="hidden" />
      <div className="space-y-2">
        <div className="text-4xl">📸</div>
        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Cliquez pour ajouter une image</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG ou GIF (max 5MB)</div>
      </div>
    </label>
  );
}
