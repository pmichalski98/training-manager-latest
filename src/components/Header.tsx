import React from "react";
import { IoBarbell } from "react-icons/io5";
import { PiHandWavingFill } from "react-icons/pi";

const Header = () => {
  return (
    <header>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <IoBarbell
            size={40}
            className="rounded-lg bg-cyan-400 p-1"
            color={"black"}
          />
          <h1 className="text-2xl font-medium text-primary">
            Training Manager
          </h1>
        </div>
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
