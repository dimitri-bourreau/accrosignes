export type ResourceType = 'file' | 'link' | 'folder';

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  parentId: string | null;
  fileUrl?: string;
  fileType?: string;
  fileSize?: number;
  linkUrl?: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResourceWithPath extends Resource {
  path: Resource[];
}
