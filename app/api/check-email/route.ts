import { adminAuth } from "@/lib/firebase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email est requis" },
        { status: 400 }
      );
    }

    // Try to get the user by email
    try {
      await adminAuth.getUserByEmail(email);
      // User exists
      return NextResponse.json({ exists: true });
    } catch (error: any) {
      // User doesn't exist
      if (error.code === "auth/user-not-found") {
        return NextResponse.json(
          { error: "Cet email n'est pas enregistré. Contactez un administrateur pour créer votre compte." },
          { status: 404 }
        );
      }
      throw error;
    }
  } catch (error: any) {
    console.error("Error checking email:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la vérification de l'email" },
      { status: 500 }
    );
  }
}
