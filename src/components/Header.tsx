import React from "react";
import { PiHandWavingFill } from "react-icons/pi";
import Logo from "~/components/ui/Logo";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <header>
      <div className="flex justify-between ">
        <Logo className="md:hidden " />
        {isSignedIn && (
          <Image
            width={50}
            height={50}
            alt="user logo"
            src={user?.imageUrl}
            className="rounded-full"
          />
        )}
      </div>
      <SignOutButton />
      <div className="my-8 flex items-center gap-2">
        <PiHandWavingFill color={"orange"} size={25} />
        <h2 className=" text-xl opacity-60">Good Morning!</h2>
      </div>
      <p className={"text-4xl font-bold"}>{user?.firstName}</p>
      <p className="mt-6 font-bold">
        You have trainined <span className="text-primary">384</span> times
        already!
      </p>
    </header>
  );
};

export default Header;
