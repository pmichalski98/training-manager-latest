import Head from "next/head";
import { api } from "~/utils/api";
import { LuHistory } from "react-icons/lu";
import { IoIosStats, IoIosBody } from "react-icons/io";
import { IoBarbellSharp } from "react-icons/io5";
import NavItem from "~/components/NavItem";
import React from "react";
import Navigation from "~/components/Navigation";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Training Manager</title>
        <meta name="description" content="Training Manager gym application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center ">
        <Navigation />
        <main className=" min-h-screen"></main>
      </div>
    </>
  );
}
