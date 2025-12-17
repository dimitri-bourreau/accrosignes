import { storage } from "@/lib/firebase/config";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export async function uploadResource(
  file: File,
  userId: string,
  resourceName: string
): Promise<string> {
  const timestamp = Date.now();
  const storageRef = ref(storage, `resources/${userId}/${timestamp}-${resourceName}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function deleteResource(fileUrl: string): Promise<void> {
  const fileRef = ref(storage, fileUrl);
  await deleteObject(fileRef);
}

export async function getDownloadUrl(filePath: string): Promise<string> {
  const fileRef = ref(storage, filePath);
  return getDownloadURL(fileRef);
}
