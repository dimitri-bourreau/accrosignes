"use client";

import { useForm } from "react-hook-form";
import Typography from "@/components/atoms/typography";
import { useCreateUser } from "@/features/users/hooks/use-users";
import { useState } from "react";

interface CreateUserFormProps {
  adminId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateUserForm({ adminId, onSuccess, onCancel }: CreateUserFormProps) {
  const { register, handleSubmit, reset } = useForm<{ email: string }>();
  const createUser = useCreateUser();
  const [error, setError] = useState("");

  const onSubmit = (data: { email: string }) => {
    setError("");
    createUser.mutate(
      { email: data.email, adminId },
      {
        onSuccess: () => {
          reset();
          onSuccess();
        },
        onError: (err) => setError(err.message),
      }
    );
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mb-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Email du nouvel utilisateur
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="utilisateur@example.com"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
            <Typography className="text-red-700 dark:text-red-300 text-sm">{error}</Typography>
          </div>
        )}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={createUser.isPending}
            className="cursor-pointer px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400 transition duration-200"
          >
            {createUser.isPending ? "Création en cours..." : "Créer l'utilisateur"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
