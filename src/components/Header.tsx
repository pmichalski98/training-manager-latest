import React from "react";
import { IoBarbell } from "react-icons/io5";
import { PiHandWavingFill } from "react-icons/pi";
import Logo from "~/components/Logo";

const Header = () => {
  return (
    <header>
      <div className="flex justify-between">
        <Logo className="md:hidden " />
        <p>users photo</p>
      </div>
      <div className="my-8 flex items-center gap-2">
        <PiHandWavingFill color={"orange"} size={25} />
        <h2 className=" text-xl opacity-60">Good Morning!</h2>
      </div>
      <p className={"text-4xl font-bold"}>User Name </p>
      <p className="mt-6 font-bold">
        You have trainined <span className="text-primary">384</span> times
        already!
      </p>
    </header>
  );
};

export default Header;
