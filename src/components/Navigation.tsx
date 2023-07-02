import React from "react";
import NavItem from "~/components/NavItem";
import { LuHistory } from "react-icons/lu";
import { IoIosBody, IoIosStats } from "react-icons/io";
import { IoBarbellSharp } from "react-icons/io5";

const Navigation = () => {
  return (
    <nav className="container self-end bg-primary/70 px-10 py-6">
      <ul className="flex justify-around">
        <NavItem title={"History"} Icon={LuHistory} />
        <NavItem title={"Stats"} Icon={IoIosStats} />
        <NavItem title={"Workouts"} Icon={IoBarbellSharp} />
        <NavItem title={"Body"} Icon={IoIosBody} />
      </ul>
    </nav>
  );
};

export default Navigation;
