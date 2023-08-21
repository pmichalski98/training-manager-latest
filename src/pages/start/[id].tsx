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
import * as Checkbox from "@radix-ui/react-checkbox";
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
          <div key={set.id} className="grid grid-cols-3">
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
            <div className=" p-1 ">
              <Checkbox.Root className="flex h-5 w-5 items-center justify-center bg-rose-400  aria-checked:border-blue-500">
                <Checkbox.Indicator>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Checkbox.Indicator>
              </Checkbox.Root>{" "}
            </div>
          </div>
        );
      })}
      <button type="button" onClick={() => append({ weight: 0, reps: 0 })}>
        add set
      </button>
      <button type="button" onClick={() => remove(sets.length - 1)}>
        remove last set
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
