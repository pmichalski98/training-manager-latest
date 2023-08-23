import React, { ReactNode, useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import {
  Control,
  useFieldArray,
  useForm,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";
import { trainingUnitSchema } from "~/types/workout";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Checkbox from "@radix-ui/react-checkbox";
import { TrainingTimeTicker } from "~/components/TrainingTimeTicker";
import { AiOutlineCheck } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import Modal from "~/components/ui/Modal";
import { redirect } from "next/navigation";
import { router } from "next/client";

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
    reset,
    register,
  } = useForm<trainingUnitSchema>({
    resolver: zodResolver(trainingUnitSchema),
    defaultValues: async () =>
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      }),
    values: training,
  });
  const { fields } = useFieldArray({
    control,
    name: "exercises",
  });
  if (!training) return;
  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center pb-40">
        <ClipLoader size={130} color="#5FD4EE" />
      </div>
    );

  async function formSubmit(data: trainingUnitSchema) {
    console.log(data);
    reset();
    await router.push("/");
  }

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <section className="my-10 space-y-4">
        <h1 className="text-2xl font-medium capitalize">
          {training.workoutName}
        </h1>
        <div className="flex gap-6 ">
          <div className="flex w-fit basis-1/3 items-center  gap-2 rounded-lg bg-nav p-4 ">
            <TrainingTimeTicker startTime={trainingStartTime.getTime()} />
          </div>
          <Modal>
            <Modal.Button className=" basis-2/3 rounded-2xl bg-primaryText text-lg font-bold text-nav hover:bg-cyan-500">
              Finish workout
            </Modal.Button>
            <Modal.Content title="Are you sure ? ">
              <button onClick={handleSubmit(formSubmit)}>send it</button>
            </Modal.Content>
          </Modal>
        </div>
      </section>
      {fields.map((exercise, index) => {
        return (
          <section key={exercise.id} className="mb-20 space-y-4">
            <h2 className="text-xl font-semibold capitalize text-lightCyan">
              {exercise.exerciseName}
            </h2>
            <Sets
              getValues={getValues}
              nestIndex={index}
              {...{ control, register }}
            />
          </section>
        );
      })}
      <section>
        <button
          className="flex w-full items-center gap-2 rounded-2xl bg-red-700/60 px-3 py-1"
          type="button"
        >
          <span className="text-4xl hover:text-gray-400">-</span>
          <p className="translate-y-0.5">Cancel workout</p>
        </button>
      </section>
    </form>
  );
}

export default Id;

function Sets({
  getValues,
  nestIndex,
  control,
  register,
}: {
  nestIndex: number;
  getValues: UseFormGetValues<trainingUnitSchema>;
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

  const [checkedRow, setCheckedRow] = useState<boolean[]>([]);

  function handleCheckedRow(checked: boolean, index: number) {
    const copiedArray = [...checkedRow];
    copiedArray[index] = checked;
    setCheckedRow(copiedArray);
  }

  function getLastSetValues() {
    return getValues(
      `exercises.${nestIndex}.trainingVolume.${sets.length - 1}`
    );
  }

  function addSet() {
    append(getLastSetValues());
    setCheckedRow([...checkedRow, false]);
  }

  function removeSet() {
    remove(sets.length - 1);
    setCheckedRow(
      checkedRow.filter((_, index) => index !== checkedRow.length - 1)
    );
  }

  return (
    <section className="flex flex-col">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden border-t border-slate-200/20 ">
            <section className="grid grid-cols-5">
              <ColumnHeader>Sets</ColumnHeader>
              <ColumnHeader>Reps</ColumnHeader>
              <ColumnHeader>
                Weight <span className="text-xs">(kg)</span>
              </ColumnHeader>
              <ColumnHeader>RPE</ColumnHeader>
            </section>
            <section className="space-y-2   text-sm">
              {sets.map((set, index) => {
                return (
                  <div
                    key={set.id}
                    className={` grid  grid-cols-5 rounded-lg transition duration-500 ease-in-out ${
                      checkedRow[index]
                        ? " bg-gradient-to-r from-[#33FF00]/30 via-[#00FF29]/40 to-[#00FFD1]/30 "
                        : "bg-setRow"
                    }`}
                  >
                    <h4 className=" flex items-center justify-center whitespace-nowrap px-3 py-2  font-medium ">
                      {index + 1}
                    </h4>
                    <div className="whitespace-nowrap  px-3 py-4">
                      <input
                        type="tel"
                        disabled={checkedRow[index]}
                        className="     w-full rounded bg-bgInput/10 px-3 py-2 text-center  "
                        {...register(
                          `exercises.${nestIndex}.trainingVolume.${index}.reps`,
                          { valueAsNumber: true }
                        )}
                      />
                    </div>
                    <div className=" whitespace-nowrap px-3 py-4">
                      <input
                        type="tel"
                        disabled={checkedRow[index]}
                        className="     w-full rounded bg-bgInput/10 px-3 py-2 text-center  "
                        {...register(
                          `exercises.${nestIndex}.trainingVolume.${index}.weight`,
                          { valueAsNumber: true }
                        )}
                      />
                    </div>
                    <div className="whitespace-nowrap px-3 py-4 ">
                      <input
                        type="tel"
                        disabled={checkedRow[index]}
                        className="     w-full rounded bg-bgInput/10 px-3 py-2 text-center  "
                        {...register(
                          `exercises.${nestIndex}.trainingVolume.${index}.rpe`,
                          { valueAsNumber: true }
                        )}
                      />
                    </div>
                    <div
                      className={` ml-auto mr-6 flex  items-center whitespace-nowrap `}
                    >
                      <Checkbox.Root
                        onCheckedChange={(checked) =>
                          handleCheckedRow(!!checked, index)
                        }
                        className="flex h-7 w-7   items-center justify-center whitespace-nowrap rounded bg-bgInput/10 aria-checked:bg-green-400/60 "
                      >
                        <Checkbox.Indicator>
                          <AiOutlineCheck size={20} />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                    </div>
                  </div>
                );
              })}
              <section className="flex  gap-2 whitespace-nowrap   rounded-lg">
                <button
                  type="button"
                  className="flex basis-1/2 items-center gap-2 rounded-2xl bg-nav px-3 hover:bg-bgInput/10"
                  onClick={addSet}
                >
                  <span className="text-4xl hover:text-gray-400">+</span>
                  <span className="translate-y-0.5">Add new set</span>
                </button>
                <button
                  className="flex basis-1/2 items-center gap-2 rounded-2xl bg-nav px-3 py-1  hover:bg-red-700/60"
                  type="button"
                  onClick={removeSet}
                >
                  <span className="text-4xl hover:text-gray-400">-</span>
                  <p className="translate-y-0.5">Remove last set</p>{" "}
                </button>
              </section>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
function ColumnHeader({ children }: { children: ReactNode }) {
  return (
    <h3 className="px-3 py-3.5 text-center text-sm text-fadedBlue first:pl-8">
      {children}
    </h3>
  );
}
