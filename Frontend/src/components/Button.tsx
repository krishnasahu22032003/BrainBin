import React, { type ReactNode } from "react";
import classNames from "classnames";

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg" | "xl" | "2xl";
  text: string;
  icon?: ReactNode;
  onClick: () => void;
}

export const Button:React.FC<ButtonProps> = ({ variant, size, text, icon, onClick }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-xl mt-2 font-semibold transition-all cursor-pointer duration-200 focus:outline-none";

  const variantStyles: Record<ButtonProps["variant"], string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-md cursor-pointer",
    secondary: "bg-gray-200 text-black hover:bg-gray-300 active:scale-95 shadow-sm cursor-pointer",
  };

  const sizeStyles: Record<ButtonProps["size"], string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2  text-base",
    lg: "px-9 py-1.5  mr-2 text-lg",
    xl: "px-6 py-3 text-xl",
    "2xl": "px-8 py-4 text-2xl",
  };

  return (
    <button
      onClick={onClick}
      className={classNames(baseClasses, variantStyles[variant], sizeStyles[size])}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};
