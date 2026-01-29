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
  let currentId = id;

  while (currentId) {
    const resource = await getResourceById(currentId);
    if (!resource) break;
    path.unshift(resource);
    currentId = resource.parentId;
  }

  return path;
}

export async function deleteResourceRecursive(id: string): Promise<void> {
  const children = await getResourcesByParent(id);

  for (const child of children) {
    await deleteResourceRecursive(child.id);
  }

  await adminDb.collection("resources").doc(id).delete();
}
