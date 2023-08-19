"use client";

import Head from "next/head";
import React, { useState } from "react";
import Modal from "~/components/ui/Modal";
import { PiHandWavingFill } from "react-icons/pi";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { MdUpdate } from "react-icons/md";
import Button from "~/components/ui/Button";
import OptionsDropdown from "~/components/OptionsDropdown";
import AddWorkoutForm from "~/components/AddWorkoutForm";
import IconButton from "~/components/IconButton";

export default function Home() {
  api.user.login.useQuery();
  const [openAddModal, setOpenAddModal] = useState(false);
  const { user } = useUser();
  const { data: trainingCount } = api.user.getTrainingsCount.useQuery();
  const { data: workouts } = api.workout.getWorkouts.useQuery();

  console.log(workouts);
  return (
    <>
      <Head>
        <title>Training Manager</title>
        <meta name="description" content="Training Manager gym application" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="mb-10">
        <div className={" mt-10"}>
          <div className="my-8 flex items-center gap-2">
            <PiHandWavingFill color={"orange"} size={25} />
            <h2 className=" text-xl opacity-60">Good Morning!</h2>
          </div>
          <p className={"text-4xl font-bold"}>{user?.firstName}</p>

          <p className="mt-6 font-bold">
            {trainingCount
              ? "You have trainined"
              : "Start your first training !"}
            {trainingCount && (
              <>
                <span className="text-primary"> {trainingCount}</span> times
                already!
              </>
            )}
          </p>
        </div>
        <h2 className="my-20">Tutaj z grubsza wykres </h2>
        <div className="mt-20 flex items-center justify-between">
          <h2 className=" text-2xl font-bold">Workouts</h2>
          <Modal open={openAddModal} onOpenChange={setOpenAddModal}>
            <Modal.Button>
              <IconButton>+</IconButton>
            </Modal.Button>
            <Modal.Content title="New workout">
              <h3 className="text-center text-3xl font-medium text-white">
                Workout Details
              </h3>
              <AddWorkoutForm />
            </Modal.Content>
          </Modal>
        </div>
        {workouts?.map((workout) => {
          return (
            <div
              key={workout.id}
              className="mt-6 space-y-2 rounded-lg px-8 py-4 ring-1 ring-primary/30 hover:ring-primary"
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
                <Button className="h-fit self-end">Start training </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
