import Head from "next/head";
import React from "react";
import { api } from "~/utils/api";
import { MdUpdate } from "react-icons/md";
import Button from "~/components/ui/Button";
import OptionsDropdown from "~/components/OptionsDropdown";
import WelcomeUser from "~/components/WelcomeUser";
import AddWorkoutModal from "~/components/AddWorkoutModal";
import Link from "next/link";

export default function Home() {
  api.user.login.useQuery();
  const { data: workouts } = api.workout.getWorkouts.useQuery();

  return (
    <>
      <Head>
        <title>Training Manager</title>
        <meta name="description" content="Training Manager gym application" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="mb-10">
        <WelcomeUser />
        <h2 className="my-20">Tutaj z grubsza wykres </h2>
        <AddWorkoutModal />
        {workouts?.map((workout) => {
          return (
            <div
              key={workout.id}
              className="mt-6 space-y-2 rounded-lg px-4 py-4 ring-1 ring-primary/30 hover:ring-primary sm:px-6"
            >
              <div className="mx-auto flex  items-center justify-between ">
                <h3 className="text-lg font-bold">{workout.workoutName}</h3>
                <OptionsDropdown workout={workout} />
              </div>
              <div className="flex items-center gap-2 text-sm opacity-75">
                <span className="opacity-75">
                  <MdUpdate size={20} />
                </span>
                <p>3 days ago..</p>
              </div>
              <div className="flex justify-between">
                <ul className="text-sm opacity-75">
                  {workout.exercises.map((exercise) => {
                    return (
                      <li key={exercise.id}>
                        <p className="capitalize">{exercise.exerciseName}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="text-right">
                <Link href={`/start/${workout.id}`} className="">
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
