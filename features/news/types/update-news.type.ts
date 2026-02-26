import { Timestamp } from "firebase/firestore";

export interface UpdateNews {
  title?: string;
  slug?: string;
  content?: string;
  imageUrl?: string;
  publishedAt?: Date;
  updatedAt?: Timestamp;
}
