"use client";

import { Resource } from "@/features/resources/types/resource.type";

interface ResourceItemProps {
  resource: Resource;
  onOpen: () => void;
  onDelete: () => void;
}

function getIcon(resource: Resource): string {
  if (resource.type === "folder") return "📁";
  if (resource.type === "link") return "🔗";
  if (resource.fileType?.startsWith("image/")) return "🖼️";
  if (resource.fileType === "application/pdf") return "📄";
  return "📎";
}

function formatFileSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function ResourceItem({ resource, onOpen, onDelete }: ResourceItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
      <button
        onClick={onOpen}
        className="flex items-center gap-3 flex-1 text-left cursor-pointer"
      >
        <span className="text-2xl">{getIcon(resource)}</span>
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {resource.name}
          </p>
          {resource.type === "file" && resource.fileSize && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatFileSize(resource.fileSize)}
            </p>
          )}
        </div>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="cursor-pointer p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
        title="Supprimer"
      >
        🗑️
      </button>
    </div>
  );
}
