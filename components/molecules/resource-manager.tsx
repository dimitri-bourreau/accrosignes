"use client";

import { useState } from "react";
import Typography from "@/components/atoms/typography";
import { useResources, useDeleteResource } from "@/features/resources/hooks/use-resources";
import { ResourceItem } from "./resource-item";
import { ResourceForm } from "./resource-form";
import { Resource } from "@/features/resources/types/resource.type";

interface ResourceManagerProps {
  userId: string;
}

export default function ResourceManager({ userId }: ResourceManagerProps) {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading } = useResources(currentFolderId);
  const deleteResource = useDeleteResource();

  const resources = data?.resources ?? [];
  const path = data?.path ?? [];

  const handleOpenResource = (resource: Resource) => {
    if (resource.type === "folder") {
      setCurrentFolderId(resource.id);
    } else if (resource.type === "link" && resource.linkUrl) {
      window.open(resource.linkUrl, "_blank");
    } else if (resource.type === "file" && resource.fileUrl) {
      window.open(resource.fileUrl, "_blank");
    }
  };

  const handleDelete = (resource: Resource) => {
    const message = resource.type === "folder"
      ? "Supprimer ce dossier et tout son contenu ?"
      : "Supprimer cette ressource ?";
    if (confirm(message)) {
      deleteResource.mutate({ id: resource.id, adminId: userId });
    }
  };

  const navigateToFolder = (folderId: string | null) => {
    setCurrentFolderId(folderId);
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-4 text-sm">
        <button
          onClick={() => navigateToFolder(null)}
          className="cursor-pointer text-teal-600 hover:underline"
        >
          Ressources
        </button>
        {path.map((folder) => (
          <span key={folder.id} className="flex items-center gap-2">
            <span className="text-gray-400">/</span>
            <button
              onClick={() => navigateToFolder(folder.id)}
              className="cursor-pointer text-teal-600 hover:underline"
            >
              {folder.name}
            </button>
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="cursor-pointer px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
        >
          {showForm ? "Annuler" : "Ajouter"}
        </button>
      </div>

      {showForm && (
        <ResourceForm
          userId={userId}
          parentId={currentFolderId}
          onClose={() => setShowForm(false)}
        />
      )}

      <div className="space-y-3">
        {isLoading ? (
          <Typography className="text-gray-600 dark:text-gray-300">
            Chargement...
          </Typography>
        ) : resources.length === 0 ? (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Typography className="font-semibold text-gray-900 dark:text-gray-100">
              Dossier vide
            </Typography>
            <Typography variant="caption" className="text-gray-600 dark:text-gray-300">
              Ajoutez des dossiers, fichiers ou liens
            </Typography>
          </div>
        ) : (
          resources.map((resource) => (
            <ResourceItem
              key={resource.id}
              resource={resource}
              onOpen={() => handleOpenResource(resource)}
              onDelete={() => handleDelete(resource)}
            />
          ))
        )}
      </div>
    </>
  );
}
