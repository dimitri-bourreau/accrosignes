import { useMutation } from '@tanstack/react-query';

export const useUploadEditorImage = () => {
  return useMutation({
    mutationFn: async ({ file, userId }: { file: File; userId: string }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);
      const response = await fetch('/api/upload-editor-image', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to upload editor image');
      const { imageUrl } = await response.json();
      return imageUrl as string;
    },
  });
};
