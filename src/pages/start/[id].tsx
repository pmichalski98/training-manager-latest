import React, { ReactNode, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import { trainingUnitSchema } from "~/types/training";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Checkbox from "@radix-ui/react-checkbox";
import { TrainingTimeTicker } from "~/components/TrainingTimeTicker";
import { AiOutlineCheck } from "react-icons/ai";
import Modal from "~/components/ui/Modal";
import { FaTrash } from "react-icons/fa";
import Button from "~/components/ui/Button";
import Link from "next/link";
import Spinner from "~/components/svgs/Spinner";
import Head from "next/head";

function Id() {
  const [checkedRow, setCheckedRow] = useState<boolean[]>([]);
  const trainingStartTime = new Date();

  const {
    push,
    query: { id },
  } = useRouter();
  if (typeof id !== "string") throw new Error("no id");

  const { data: training, isLoading } = api.training.startTraining.useQuery(
    id,
    {
      cacheTime: 0,
      refetchOnMount: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: finishTraining, isLoading: isFinishing } =
    api.training.finishTrainingUnit.useMutation();

  const { handleSubmit, control, watch, getValues, setValue, register } =
    useForm<trainingUnitSchema>({
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

  if (isLoading)
    return (
      <div className="-my-40 flex h-screen items-center justify-center">
        <Spinner size={24} />
      </div>
    );
  if (!training) return;

  async function formSubmit(data: trainingUnitSchema) {
    finishTraining({ ...data, createdAt: trainingStartTime });
    await push("/");
  }
  function handleCheckedRow(checked: boolean, index: number) {
    const copiedArray = [...checkedRow];
    copiedArray[index] = checked;
    setCheckedRow(copiedArray);
  }

  return (
    <>
      <Head>
        <title>Training Manager</title>
        <meta name="description" content="Training Manager gym application" />
        <link rel="icon" href="/icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="viewport"
          content="initial-scale=1, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <form
        className="mx-auto max-w-2xl standalone:mt-20"
        onSubmit={handleSubmit(formSubmit)}
      >
        <section className="my-10 space-y-4 ">
          <h1 className="text-2xl font-medium capitalize">
            {training.trainingName}
          </h1>
          <div className="grid grid-cols-3 gap-4 ">
            <div className=" flex w-fit  basis-2/5 items-center gap-2  whitespace-nowrap rounded-l-2xl bg-nav p-4 ">
              <TrainingTimeTicker startTime={trainingStartTime.getTime()} />
            </div>
            <Modal>
              <Modal.Button className="flex-1 rounded-r-2xl bg-primaryText px-6  font-bold text-nav hover:bg-cyan-500">
                Finish workout
              </Modal.Button>
              <Modal.Content title="Are you sure ? ">
                <div className="mt-6 flex w-full justify-between px-10">
                  <Button
                    className=" font-medium"
                    onClick={handleSubmit(formSubmit)}
                    disabled={isFinishing}
                  >
                    Save training
                  </Button>
                  <Modal.Button asChild>
                    <Button
                      disabled={isFinishing}
                      variant="danger"
                      className=""
                    >
                      Go back
                    </Button>
                  </Modal.Button>
                </div>
              </Modal.Content>
            </Modal>
            <section>
              <Modal>
                <Modal.Button className="flex w-full items-center gap-2  rounded-lg bg-red-700/60 px-3 py-4 hover:bg-red-800 ">
                  <FaTrash size={15} />
                  Cancel workout
                </Modal.Button>
                <Modal.Content title="Are you sure you want to cancel workout ? ">
                  <h2 className={"text-center  text-lg text-slate-300"}>
                    All of this workouts data will be lost !
                  </h2>
                  <div className="mt-6 flex w-full justify-between px-10">
                    <Link href="/">
                      <Button type="button">Cancel</Button>
                    </Link>
                    <Modal.Button asChild>
                      <Button variant="danger" className="">
                        Go back
                      </Button>
                    </Modal.Button>
                  </div>
                </Modal.Content>
              </Modal>
            </section>
          </div>
        </section>
        {fields.map((exercise, index) => {
          return (
            <section key={exercise.id} className="mb-20 space-y-4">
              <h2 className="text-xl font-semibold capitalize text-lightCyan">
                {exercise.exerciseName}
              </h2>
              <section className="flex flex-col ">
                <div className="-mx-2 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
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
                        <div
                          className={` grid  grid-cols-5 rounded-lg transition duration-500 ease-in-out ${
                            checkedRow[index]
                              ? " bg-gradient-to-r from-[#33FF00]/30 via-[#00FF29]/40 to-[#00FFD1]/30 "
                              : "bg-setRow"
                          }`}
                        >
                          <div className="whitespace-nowrap  px-3 py-4">
                            <input
                              type="tel"
                              disabled={checkedRow[index]}
                              className="     w-full rounded bg-bgInput/10 px-3 py-2 text-center  "
                              {...register(`exercises.${index}.sets`, {
                                valueAsNumber: true,
                              })}
                            />
                          </div>
                          <div className="whitespace-nowrap  px-3 py-4">
                            <input
                              type="tel"
                              disabled={checkedRow[index]}
                              className="     w-full rounded bg-bgInput/10 px-3 py-2 text-center  "
                              {...register(`exercises.${index}.reps`, {
                                valueAsNumber: true,
                              })}
                            />
                          </div>
                          <div className=" whitespace-nowrap px-3 py-4">
                            <input
                              type="tel"
                              disabled={checkedRow[index]}
                              className="     w-full rounded bg-bgInput/10 px-3 py-2 text-center  "
                              {...register(`exercises.${index}.weight`, {
                                valueAsNumber: true,
                              })}
                            />
                          </div>
                          <div className="whitespace-nowrap px-3 py-4 ">
                            <input
                              type="tel"
                              disabled={checkedRow[index]}
                              className="     w-full rounded bg-bgInput/10 px-3 py-2 text-center  "
                              {...register(`exercises.${index}.rpe`, {
                                valueAsNumber: true,
                              })}
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
                      </section>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          );
        })}
      </form>
    </>
  );
}

export default Id;
function ColumnHeader({ children }: { children: ReactNode }) {
  return (
    <h3 className="whitespace-nowrap px-3 py-3.5 text-center text-sm text-fadedBlue first:pl-8">
      {children}
    </h3>
  );
}
