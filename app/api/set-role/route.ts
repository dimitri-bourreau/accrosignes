import { adminAuth } from "@/features/auth/admin";
import { userIsAdmin } from "@/features/auth/services/user-is-admin.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { uid, role, adminId } = await request.json();

    if (!uid || typeof uid !== "string" || !role || typeof role !== "string" || !adminId || typeof adminId !== "string") {
      return NextResponse.json(
        { error: "uid, role et adminId sont requis" },
        { status: 400 }
      );
    }

    if (!["Administrateur", "Élève"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be 'Administrateur' or 'Élève'" },
        { status: 400 }
      );
    }

    const isAdmin = await userIsAdmin(adminId);
    if (!isAdmin) {
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
  } catch (error: unknown) {
    console.error("Error setting role:", error);
    return NextResponse.json({ error: "Failed to set role" }, { status: 500 });
  }
}
