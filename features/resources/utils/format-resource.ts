import { Resource } from "../types/resource.type";

export function getResourceIcon(resource: Resource): string {
  if (resource.type === "folder") return "📁";
  if (resource.type === "link") return "🔗";
  if (resource.fileType?.startsWith("image/")) return "🖼️";
  if (resource.fileType === "application/pdf") return "📄";
  return "📎";
}

export function formatFileSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}
