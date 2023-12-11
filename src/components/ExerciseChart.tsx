import React, { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { api } from "~/utils/api";
import { InnerChart } from "~/components/InnerChart";
import ExerciseSelect from "~/components/ExerciseSelect";
function ExerciseChart() {
  const [ref, bounds] = useMeasure();
  const { data: exercises } = api.stats.getExerciseList.useQuery();
  const [selectedExercise, setSelectedExercise] = useState<string>();
  console.log({ selectedExercise });
  if (!exercises) return <div>error</div>;
  // const data = exercises.map((weight, index) => {
  //   return {
  //     x: weight.createdAt,
  //     y: weight.weight,
  //   };
  // });
  // let defaultExercise = "";

  return (
    <>
      <div className="space-y-1 font-medium">
        <h2 className="text-sm  uppercase text-slate-400">
          your stats at a glance
        </h2>
        <p>Weight reduction progress over time</p>

        <div className="text-center text-2xl capitalize">
          <ExerciseSelect
            value={selectedExercise}
            setValue={setSelectedExercise}
            data={exercises}
          />
        </div>
      </div>
      {/*{selectedExercise ? (*/}
      {/*  <div ref={ref} className="relative h-full w-full ">*/}
      {/*    {bounds.width > 0 && (*/}
      {/*      <InnerChart*/}
      {/*        width={bounds.width}*/}
      {/*        data={data}*/}
      {/*        height={bounds.height}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <div ref={ref} className="relative h-full w-full "></div>*/}
      {/*)}*/}
    </>
  );
}

export default ExerciseChart;
