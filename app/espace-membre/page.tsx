"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ROLES } from "@/features/auth/constants/roles";
import Typography from "@/components/atoms/typography";

export default function EspaceMemberPage() {
  const router = useRouter();
  const { user, role, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/espace-membre/login");
      } else if (role === ROLES.ADMIN) {
        router.push("/espace-membre/admin");
      } else if (role === ROLES.STUDENT) {
        router.push("/espace-membre/student");
      } else if (!role) {
        router.push("/espace-membre/pending");
      }
    }
  }, [user, role, loading, router]);

  // Always show loading state to prevent flash of wrong content
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
      <Typography className="text-gray-600 dark:text-gray-300">Chargement...</Typography>
    </main>
  );
}
