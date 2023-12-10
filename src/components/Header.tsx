import React from "react";
import Logo from "~/components/ui/Logo";
import UserDropdown from "~/components/UserDropdown";

const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-10 w-full bg-primary md:hidden standalone:pt-11 ">
      <div className=" flex  items-center justify-between px-4 pt-4 sm:px-6 ">
        <Logo />
        <UserDropdown />
      </div>
    </header>
  );
};

export default Header;
