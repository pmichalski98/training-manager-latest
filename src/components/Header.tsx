"use client";

import React from "react";
import Logo from "~/components/ui/Logo";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Dropdown from "~/components/ui/Dropdown";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  return (
    <header className="mt-6 flex justify-between md:hidden">
      <Logo className="relative " />
      {isSignedIn && (
        <Dropdown>
          <Dropdown.Button>
            <Image
              width={50}
              height={50}
              alt="user logo"
              src={user?.imageUrl}
              className="rounded-full"
            />
          </Dropdown.Button>
          <Dropdown.Content>
            <div className="w-24 rounded border-2 border-[#7ECBFF]/20 bg-[#1B3A56]/50 p-4 outline-none ">
              <Dropdown.Item className="outline-none">
                <button
                  onClick={() => signOut()}
                  className=" text-white  hover:text-primary"
                >
                  Sign out
                </button>
              </Dropdown.Item>
            </div>
          </Dropdown.Content>
        </Dropdown>
      )}
    </header>
  );
};

export default Header;
