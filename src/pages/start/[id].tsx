import React, { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { type WorkoutWithId } from "~/types/workout";
import ExerciseTable from "~/components/ExerciseTable";
import { TrainingTimeTicker } from "~/components/TrainingTimeTicker";

function Id() {
  const [trainingStartTime, setTrainingStartTime] = useState(new Date());

  const {
    query: { id },
  } = useRouter();
  if (typeof id !== "string") throw new Error("no id");

  const { data: training } = api.workout.startTraining.useQuery(id);
  if (!training) return <div>Loading ...</div>;

  return (
    <div>
      <div className="mt-10 space-y-4">
        <h1 className="text-2xl font-medium capitalize">
          {training.workoutName}
        </h1>
        <div className="flex w-fit items-center  gap-2 rounded-lg bg-nav p-4 ">
          <TrainingTimeTicker startTime={trainingStartTime.getTime()} />
        </div>
      </div>
      {training.exercises.map((exercise) => {
        return (
          <div key={exercise.id}>
            <ExerciseTable exercise={exercise} />
          </div>
        );
      })}
    </div>
  );
}

export default Id;
