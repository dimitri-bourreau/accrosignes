import { adminAuth } from "@/features/auth/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, adminId } = await request.json();

    if (!email || !adminId) {
      return NextResponse.json(
        { error: "Email et adminId sont requis" },
        { status: 400 }
      );
    }

    // Verify the requestor is an admin
    const adminUser = await adminAuth.getUser(adminId);
    const adminClaims = adminUser.customClaims as { role?: string } | null;

    if (adminClaims?.role !== "Administrateur") {
      return NextResponse.json(
        { error: "Seuls les administrateurs peuvent créer des utilisateurs" },
        { status: 403 }
      );
    }

    // Create the user without password (passwordless email link auth)
    const userRecord = await adminAuth.createUser({
      email,
      emailVerified: false,
    });

    // Set default role to "Élève"
    await adminAuth.setCustomUserClaims(userRecord.uid, { role: "Élève" });

    return NextResponse.json({
      uid: userRecord.uid,
      email: userRecord.email,
      message:
        "Utilisateur créé avec succès. Un lien de connexion sera envoyé à son adresse email.",
    });
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.code === "auth/email-already-exists") {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Erreur lors de la création de l'utilisateur" },
      { status: 500 }
    );
  }
}
