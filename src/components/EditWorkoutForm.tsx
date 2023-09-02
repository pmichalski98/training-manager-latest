import { editTrainingSchema, type TrainingWithId } from "~/types/training";
import { api } from "~/utils/api";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import ErrorText from "~/components/ui/ErrorText";
import Input from "~/components/ui/Input";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "~/components/ui/Button";
import { useUtils } from "~/hooks/useUtils";

function EditWorkoutForm({
  training,
  closeModal,
}: {
  training: TrainingWithId;
  closeModal: (value: boolean) => void;
}) {
  const utils = useUtils();
  const {
    getValues,
    trigger,
    formState: { errors },
    handleSubmit,
    control,
    register,
  } = useForm<TrainingWithId>({
    resolver: zodResolver(editTrainingSchema),
    defaultValues: {
      trainingId: training.trainingId,
      exercises: training.exercises,
      trainingName: training.trainingName,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });
  const [exerciseName, setExerciseName] = useState("");
  const { mutate: editTraining, isLoading: isEditing } =
    api.training.editTraining.useMutation({
      onSuccess: async () => {
        closeModal(false);
        await utils.training.getTrainings.invalidate();
      },
    });

  function onSubmit(data: TrainingWithId) {
    editTraining(data);
  }

  function addExercise() {
    append({ exerciseName: exerciseName, sortIndex: fields.length });
    setExerciseName("");
  }

  return (
    <div className="flex  h-full flex-col  px-6 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col space-y-3 "
      >
        <ErrorText>{errors.trainingName?.message}</ErrorText>
        <div className="flex flex-col rounded-lg bg-nav p-3 ring-1 ring-slate-400/10">
          <label htmlFor="workoutName" className="text-sm text-slate-400">
            Workout name
          </label>
          <Input
            {...register("trainingName")}
            type="text"
            id="workoutName"
            onBlur={() => trigger("trainingName")}
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
            {getValues("trainingName")}
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

export default EditWorkoutForm;
