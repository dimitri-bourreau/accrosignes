import { NextRequest, NextResponse } from "next/server";
import * as admin from "firebase-admin";
import { userIsAdmin } from "@/features/auth/services/user-is-admin.service";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file || !userId || typeof userId !== "string") {
      return NextResponse.json(
        { error: "file et userId sont requis" },
        { status: 400 }
      );
    }

    const isAdmin = await userIsAdmin(userId);
    if (!isAdmin) {
      console.error(`User ${userId} is not admin - cannot upload image`);
      return NextResponse.json(
        { error: "Unauthorized - User is not admin" },
        { status: 403 }
      );
    }

    console.log(`User ${userId} verified as admin - proceeding with upload`);

    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    if (!bucketName) {
      throw new Error("Storage bucket not configured");
    }

    const bucket = admin.storage().bucket(bucketName);
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const filename = `news-images/${userId}/${timestamp}.${extension}`;

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileUpload = bucket.file(filename);

    await fileUpload.save(fileBuffer, {
      metadata: {
        contentType: file.type,
      },
    });

    await fileUpload.makePublic();
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

    return NextResponse.json({ imageUrl });
  } catch (error: unknown) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
