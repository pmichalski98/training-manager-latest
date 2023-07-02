import React, { ComponentType } from "react";
import { IconBaseProps } from "react-icons";

interface NavItemProps {
  title: string;
  Icon: ComponentType<IconBaseProps>;
}
const NavItem = ({ title, Icon }: NavItemProps) => {
  return (
    <li className="cursor-pointer opacity-75 hover:text-primary hover:opacity-100">
      <Icon size={30} className="mx-auto mb-2" />
      <p>{title}</p>
    </li>
  );
};

export default NavItem;
