import React, { ReactNode } from "react";
import Navigation from "~/components/Navigation";
import Header from "~/components/Header";

type TLayout = { children: ReactNode };
function Layout({ children }: TLayout) {
  return (
    <>
      <Navigation />
      <main className="-mb-28 min-h-screen overflow-hidden px-6  md:px-9 md:pt-28">
        <Header />
        {children}
      </main>
    </>
  );
}

export default Layout;
