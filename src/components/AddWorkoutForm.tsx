import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { addWorkoutSchema, type Workout } from "~/types/workout";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import ErrorText from "~/components/ui/ErrorText";
import Input from "~/components/ui/Input";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "~/components/ui/Button";
import { useUtils } from "~/hooks/useUtils";

export function AddWorkoutForm({
  closeModal,
}: {
  closeModal: (value: boolean) => void;
}) {
  const utils = useUtils();
  const inputRef = useRef(null);

  const [exerciseName, setExerciseName] = useState("");
  const { mutate, isLoading: isAdding } = api.workout.addWorkout.useMutation({
    onSuccess: async () => {
      await utils.workout.getWorkouts.invalidate();
    },
  });

  const {
    getValues,
    formState: { errors },
    handleSubmit,
    control,
    register,
  } = useForm<Workout>({
    resolver: zodResolver(addWorkoutSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  function onSubmit(data: Workout) {
    mutate(data);
    closeModal(false);
  }

  const addExercise = useCallback(() => {
    setExerciseName("");
    append({ exerciseName: exerciseName }, { shouldFocus: false });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    inputRef.current.focus();
  }, [append, exerciseName]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addExercise();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [addExercise, exerciseName]);

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
            autoFocus
            className="mt-1 "
          />
        </div>
        <div className="relative flex flex-col rounded-lg bg-nav p-3 ring-1 ring-slate-400/10">
          <label htmlFor="exerciseName" className="text-sm text-slate-400">
            Exercise name
          </label>
          <Input
            ref={inputRef}
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            type="text"
            id="exerciseName"
            className="mt-1 "
          />
          <button
            id="workoutName"
            type="button"
            onClick={addExercise}
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
          <ul className="mt-6 space-y-3 pb-6 ">
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
          <Button disabled={isAdding} className="self-end font-bold  ">
            Add workout
          </Button>
        )}
      </form>
    </div>
  );
}

export default AddWorkoutForm;
