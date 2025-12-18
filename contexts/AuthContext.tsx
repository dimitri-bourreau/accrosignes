"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
  onAuthStateChanged,
  User,
  AuthError,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";

type Role = "Administrateur" | "Élève" | null;

interface AuthContextType {
  user: User | null;
  role: Role;
  loading: boolean;
  sendSignInLink: (email: string) => Promise<void>;
  signInWithLink: (email: string, link: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          // Force refresh the ID token to get latest custom claims
          const idTokenResult = await currentUser.getIdTokenResult(true);
          const userRole = (idTokenResult.claims.role as Role) || null;
          setRole(userRole);
        } catch (err) {
          console.error("Error fetching ID token:", err);
          setRole(null);
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSendSignInLink = async (email: string) => {
    try {
      setError(null);
      const actionCodeSettings = {
        url: `${window.location.origin}/espace-membre/login`,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
      throw err;
    }
  };

  const handleSignInWithLink = async (email: string, link: string) => {
    try {
      setError(null);
      if (isSignInWithEmailLink(auth, link)) {
        await signInWithEmailLink(auth, email, link);
        window.localStorage.removeItem("emailForSignIn");
      } else {
        throw new Error("Le lien de connexion est invalide ou a expiré");
      }
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
      throw err;
    }
  };

  const handleSignOut = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
      setRole(null);
      window.location.href = "/";
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
      throw err;
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        sendSignInLink: handleSendSignInLink,
        signInWithLink: handleSignInWithLink,
        signOut: handleSignOut,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
