import React, { type ComponentPropsWithoutRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(
  function Input(props, ref) {
    const { className } = props;
    const classes = twMerge(
      `bg-transparent  text-xl font-medium text-white focus:outline-none `,
      className
    );
    return <input {...props} ref={ref} className={classes} />;
  }
);

export default Input;
