import React, { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

function IconButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const classes = twMerge("text-5xl hover:text-gray-400 ", className);
  return <span className={classes}>{children}</span>;
}

export default IconButton;
