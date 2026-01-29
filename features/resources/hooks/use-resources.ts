import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Resource, ResourceWithPath } from "../types/resource.type";

export const useResources = (parentId: string | null) => {
  return useQuery({
    queryKey: ["resources", parentId],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (parentId) params.set("parentId", parentId);
      params.set("includePath", "true");
      const response = await fetch(`/api/resources?${params}`);
      if (!response.ok) throw new Error("Failed to fetch resources");
      return response.json() as Promise<{
        resources: Resource[];
        path: Resource[];
      }>;
    },
  });
};

interface CreateFolderData {
  name: string;
  parentId: string | null;
  authorId: string;
}

export const useCreateFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateFolderData) => {
      const response = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "folder" }),
      });
      if (!response.ok) throw new Error("Failed to create folder");
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["resources", variables.parentId] });
    },
  });
};

interface CreateLinkData {
  name: string;
  linkUrl: string;
  parentId: string | null;
  authorId: string;
}

export const useCreateLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateLinkData) => {
      const response = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "link" }),
      });
      if (!response.ok) throw new Error("Failed to create link");
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["resources", variables.parentId] });
    },
  });
};

interface UploadFileData {
  file: File;
  name: string;
  parentId: string | null;
  adminId: string;
}

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ file, name, parentId, adminId }: UploadFileData) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      formData.append("adminId", adminId);
      if (parentId) formData.append("parentId", parentId);

      const response = await fetch("/api/resources/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload file");
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["resources", variables.parentId] });
    },
  });
};

export const useStorageUsage = () => {
  return useQuery({
    queryKey: ["storage-usage"],
    queryFn: async () => {
      const response = await fetch("/api/resources/storage");
      if (!response.ok) throw new Error("Failed to fetch storage usage");
      return response.json() as Promise<{ usedBytes: number }>;
    },
  });
};

export const useDeleteResource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, adminId }: { id: string; adminId: string; parentId: string | null }) => {
      const response = await fetch(`/api/resources/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId }),
      });
      if (!response.ok) throw new Error("Failed to delete resource");
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["resources", variables.parentId] });
      queryClient.invalidateQueries({ queryKey: ["storage-usage"] });
    },
  });
};
