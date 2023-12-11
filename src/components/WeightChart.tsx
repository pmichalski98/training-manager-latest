import React from "react";
import useMeasure from "react-use-measure";
import { api } from "~/utils/api";
import { InnerChart } from "~/components/RandomChart";
import * as datefns from "date-fns";
function WeightChart() {
  const [ref, bounds] = useMeasure();
  const { data: entries } = api.stats.getWeightData.useQuery(_, {
    cacheTime: 0,
  });
  if (!entries) return;
  console.log(entries);
  const data = entries.map((weight, index) => {
    return {
      x: weight.createdAt,
      y: weight.weight,
    };
  });

  console.log(data);

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
