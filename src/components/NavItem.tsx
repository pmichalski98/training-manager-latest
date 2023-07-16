import React, { ComponentType } from "react";
import { IconBaseProps } from "react-icons";
import Link from "next/link";

interface NavItemProps {
  href: string;
  title: string;
  Icon: ComponentType<IconBaseProps>;
}
const NavItem = ({ href, title, Icon }: NavItemProps) => {
  return (
    <li className="cursor-pointer opacity-75 hover:text-primary hover:opacity-100">
      <Icon size={30} className="mx-auto mb-2" />
      <Link href={href}>{title}</Link>
    </li>
  );
};

export default NavItem;
