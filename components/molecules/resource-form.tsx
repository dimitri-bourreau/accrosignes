'use client';

import { useState, useRef } from 'react';
import {
  useCreateFolder,
  useCreateLink,
  useUploadFile,
} from '@/features/resources/hooks/use-resources';

type FormType = 'folder' | 'file' | 'link' | null;

interface ResourceFormProps {
  userId: string;
  parentId: string | null;
  onClose: () => void;
}

export function ResourceForm({ userId, parentId, onClose }: ResourceFormProps) {
  const [formType, setFormType] = useState<FormType>(null);
  const [name, setName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createFolder = useCreateFolder();
  const createLink = useCreateLink();
  const uploadFile = useUploadFile();

  const isLoading =
    createFolder.isPending || createLink.isPending || uploadFile.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const onSuccess = () => {
      onClose();
    };

    if (formType === 'folder') {
      createFolder.mutate({ name, parentId, authorId: userId }, { onSuccess });
    } else if (formType === 'link') {
      if (!linkUrl.trim()) return;
      createLink.mutate(
        { name, linkUrl, parentId, authorId: userId },
        { onSuccess },
      );
    } else if (formType === 'file' && file) {
      uploadFile.mutate(
        { file, name, parentId, adminId: userId },
        { onSuccess },
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!name) setName(selectedFile.name);
    }
  };

  if (!formType) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg mb-6">
        <p className="text-gray-900 dark:text-gray-100 font-semibold mb-4">
          Que souhaitez-vous ajouter ?
        </p>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setFormType('folder')}
            className="cursor-pointer px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            📁 Dossier
          </button>
          <button
            onClick={() => setFormType('file')}
            className="cursor-pointer px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            📄 Fichier
          </button>
          <button
            onClick={() => setFormType('link')}
            className="cursor-pointer px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            🔗 Lien
          </button>
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Annuler
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg space-y-4 mb-6"
    >
      <p className="text-gray-900 dark:text-gray-100 font-semibold">
        {formType === 'folder' && 'Nouveau dossier'}
        {formType === 'file' && 'Nouveau fichier'}
        {formType === 'link' && 'Nouveau lien'}
      </p>

      {formType === 'file' && (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:border-teal-500 hover:text-teal-600 transition"
          >
            {file ? file.name : 'Cliquez pour sélectionner un fichier'}
          </button>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Nom
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          required
        />
      </div>

      {formType === 'link' && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
            URL
          </label>
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://"
            className="w-full px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading || (formType === 'file' && !file)}
          className="cursor-pointer px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Création...' : 'Créer'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
