import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { News } from "../types/news.type";

export const useNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await fetch("/api/news");
      if (!response.ok) throw new Error("Failed to fetch news");
      return response.json() as Promise<News[]>;
    },
  });
};

export const useCreateNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { title: string; content: string; imageUrl: string; authorId: string }) => {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create news");
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news"] }),
  });
};

export const useUpdateNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { title: string; content: string; imageUrl: string; adminId: string } }) => {
      const response = await fetch(`/api/news/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update news");
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news"] }),
  });
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, adminId }: { id: string; adminId: string }) => {
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId }),
      });
      if (!response.ok) throw new Error("Failed to delete news");
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news"] }),
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async ({ file, userId }: { file: File; userId: string }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);
      const response = await fetch("/api/upload-news-image", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload image");
      const { imageUrl } = await response.json();
      return imageUrl as string;
    },
  });
};
