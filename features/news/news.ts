import { adminDb } from "@/features/auth/admin";

export async function verifyAdminRole(uid: string): Promise<boolean> {
  const userDoc = await adminDb.collection("users").doc(uid).get();
  return userDoc.exists && userDoc.data()?.role === "Administrateur";
}
