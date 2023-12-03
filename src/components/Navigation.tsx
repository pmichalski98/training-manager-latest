import React from "react";
import Logo from "~/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import UserDropdown from "~/components/UserDropdown";
import NavIcon from "~/components/svgs/NavIcon";

const Navigation = () => {
  return (
    <nav
      className="fixed bottom-0 z-10  w-full overflow-hidden bg-nav/90  transition md:left-0
    md:h-full md:w-20 md:bg-nav md:hover:w-48 "
    >
      <ul className="flex items-center  justify-around md:h-full md:flex-col  ">
        <div className="hidden md:block">
          <Logo className={"md:absolute md:flex"} />
        </div>
        <NavItem title={"History"} href={"/history"} />
        <NavItem title={"Stats"} href={"/stats"} />
        <NavItem title={"Workouts"} href={"/"} />
        <NavItem title={"Body"} href={"/body"} />
        <div className=" hidden items-center md:flex">
          <UserDropdown />
        </div>
      </ul>
    </nav>
  );
};

export default Navigation;

interface NavItemI {
  title: string;
  href: string;
}
function NavItem({ title, href }: NavItemI) {
  const path = usePathname();
  const active = path === href;
  const classes = twMerge(
    "cursor-pointer flex flex-col md:flex-row py-4 md:items-center left-0 ml-5 md:absolute  md:flex gap-2 opacity-75 hover:text-primary hover:opacity-100",
    active && "text-primary opacity-100"
  );
  return (
    <li>
      <Link href={href} className={classes}>
        <NavIcon name={title} className="mx-auto md:h-10 md:w-10" />
        <span className="relative md:ml-3 md:text-xl">{title}</span>
      </Link>
    </li>
  );
}
