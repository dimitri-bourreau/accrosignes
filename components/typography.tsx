import { ReactNode } from "react";

type TypographyVariant =
  | "body-lg"
  | "body-base"
  | "body-sm"
  | "subtitle"
  | "caption";

interface TypographyProps {
  variant?: TypographyVariant;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<TypographyVariant, string> = {
  "body-lg": "text-lg leading-relaxed",
  "body-base": "text-base leading-normal",
  "body-sm": "text-sm leading-normal",
  subtitle: "text-xl font-semibold",
  caption: "text-sm text-gray-600",
};

export default function Typography({
  variant = "body-base",
  className = "",
  children,
}: TypographyProps) {
  const baseStyles = variantStyles[variant];

  return <p className={`${baseStyles} ${className}`}>{children}</p>;
}
