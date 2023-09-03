import React, { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type TButton = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "danger";
};
function Button({
  className,
  children,
  variant = "primary",
  ...props
}: TButton) {
  const classes = twMerge(
    " rounded-lg  px-4 py-2",
    variant === "primary" &&
      "bg-primaryText text-gray-900 hover:bg-cyan-500   disabled:bg-cyan-900",
    variant === "secondary" && "hover:text-primary disabled:text-gray-400",
    variant === "danger" && "bg-red-700/60 hover:bg-red-800",
    className
  );
  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}

export default Button;
