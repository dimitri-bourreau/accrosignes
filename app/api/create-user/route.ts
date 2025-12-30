import { adminAuth, adminDb } from "@/features/auth/admin";
import { isFirebaseError } from "@/features/firebase/is-firebase-error.service";
import { userIsAdmin } from "@/features/auth/services/user-is-admin.service";
import { NextResponse } from "next/server";

async function createUserWithRole(email: string) {
  const userRecord = await adminAuth.createUser({
    email,
    emailVerified: false,
  });

  // Set role in both Firebase Auth custom claims AND Firestore
  await Promise.all([
    adminAuth.setCustomUserClaims(userRecord.uid, { role: "Élève" }),
    adminDb.collection("users").doc(userRecord.uid).set({
      email,
      role: "Élève",
      createdAt: new Date(),
    }),
  ]);

  return userRecord;
}

export async function POST(request: Request) {
  try {
    const { email, adminId } = await request.json();

    if (
      !email ||
      typeof email !== "string" ||
      !adminId ||
      typeof adminId !== "string"
    ) {
      return NextResponse.json(
        { error: "Email et adminId sont requis" },
        { status: 400 }
      );
    }

    const isAdmin = await userIsAdmin(adminId);
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Seuls les administrateurs peuvent créer des utilisateurs" },
        { status: 403 }
      );
    }

    const userRecord = await createUserWithRole(email);
    return NextResponse.json({
      uid: userRecord.uid,
      email: userRecord.email,
      message:
        "Utilisateur créé avec succès. Un lien de connexion sera envoyé à son adresse email.",
    });
  } catch (error: unknown) {
    if (isFirebaseError(error) && error.code === "auth/email-already-exists") {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'utilisateur" },
      { status: 500 }
    );
  }
}
