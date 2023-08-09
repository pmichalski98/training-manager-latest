"use client";

import Head from "next/head";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Input from "~/components/ui/Input";
import { useFieldArray, useForm } from "react-hook-form";
import { addWorkoutSchema, type Workout } from "~/types/workout";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiDeleteBin6Line } from "react-icons/ri";
import ErrorText from "~/components/ui/ErrorText";
import Modal from "~/components/ui/Modal";
import { PiHandWavingFill } from "react-icons/pi";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

export default function Home() {
  const { user } = useUser();
  const { data: trainingCount } = api.user.getTrainingsCount.useQuery();
  return (
    <>
      <Head>
        <title>Training Manager</title>
        <meta name="description" content="Training Manager gym application" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <>
        <div className={"mt-10"}>
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
          <Modal>
            <Modal.Button>
              <span className="text-5xl">+</span>
            </Modal.Button>
            <Modal.Content title="New workout">
              <h3 className="text-center text-3xl font-medium text-white">
                Workout Details
              </h3>
              <AddWorkoutForm />
            </Modal.Content>
          </Modal>
        </div>
        <div className="mt-6 rounded-lg border-2 border-primary/25 p-4">
          <div className="mx-auto flex w-11/12 items-center justify-between ">
            <h3 className="font-medium">Workout name</h3>
            <BsThreeDotsVertical size={20} />
          </div>
        </div>
      </>
    </>
  );
}
export function AddWorkoutForm() {
  const {
    getValues,
    formState: { errors },
    handleSubmit,
    control,
    register,
  } = useForm<Workout>({
    resolver: zodResolver(addWorkoutSchema),
    mode: "onBlur",
  });

  const { fields, update, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });
  const [exerciseName, setExerciseName] = useState("");
  const onSubmit = (data) => console.log("data", data);
  function addExercise() {
    append({ exerciseName: exerciseName });
    setExerciseName("");
  }

  return (
    <div className="flex  h-full flex-col  px-6 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col space-y-3 "
      >
        <ErrorText>{errors.workoutName?.message}</ErrorText>
        <div className="flex flex-col rounded-lg bg-nav p-3 ring-1 ring-slate-400/10">
          <label htmlFor="workoutName" className="text-sm text-slate-400">
            Workout name
          </label>
          <Input
            {...register("workoutName")}
            type="text"
            id="workoutName"
            className="mt-1 "
          />
        </div>
        <div className="flex flex-col rounded-lg bg-nav p-3 ring-1 ring-slate-400/10">
          <label htmlFor="workoutName" className="text-sm text-slate-400">
            Exercise name
          </label>
          <Input
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            type="text"
            id="workoutName"
            className="mt-1 "
          />
          <button
            onClick={addExercise}
            type="button"
            id="workoutName"
            className={"absolute inset-y-0 right-0 mr-3 text-5xl"}
          >
            +
          </button>
        </div>
        <ErrorText>{errors.exercises?.message}</ErrorText>
        <div className="mt-10 rounded-lg bg-nav p-6">
          <h3 className="text-center text-2xl font-medium">
            {getValues("workoutName")}
          </h3>
          <ul className="mt-6 space-y-3 pb-6">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="flex  justify-around">
                  <div className="flex items-center gap-4">
                    <p>{(index + 1).toString().concat(".")}</p>
                    <Input
                      {...register(`exercises.${index}.exerciseName` as const)}
                      id="exerciseName"
                      className="mt-1 "
                    />

                    <button onClick={() => remove(index)}>
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        {fields && (
          <button className=" mt-6 justify-end self-end rounded-lg  bg-primaryText px-4 py-2 font-bold text-gray-900 hover:bg-cyan-500">
            Add workout
          </button>
        )}
      </form>
    </div>
  );
}
