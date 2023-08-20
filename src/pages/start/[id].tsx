import React from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { type WorkoutWithId } from "~/types/workout";
import ExerciseTable from "~/components/ExerciseTable";

function Id() {
  const {
    query: { id },
  } = useRouter();
  if (typeof id !== "string") throw new Error("no id");

  const { data: training } = api.workout.startTraining.useQuery(id);
  if (!training) return <div>Loading ...</div>;

  return (
    <div>
      <div className="mt-10">
        <h1 className="text-2xl font-medium capitalize">
          <span>{training.workoutName} workout</span>
        </h1>
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
