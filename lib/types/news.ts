export interface News {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
  publishedAt: Date;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNewsData {
  title: string;
  content: string;
  imageUrl: string;
  authorId: string;
}

export interface UpdateNewsData {
  title?: string;
  content?: string;
  imageUrl?: string;
}
