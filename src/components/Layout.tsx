import React, { ReactNode } from "react";
import Navigation from "~/components/Navigation";

type TLayout = { children: ReactNode };
function Layout({ children }: TLayout) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen px-6 pb-28 md:mt-28 md:px-9">
        {children}
      </main>
    </>
  );
}

export default Layout;
