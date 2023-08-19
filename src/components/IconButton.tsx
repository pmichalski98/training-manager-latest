import React, { type ReactNode } from "react";

function IconButton({ children }: { children: ReactNode }) {
  return <button className="text-5xl hover:text-gray-400">{children}</button>;
}

export default IconButton;
