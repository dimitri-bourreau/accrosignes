import { useMutation } from "@tanstack/react-query";

export const useCheckEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch("/api/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Cet email n'est pas enregistré. Contactez un administrateur pour créer votre compte.");
      }
      return response.json();
    },
  });
};
