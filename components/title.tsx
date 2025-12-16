import { ReactNode } from "react";

type TitleLevel = "h1" | "h2" | "h3" | "h4";

interface TitleProps {
  level: TitleLevel;
  className?: string;
  children: ReactNode;
}

const levelStyles: Record<TitleLevel, string> = {
  h1: "text-5xl md:text-6xl font-bold leading-tight",
  h2: "text-4xl font-bold",
  h3: "text-2xl font-semibold",
  h4: "text-lg font-semibold",
};

export default function Title({ level, className = "", children }: TitleProps) {
  const Component = level;
  const baseStyles = levelStyles[level];

  return <Component className={`${baseStyles} ${className}`}>{children}</Component>;
}
