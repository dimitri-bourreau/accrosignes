import * as admin from "firebase-admin";
import { adminDb } from "@/features/auth/admin";
import { Resource } from "../types/resource.type";

function parseResource(doc: FirebaseFirestore.DocumentSnapshot): Resource {
  const data = doc.data();
  if (!data) throw new Error("Resource data is undefined");

  return {
    id: doc.id,
    name: data.name,
    type: data.type,
    parentId: data.parentId,
    fileUrl: data.fileUrl,
    fileType: data.fileType,
    fileSize: data.fileSize,
    linkUrl: data.linkUrl,
    authorId: data.authorId,
    createdAt: data.createdAt?.toDate?.() ?? new Date(),
    updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
  };
}

export async function getAllResources(): Promise<Resource[]> {
  const snapshot = await adminDb
    .collection("resources")
    .get();

  return snapshot.docs
    .map(parseResource)
    .sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}

export async function getResourcesByParent(
  parentId: string | null
): Promise<Resource[]> {
  const snapshot = await adminDb
    .collection("resources")
    .where("parentId", "==", parentId)
    .get();

  return snapshot.docs
    .map(parseResource)
    .sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}

export async function getResourceById(id: string): Promise<Resource | null> {
  const doc = await adminDb.collection("resources").doc(id).get();
  if (!doc.exists) return null;
  return parseResource(doc);
}

export async function getResourcePath(id: string | null): Promise<Resource[]> {
  const path: Resource[] = [];
  const visited = new Set<string>();
  let currentId = id;

  while (currentId && !visited.has(currentId)) {
    visited.add(currentId);
    const resource = await getResourceById(currentId);
    if (!resource) break;
    path.unshift(resource);
    currentId = resource.parentId;
  }

  return path;
}

interface CollectedResource {
  id: string;
  fileUrl?: string;
}

async function collectResources(id: string, collected: CollectedResource[]): Promise<void> {
  const children = await getResourcesByParent(id);
  for (const child of children) {
    await collectResources(child.id, collected);
  }
  const resource = await getResourceById(id);
  collected.push({ id, fileUrl: resource?.fileUrl });
}

function extractStoragePath(fileUrl: string): string | null {
  const match = fileUrl.match(/storage\.googleapis\.com\/[^/]+\/(.+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export async function deleteResourceRecursive(id: string): Promise<void> {
  const collected: CollectedResource[] = [];
  await collectResources(id, collected);

  const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (bucketName) {
    const bucket = admin.storage().bucket(bucketName);
    for (const res of collected) {
      if (!res.fileUrl) continue;
      const path = extractStoragePath(res.fileUrl);
      if (!path) continue;
      try {
        await bucket.file(path).delete();
      } catch {
        console.warn(`Failed to delete storage file: ${path}`);
      }
    }
  }

  const batch = adminDb.batch();
  for (const res of collected) {
    batch.delete(adminDb.collection("resources").doc(res.id));
  }
  await batch.commit();
}
