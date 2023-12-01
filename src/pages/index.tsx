import Head from "next/head";
import React from "react";
import { api } from "~/utils/api";
import { MdUpdate } from "react-icons/md";
import TrainingOptionsDropDown from "~/components/TrainingOptionsDropDown";
import WelcomeUser from "~/components/WelcomeUser";
import AddWorkoutModal from "~/components/AddWorkoutModal";
import Link from "next/link";
import Spinner from "~/components/Spinner";
import Chart from "~/components/Chart";
import * as datefns from "date-fns";

export default function Home() {
  api.user.login.useQuery();
  const { data: trainings } = api.training.getTrainings.useQuery();
  if (!trainings)
    return (
      <div className="-my-36 flex h-screen items-center justify-center overflow-hidden">
        <Spinner size={24} />
      </div>
    );

  // Definitely not the best way of dealing with this
  const workoutsWithoutDuplicatedEx = trainings.map((training) => {
    const exercises = training.exercises.filter(
      (exercise, index, array) =>
        index ===
        array.findIndex((v) => {
          if (v.exerciseName === exercise.exerciseName) {
            return v;
          }
        })
    );
    return {
      ...training,
      exercises,
    };
  });

  function getDaysSinceLastTraining(lastTrained: Date[]) {
    if (lastTrained.length === 0) return "Start your first training";
    return `${datefns.differenceInDays(
      new Date(),
      lastTrained[0]!
    )} days ago ...`;
  }

  return (
    <>
      <Head>
        <title>Training Manager</title>
        <meta name="description" content="Training Manager gym application" />
        <link rel="icon" href="/icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <div className="mb-10">
        <WelcomeUser />
        <div className="mt-10 rounded-md  bg-card p-4 text-white">
          <Chart />
        </div>
        <AddWorkoutModal />
        {workoutsWithoutDuplicatedEx.map((training) => {
          return (
            <div
              key={training.trainingId}
              className="mt-6 space-y-2 rounded-lg px-4 py-4 ring-1 ring-primary/30 hover:ring-primary sm:px-6"
            >
              <div className="mx-auto flex  items-center justify-between ">
                <h3 className="text-lg font-bold">{training.trainingName}</h3>
                <TrainingOptionsDropDown training={training} />
              </div>
              <div className="flex items-center gap-2 text-sm opacity-75">
                <span className="opacity-75">
                  <MdUpdate size={20} />
                </span>
                <p>
                  {getDaysSinceLastTraining(
                    training.trainingUnits.map((unit) => unit.endedAt)
                  )}
                </p>
              </div>
              <div className="flex justify-between">
                <ul className="text-sm opacity-75">
                  {training.exercises.map((exercise) => {
                    return (
                      <li key={exercise.id}>
                        <p className="capitalize">{exercise.exerciseName}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="text-right">
                <Link href={`/start/${training.trainingId}`} className="">
                  Start training
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
