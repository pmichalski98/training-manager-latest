import Head from "next/head";
import React, { useState } from "react";
import Header from "~/components/Header";
import { BsThreeDotsVertical } from "react-icons/bs";
import Input from "~/components/ui/Input";
import { useForm } from "react-hook-form";
import { addWorkoutSchema, type Workout } from "~/types/workout";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiDeleteBin6Line } from "react-icons/ri";
import ErrorText from "~/components/ui/ErrorText";
import Modal from "~/components/ui/Modal";

export default function Home() {
  return (
    <>
      <Head>
        <title>Training Manager</title>
        <meta name="description" content="Training Manager gym application" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <>
        <div className={"mt-10"}>
          <Header />
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
        <ErrorText>{errors.exerciseName?.message}</ErrorText>
        <div className="relative flex flex-col rounded-lg bg-nav p-3 ring-1 ring-slate-400/10">
          <label htmlFor="exerciseName" className="text-sm text-slate-400">
            Exercises
          </label>
          <Input
            {...register("exerciseName")}
            type="text"
            id="exerciseName"
            className="mt-1 "
          />
          <button className={"absolute inset-y-0 right-0 mr-3 text-5xl"}>
            +
          </button>
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
