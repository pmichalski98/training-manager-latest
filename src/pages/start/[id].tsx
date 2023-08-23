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
import { TrainingTimeTicker } from "~/components/TrainingTimeTicker";
import { AiOutlineCheck } from "react-icons/ai";
import Input from "~/components/ui/Input";
function Id() {
  const [trainingStartTime, setTrainingStartTime] = useState(new Date());
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
      <div className="my-10 space-y-4">
        <h1 className="text-2xl font-medium capitalize">
          {training.workoutName}
        </h1>
        <div className="flex w-fit items-center  gap-2 rounded-lg bg-nav p-4 ">
          <TrainingTimeTicker startTime={trainingStartTime.getTime()} />
        </div>
      </div>
      {fields.map((exercise, index) => {
        return (
          <div key={exercise.id} className="mb-20 space-y-4">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-xl font-semibold capitalize text-lightCyan">
                  {exercise.exerciseName}
                </h2>
              </div>
            </div>
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

  const [checkedState, setCheckedState] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  function handleChecked(checked: boolean, index: number) {
    const newArr = [...checkedState];
    newArr[index] = checked;
    setCheckedState(newArr);
  }

  console.log(checkedState);
  return (
    <div>
      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border-t border-slate-200/20 ">
              <div className=" min-w-full  ">
                <div>
                  <div className="grid grid-cols-5">
                    <ColumnHeader>Sets</ColumnHeader>
                    <ColumnHeader>Reps</ColumnHeader>
                    <ColumnHeader>Weight (kg)</ColumnHeader>
                    <ColumnHeader>RPE</ColumnHeader>
                  </div>
                </div>
                <div className="space-y-2 px-3  text-sm">
                  {sets.map((set, index) => {
                    return (
                      <div
                        key={set.id}
                        className={` grid grid-cols-5 rounded-lg transition duration-500 ease-in-out ${
                          checkedState[index]
                            ? " bg-gradient-to-r from-[#33FF00]/30 via-[#00FF29]/40 to-[#00FFD1]/30 "
                            : "bg-setRow"
                        }`}
                      >
                        <div className=" whitespace-nowrap px-3 py-4  pl-6 pr-3  font-medium  sm:pl-6">
                          <p>{index + 1}</p>
                        </div>
                        <div>
                          <input
                            disabled={checkedState[index]}
                            className=" whitespace-nowrap bg-transparent px-3 py-4  "
                            {...register(
                              `exercises.${nestIndex}.trainingVolume.${index}.reps`
                            )}
                          />
                        </div>
                        <div className=" whitespace-nowrap px-3 py-4">
                          <input
                            disabled={checkedState[index]}
                            className=" bg-transparent "
                            {...register(
                              `exercises.${nestIndex}.trainingVolume.${index}.weight`
                            )}
                          />
                        </div>
                        <div>
                          <input
                            disabled={checkedState[index]}
                            className=" whitespace-nowrap bg-transparent px-3 py-4  "
                            {...register(
                              `exercises.${nestIndex}.trainingVolume.${index}.rpe`
                            )}
                          />
                        </div>
                        <div className={` whitespace-nowrap px-3 py-4 `}>
                          <Checkbox.Root
                            onCheckedChange={(checked) =>
                              handleChecked(!!checked, index)
                            }
                            className="flex h-6 w-6   items-center justify-center whitespace-nowrap rounded bg-bgInput/10 aria-checked:bg-green-400/80 peer-aria-checked:bg-green-400"
                          >
                            <Checkbox.Indicator>
                              <AiOutlineCheck size={20} />
                            </Checkbox.Indicator>
                          </Checkbox.Root>
                        </div>
                      </div>
                    );
                  })}
                  <div className=" whitespace-nowrap rounded-lg bg-nav px-3 py-4 ">
                    <button
                      type="button"
                      className="w-1/2"
                      onClick={() => append({ weight: 0, reps: 0, rpe: 9 })}
                    >
                      add set
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(sets.length - 1)}
                    >
                      remove last set
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function ColumnHeader({ children }: { children: ReactNode }) {
  return (
    <div className="px-3 py-3.5 text-left text-sm text-fadedBlue first:pl-8 first:sm:pl-6">
      {children}
    </div>
  );
}
