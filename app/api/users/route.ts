import { adminAuth } from "@/features/auth/admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const listUsersResult = await adminAuth.listUsers(1000);

    const users = listUsersResult.users.map((user) => {
      const customClaims = user.customClaims as { role?: string } | null;
      return {
        uid: user.uid,
        email: user.email || "",
        role: (customClaims?.role as "Administrateur" | "Élève" | null) || null,
      };
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error listing users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
