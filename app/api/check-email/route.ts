import { adminAuth } from "@/features/auth/admin";
import { isFirebaseError } from "@/features/firebase/is-firebase-error.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "L'email est requis" },
        { status: 400 }
      );
    }

    await adminAuth.getUserByEmail(email);
    return NextResponse.json({ exists: true });
  } catch (error: unknown) {
    if (isFirebaseError(error) && error.code === "auth/user-not-found") {
      return NextResponse.json(
        {
          error:
            "Cet email n'est pas enregistré. Contactez un administrateur pour créer votre compte.",
        },
        { status: 404 }
      );
    }
    console.error("Error checking email:", error);
    return NextResponse.json(
      { error: "Failed to check email" },
      { status: 500 }
    );
  }
}
