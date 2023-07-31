import React from "react";
import NavItem from "~/components/NavItem";
import { LuHistory } from "react-icons/lu";
import { IoIosBody, IoIosStats } from "react-icons/io";
import { IoBarbellSharp } from "react-icons/io5";
import Logo from "~/components/Logo";

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 h-28 w-full bg-nav/80 py-6 shadow-2xl  md:top-0 ">
      <ul className="  flex  max-w-screen-lg items-center justify-around">
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
