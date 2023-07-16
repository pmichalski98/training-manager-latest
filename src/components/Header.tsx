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
      <div className="mt-8 flex items-center gap-2">
        <PiHandWavingFill color={"orange"} size={25} />
        <h2 className=" text-xl">Good Morning!</h2>
      </div>
    </header>
  );
};

export default Header;
