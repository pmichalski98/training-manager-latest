import React from "react";
import useMeasure from "react-use-measure";
import { api } from "~/utils/api";
import { InnerChart } from "~/components/InnerChart";

export default function RandomChart() {
  const [ref, bounds] = useMeasure();
  const { data: entries } = api.stats.getRandomExercise.useQuery();
  if (!entries) return;
  const data = entries.data.map((weight, index) => {
    return {
      x: index + 1,
      y: weight.weight,
    };
  });

  return (
    <>
      <div className="space-y-1 font-medium">
        <h2 className="text-sm  uppercase text-slate-400">
          your stats at a glance
        </h2>
        <p>Weight per training</p>
      </div>
      <p className="text-center text-2xl capitalize">{entries.exerciseName}</p>
      <div ref={ref} className="relative h-full w-full ">
        {bounds.width > 0 && (
          <InnerChart
            key={entries.exerciseName}
            width={bounds.width}
            data={data}
            height={bounds.height}
          />
        )}
      </div>
    </>
  );
}
