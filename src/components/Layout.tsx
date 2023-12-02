import React, { type ReactNode } from "react";
import Navigation from "~/components/Navigation";
import Header from "~/components/Header";

type TLayout = { children: ReactNode };
function Layout({ children }: TLayout) {
  return (
    <>
      <Navigation />
      <main className="-mb-28 mt-16 min-h-screen overflow-auto px-3 pb-28 sm:px-6 md:ml-28 md:mt-0 md:px-9 md:pb-0 ">
        <Header />
        {children}
      </main>
    </>
  );
}

export default Layout;
