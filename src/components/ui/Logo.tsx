import { IoBarbell } from "react-icons/io5";
import React, { type ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function Logo(props: ComponentPropsWithoutRef<"div">) {
  const classes = twMerge(
    "flex md:ml-5 md:left-0 items-center gap-2",
    props.className
  );
  return (
    <Link href="/" className={classes}>
      <IoBarbell
        size={40}
        className=" rounded-lg bg-primaryText p-1 text-nav md:absolute "
      />
      <h1 className="text-2xl font-medium text-primary md:relative md:ml-16">
        Training Manager
      </h1>
    </Link>
  );
}
