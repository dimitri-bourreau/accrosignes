import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ContentBlock } from '../types/content.type';

export const useContent = () => {
  return useQuery({
    queryKey: ['content'],
    queryFn: async () => {
      const response = await fetch('/api/content');
      if (!response.ok) throw new Error('Failed to fetch content');
      return response.json() as Promise<ContentBlock[]>;
    },
  });
};

export const useUpdateContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      key: string;
      value: string;
      adminId: string;
    }) => {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update content');
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['content'] }),
  });
};

export const useUploadContentImage = () => {
  return useMutation({
    mutationFn: async ({
      file,
      userId,
      contentKey,
    }: {
      file: File;
      userId: string;
      contentKey: string;
    }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);
      formData.append('contentKey', contentKey);
      const response = await fetch('/api/upload-content-image', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to upload image');
      const { imageUrl } = await response.json();
      return imageUrl as string;
    },
  });
};
