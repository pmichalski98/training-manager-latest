import React from "react";
import Chart from "~/components/Chart";

function Index() {
  return (
    <main className=" mt-10 w-full bg-primary">
      <h1
        className="
         text-4xl font-medium text-white"
      >
        Statistics
      </h1>
      <section className="mt-10 rounded-md  bg-card p-4 text-white">
        <Chart />
      </section>
    </main>
  );
}

export default Index;
