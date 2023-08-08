import Head from "next/head";
import React, { useRef, useState } from "react";
import Navigation from "~/components/Navigation";
import Header from "~/components/Header";
import { BsThreeDotsVertical } from "react-icons/bs";
import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";
import Input from "~/components/Input";
import { useForm } from "react-hook-form";
import { type Workout } from "~/types/workout";
import { zodResolver } from "@hookform/resolvers/zod";
import { addWorkoutSchema } from "~/schemas/add-workout";
import { GoTrash } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import ErrorText from "~/components/ErrorText";

export default function Home() {
  return (
    <>
      <Head>
        <title>Training Manager</title>
        <meta name="description" content="Training Manager gym application" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Navigation />
      <main className="min-h-screen px-6 pb-28 md:mt-28 md:px-9">
        <div className={"mt-10"}>
          <Header />
        </div>
        <h2 className="my-20">Tutaj z grubsza wykres </h2>
        <div className="mt-20 flex items-center justify-between">
          <h2 className=" text-2xl font-bold">Workouts</h2>
          <Dialog.Root>
            <Dialog.Trigger>
              <span className="text-5xl">+</span>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0  z-20 bg-black/50" />
              <Dialog.Content
                className={
                  "fixed left-1/2 top-1/2 z-30 h-3/4 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-primary "
                }
              >
                <div className="flex w-full items-center justify-between p-6">
                  <Dialog.Title className={"mx-auto  text-xl text-slate-400"}>
                    New workout
                  </Dialog.Title>
                  <Dialog.Close className="hover:text-gray-400">
                    <AiOutlineClose size={35} />
                  </Dialog.Close>
                </div>
                <h3 className="text-center text-3xl font-medium text-white">
                  Workout Details
                </h3>
                <AddWorkoutForm />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
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
export function AddWorkoutForm() {
  const [exercises, setExercises] = useState<Pick<Workout, "exerciseName">[]>(
    []
  );
  const {
    getValues,
    formState: { errors },
    handleSubmit,
    resetField,
    register,
    watch,
  } = useForm<Workout>({
    resolver: zodResolver(addWorkoutSchema),
  });
  console.log(watch());
  console.log(errors);

  function addExercise(data: Workout) {
    setExercises([
      ...exercises,
      {
        exerciseName: data.exerciseName,
      },
    ]);
    resetField("exerciseName");
  }

  function deleteExercise(index: number) {
    setExercises([...exercises.filter((_, i) => i !== index)]);
  }

  console.log(exercises);

  return (
    <div className="flex  h-full flex-col  px-6 ">
      <form
        onSubmit={handleSubmit((data) => addExercise(data))}
        className="mt-6 flex flex-col space-y-3 "
      >
        <div className="flex flex-col rounded-lg bg-nav p-3">
          <label htmlFor="workoutName" className="text-sm text-slate-400">
            Workout name
          </label>
          <Input
            {...register("workoutName")}
            type="text"
            id="workoutName"
            className="mt-1 "
          />
          <ErrorText>{errors.workoutName?.message}</ErrorText>
        </div>
        <div className="relative flex flex-col rounded-lg bg-nav p-3">
          <label htmlFor="exerciseName" className="text-sm text-slate-400">
            Exercises
          </label>
          <Input
            {...register("exerciseName")}
            type="text"
            id="exerciseName"
            className="mt-1 "
          />
          <ErrorText>{errors.exerciseName?.message}</ErrorText>
          <button className={"absolute right-0 text-5xl"}>+</button>
        </div>
      </form>
      {exercises.length > 0 && (
        <div className="mt-10 rounded-lg bg-nav p-6">
          <h3 className="text-center text-2xl font-medium">
            {getValues("workoutName")}
          </h3>
          <ul className="mt-6 space-y-3 pb-6">
            {exercises.map((exercise, index) => {
              return (
                <div
                  key={exercise.exerciseName}
                  className="flex  justify-around"
                >
                  <div className="flex  w-full gap-1">
                    <p>{(index + 1).toString().concat(".")}</p>
                    <li>{exercise.exerciseName}</li>
                  </div>
                  <button onClick={() => deleteExercise(index)}>
                    <RiDeleteBin6Line />
                  </button>
                </div>
              );
            })}
          </ul>
        </div>
      )}
      {exercises.length > 0 && (
        <button className=" mt-6 justify-end self-end rounded-lg  bg-primaryText px-4 py-2 font-bold text-gray-900 hover:bg-cyan-500">
          Add workout
        </button>
      )}
    </div>
  );
}