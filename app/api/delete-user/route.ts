import { adminAuth } from "@/features/auth/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { uid, adminId } = await request.json();

    if (!uid || !adminId) {
      return NextResponse.json(
        { error: "uid et adminId sont requis" },
        { status: 400 }
      );
    }

    // Verify the requestor is an admin
    const adminUser = await adminAuth.getUser(adminId);
    const adminClaims = adminUser.customClaims as { role?: string } | null;

    if (adminClaims?.role !== "Administrateur") {
      return NextResponse.json(
        {
          error: "Seuls les administrateurs peuvent supprimer des utilisateurs",
        },
        { status: 403 }
      );
    }

    // Delete the user
    await adminAuth.deleteUser(uid);

    return NextResponse.json({
      message: "Utilisateur supprimé avec succès",
      uid,
    });
  } catch (error: any) {
    console.error("Error deleting user:", error);

    if (error.code === "auth/user-not-found") {
      return NextResponse.json(
        { error: "Cet utilisateur n'existe pas" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        error:
          error.message || "Erreur lors de la suppression de l'utilisateur",
      },
      { status: 500 }
    );
  }
}
