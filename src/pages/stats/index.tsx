import React from "react";
import RandomChart from "~/components/RandomChart";
import Head from "next/head";
import WeightChart from "~/components/WeightChart";
import ExerciseChart from "~/components/ExerciseChart";

function Index() {
  return (
    <>
      <Head>
        <title>Training Manager</title>
        <meta name="description" content="Training Manager gym application" />
        <link rel="icon" href="/icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="viewport"
          content="initial-scale=1, user-scalable=no, viewport-fit=cover"
        />
      </Head>

      <main className=" mt-10 w-full bg-primary standalone:mt-16">
        <h1
          className="
         text-4xl font-medium text-white"
        >
          Stats and Charts
        </h1>
        <section className="mt-10 space-y-12">
          <div>
            <ExerciseChart />
          </div>
          <div>
            <WeightChart />
          </div>
        </section>
      </main>
    </>
  );
}

export default Index;
