import React, { useState } from "react";
import useMeasure from "react-use-measure";
import { api } from "~/utils/api";
import { InnerChart } from "~/components/InnerChart";
import ExerciseSelect from "~/components/ExerciseSelect";
function ExerciseChart() {
  const [selectedExercise, setSelectedExercise] = useState<string>();
  const [ref, bounds] = useMeasure();
  const { data: exercises } = api.stats.getExerciseList.useQuery();
  const { data: chosenExercise } = api.stats.getChosenExercise.useQuery(
    selectedExercise || "",
    {
      retry: false,
    }
  );
  if (!exercises) return <div>error</div>;
  let data: {
    x: number | Date;
    y: number;
  }[] = [];
  if (chosenExercise) {
    data = chosenExercise.map((weight, index) => {
      return {
        x: index + 1,
        y: weight.weight,
      };
    });
  }

  return (
    <>
      <div className="space-y-1 font-medium">
        <h2 className="text-sm  uppercase text-slate-400">
          your stats at a glance
        </h2>
        <p>Progress in chosen exercise</p>

        <div className="text-center text-2xl capitalize">
          <ExerciseSelect
            value={selectedExercise}
            setValue={setSelectedExercise}
            data={exercises}
          />
        </div>
      </div>
      {chosenExercise?.length !== 0 && (
        <div ref={ref} className="relative h-full w-full ">
          {bounds.width > 0 && (
            <InnerChart
              width={bounds.width}
              data={data}
              height={bounds.height}
            />
          )}
        </div>
      )}
    </>
  );
}

export default ExerciseChart;
