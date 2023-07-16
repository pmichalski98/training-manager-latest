import Head from "next/head";
import { api } from "~/utils/api";
import { PiHandWavingFill } from "react-icons/pi";
import { IoBarbell } from "react-icons/io5";
import React from "react";
import Navigation from "~/components/Navigation";
import Header from "~/components/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Training Manager</title>
        <meta name="description" content="Training Manager gym application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto mt-10 min-h-screen w-11/12">
        <Navigation />
        <Header />
      </main>
    </>
  );
}
