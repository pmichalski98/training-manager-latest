import { IoBarbell } from "react-icons/io5";
import React, { type ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function Logo(props: ComponentPropsWithoutRef<"div">) {
  const classes = twMerge("flex items-center gap-2", props.className);
  return (
    <Link href="/" className={classes}>
      <IoBarbell size={40} className="rounded-lg bg-primaryText p-1 text-nav" />
      <h1 className="text-2xl font-medium text-primary">Training Manager</h1>
    </Link>
  );
}
