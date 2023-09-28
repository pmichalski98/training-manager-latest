import React from "react";
import Head from "next/head";
import { api } from "~/utils/api";
import OptionsDropdown from "~/components/OptionsDropdown";
import { MdUpdate } from "react-icons/md";
import * as datefns from "date-fns";
function Index() {
  const { data } = api.trainingUnit.getTrainingHistory.useQuery();

  if (!data) return <div>Go and start your first workout!</div>;

  return (
    <>
      <Head>
        <title>Training Manager</title>
        <meta name="description" content="Training Manager gym application" />
        <link rel="icon" href="/icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className="fixed mt-10 w-full bg-primary">
        <h1
          className=" text-5xl font-medium
         text-white"
        >
          Training History
        </h1>
      </div>
      {data
        .filter(
          (trainingUnit) =>
            trainingUnit.endedAt.getSeconds() !==
            trainingUnit.createdAt.getSeconds()
        )
        .map((trainingUnit) => {
          let duration = Math.abs(
            trainingUnit.endedAt - trainingUnit.createdAt
          );
          console.log(new Date(duration).getSeconds());
          return (
            <div className="mt-32" key={trainingUnit.id}>
              <h2 className="mb-6 text-xl font-medium text-fadedBlue">
                {datefns.format(trainingUnit.createdAt, "do MMMM")}
              </h2>
              <div className="   space-y-2 rounded-lg px-4 py-4 ring-1 ring-primary/30 hover:ring-primary sm:px-6">
                <div className="mx-auto flex  items-center justify-between ">
                  <h3 className="text-lg font-bold">
                    {trainingUnit.trainingName}
                  </h3>
                  <OptionsDropdown training={trainingUnit} />
                </div>
                <div className="flex items-center gap-2 text-sm opacity-75">
                  <span className="opacity-75">
                    <MdUpdate size={20} />
                  </span>
                  {/*<p>{new Date(duration).getSeconds()}</p>*/}
                </div>
                <div className="flex justify-between">
                  <ul className="text-sm opacity-75">
                    {trainingUnit.exercises.map((exercise) => {
                      return (
                        <li key={exercise.id}>
                          <p className="">{`${exercise.exerciseName} - ${exercise.sets}  x ${exercise.weight} kg`}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Index;
