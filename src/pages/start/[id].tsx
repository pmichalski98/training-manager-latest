import React, { ReactNode, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import {
  Control,
  useFieldArray,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { addWorkoutSchema, trainingUnitSchema, Workout } from "~/types/workout";
import { zodResolver } from "@hookform/resolvers/zod";
function Id() {
  const {
    query: { id },
  } = useRouter();
  if (typeof id !== "string") throw new Error("no id");

  const { data: training, isLoading } = api.workout.startTraining.useQuery(id, {
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  const {
    getValues,
    formState: { errors },
    handleSubmit,
    control,
    watch,
    register,
  } = useForm<trainingUnitSchema>({
    resolver: zodResolver(trainingUnitSchema),
    defaultValues: async () =>
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      }),
    values: training,
  });
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "exercises",
  });
  console.log(watch());
  if (!training) return <div>Loading ...</div>;

  return (
    <form>
      {fields.map((item, index) => {
        return (
          <div key={item.id} className="mb-20 space-y-4">
            <h2>{item.exerciseName}</h2>
            <NestedArray nestIndex={index} {...{ control, register }} />
          </div>
        );
      })}
    </form>
  );
}

export default Id;

function NestedArray({
  nestIndex,
  control,
  register,
}: {
  nestIndex: number;
  control: Control<trainingUnitSchema>;
  register: UseFormRegister<trainingUnitSchema>;
}) {
  const {
    fields: sets,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `exercises.${nestIndex}.trainingVolume`,
  });

  return (
    <div className="">
      {sets.map((set, index) => {
        return (
          <div key={set.id}>
            <input
              className="bg-inherit"
              {...register(
                `exercises.${nestIndex}.trainingVolume.${index}.reps`
              )}
            />{" "}
            <input
              className="bg-inherit"
              {...register(
                `exercises.${nestIndex}.trainingVolume.${index}.weight`
              )}
            />
            <button type="button" onClick={() => remove(index)}>
              remove set
            </button>
          </div>
        );
      })}
      <button type="button" onClick={() => append({ weight: 0, reps: 0 })}>
        add set
      </button>
    </div>
  );
}
function ColumnHeader({ children }: { children: ReactNode }) {
  return (
    <div className="px-3 py-3.5 text-left text-sm text-fadedBlue first:pl-4 first:sm:pl-6">
      {children}
    </div>
  );
}
