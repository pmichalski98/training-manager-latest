import React, { type ComponentType } from "react";
import { LuHistory } from "react-icons/lu";
import { IoIosBody, IoIosStats } from "react-icons/io";
import { IoBarbellSharp } from "react-icons/io5";
import Logo from "~/components/ui/Logo";
import { type IconBaseProps } from "react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Dropdown from "~/components/ui/Dropdown";
import Image from "next/image";
import { useClerk, useUser } from "@clerk/nextjs";
import UserDropdown from "~/components/UserDropdown";

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 z-10 h-28 w-full bg-nav/80 py-6 shadow-2xl md:top-0  md:bg-nav ">
      <div className="md:flex md:justify-between md:px-8">
        <Logo className={"hidden md:flex"} />
        <ul className="ml-auto flex max-w-screen-lg flex-1 items-center justify-around px-10">
          <NavItem title={"History"} Icon={LuHistory} href={"/history"} />
          <NavItem title={"Stats"} Icon={IoIosStats} href={"/stats"} />
          <NavItem title={"Workouts"} Icon={IoBarbellSharp} href={"/"} />
          <NavItem title={"Body"} Icon={IoIosBody} href={"/body"} />
        </ul>
        <div className="hidden md:block">
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
};

interface NavItemProps {
  href: string;
  title: string;
  Icon: ComponentType<IconBaseProps>;
}
export const NavItem = ({ href, title, Icon }: NavItemProps) => {
  const path = usePathname();
  const active = path === href;
  const classes = twMerge(
    "cursor-pointer opacity-75 hover:text-primary hover:opacity-100",
    active && "text-primary opacity-100"
  );
  return (
    <li className={classes}>
      <Link href={href}>
        <Icon size={30} className="mx-auto mb-2" />
        {title}
      </Link>
    </li>
  );
};

export default Navigation;
