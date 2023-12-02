import React from "react";
import Dropdown from "~/components/ui/Dropdown";
import Image from "next/image";
import { useClerk, useUser } from "@clerk/nextjs";

function UserDropdown() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  return (
    <>
      {isSignedIn && (
        <Dropdown>
          <Dropdown.Button className="md:absolute md:left-0 md:ml-4">
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
              <Dropdown.Item>
                <button className=" text-white  hover:text-primary">
                  Reset
                </button>
              </Dropdown.Item>
            </div>
          </Dropdown.Content>
        </Dropdown>
      )}
    </>
  );
}

export default UserDropdown;
