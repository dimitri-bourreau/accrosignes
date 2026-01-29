import { NextRequest, NextResponse } from "next/server";
import * as admin from "firebase-admin";
import { userIsAdmin } from "@/features/auth/services/user-is-admin.service";
import { adminDb } from "@/features/auth/admin";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const adminId = formData.get("adminId") as string;
    const name = formData.get("name") as string;
    const parentId = formData.get("parentId") as string | null;

    if (!file || !adminId || !name) {
      return NextResponse.json(
        { error: "file, adminId et name sont requis" },
        { status: 400 }
      );
    }

    const MAX_FILE_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Le fichier ne doit pas dépasser 50 Mo. Pensez à utiliser des liens vers des services externes (Google Drive, YouTube) pour les fichiers volumineux afin de préserver l'espace de stockage." },
        { status: 400 }
      );
    }

    const isAdmin = await userIsAdmin(adminId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    if (!bucketName) {
      throw new Error("Storage bucket not configured");
    }

    const bucket = admin.storage().bucket(bucketName);
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const filename = `resources/${adminId}/${timestamp}.${extension}`;

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileUpload = bucket.file(filename);

    await fileUpload.save(fileBuffer, {
      metadata: { contentType: file.type },
    });

    await fileUpload.makePublic();
    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

    const now = admin.firestore.Timestamp.now();
    const docRef = await adminDb.collection("resources").add({
      name,
      type: "file",
      parentId: parentId || null,
      fileUrl,
      fileType: file.type,
      fileSize: file.size,
      authorId: adminId,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      id: docRef.id,
      name,
      type: "file",
      parentId: parentId || null,
      fileUrl,
      fileType: file.type,
      fileSize: file.size,
      authorId: adminId,
    });
  } catch (error: unknown) {
    console.error("Error uploading resource:", error);
    return NextResponse.json(
      { error: "Failed to upload resource" },
      { status: 500 }
    );
  }
}
