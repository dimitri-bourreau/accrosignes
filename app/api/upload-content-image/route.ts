import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { userIsAdmin } from '@/features/auth/services/user-is-admin.service';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;
    const contentKey = formData.get('contentKey') as string;

    if (!file || !userId || !contentKey) {
      return NextResponse.json(
        { error: 'file, userId et contentKey sont requis' },
        { status: 400 },
      );
    }

    const isAdmin = await userIsAdmin(userId);
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized - User is not admin' },
        { status: 403 },
      );
    }

    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    if (!bucketName) {
      throw new Error('Storage bucket not configured');
    }

    const bucket = admin.storage().bucket(bucketName);
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const safeKey = contentKey.replace(/\./g, '-');
    const filename = `content-images/${safeKey}/${timestamp}.${extension}`;

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileUpload = bucket.file(filename);

    await fileUpload.save(fileBuffer, {
      metadata: { contentType: file.type },
    });

    await fileUpload.makePublic();
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

    return NextResponse.json({ imageUrl });
  } catch (error: unknown) {
    console.error('Error uploading content image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 },
    );
  }
}
