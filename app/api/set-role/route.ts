import { adminAuth } from "@/lib/firebase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { uid, role, adminId } = await request.json();

    if (!uid || !role || !adminId) {
      return NextResponse.json(
        { error: "Missing uid, role, or adminId" },
        { status: 400 }
      );
    }

    if (!["Administrateur", "Élève"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be 'Administrateur' or 'Élève'" },
        { status: 400 }
      );
    }

    // Verify the requester is an admin
    const adminUser = await adminAuth.getUser(adminId);
    const adminClaims = adminUser.customClaims as { role?: string } | null;

    if (adminClaims?.role !== "Administrateur") {
      return NextResponse.json(
        { error: "Unauthorized. Only admins can set roles." },
        { status: 403 }
      );
    }

    await adminAuth.setCustomUserClaims(uid, { role });

    return NextResponse.json({
      message: `Custom claims set successfully for user ${uid}`,
      role,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
