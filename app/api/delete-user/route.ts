import { adminAuth } from "@/features/auth/admin";
import { isFirebaseError } from "@/features/firebase/is-firebase-error.service";
import { userIsAdmin } from "@/features/auth/services/user-is-admin.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { uid, adminId } = await request.json();

    if (!uid || typeof uid !== "string" || !adminId || typeof adminId !== "string") {
      return NextResponse.json(
        { error: "uid et adminId sont requis" },
        { status: 400 }
      );
    }

    const isAdmin = await userIsAdmin(adminId);
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Seuls les administrateurs peuvent supprimer des utilisateurs" },
        { status: 403 }
      );
    }

    await adminAuth.deleteUser(uid);

    return NextResponse.json({
      message: "Utilisateur supprimé avec succès",
      uid,
    });
  } catch (error: unknown) {
    if (isFirebaseError(error) && error.code === "auth/user-not-found") {
      return NextResponse.json(
        { error: "Cet utilisateur n'existe pas" },
        { status: 404 }
      );
    }

    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'utilisateur" },
      { status: 500 }
    );
  }
}
