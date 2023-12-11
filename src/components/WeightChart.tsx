import React from "react";
import useMeasure from "react-use-measure";
import { api } from "~/utils/api";
import { InnerChart } from "~/components/InnerChart";
function WeightChart() {
  const [ref, bounds] = useMeasure();
  const { data: entries } = api.stats.getWeightData.useQuery();
  if (!entries) return;
  const data = entries.map((weight, index) => {
    return {
      x: weight.createdAt,
      y: weight.weight,
    };
  });

  return (
    <>
      <div className="space-y-1 font-medium">
        <h2 className="text-sm  uppercase text-slate-400">
          your stats at a glance
        </h2>
        <p>Weight reduction progress over time</p>
      </div>
      <div ref={ref} className="relative h-full w-full ">
        {bounds.width > 0 && (
          <InnerChart width={bounds.width} data={data} height={bounds.height} />
        )}
      </div>
    </>
  );
}

export default WeightChart;
