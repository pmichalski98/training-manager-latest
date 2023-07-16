import React from "react";
import NavItem from "~/components/NavItem";
import { LuHistory } from "react-icons/lu";
import { IoIosBody, IoIosStats } from "react-icons/io";
import { IoBarbellSharp } from "react-icons/io5";
import Logo from "~/components/Logo";

const Navigation = () => {
  return (
    <nav className=" container absolute bottom-0 bg-primary/70 py-6 md:relative">
      <ul className=" container flex justify-around p-0 md:justify-between">
        <Logo className={"hidden md:flex"} />
        <NavItem title={"History"} Icon={LuHistory} href={"/history"} />
        <NavItem title={"Stats"} Icon={IoIosStats} href={"/stats"} />
        <NavItem title={"Workouts"} Icon={IoBarbellSharp} href={"/workouts"} />
        <NavItem title={"Body"} Icon={IoIosBody} href={"/body"} />
      </ul>
    </nav>
  );
};

export default Navigation;
