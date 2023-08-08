import React, { type ComponentPropsWithoutRef, forwardRef } from "react";
import classNames from "classnames";

const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(
  function Input(props, ref) {
    const { className } = props;
    const classes = classNames(
      `bg-inherit  text-xl font-medium text-white focus:outline-none ${className!}`
    );
    return <input {...props} ref={ref} className={classes} />;
  }
);

export default Input;
