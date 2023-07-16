import { IoBarbell } from "react-icons/io5";
import React, { ComponentPropsWithoutRef } from "react";
import classNames from "classnames";

export default function Logo(props: ComponentPropsWithoutRef<"div">) {
  const classes = classNames("flex items-center gap-2", props.className);
  return (
    <div className={classes}>
      <IoBarbell
        size={40}
        className="rounded-lg bg-cyan-400 p-1"
        color={"black"}
      />
      <h1 className="text-2xl font-medium text-primary md:hidden">
        Training Manager
      </h1>
    </div>
  );
}
