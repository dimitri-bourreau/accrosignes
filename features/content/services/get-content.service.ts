import { adminDb } from "@/features/auth/admin";
import { ContentBlock, CONTENT_KEYS, ContentKey, isRichTextKey } from "../types/content.type";

const stripHtml = (html: string): string =>
  html.replace(/<[^>]*>/g, "").trim();

export const getAllContent = async (): Promise<ContentBlock[]> => {
  const snapshot = await adminDb.collection("content").get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      key: doc.id,
      value: data.value ?? "",
      label: CONTENT_KEYS[doc.id as ContentKey] ?? doc.id,
      updatedAt: data.updatedAt?.toDate() ?? new Date(),
      updatedBy: data.updatedBy ?? "",
    };
  });
};

export const getContentByKey = async (
  key: ContentKey
): Promise<string | null> => {
  const doc = await adminDb.collection("content").doc(key).get();
  if (!doc.exists) return null;
  const value = doc.data()?.value ?? null;
  if (!value) return null;
  return isRichTextKey(key) ? value : stripHtml(value);
};
