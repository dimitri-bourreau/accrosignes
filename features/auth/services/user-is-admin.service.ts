import { adminDb } from "../admin";

export const userIsAdmin = async (uid: string): Promise<boolean> => {
  try {
    const userDoc = await adminDb.collection("users").doc(uid).get();
    const userData = userDoc.data();
    const isAdmin = userDoc.exists && userData?.role === "Administrateur";

    console.log(`Checking admin status for user ${uid}:`, {
      exists: userDoc.exists,
      role: userData?.role,
      isAdmin,
    });

    return isAdmin;
  } catch (error) {
    console.error(`Error checking admin status for user ${uid}:`, error);
    return false;
  }
};
