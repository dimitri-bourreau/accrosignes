import { adminDb } from "../admin";

export const userIsAdmin = async (uid: string): Promise<boolean> => {
  const userDoc = await adminDb.collection("users").doc(uid).get();
  return userDoc.exists && userDoc.data()?.role === "Administrateur";
};
