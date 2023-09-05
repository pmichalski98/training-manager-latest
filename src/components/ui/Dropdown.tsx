"use client";

import * as DropDownMenu from "@radix-ui/react-dropdown-menu";
import React, { type ReactNode } from "react";

export default function DropDown({
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}) {
  return <DropDownMenu.Root>{children}</DropDownMenu.Root>;
}

function DropDownContent({ children }: { children: ReactNode }) {
  return (
    <DropDownMenu.Portal>
      <DropDownMenu.Content
        align={"start"}
        className={"absolute right-0 top-0 mt-2 translate-x-1/3 overflow-auto "}
      >
        {children}
      </DropDownMenu.Content>
    </DropDownMenu.Portal>
  );
}

DropDown.Button = DropDownMenu.Trigger;
DropDown.Content = DropDownContent;
DropDown.Item = DropDownMenu.Item;
