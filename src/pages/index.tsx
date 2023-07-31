import Head from "next/head";
import React from "react";
import Navigation from "~/components/Navigation";
import Header from "~/components/Header";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Home() {
  return (
    <>
      <Head>
        <title>Training Manager</title>
        <meta name="description" content="Training Manager gym application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className="min-h-screen px-3 md:px-6">
        <div className={"mt-10"}>
          <Header />
        </div>
        {/*<h2 className="my-20">Tutaj z grubsza wykres </h2>*/}
        <div className="mt-20 flex items-center justify-between">
          <h2 className=" text-2xl font-bold">Workouts</h2>
          <p className="text-5xl">+</p>
        </div>
        <div className="mt-6 rounded-lg border-2 border-primary/25 p-4">
          <div className="mx-auto flex w-11/12 items-center justify-between ">
            <h3 className="font-medium">Workout name</h3>
            <BsThreeDotsVertical size={20} />
          </div>
        </div>
      </main>
    </>
  );
}
