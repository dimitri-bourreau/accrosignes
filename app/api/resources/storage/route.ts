import { NextResponse } from 'next/server';
import { adminDb } from '@/features/auth/admin';

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection('resources')
      .where('type', '==', 'file')
      .get();

    const usedBytes = snapshot.docs.reduce((total, doc) => {
      return total + (doc.data().fileSize ?? 0);
    }, 0);

    return NextResponse.json({ usedBytes });
  } catch (error: unknown) {
    console.error('Error calculating storage:', error);
    return NextResponse.json(
      { error: 'Failed to calculate storage' },
      { status: 500 },
    );
  }
}
