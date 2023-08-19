"use client";

import Head from "next/head";
import React, { useRef, useState } from "react";
import Input from "~/components/ui/Input";
import { useFieldArray, useForm } from "react-hook-form";
import {
  addWorkoutSchema,
  editWorkoutSchema,
  type Workout,
  type WorkoutWithId,
} from "~/types/workout";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiDeleteBin6Line } from "react-icons/ri";
import ErrorText from "~/components/ui/ErrorText";
import Modal from "~/components/ui/Modal";
import { PiHandWavingFill } from "react-icons/pi";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { MdUpdate } from "react-icons/md";
import Button from "~/components/ui/Button";
import OptionsDropdown from "~/components/OptionsDropdown";
import AddWorkoutForm from "~/components/AddWorkoutForm";

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

export function EditWorkoutForm({
  workout,
  closeModal,
}: {
  workout: WorkoutWithId;
  closeModal: (value: boolean) => void;
}) {
  const utils = api.useContext();
  const {
    getValues,
    trigger,
    formState: { errors },
    handleSubmit,
    control,
    register,
  } = useForm<WorkoutWithId>({
    resolver: zodResolver(editWorkoutSchema),
    defaultValues: {
      id: workout.id,
      exercises: workout.exercises,
      workoutName: workout.workoutName,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });
  const [exerciseName, setExerciseName] = useState("");
  const { mutate: editWorkout, isLoading: isEditing } =
    api.workout.editWorkout.useMutation({
      onSuccess: async () => {
        closeModal(false);
        await utils.workout.getWorkouts.invalidate();
      },
    });

  function onSubmit(data: WorkoutWithId) {
    editWorkout(data);
  }

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
            onBlur={() => trigger("workoutName")}
            className="mt-1 "
          />
        </div>
        <div className="relative flex flex-col rounded-lg bg-nav p-3 ring-1 ring-slate-400/10">
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
        <div className="mt-10 rounded-lg bg-nav p-6 ">
          <h3 className="text-center text-2xl font-medium">
            {getValues("workoutName")}
          </h3>
          <ul className="mt-6  space-y-3 pb-6 ">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="flex  justify-around  ">
                  <div className="flex items-center gap-4">
                    <p className="">{(index + 1).toString().concat(".")}</p>
                    <Input
                      {...register(`exercises.${index}.exerciseName` as const)}
                      id="exerciseName"
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
        {fields.length > 0 && (
          <Button disabled={isEditing} className="self-end font-bold ">
            Save changes
          </Button>
        )}
      </form>
    </div>
  );
}
