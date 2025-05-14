"use client";

import { FC } from "react";
import { buttonType } from "@/types/Buttontypes";

interface ExtendedButtonType extends buttonType {
  variant?: "primary" | "secondary" | "cancel";
  className?: string;
}

const Button: FC<ExtendedButtonType> = ({
  children,
  type,
  style,
  onClick,
  variant = "primary",
  className = "",
}) => {
  const baseClasses =
    "rounded-3xl text-xl font-bold pt-2 pb-2 pl-12 pr-12 text-[color:var(--color-kino-white)] cursor-pointer transition-colors duration-200";

  const variantClasses =
    variant === "primary"
      ? "bg-[color:var(--color-kino-darkred)] text-[color:var(--color-kino-white)] border border-[color:var(--color-kino-darkred)] hover:bg-[color:var(--color-kino-red)] hover:border-[color:var(--color-kino-red)]"
      : variant === "secondary"
      ? "bg-transparent text-[color:var(--color-kino-darkred)] border border-[color:var(--color-kino-darkred)] hover:bg-[color:var(--color-kino-red)] hover:text-[color:var(--color-kino-white)] hover:border-[color:var(--color-kino-red)]"
      : "bg-transparent text-[color:var(--color-kino-white)] hover:opacity-80";

  return (
    <button
      type={type}
      style={style}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;