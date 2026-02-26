export const ROLES = {
  ADMIN: 'Administrateur',
  STUDENT: 'Élève',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
