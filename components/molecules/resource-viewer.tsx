"use client";

import { useState } from "react";
import Typography from "@/components/atoms/typography";
import { useResources } from "@/features/resources/hooks/use-resources";
import { Resource } from "@/features/resources/types/resource.type";
import { getResourceIcon, formatFileSize } from "@/features/resources/utils/format-resource";

export default function ResourceViewer() {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const { data, isLoading } = useResources(currentFolderId);

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

  const navigateToFolder = (folderId: string | null) => {
    setCurrentFolderId(folderId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm">
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

      {isLoading ? (
        <Typography className="text-gray-600 dark:text-gray-300">
          Chargement...
        </Typography>
      ) : resources.length === 0 ? (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <Typography className="text-gray-600 dark:text-gray-300">
            Aucune ressource disponible
          </Typography>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <button
              key={resource.id}
              onClick={() => handleOpenResource(resource)}
              className="cursor-pointer p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-md transition text-left"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getResourceIcon(resource)}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                    {resource.name}
                  </p>
                  {resource.type === "file" && resource.fileSize && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatFileSize(resource.fileSize)}
                    </p>
                  )}
                  {resource.type === "folder" && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Dossier
                    </p>
                  )}
                  {resource.type === "link" && (
                    <p className="text-sm text-teal-600 dark:text-teal-400">
                      Lien externe
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
