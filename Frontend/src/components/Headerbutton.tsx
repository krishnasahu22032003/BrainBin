import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  to?: string;
  onClick?: () => void;
  className?: string;
};

const HeaderButton: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  to,
  onClick,
  className,
}) => {
  const Wrapper = to ? Link : "button";

  return (
    <Wrapper
      to={to as any}
      onClick={onClick}
      className="relative inline-flex group"
    >
      {variant === "primary" && (
        <span
          className="
            pointer-events-none
            absolute -inset-[0.5px] rounded-md
            bg-gradient-to-r from-blue-400/30 via-indigo-400/30 to-blue-500/30
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
        />
      )}
      {variant === "secondary" && (
        <span
          className="
            pointer-events-none
            absolute inset-0 rounded-md
            bg-gradient-to-r from-neutral-100 via-neutral-50 to-neutral-100
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
        />
      )}
      <span
        className={clsx(
          `
          relative z-10
          inline-flex items-center justify-center
          rounded-md
          text-[13.5px] font-medium
          leading-none
          transition-all duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60
        `,
          variant === "primary"
            ? `
              px-4.5 py-2
              text-white
              bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700
              shadow-[0_1px_2px_rgba(0,0,0,0.12)]
              hover:shadow-[0_4px_12px_rgba(37,99,235,0.25)]
              hover:-translate-y-[0.5px]
              active:translate-y-0 active:scale-[0.995]
            `
            : `
              px-4 py-[7px]
              text-neutral-700
              bg-white
              border border-neutral-300/80
              shadow-[0_1px_2px_rgba(0,0,0,0.06)]
              hover:text-neutral-900
              hover:border-neutral-400
            `,
          className
        )}
      >
        {children}
      </span>
    </Wrapper>
  );
};

export default HeaderButton;
