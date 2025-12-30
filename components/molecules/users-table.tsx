"use client";

import Typography from "@/components/atoms/typography";
import { useUsers, useSetRole, useDeleteUser } from "@/features/users/hooks/use-users";

interface UsersTableProps {
  adminId: string;
}

export function UsersTable({ adminId }: UsersTableProps) {
  const { data: users = [], isLoading } = useUsers();
  const setRole = useSetRole();
  const deleteUser = useDeleteUser();

  const handleSetRole = (uid: string, currentRole: "Administrateur" | "Élève" | null) => {
    const newRole = currentRole === "Administrateur" ? "Élève" : "Administrateur";
    setRole.mutate({ uid, role: newRole, adminId });
  };

  const handleDeleteUser = (uid: string, email: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${email} ?`)) {
      deleteUser.mutate({ uid, adminId }, {
        onError: (error) => alert(error.message),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <Typography className="text-gray-600 dark:text-gray-300">Chargement des utilisateurs...</Typography>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="p-4 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
        <Typography className="font-semibold text-gray-900 dark:text-gray-100">Aucun utilisateur</Typography>
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Email</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Rôle</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.uid} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="px-6 py-3 text-sm text-gray-900 dark:text-gray-100">{user.email}</td>
            <td className="px-6 py-3 text-sm">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                user.role === "Administrateur" ? "bg-blue-100 text-blue-800" :
                user.role === "Élève" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}>
                {user.role || "Sans rôle"}
              </span>
            </td>
            <td className="px-6 py-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 w-10">Admin</span>
                <button
                  onClick={() => handleSetRole(user.uid, user.role)}
                  className="cursor-pointer relative inline-flex items-center justify-center h-6 w-12 rounded-full transition-colors duration-200"
                  style={{ backgroundColor: user.role === "Administrateur" ? "#2563eb" : "#16a34a" }}
                >
                  <div
                    className="h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300"
                    style={{ transform: user.role === "Administrateur" ? "translateX(-6px)" : "translateX(6px)" }}
                  />
                </button>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 w-10">Élève</span>
                <button
                  onClick={() => handleDeleteUser(user.uid, user.email)}
                  className="cursor-pointer ml-2 px-3 py-1 bg-red-500 text-white rounded text-xs font-semibold hover:bg-red-600 transition duration-200"
                >
                  Supprimer
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
